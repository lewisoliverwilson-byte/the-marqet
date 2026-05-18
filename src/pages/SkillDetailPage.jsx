import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Download, Copy, Star, CheckCircle, ExternalLink, Flag, ShieldCheck } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import PageLayout from '../components/layout/PageLayout'
import Badge from '../components/ui/Badge'
import StarRating from '../components/ui/StarRating'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Textarea from '../components/ui/Textarea'
import { getSkillBySlug, incrementInstall, hasInstalled, submitReview, submitReport } from '../lib/api'
import { useAuth } from '../context/AuthContext'

function ReviewCard({ review }) {
  const u = review.reviewer
  const initials = (u?.display_name || u?.username || '?').charAt(0).toUpperCase()
  return (
    <div className="border border-border rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-[12px] font-bold flex-shrink-0">
          {u?.avatar_url ? <img src={u.avatar_url} alt="" className="h-8 w-8 rounded-full object-cover" /> : initials}
        </div>
        <div>
          <p className="text-[14px] font-semibold text-primary">{u?.display_name || u?.username || 'Anonymous'}</p>
          <StarRating value={review.rating} size={12} readOnly />
        </div>
        <span className="ml-auto text-[12px] text-muted">{new Date(review.created_at).toLocaleDateString()}</span>
      </div>
      {review.body && <p className="text-[14px] text-dark-mid leading-relaxed">{review.body}</p>}
      {review.developer_response && (
        <div className="mt-3 p-3 bg-surface rounded-lg border-l-2 border-accent">
          <p className="text-[12px] font-semibold text-accent mb-1">Developer response</p>
          <p className="text-[13px] text-dark-mid">{review.developer_response}</p>
        </div>
      )}
    </div>
  )
}

