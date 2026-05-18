import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, ShieldCheck } from 'lucide-react'

function GithubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
import PageLayout from '../components/layout/PageLayout'
import Badge from '../components/ui/Badge'
import StarRating from '../components/ui/StarRating'
import { getProfileByUsername } from '../lib/api'

function SkillCard({ skill }) {
  const price = skill.price_gbp === 0 ? 'Free' : `£${Number(skill.price_gbp).toFixed(2)}`
  return (
    <Link to={`/skills/${skill.slug}`} className="group block rounded-2xl border border-border p-5 hover:border-accent hover:shadow-sm transition-all duration-150">
      <div className="mb-2"><Badge category={skill.category} /></div>
      <h3 className="text-[15px] font-bold text-primary group-hover:text-accent transition-colors mb-1">{skill.title}</h3>
      <p className="text-[13px] text-dark-mid line-clamp-2 mb-3">{skill.short_description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-bold text-primary">{price}</span>
        {skill.avg_rating ? (
          <div className="flex items-center gap-1"><StarRating value={Math.round(skill.avg_rating)} size={11} readOnly /><span className="text-[12px] text-muted">{skill.avg_rating.toFixed(1)}</span></div>
        ) : null}
      </div>
    </Link>
  )
}

export default function ProfilePage() {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfileByUsername(username).then(p => { setProfile(p); setLoading(false) })
  }, [username])

  if (loading) return (
    <PageLayout>
      <div className="animate-pulse max-w-4xl mx-auto">
        <div className="flex items-center gap-5 mb-8">
          <div className="h-16 w-16 rounded-full bg-surface" />
          <div className="space-y-2"><div className="h-6 w-40 bg-surface rounded" /><div className="h-4 w-24 bg-surface rounded" /></div>
        </div>
      </div>
    </PageLayout>
  )

  if (!profile) return (
    <PageLayout>
      <div className="text-center py-24">
        <h1 className="text-[24px] font-bold text-primary mb-2">Profile not found</h1>
        <Link to="/browse" className="text-accent hover:underline">Back to browse</Link>
      </div>
    </PageLayout>
  )

  const initials = (profile.display_name || profile.username || '?').charAt(0).toUpperCase()
  const totalInstalls = (profile.skills || []).reduce((a, s) => a + (s.install_count || 0), 0)

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10 pb-10 border-b border-border">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white text-[28px] font-bold flex-shrink-0">
            {profile.avatar_url
              ? <img src={profile.avatar_url} alt="" className="h-20 w-20 rounded-full object-cover" />
              : initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-[24px] font-bold text-primary">{profile.display_name || profile.username}</h1>
              {profile.is_verified && (
                <span className="flex items-center gap-1 text-[12px] font-semibold text-accent bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={12} /> Verified
                </span>
              )}
            </div>
            <p className="text-[15px] text-muted mb-3">@{profile.username}</p>
            {profile.bio && <p className="text-[15px] text-dark-mid leading-relaxed mb-4 max-w-xl">{profile.bio}</p>}
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-muted">
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent">
                  <ExternalLink size={13} /> {profile.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent">
                  <GithubIcon size={13} /> GitHub
                </a>
              )}
              <span>{(profile.skills || []).length} add-ons</span>
              <span>{totalInstalls.toLocaleString()} installs</span>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div>
          <h2 className="text-[20px] font-bold text-primary mb-5">Add-ons by {profile.display_name || profile.username}</h2>
          {(profile.skills || []).length === 0 ? (
            <p className="text-[15px] text-dark-mid">No published add-ons yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {profile.skills.map(s => <SkillCard key={s.id} skill={s} />)}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
