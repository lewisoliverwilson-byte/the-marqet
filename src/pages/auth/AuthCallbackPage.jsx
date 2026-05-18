import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!supabase) { navigate('/'); return }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from('profiles').upsert({
          id: session.user.id,
          username: session.user.user_metadata?.user_name || session.user.email?.split('@')[0],
          display_name: session.user.user_metadata?.full_name || session.user.user_metadata?.user_name,
          avatar_url: session.user.user_metadata?.avatar_url,
          github_url: session.user.user_metadata?.user_name ? `https://github.com/${session.user.user_metadata.user_name}` : null,
        }, { ignoreDuplicates: true })
      }
      navigate('/')
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-dark-mid">Signing you in…</p>
    </div>
  )
}
