import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import PageLayout from '../components/layout/PageLayout'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../lib/api'

const schema = z.object({
  display_name: z.string().min(2, 'At least 2 characters'),
  bio: z.string().max(300, 'Max 300 characters').optional(),
  website: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  github_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
})

export default function DashboardSettingsPage() {
  const { user, profile, refreshProfile } = useAuth()
  if (!user) return <Navigate to="/auth/login" />

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (profile) reset({ display_name: profile.display_name || '', bio: profile.bio || '', website: profile.website || '', github_url: profile.github_url || '' })
  }, [profile, reset])

  async function onSubmit(values) {
    try {
      await updateProfile(user.id, values)
      await refreshProfile()
      toast.success('Profile updated.')
    } catch (err) {
      toast.error(err.message || 'Failed to update profile.')
    }
  }

  return (
    <PageLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-[28px] font-bold text-primary mb-8">Account settings</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input label="Display name" required {...register('display_name')} error={errors.display_name?.message} />
          <Textarea label="Bio" placeholder="Tell people a bit about yourself..." rows={3} {...register('bio')} error={errors.bio?.message} />
          <Input label="Website" type="url" placeholder="https://yoursite.com" {...register('website')} error={errors.website?.message} />
          <Input label="GitHub URL" type="url" placeholder="https://github.com/username" {...register('github_url')} error={errors.github_url?.message} />
          <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="self-start">
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </Button>
        </form>
      </div>
    </PageLayout>
  )
}
