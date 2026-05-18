import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const schema = z.object({
  password: z.string().min(8, 'Min. 8 characters'),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, { message: "Passwords don't match", path: ['confirm'] })

export default function ResetPasswordPage() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    try {
      await updatePassword(values.password)
      toast.success('Password updated.')
      navigate('/auth/login')
    } catch (err) {
      toast.error(err.message || 'Failed to update password.')
    }
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="New password" type="password" placeholder="Min. 8 characters" required {...register('password')} error={errors.password?.message} />
        <Input label="Confirm password" type="password" placeholder="Repeat your password" required {...register('confirm')} error={errors.confirm?.message} />
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="w-full justify-center">
          {isSubmitting ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </AuthLayout>
  )
}
