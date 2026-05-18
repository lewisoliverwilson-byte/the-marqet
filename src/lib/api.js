import { isConfigured, client, authClient } from './amplify'
import { uploadData, getUrl } from 'aws-amplify/storage'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function withRating(skill) {
  return {
    ...skill,
    avg_rating: skill.avgRating ?? null,
    review_count: skill.reviewCount ?? 0,
    // Shape to match existing UI expectations
    profiles: skill.authorUsername ? {
      username: skill.authorUsername,
      display_name: skill.authorDisplayName,
      avatar_url: skill.authorAvatarUrl,
      is_verified: skill.authorIsVerified,
    } : null,
    price_gbp: skill.priceGbp ?? 0,
    short_description: skill.shortDescription,
    long_description: skill.longDescription,
    install_count: skill.installCount ?? 0,
    author_id: skill.authorCognitoId,
    repo_url: skill.repoUrl,
    admin_notes: skill.adminNotes,
    file_path: skill.filePath,
    skill_content: skill.skillContent,
  }
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export async function getSkills({ category, search, sort = 'newest', free, page = 1, limit = 24 } = {}) {
  if (!isConfigured) return { data: [], count: 0 }
  try {
    const { data: items, errors } = await client.models.Skill.listByStatus({ status: 'approved' })
    if (errors?.length) throw new Error(errors[0].message)

    let skills = (items || []).map(withRating)

    if (category) skills = skills.filter(s => s.category === category)
    if (free) skills = skills.filter(s => (s.price_gbp ?? 0) === 0)
    if (search) {
      const q = search.toLowerCase()
      skills = skills.filter(s =>
        s.title?.toLowerCase().includes(q) ||
        s.short_description?.toLowerCase().includes(q) ||
        s.tags?.some(t => t.toLowerCase().includes(q))
      )
    }

    if (sort === 'popular') skills.sort((a, b) => (b.install_count || 0) - (a.install_count || 0))
    else if (sort === 'rated') skills.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0))
    else skills.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const count = skills.length
    const start = (page - 1) * limit
    return { data: skills.slice(start, start + limit), count }
  } catch (e) {
    console.error('getSkills error:', e)
    return { data: [], count: 0 }
  }
}

export async function getSkillBySlug(slug) {
  if (!isConfigured) return null
  try {
    const { data: items } = await client.models.Skill.listBySlug({ slug })
    const skill = (items || []).find(s => s.status === 'approved')
    if (!skill) return null

    const { data: reviews } = await client.models.Review.listBySkillId({ skillId: skill.id })

    return {
      ...withRating(skill),
      reviews: (reviews || []).map(r => ({
        ...r,
        reviewer: {
          username: r.reviewerUsername,
          display_name: r.reviewerDisplayName,
          avatar_url: r.reviewerAvatarUrl,
        },
        developer_response: r.developerResponse,
      })),
    }
  } catch (e) {
    console.error('getSkillBySlug error:', e)
    return null
  }
}

export async function getFeaturedSkills() {
  if (!isConfigured) return []
  try {
    const { data: items } = await client.models.Skill.listByStatus({ status: 'approved' })
    return (items || []).filter(s => s.featured).map(withRating)
  } catch (e) {
    return []
  }
}

export async function incrementInstall(skillId, userId, version) {
  if (!isConfigured) return
  try {
    // Increment denormalized counter (non-atomic; acceptable for v1)
    const { data: skill } = await client.models.Skill.get({ id: skillId })
    if (skill) {
      await authClient.models.Skill.update({ id: skillId, installCount: (skill.installCount || 0) + 1 })
    }
    if (userId) {
      await authClient.models.Install.create({ skillId, userId, versionInstalled: version })
        .catch(() => {}) // ignore duplicate install
    }
  } catch (e) {
    console.error('incrementInstall error:', e)
  }
}

