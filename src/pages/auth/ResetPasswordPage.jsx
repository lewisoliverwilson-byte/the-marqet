import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const schema = z.object({
  code: z.string().min(6, 'Enter the 6-digit code from your email'),
  password: z.string().min(8, 'Min. 8 characters'),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, { message: "Passwords don't match", path: ['confirm'] })

export default function ResetPasswordPage() {
  const { confirmPasswordReset } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const email = params.get('email') || ''

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit({ code, password }) {
    try {
      await confirmPasswordReset(email, code, password)
      toast.success('Password updated. Sign in with your new password.')
      navigate('/auth/login')
    } catch (err) {
      toast.error(err.message || 'Failed to update password.')
    }
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Enter the code we sent to your email">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Verification code" placeholder="123456" required {...register('code')} error={errors.code?.message} />
        <Input label="New password" type="password" placeholder="Min. 8 characters" required {...register('password')} error={errors.password?.message} />
        <Input label="Confirm password" type="password" placeholder="Repeat your password" required {...register('confirm')} error={errors.confirm?.message} />
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="w-full justify-center">
          {isSubmitting ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </AuthLayout>
  )
}