export default function SkillDetailPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [installed, setInstalled] = useState(false)
  const [reviewModal, setReviewModal] = useState(false)
  const [reportModal, setReportModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewBody, setReviewBody] = useState('')
  const [reportReason, setReportReason] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function load() {
      const s = await getSkillBySlug(slug)
      setSkill(s)
      setLoading(false)
      if (user && s) {
        const inst = await hasInstalled(s.id, user.id)
        setInstalled(inst)
      }
    }
    load()
  }, [slug, user])

  async function handleInstall(method) {
    if (!skill) return
    if (method === 'copy') {
      await navigator.clipboard.writeText(skill.skill_content || '')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Copied to clipboard!')
    } else {
      window.open(skill.file_path, '_blank')
    }
    await incrementInstall(skill.id, user?.id, skill.version)
    setInstalled(true)
    setSkill(s => ({ ...s, install_count: (s.install_count || 0) + 1 }))
  }

  async function handleReview() {
    if (!user) { toast.error('Sign in to leave a review.'); return }
    if (!installed) { toast.error('Install this add-on first to leave a review.'); return }
    if (!rating) { toast.error('Select a star rating.'); return }
    try {
      await submitReview(skill.id, user.id, rating, reviewBody)
      toast.success('Review submitted!')
      setReviewModal(false)
      const s = await getSkillBySlug(slug)
      setSkill(s)
    } catch (err) {
      toast.error(err.message || 'Failed to submit review.')
    }
  }

  async function handleReport() {
    if (!user) { toast.error('Sign in to report.'); return }
    if (!reportReason) { toast.error('Select a reason.'); return }
    try {
      await submitReport(skill.id, user.id, reportReason, '')
      toast.success('Report submitted. We\'ll review it within 24 hours.')
      setReportModal(false)
    } catch (err) {
      toast.error(err.message || 'Failed to submit report.')
    }
  }

  if (loading) return (
    <PageLayout>
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/2 bg-surface rounded" />
        <div className="h-4 w-3/4 bg-surface rounded" />
        <div className="h-4 w-2/3 bg-surface rounded" />
      </div>
    </PageLayout>
  )

  if (!skill) return (
    <PageLayout>
      <div className="text-center py-24">
        <h1 className="text-[24px] font-bold text-primary mb-2">Add-on not found</h1>
        <Link to="/browse" className="text-accent hover:underline">Back to browse</Link>
      </div>
    </PageLayout>
  )

  const author = skill.profiles
  const price = skill.price_gbp === 0 ? 'Free' : `£${Number(skill.price_gbp).toFixed(2)}`
  const compatibility = skill.compatibility || ['claude']

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-muted mb-6">
          <Link to="/browse" className="hover:text-primary">Browse</Link>
          <span>/</span>
          <span className="text-primary">{skill.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          {/* Left */}
          <div>
            <div className="mb-4"><Badge category={skill.category} /></div>
            <h1 className="text-[32px] md:text-[40px] font-bold text-primary leading-tight tracking-tight mb-3">{skill.title}</h1>
            <p className="text-[18px] text-dark-mid leading-relaxed mb-6">{skill.short_description}</p>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white text-[13px] font-bold flex-shrink-0">
                {author?.avatar_url
                  ? <img src={author.avatar_url} alt="" className="h-9 w-9 rounded-full object-cover" />
                  : (author?.display_name || author?.username || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Link to={`/profile/${author?.username}`} className="text-[14px] font-semibold text-primary hover:text-accent">
                    {author?.display_name || author?.username}
                  </Link>
                  {author?.is_verified && <ShieldCheck size={14} className="text-accent" />}
                </div>
                <p className="text-[12px] text-muted">Version {skill.version} · Updated {new Date(skill.updated_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Description */}
            {skill.long_description && (
              <div className="prose prose-sm max-w-none mb-8 text-dark-mid">
                <ReactMarkdown>{skill.long_description}</ReactMarkdown>
              </div>
            )}

            {/* Install instructions */}
            <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
              <h2 className="text-[16px] font-bold text-primary mb-4">How to install</h2>
              <ol className="list-decimal list-inside space-y-2 text-[14px] text-dark-mid">
                <li>Download the zip or copy the skill content below.</li>
                <li>Place the file(s) in your <code className="bg-white px-1.5 py-0.5 rounded text-[13px] border border-border">.claude/skills/</code> directory (or project-local equivalent).</li>
                <li>Claude will load the skill automatically when relevant.</li>
              </ol>
            </div>

            {/* Tags */}
            {skill.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {skill.tags.map(tag => (
                  <Link key={tag} to={`/browse?q=${tag}`} className="rounded-full border border-border px-3 py-1 text-[13px] text-dark-mid hover:border-accent hover:text-accent transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[20px] font-bold text-primary">Reviews</h2>
                <Button variant="outline" size="sm" onClick={() => setReviewModal(true)}>Leave a review</Button>
              </div>
              {skill.reviews?.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {skill.reviews.map(r => <ReviewCard key={r.id} review={r} />)}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-border rounded-xl">
                  <p className="text-[15px] text-dark-mid">No reviews yet. Be the first.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <aside>
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="rounded-2xl border border-border p-5">
                <div className="text-[28px] font-bold text-primary mb-1">{price}</div>
                {skill.avg_rating && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <StarRating value={Math.round(skill.avg_rating)} size={14} readOnly />
                    <span className="text-[13px] text-muted">{skill.avg_rating.toFixed(1)} ({skill.review_count} reviews)</span>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {skill.skill_content && (
                    <Button variant="primary" size="md" onClick={() => handleInstall('copy')} className="w-full justify-center gap-2">
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy to clipboard'}
                    </Button>
                  )}
                  {skill.file_path && (
                    <Button variant="outline" size="md" onClick={() => handleInstall('download')} className="w-full justify-center gap-2">
                      <Download size={16} /> Download zip
                    </Button>
                  )}
                </div>
                {installed && (
                  <div className="mt-3 flex items-center gap-1.5 text-[13px] text-accent">
                    <CheckCircle size={13} /> You've installed this
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="rounded-2xl border border-border p-5 text-[13px] space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted">Installs</span>
                  <span className="font-semibold text-primary">{skill.install_count?.toLocaleString() ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Version</span>
                  <span className="font-semibold text-primary">{skill.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">License</span>
                  <span className="font-semibold text-primary">{skill.license}</span>
                </div>
                <div>
                  <span className="text-muted block mb-1.5">Compatible with</span>
                  <div className="flex flex-wrap gap-1">
                    {compatibility.map(c => (
                      <span key={c} className="rounded-full bg-blue-50 text-accent border border-blue-100 px-2 py-0.5 text-[11px] font-semibold capitalize">{c.replace('_', ' ')}</span>
                    ))}
                  </div>
                </div>
                {skill.repo_url && (
                  <a href={skill.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent hover:underline">
                    <ExternalLink size={12} /> View source
                  </a>
                )}
              </div>

              <button onClick={() => setReportModal(true)} className="flex items-center gap-1.5 text-[13px] text-muted hover:text-rose-500 transition-colors">
                <Flag size={13} /> Report this add-on
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Review modal */}
      <Modal open={reviewModal} onClose={() => setReviewModal(false)} title="Leave a review">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[13px] font-semibold text-primary mb-2">Your rating</p>
            <StarRating value={rating} onChange={setRating} size={24} />
          </div>
          <Textarea label="Review (optional)" placeholder="What did you think?" value={reviewBody} onChange={e => setReviewBody(e.target.value)} rows={3} />
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setReviewModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleReview}>Submit review</Button>
          </div>
        </div>
      </Modal>

      {/* Report modal */}
      <Modal open={reportModal} onClose={() => setReportModal(false)} title="Report this add-on">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[13px] font-semibold text-primary mb-2">Reason</p>
            <div className="flex flex-col gap-2">
              {['Malicious or unsafe', 'Misleading description', 'Copyright violation', 'Spam or duplicate', 'Other'].map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="reason" value={r} checked={reportReason === r} onChange={() => setReportReason(r)} className="accent-accent" />
                  <span className="text-[14px] text-dark-mid">{r}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setReportModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleReport}>Submit report</Button>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
