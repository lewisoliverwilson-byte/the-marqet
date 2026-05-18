import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const schema = z.object({ email: z.string().email('Enter a valid email') })

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit({ email }) {
    try {
      await forgotPassword(email)
      // Pass email via query param so reset page can use it for confirmResetPassword
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err) {
      toast.error(err.message || 'Failed to send reset code.')
    }
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a 6-digit code">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Email" type="email" placeholder="you@example.com" required {...register('email')} error={errors.email?.message} />
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="w-full justify-center">
          {isSubmitting ? 'Sending…' : 'Send reset code'}
        </Button>
      </form>
      <p className="mt-4 text-center text-[14px] text-dark-mid">
        <Link to="/auth/login" className="text-accent hover:underline">Back to sign in</Link>
      </p>
    </AuthLayout>
  )
}