export async function hasInstalled(skillId, userId) {
  if (!isConfigured || !userId) return false
  try {
    const { data: installs } = await authClient.models.Install.listInstallsByUserId({ userId })
    return (installs || []).some(i => i.skillId === skillId)
  } catch {
    return false
  }
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function submitReview(skillId, reviewerCognitoId, rating, body, reviewerProfile) {
  if (!isConfigured) throw new Error('Unavailable')

  // Check for existing review from this user
  const { data: existing } = await authClient.models.Review.listByReviewerCognitoId({ reviewerCognitoId })
  const prior = (existing || []).find(r => r.skillId === skillId)

  if (prior) {
    await authClient.models.Review.update({ id: prior.id, rating, body })
  } else {
    await authClient.models.Review.create({
      skillId,
      reviewerCognitoId,
      reviewerUsername: reviewerProfile?.username,
      reviewerDisplayName: reviewerProfile?.display_name || reviewerProfile?.displayName,
      reviewerAvatarUrl: reviewerProfile?.avatar_url || reviewerProfile?.avatarUrl,
      rating,
      body,
    })
  }

  // Update denormalized avgRating on the skill
  const { data: allReviews } = await client.models.Review.listBySkillId({ skillId })
  const reviews = allReviews || []
  const avgRating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : null
  await authClient.models.Skill.update({ id: skillId, avgRating, reviewCount: reviews.length })
}

export async function submitDeveloperResponse(reviewId, developerResponse) {
  if (!isConfigured) throw new Error('Unavailable')
  await authClient.models.Review.update({ id: reviewId, developerResponse })
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export async function submitSkill(payload, authorProfile) {
  if (!isConfigured) throw new Error('Unavailable')
  const slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const { data, errors } = await authClient.models.Skill.create({
    title: payload.title,
    slug,
    shortDescription: payload.short_description || payload.shortDescription,
    longDescription: payload.long_description || payload.longDescription,
    category: payload.category,
    tags: payload.tags || [],
    priceGbp: payload.price_gbp ?? payload.priceGbp ?? 0,
    repoUrl: payload.repo_url || payload.repoUrl,
    version: payload.version || '1.0.0',
    changelog: payload.changelog,
    compatibility: payload.compatibility || ['claude'],
    authorCognitoId: authorProfile.cognitoId,
    authorUsername: authorProfile.username,
    authorDisplayName: authorProfile.displayName || authorProfile.display_name,
    authorAvatarUrl: authorProfile.avatarUrl || authorProfile.avatar_url,
    authorIsVerified: authorProfile.isVerified || authorProfile.is_verified || false,
    license: payload.license || 'MIT',
    status: 'pending',
  })

  if (errors?.length) throw new Error(errors[0].message)
  return data
}

export async function uploadSkillFile(file, skillId) {
  if (!isConfigured) throw new Error('Unavailable')
  const ext = file.name.split('.').pop()
  const path = `skill-files/${skillId}/skill.${ext}`

  await uploadData({ path, data: file }).result

  const { url } = await getUrl({ path })
  const fileUrl = url.toString().split('?')[0] // strip presign params

  await authClient.models.Skill.update({ id: skillId, filePath: fileUrl })
  return fileUrl
}

export async function getMySkills(userId) {
  if (!isConfigured) return []
  try {
    const { data: items } = await authClient.models.Skill.listByAuthorCognitoId({ authorCognitoId: userId })
    return (items || []).map(withRating).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch {
    return []
  }
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export async function getPendingSkills() {
  if (!isConfigured) return []
  try {
    const { data: items } = await authClient.models.Skill.listByStatus({ status: 'pending' })
    return (items || []).map(withRating).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  } catch {
    return []
  }
}

export async function reviewSkill(skillId, status, adminNotes) {
  if (!isConfigured) throw new Error('Unavailable')
  const { errors } = await authClient.models.Skill.update({ id: skillId, status, adminNotes })
  if (errors?.length) throw new Error(errors[0].message)
}

export async function getAdminStats() {
  if (!isConfigured) return {}
  try {
    const [approved, pending, allInstalls] = await Promise.all([
      client.models.Skill.listByStatus({ status: 'approved' }),
      client.models.Skill.listByStatus({ status: 'pending' }),
      // Total installs = sum of installCount across all approved skills
      client.models.Skill.listByStatus({ status: 'approved' }),
    ])
    const totalInstalls = (approved.data || []).reduce((a, s) => a + (s.installCount || 0), 0)
    return {
      totalSkills: (approved.data || []).length,
      pendingReview: (pending.data || []).length,
      totalUsers: 0, // Cognito user count requires Admin SDK
      totalInstalls,
    }
  } catch {
    return {}
  }
}

export async function getReports() {
  if (!isConfigured) return []
  try {
    const { data } = await authClient.models.Report.list()
    return (data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch {
    return []
  }
}

// ─── Profiles ────────────────────────────────────────────────────────────────

export async function getProfile(cognitoId) {
  if (!isConfigured || !cognitoId) return null
  try {
    const { data: items } = await client.models.Profile.listByCognitoId({ cognitoId })
    return items?.[0] ?? null
  } catch {
    return null
  }
}

export async function getProfileByUsername(username) {
  if (!isConfigured) return null
  try {
    const { data: profiles } = await client.models.Profile.listByUsername({ username })
    const profile = profiles?.[0]
    if (!profile) return null

    const { data: skills } = await client.models.Skill.listByAuthorCognitoId({ authorCognitoId: profile.cognitoId })
    const approvedSkills = (skills || [])
      .filter(s => s.status === 'approved')
      .map(withRating)

    return {
      ...profile,
      display_name: profile.displayName,
      avatar_url: profile.avatarUrl,
      github_url: profile.githubUrl,
      is_verified: profile.isVerified,
      is_admin: profile.isAdmin,
      skills: approvedSkills,
    }
  } catch (e) {
    console.error('getProfileByUsername error:', e)
    return null
  }
}

export async function updateProfile(cognitoId, updates) {
  if (!isConfigured) throw new Error('Unavailable')
  const existing = await getProfile(cognitoId)
  if (!existing) throw new Error('Profile not found')

  const { errors } = await authClient.models.Profile.update({
    id: existing.id,
    displayName: updates.display_name ?? updates.displayName,
    bio: updates.bio,
    website: updates.website,
    githubUrl: updates.github_url ?? updates.githubUrl,
    avatarUrl: updates.avatar_url ?? updates.avatarUrl,
  })
  if (errors?.length) throw new Error(errors[0].message)
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export async function submitContactRequest(payload) {
  if (!isConfigured) throw new Error('Unavailable')
  const { errors } = await client.models.ContactRequest.create({
    name: payload.name,
    email: payload.email,
    company: payload.company,
    requestType: payload.request_type || payload.requestType || 'custom_build',
    description: payload.description,
    budgetRange: payload.budget_range || payload.budgetRange,
  })
  if (errors?.length) throw new Error(errors[0].message)
}

export async function getContactRequests() {
  if (!isConfigured) return []
  try {
    const { data } = await authClient.models.ContactRequest.list()
    return (data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch {
    return []
  }
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function submitReport(skillId, reporterCognitoId, reason, details) {
  if (!isConfigured) throw new Error('Unavailable')
  const { errors } = await client.models.Report.create({ skillId, reporterCognitoId, reason, details })
  if (errors?.length) throw new Error(errors[0].message)
}
