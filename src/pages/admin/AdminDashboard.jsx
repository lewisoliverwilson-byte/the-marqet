import { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Package, Users, Download, Clock, CheckCircle, XCircle, AlertTriangle, Flag } from 'lucide-react'
import PageLayout from '../../components/layout/PageLayout'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context/AuthContext'
import { getPendingSkills, getAdminStats, reviewSkill, getReports, getContactRequests } from '../../lib/api'
import toast from 'react-hot-toast'

function PendingSkillRow({ skill, onDecision }) {
  const [notes, setNotes] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [acting, setActing] = useState(false)

  async function decide(status) {
    setActing(true)
    try {
      await reviewSkill(skill.id, status, notes)
      toast.success(`Skill ${status}.`)
      onDecision(skill.id)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setActing(false)
    }
  }

  return (
    <div className="border border-border rounded-xl p-5 mb-3">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-bold text-primary">{skill.title}</h3>
            <Badge category={skill.category} />
          </div>
          <p className="text-[13px] text-dark-mid mb-2">{skill.short_description}</p>
          <div className="flex items-center gap-3 text-[12px] text-muted">
            <span>By {skill.profiles?.display_name || skill.profiles?.username}</span>
            <span>{skill.profiles?.is_verified ? '✓ Verified' : 'Standard'}</span>
            <span>£{Number(skill.price_gbp || 0).toFixed(2)}</span>
            <span>{new Date(skill.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <button onClick={() => setExpanded(v => !v)} className="text-[13px] text-accent hover:underline flex-shrink-0">
          {expanded ? 'Hide details' : 'Review →'}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
          {skill.long_description && (
            <div className="bg-surface rounded-lg p-3">
              <p className="text-[12px] font-semibold text-muted mb-1">Description</p>
              <p className="text-[13px] text-dark-mid whitespace-pre-wrap line-clamp-6">{skill.long_description}</p>
            </div>
          )}
          {skill.skill_content && (
            <div className="bg-surface rounded-lg p-3 max-h-48 overflow-y-auto">
              <p className="text-[12px] font-semibold text-muted mb-1">Skill content</p>
              <pre className="text-[12px] text-dark-mid whitespace-pre-wrap">{skill.skill_content}</pre>
            </div>
          )}
          {skill.repo_url && (
            <a href={skill.repo_url} target="_blank" rel="noopener noreferrer" className="text-[13px] text-accent hover:underline">
              View source repo →
            </a>
          )}
          <textarea
            placeholder="Admin notes (shown to developer on rejection or flagging)..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-[13px] focus:border-accent focus:outline-none resize-none"
          />
          <div className="flex gap-2">
            <Button variant="primary" size="sm" disabled={acting} onClick={() => decide('approved')} className="gap-1.5">
              <CheckCircle size={13} /> Approve
            </Button>
            <Button variant="outline" size="sm" disabled={acting} onClick={() => decide('flagged')} className="gap-1.5 text-amber-600 border-amber-300 hover:border-amber-400">
              <AlertTriangle size={13} /> Flag for changes
            </Button>
            <Button variant="outline" size="sm" disabled={acting} onClick={() => decide('rejected')} className="gap-1.5 text-rose-500 border-rose-300 hover:border-rose-400">
              <XCircle size={13} /> Reject
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [stats, setStats] = useState({})
  const [pending, setPending] = useState([])
  const [reports, setReports] = useState([])
  const [contacts, setContacts] = useState([])
  const [tab, setTab] = useState('queue')
  const [loading, setLoading] = useState(true)

  if (!authLoading && !user) return <Navigate to="/auth/login" />
  if (!authLoading && !isAdmin) return <Navigate to="/" />

  useEffect(() => {
    async function load() {
      const [s, p, r, c] = await Promise.all([getAdminStats(), getPendingSkills(), getReports(), getContactRequests()])
      setStats(s); setPending(p); setReports(r); setContacts(c)
      setLoading(false)
    }
    if (!authLoading && isAdmin) load()
  }, [authLoading, isAdmin])

  const TABS = [
    { id: 'queue', label: `Review queue (${pending.length})` },
    { id: 'reports', label: `Reports (${reports.length})` },
    { id: 'contacts', label: `Commissions (${contacts.length})` },
  ]

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-1">Admin</p>
          <h1 className="text-[28px] font-bold text-primary">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Live skills', value: stats.totalSkills ?? '—', icon: Package },
            { label: 'Pending review', value: stats.pendingReview ?? '—', icon: Clock },
            { label: 'Users', value: stats.totalUsers ?? '—', icon: Users },
            { label: 'Installs', value: stats.totalInstalls?.toLocaleString() ?? '—', icon: Download },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={15} className="text-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">{s.label}</span>
                </div>
                <p className="text-[24px] font-bold text-primary">{s.value}</p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-[14px] font-semibold transition-colors border-b-2 -mb-px ${tab === t.id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-primary'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? <div className="py-12 text-center text-dark-mid animate-pulse">Loading…</div> : (
          <>
            {tab === 'queue' && (
              pending.length === 0
                ? <p className="text-[15px] text-dark-mid py-8 text-center">No submissions pending review.</p>
                : pending.map(s => <PendingSkillRow key={s.id} skill={s} onDecision={id => setPending(prev => prev.filter(p => p.id !== id))} />)
            )}

            {tab === 'reports' && (
              reports.length === 0
                ? <p className="text-[15px] text-dark-mid py-8 text-center">No reports.</p>
                : (
                  <div className="flex flex-col gap-3">
                    {reports.map(r => (
                      <div key={r.id} className="border border-border rounded-xl p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <Link to={`/skills/${r.skills?.slug}`} className="text-[15px] font-bold text-primary hover:text-accent">{r.skills?.title}</Link>
                            <p className="text-[13px] text-muted">Reported by {r.reporter?.username} · {new Date(r.created_at).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${r.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-surface text-muted'}`}>{r.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flag size={13} className="text-rose-400" />
                          <span className="text-[14px] text-dark-mid">{r.reason}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
            )}

            {tab === 'contacts' && (
              contacts.length === 0
                ? <p className="text-[15px] text-dark-mid py-8 text-center">No commission requests.</p>
                : (
                  <div className="flex flex-col gap-3">
                    {contacts.map(c => (
                      <div key={c.id} className="border border-border rounded-xl p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-[15px] font-bold text-primary">{c.name} {c.company ? `— ${c.company}` : ''}</h3>
                            <a href={`mailto:${c.email}`} className="text-[13px] text-accent hover:underline">{c.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            {c.budget_range && <span className="text-[12px] bg-surface border border-border px-2 py-0.5 rounded-full text-dark-mid">{c.budget_range}</span>}
                            <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${c.status === 'new' ? 'bg-blue-50 text-accent' : 'bg-surface text-muted'}`}>{c.status}</span>
                          </div>
                        </div>
                        <p className="text-[14px] text-dark-mid leading-relaxed">{c.description}</p>
                        <p className="text-[12px] text-muted mt-2">{new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )
            )}
          </>
        )}
      </div>
    </PageLayout>
  )
}
