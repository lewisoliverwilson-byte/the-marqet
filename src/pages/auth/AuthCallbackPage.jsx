import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth'
import { useAuth } from '../../context/AuthContext'
import { isConfigured } from '../../lib/amplify'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const { ensureProfile } = useAuth()

  useEffect(() => {
    if (!isConfigured) { navigate('/'); return }

    async function handleCallback() {
      try {
        const cognitoUser = await getCurrentUser()
        const attributes = await fetchUserAttributes()
        await ensureProfile(cognitoUser, attributes)
        navigate('/')
      } catch {
        navigate('/auth/login')
      }
    }

    handleCallback()
  }, [navigate, ensureProfile])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-dark-mid">Signing you in…</p>
    </div>
  )
}
