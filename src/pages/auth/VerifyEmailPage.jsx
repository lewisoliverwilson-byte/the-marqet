import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import Button from '../../components/ui/Button'

export default function VerifyEmailPage() {
  return (
    <AuthLayout title="Check your inbox" subtitle="">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 border border-blue-100">
          <Mail size={24} className="text-accent" />
        </div>
        <p className="text-[15px] text-dark-mid leading-relaxed">
          We've sent a confirmation link to your email. Click it to activate your account, then come back and sign in.
        </p>
        <p className="text-[13px] text-muted">
          Didn't get it? Check your spam folder, or{' '}
          <Link to="/auth/signup" className="text-accent hover:underline">try signing up again</Link>.
        </p>
        <Button variant="outline" size="md" href="/auth/login" className="w-full justify-center mt-2">
          Back to sign in
        </Button>
      </div>
    </AuthLayout>
  )
}
