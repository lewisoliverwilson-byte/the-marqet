import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const schema = z.object({ email: z.string().email('Enter a valid email') })

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    try {
      await resetPassword(values.email)
      setSent(true)
    } catch (err) {
      toast.error(err.message || 'Failed to send reset email.')
    }
  }

  if (sent) {
    return (
      <AuthLayout title="Email sent" subtitle="">
        <div className="flex flex-col items-center text-center gap-4">
          <CheckCircle size={40} className="text-accent" />
          <p className="text-[15px] text-dark-mid leading-relaxed">
            If that email has an account, you'll receive a reset link shortly. Check your spam if it doesn't arrive.
          </p>
          <Link to="/auth/login" className="text-[14px] text-accent font-semibold hover:underline">Back to sign in</Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a reset link">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Email" type="email" placeholder="you@example.com" required {...register('email')} error={errors.email?.message} />
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="w-full justify-center">
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
      <p className="mt-4 text-center text-[14px] text-dark-mid">
        <Link to="/auth/login" className="text-accent hover:underline">Back to sign in</Link>
      </p>
    </AuthLayout>
  )
}
