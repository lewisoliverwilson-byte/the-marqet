import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Wrench, DollarSign, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '../components/layout/PageLayout'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import { submitContactRequest } from '../lib/api'

const BUDGET_OPTIONS = [
  { value: '< £500', label: 'Under £500' },
  { value: '£500–£2,000', label: '£500 – £2,000' },
  { value: '£2,000–£5,000', label: '£2,000 – £5,000' },
  { value: '£5,000+', label: '£5,000+' },
  { value: 'Not sure', label: 'Not sure yet' },
]

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  description: z.string().min(20, 'Tell us a bit more — at least 20 characters'),
  budget_range: z.string().optional(),
})

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    try {
      await submitContactRequest({ ...values, request_type: 'custom_build' })
      setSubmitted(true)
    } catch (err) {
      toast.error(err.message || 'Failed to send — try again or email us directly.')
    }
  }

  if (submitted) return (
    <PageLayout>
      <div className="max-w-lg mx-auto text-center py-16">
        <CheckCircle size={48} className="text-accent mx-auto mb-4" />
        <h1 className="text-[28px] font-bold text-primary mb-3">We've got your brief</h1>
        <p className="text-[16px] text-dark-mid leading-relaxed">
          We'll review your requirements and get back to you with a quote within 2 business days.
        </p>
      </div>
    </PageLayout>
  )

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-4">Custom build service</p>
            <h1 className="text-[36px] font-bold text-primary leading-tight mb-4">
              Need something built?
            </h1>
            <p className="text-[17px] text-dark-mid leading-relaxed mb-8">
              Not finding what you need in the catalogue? The Construx Group team builds custom Claude skills, MCP servers, and AI workflows for companies. Tell us what you need.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: Wrench, title: 'Custom skills and prompts', desc: 'Skills tailored to your exact workflow, tone, and use case.' },
                { icon: Wrench, title: 'MCP server integrations', desc: 'Connect Claude to your specific apps and internal APIs.' },
                { icon: DollarSign, title: 'Transparent pricing', desc: 'We quote fixed prices before we start. No hourly surprises.' },
                { icon: Clock, title: '2-business-day response', desc: 'We review every brief and reply with a quote within 48 hours.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 border border-blue-100 flex-shrink-0 mt-0.5">
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-primary mb-0.5">{title}</p>
                    <p className="text-[13px] text-dark-mid">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-[18px] font-bold text-primary mb-5">Tell us about your project</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input label="Your name" placeholder="Jane Smith" required {...register('name')} error={errors.name?.message} />
              <Input label="Email" type="email" placeholder="jane@company.com" required {...register('email')} error={errors.email?.message} />
              <Input label="Company" placeholder="Acme Ltd (optional)" {...register('company')} error={errors.company?.message} />
              <Textarea
                label="What do you need built?"
                placeholder="Describe your use case, what Claude should do, any integrations needed, and your team size..."
                rows={5}
                required
                {...register('description')}
                error={errors.description?.message}
              />
              <Select label="Approximate budget" options={BUDGET_OPTIONS} placeholder="Select a range" {...register('budget_range')} error={errors.budget_range?.message} />
              <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="w-full justify-center mt-1">
                {isSubmitting ? 'Sending…' : 'Send brief →'}
              </Button>
              <p className="text-[12px] text-muted text-center">
                We respond to every brief. No obligation.
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
