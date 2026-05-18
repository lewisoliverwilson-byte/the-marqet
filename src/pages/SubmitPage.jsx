import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '../components/layout/PageLayout'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { submitSkill, uploadSkillFile } from '../lib/api'

const CATEGORY_OPTIONS = [
  { value: 'claude_skill', label: 'Claude Skill' },
  { value: 'mcp_server', label: 'MCP Server' },
  { value: 'prompt_pack', label: 'Prompt Pack' },
  { value: 'workflow', label: 'Workflow' },
  { value: 'template', label: 'Template' },
  { value: 'bundle', label: 'Bundle' },
]

const LICENSE_OPTIONS = [
  { value: 'MIT', label: 'MIT' },
  { value: 'Apache-2.0', label: 'Apache 2.0' },
  { value: 'GPL-3.0', label: 'GPL 3.0' },
  { value: 'CC BY 4.0', label: 'Creative Commons BY 4.0' },
  { value: 'Proprietary', label: 'Proprietary' },
]

const COMPAT_OPTIONS = ['claude', 'cursor', 'codex_cli', 'gemini_cli']

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(80),
  short_description: z.string().min(10, 'Short description must be at least 10 characters').max(160),
  long_description: z.string().optional(),
  category: z.string().min(1, 'Select a category'),
  tags: z.string().optional(),
  price_gbp: z.coerce.number().min(0).max(999),
  repo_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  version: z.string().min(1, 'Enter a version'),
  license: z.string().min(1, 'Select a license'),
  skill_content: z.string().optional(),
  owns_content: z.literal(true, { errorMap: () => ({ message: 'You must confirm you own this content' }) }),
  not_anthropic_ip: z.literal(true, { errorMap: () => ({ message: 'You must confirm this is not Anthropic IP' }) }),
})

