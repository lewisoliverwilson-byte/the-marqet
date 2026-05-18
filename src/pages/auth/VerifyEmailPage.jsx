import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import AuthLayout from '../../components/layout/AuthLayout'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../context/AuthContext'

export default function VerifyEmailPage() {
  const { confirmEmail, signIn, ensureProfile } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [code, setCode] = useState('')
  const [verifying, setVerifying] = useState(false)

  // email + password are passed as query params from SignUpPage so we can auto sign-in after verify
  const email = params.get('email') || ''
  const password = params.get('password') || ''

  async function handleVerify(e) {
    e.preventDefault()
    if (!email || !code) return
    setVerifying(true)
    try {
      await confirmEmail(email, code.trim())
      // Auto sign-in after confirmation
      if (password) {
        await signIn(email, password)
      }
      toast.success('Email verified! Welcome to The Marqet.')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Invalid code — try again.')
    } finally {
      setVerifying(false)
    }
  }

  if (!email) {
    return (
      <AuthLayout title="Check your inbox" subtitle="">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 border border-blue-100">
            <Mail size={24} className="text-accent" />
          </div>
          <p className="text-[15px] text-dark-mid leading-relaxed">
            We've sent a 6-digit code to your email. Enter it below to confirm your account.
          </p>
          <Link to="/auth/signup" className="text-[14px] text-accent hover:underline">Back to sign up</Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Verify your email" subtitle={`We sent a 6-digit code to ${email}`}>
      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <Input
          label="Verification code"
          placeholder="123456"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" size="md" disabled={verifying || !code} className="w-full justify-center">
          {verifying ? 'Verifying…' : 'Verify email'}
        </Button>
      </form>
      <p className="mt-4 text-center text-[13px] text-muted">
        Didn't get it? Check your spam, or{' '}
        <Link to="/auth/signup" className="text-accent hover:underline">try signing up again</Link>.
      </p>
    </AuthLayout>
  )
}
