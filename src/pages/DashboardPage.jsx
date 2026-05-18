import { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Plus, Package, Star, Download, Edit, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import StarRating from '../components/ui/StarRating'
import { useAuth } from '../context/AuthContext'
import { getMySkills } from '../lib/api'

const STATUS_CONFIG = {
  pending: { label: 'Under review', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
  approved: { label: 'Live', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  flagged: { label: 'Flagged', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
}

function SkillRow({ skill }) {
  const s = STATUS_CONFIG[skill.status] || STATUS_CONFIG.pending
  const StatusIcon = s.icon
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[15px] font-semibold text-primary truncate">{skill.title}</h3>
          <Badge category={skill.category} />
        </div>
        <p className="text-[13px] text-dark-mid truncate">{skill.short_description}</p>
      </div>
      <div className="flex items-center gap-6 text-[13px] text-muted flex-shrink-0">
        <div className="flex items-center gap-1">
          <Download size={13} />
          <span>{skill.install_count ?? 0}</span>
        </div>
        {skill.avg_rating ? (
          <div className="flex items-center gap-1">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span>{skill.avg_rating.toFixed(1)}</span>
          </div>
        ) : <span>No ratings</span>}
      </div>
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold ${s.bg} ${s.color}`}>
        <StatusIcon size={12} />
        {s.label}
      </div>
      {skill.status === 'approved' && (
        <Link to={`/skills/${skill.slug}`} className="text-[13px] text-accent hover:underline flex-shrink-0">View →</Link>
      )}
      {skill.admin_notes && (
        <div className="w-full bg-amber-50 border border-amber-100 rounded-lg p-3 text-[13px] text-amber-700">
          <strong>Reviewer note:</strong> {skill.admin_notes}
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  if (!user) return <Navigate to="/auth/login" state={{ from: '/dashboard' }} />

  useEffect(() => {
    getMySkills(user.userId).then(s => { setSkills(s); setLoading(false) })
  }, [user.userId])

  const stats = {
    total: skills.length,
    live: skills.filter(s => s.status === 'approved').length,
    installs: skills.reduce((a, s) => a + (s.install_count || 0), 0),
    avgRating: skills.filter(s => s.avg_rating).length
      ? (skills.filter(s => s.avg_rating).reduce((a, s) => a + s.avg_rating, 0) / skills.filter(s => s.avg_rating).length).toFixed(1)
      : null,
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-primary">Dashboard</h1>
            <p className="text-[15px] text-muted mt-0.5">Welcome back, {profile?.display_name || profile?.username || user.email}</p>
          </div>
          <Button variant="primary" size="md" href="/submit" className="gap-2 self-start sm:self-auto">
            <Plus size={16} /> Submit add-on
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Add-ons', value: stats.total, icon: Package },
            { label: 'Live', value: stats.live, icon: CheckCircle },
            { label: 'Total installs', value: stats.installs.toLocaleString(), icon: Download },
            { label: 'Avg. rating', value: stats.avgRating ? `${stats.avgRating} ★` : '—', icon: Star },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={15} className="text-accent" />
                  <span className="text-[12px] font-semibold uppercase tracking-widest text-muted">{s.label}</span>
                </div>
                <p className="text-[24px] font-bold text-primary">{s.value}</p>
              </div>
            )
          })}
        </div>

        {/* Skills list */}
        <div className="rounded-2xl border border-border">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-[16px] font-bold text-primary">My add-ons</h2>
          </div>
          <div className="px-6">
            {loading ? (
              <div className="py-8 text-center text-dark-mid animate-pulse">Loading…</div>
            ) : skills.length === 0 ? (
              <div className="py-12 text-center">
                <Package size={40} className="text-border mx-auto mb-3" />
                <p className="text-[16px] font-bold text-primary mb-2">No add-ons yet</p>
                <p className="text-[14px] text-dark-mid mb-5">Submit your first add-on to get started.</p>
                <Button variant="primary" size="sm" href="/submit" className="gap-2">
                  <Plus size={14} /> Submit add-on
                </Button>
              </div>
            ) : (
              <div className="flex flex-col">
                {skills.map(s => <SkillRow key={s.id} skill={s} />)}
              </div>
            )}
          </div>
        </div>

        {/* Profile link */}
        {profile?.username && (
          <div className="mt-6 flex items-center gap-3">
            <Link to={`/profile/${profile.username}`} className="text-[14px] text-accent hover:underline">View public profile →</Link>
            <span className="text-border">·</span>
            <Link to="/dashboard/settings" className="text-[14px] text-muted hover:text-primary">Account settings</Link>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