export default function SubmitPage() {
  const { user } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const [file, setFile] = useState(null)
  const [compatibility, setCompatibility] = useState(['claude'])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { version: '1.0.0', price_gbp: 0, license: 'MIT' },
  })

  if (!user) return <Navigate to="/auth/login" state={{ from: '/submit' }} />

  async function onSubmit(values) {
    try {
      const tags = values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      const skill = await submitSkill({
        title: values.title,
        short_description: values.short_description,
        long_description: values.long_description,
        category: values.category,
        tags,
        price_gbp: values.price_gbp,
        repo_url: values.repo_url || null,
        version: values.version,
        license: values.license,
        skill_content: values.skill_content || null,
        compatibility,
        author_id: user.id,
      })
      if (file && skill) {
        await uploadSkillFile(file, skill.id)
      }
      setSubmitted(true)
    } catch (err) {
      toast.error(err.message || 'Submission failed — please try again.')
    }
  }

  if (submitted) return (
    <PageLayout>
      <div className="max-w-lg mx-auto text-center py-16">
        <CheckCircle size={48} className="text-accent mx-auto mb-4" />
        <h1 className="text-[28px] font-bold text-primary mb-3">Submitted for review</h1>
        <p className="text-[16px] text-dark-mid leading-relaxed mb-6">
          We'll review your add-on within 48 hours and email you with the outcome. You can track the status in your dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="md" href="/dashboard">Go to dashboard</Button>
          <Button variant="outline" size="md" onClick={() => setSubmitted(false)}>Submit another</Button>
        </div>
      </div>
    </PageLayout>
  )

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-primary mb-2">Submit an add-on</h1>
          <p className="text-[16px] text-dark-mid">Every submission is reviewed by our team within 48 hours. We check for quality, safety, and originality.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Basic info */}
          <div className="rounded-2xl border border-border p-6 flex flex-col gap-4">
            <h2 className="text-[16px] font-bold text-primary">Basic information</h2>
            <Input label="Title" placeholder="Deep Research Skill Pack" required {...register('title')} error={errors.title?.message} />
            <Input
              label="Short description"
              placeholder="One sentence — what does this add-on do? (max 160 chars)"
              required
              {...register('short_description')}
              error={errors.short_description?.message}
            />
            <Textarea
              label="Full description (Markdown supported)"
              placeholder="Describe what your add-on does, how to use it, and any requirements..."
              rows={6}
              {...register('long_description')}
              error={errors.long_description?.message}
            />
          </div>

          {/* Classification */}
          <div className="rounded-2xl border border-border p-6 flex flex-col gap-4">
            <h2 className="text-[16px] font-bold text-primary">Classification</h2>
            <Select label="Category" options={CATEGORY_OPTIONS} placeholder="Select a category" required {...register('category')} error={errors.category?.message} />
            <Input label="Tags" placeholder="comma, separated, tags" {...register('tags')} error={errors.tags?.message} />
            <div>
              <p className="text-[13px] font-semibold text-primary mb-2">Compatible with</p>
              <div className="flex flex-wrap gap-3">
                {COMPAT_OPTIONS.map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={compatibility.includes(c)}
                      onChange={e => setCompatibility(prev => e.target.checked ? [...prev, c] : prev.filter(x => x !== c))}
                      className="accent-accent"
                    />
                    <span className="text-[14px] text-dark-mid capitalize">{c.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="rounded-2xl border border-border p-6 flex flex-col gap-4">
            <h2 className="text-[16px] font-bold text-primary">Files and content</h2>
            <div>
              <p className="text-[13px] font-semibold text-primary mb-1.5">Upload zip file <span className="text-muted font-normal">(optional)</span></p>
              <input
                type="file"
                accept=".zip,.md,.txt"
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="text-[14px] text-dark-mid file:mr-3 file:rounded-lg file:border file:border-border file:bg-white file:px-3 file:py-1.5 file:text-[13px] file:font-semibold file:text-primary hover:file:border-accent cursor-pointer"
              />
            </div>
            <Textarea
              label="Skill content for copy-to-clipboard"
              placeholder="Paste your SKILL.md or prompt content here..."
              rows={8}
              {...register('skill_content')}
              error={errors.skill_content?.message}
            />
          </div>

          {/* Pricing and meta */}
          <div className="rounded-2xl border border-border p-6 flex flex-col gap-4">
            <h2 className="text-[16px] font-bold text-primary">Pricing and metadata</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Price (GBP)" type="number" min="0" step="0.01" placeholder="0 for free" {...register('price_gbp')} error={errors.price_gbp?.message} />
              <Input label="Version" placeholder="1.0.0" required {...register('version')} error={errors.version?.message} />
            </div>
            <Select label="License" options={LICENSE_OPTIONS} required {...register('license')} error={errors.license?.message} />
            <Input label="Source repository URL" placeholder="https://github.com/..." {...register('repo_url')} error={errors.repo_url?.message} />
          </div>

          {/* Confirmations */}
          <div className="rounded-2xl border border-border p-6 flex flex-col gap-3">
            <h2 className="text-[16px] font-bold text-primary mb-1">Confirmations</h2>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" {...register('owns_content')} className="accent-accent mt-0.5" />
              <span className="text-[14px] text-dark-mid">I own this content or have the rights to publish it, and it doesn't infringe any third-party intellectual property.</span>
            </label>
            {errors.owns_content && <p className="text-[13px] text-rose-500">{errors.owns_content.message}</p>}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" {...register('not_anthropic_ip')} className="accent-accent mt-0.5" />
              <span className="text-[14px] text-dark-mid">This submission does not contain content lifted from Anthropic's source-available skill documents (docx, pdf, pptx, xlsx files from the anthropics/skills repository).</span>
            </label>
            {errors.not_anthropic_ip && <p className="text-[13px] text-rose-500">{errors.not_anthropic_ip.message}</p>}
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="min-w-[160px] justify-center">
              {isSubmitting ? 'Submitting…' : 'Submit for review'}
            </Button>
            <Link to="/dashboard" className="text-[14px] text-muted hover:text-primary">Cancel</Link>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
