import { supabase } from './supabase'

// ─── Skills ──────────────────────────────────────────────────────────────────

export async function getSkills({ category, search, sort = 'newest', free, minRating, page = 1, limit = 24 } = {}) {
  if (!supabase) return { data: [], count: 0 }
  let q = supabase
    .from('skills')
    .select(`
      *,
      profiles:author_id (username, display_name, avatar_url, is_verified),
      reviews (rating)
    `, { count: 'exact' })
    .eq('status', 'approved')

  if (category) q = q.eq('category', category)
  if (free) q = q.eq('price_gbp', 0)
  if (search) q = q.or(`title.ilike.%${search}%,short_description.ilike.%${search}%,tags.cs.{${search}}`)

  const from = (page - 1) * limit
  q = q.range(from, from + limit - 1)

  if (sort === 'newest') q = q.order('created_at', { ascending: false })
  else if (sort === 'popular') q = q.order('install_count', { ascending: false })
  else if (sort === 'rated') q = q.order('created_at', { ascending: false })

  const { data, error, count } = await q
  if (error) throw error

  const skills = (data || []).map(s => ({
    ...s,
    avg_rating: s.reviews?.length ? s.reviews.reduce((a, r) => a + r.rating, 0) / s.reviews.length : null,
    review_count: s.reviews?.length ?? 0,
  }))

  if (minRating) return { data: skills.filter(s => s.avg_rating >= minRating), count }
  return { data: skills, count }
}

export async function getSkillBySlug(slug) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      profiles:author_id (id, username, display_name, avatar_url, is_verified, bio, github_url, website),
      reviews (
        id, created_at, rating, body, developer_response,
        reviewer:reviewer_id (username, display_name, avatar_url)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'approved')
    .single()
  if (error) return null
  const avg_rating = data.reviews?.length ? data.reviews.reduce((a, r) => a + r.rating, 0) / data.reviews.length : null
  return { ...data, avg_rating, review_count: data.reviews?.length ?? 0 }
}

export async function getFeaturedSkills() {
  if (!supabase) return []
  const { data } = await supabase
    .from('skills')
    .select(`*, profiles:author_id (username, display_name, avatar_url, is_verified), reviews (rating)`)
    .eq('status', 'approved')
    .eq('featured', true)
    .limit(6)
  return (data || []).map(s => ({
    ...s,
    avg_rating: s.reviews?.length ? s.reviews.reduce((a, r) => a + r.rating, 0) / s.reviews.length : null,
    review_count: s.reviews?.length ?? 0,
  }))
}

export async function incrementInstall(skillId, userId, version) {
  if (!supabase) return
  await supabase.rpc('increment_install', { skill_id: skillId })
  if (userId) {
    await supabase.from('installs').upsert({ skill_id: skillId, user_id: userId, version_installed: version })
  }
}

export async function hasInstalled(skillId, userId) {
  if (!supabase || !userId) return false
  const { data } = await supabase.from('installs').select('id').eq('skill_id', skillId).eq('user_id', userId).maybeSingle()
  return !!data
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function submitReview(skillId, reviewerId, rating, body) {
  if (!supabase) throw new Error('Unavailable')
  const { error } = await supabase.from('reviews').upsert({ skill_id: skillId, reviewer_id: reviewerId, rating, body })
  if (error) throw error
}

export async function submitDeveloperResponse(reviewId, response) {
  if (!supabase) throw new Error('Unavailable')
  const { error } = await supabase.from('reviews').update({ developer_response: response }).eq('id', reviewId)
  if (error) throw error
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export async function submitSkill(payload) {
  if (!supabase) throw new Error('Unavailable')
  const slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const { data, error } = await supabase.from('skills').insert({ ...payload, slug, status: 'pending' }).select().single()
  if (error) throw error
  return data
}

export async function uploadSkillFile(file, skillId) {
  if (!supabase) throw new Error('Unavailable')
  const ext = file.name.split('.').pop()
  const path = `skills/${skillId}/skill.${ext}`
  const { error } = await supabase.storage.from('skill-files').upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from('skill-files').getPublicUrl(path)
  await supabase.from('skills').update({ file_path: data.publicUrl }).eq('id', skillId)
  return data.publicUrl
}

export async function getMySkills(userId) {
  if (!supabase) return []
  const { data } = await supabase
    .from('skills')
    .select(`*, reviews (rating)`)
    .eq('author_id', userId)
    .order('created_at', { ascending: false })
  return (data || []).map(s => ({
    ...s,
    avg_rating: s.reviews?.length ? s.reviews.reduce((a, r) => a + r.rating, 0) / s.reviews.length : null,
    review_count: s.reviews?.length ?? 0,
  }))
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export async function getPendingSkills() {
  if (!supabase) return []
  const { data } = await supabase
    .from('skills')
    .select(`*, profiles:author_id (username, display_name, is_verified)`)
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
  return data || []
}

export async function reviewSkill(skillId, status, adminNotes) {
  if (!supabase) throw new Error('Unavailable')
  const { error } = await supabase.from('skills').update({ status, admin_notes: adminNotes }).eq('id', skillId)
  if (error) throw error
}

export async function getAdminStats() {
  if (!supabase) return {}
  const [skills, pending, users, installs] = await Promise.all([
    supabase.from('skills').select('id', { count: 'exact' }).eq('status', 'approved'),
    supabase.from('skills').select('id', { count: 'exact' }).eq('status', 'pending'),
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('installs').select('id', { count: 'exact' }),
  ])
  return {
    totalSkills: skills.count ?? 0,
    pendingReview: pending.count ?? 0,
    totalUsers: users.count ?? 0,
    totalInstalls: installs.count ?? 0,
  }
}

export async function getReports() {
  if (!supabase) return []
  const { data } = await supabase
    .from('reports')
    .select(`*, skills (title, slug), reporter:reporter_id (username)`)
    .order('created_at', { ascending: false })
  return data || []
}

// ─── Profiles ────────────────────────────────────────────────────────────────

export async function getProfile(userId) {
  if (!supabase) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  return data
}

export async function getProfileByUsername(username) {
  if (!supabase) return null
  const { data } = await supabase
    .from('profiles')
    .select(`*, skills:skills!author_id (
      id, title, slug, short_description, category, price_gbp, install_count, status, featured,
      reviews (rating)
    )`)
    .eq('username', username)
    .maybeSingle()
  if (!data) return null
  const skills = (data.skills || [])
    .filter(s => s.status === 'approved')
    .map(s => ({
      ...s,
      avg_rating: s.reviews?.length ? s.reviews.reduce((a, r) => a + r.rating, 0) / s.reviews.length : null,
      review_count: s.reviews?.length ?? 0,
    }))
  return { ...data, skills }
}

export async function updateProfile(userId, updates) {
  if (!supabase) throw new Error('Unavailable')
  const { error } = await supabase.from('profiles').update(updates).eq('id', userId)
  if (error) throw error
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export async function submitContactRequest(payload) {
  if (!supabase) throw new Error('Unavailable')
  const { error } = await supabase.from('contact_requests').insert(payload)
  if (error) throw error
}

export async function getContactRequests() {
  if (!supabase) return []
  const { data } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false })
  return data || []
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function submitReport(skillId, reporterId, reason, details) {
  if (!supabase) throw new Error('Unavailable')
  const { error } = await supabase.from('reports').insert({ skill_id: skillId, reporter_id: reporterId, reason, details })
  if (error) throw error
}
