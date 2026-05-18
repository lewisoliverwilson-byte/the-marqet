import { createContext, useContext, useEffect, useState } from 'react'
import { Hub } from 'aws-amplify/utils'
import {
  signUp as amplifySignUp,
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  updatePassword,
  fetchUserAttributes,
  getCurrentUser,
} from 'aws-amplify/auth'
import { isConfigured, authClient } from '../lib/amplify'
import { getProfile } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)   // { userId, username } from getCurrentUser
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadProfile(cognitoId) {
    if (!cognitoId) { setProfile(null); return }
    const p = await getProfile(cognitoId)
    setProfile(p)
  }

  async function fetchCurrentUser() {
    if (!isConfigured) { setLoading(false); return }
    try {
      const u = await getCurrentUser()
      setUser(u)
      await loadProfile(u.userId)
    } catch {
      setUser(null)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentUser()

    const { remove } = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          fetchCurrentUser()
          break
        case 'signedOut':
          setUser(null)
          setProfile(null)
          break
        case 'tokenRefresh_failure':
          setUser(null)
          setProfile(null)
          break
      }
    })

    return remove
  }, [])

  async function signUp(email, password, username, displayName) {
    if (!isConfigured) throw new Error('Auth unavailable')

    const { isSignUpComplete, userId, nextStep } = await amplifySignUp({
      username: email,
      password,
      options: {
        userAttributes: {
          preferred_username: username,
          name: displayName,
        },
      },
    })

    // Profile is created in AuthCallbackPage after email confirmation,
    // or lazily on first sign-in via ensureProfile().
    return { isSignUpComplete, userId, nextStep }
  }

  async function confirmEmail(email, code) {
    if (!isConfigured) throw new Error('Auth unavailable')
    await confirmSignUp({ username: email, confirmationCode: code })
  }

  async function signIn(email, password) {
    if (!isConfigured) throw new Error('Auth unavailable')
    const result = await amplifySignIn({ username: email, password })
    return result
  }

  async function signInWithGitHub() {
    // GitHub OAuth requires the externalProviders block in amplify/auth/resource.ts
    // to be uncommented and the GitHub OAuth App to be configured.
    // See comments in amplify/auth/resource.ts for setup instructions.
    throw new Error('GitHub sign-in requires additional setup. See amplify/auth/resource.ts.')
  }

  async function signOut() {
    if (!isConfigured) return
    await amplifySignOut()
  }

  async function forgotPassword(email) {
    if (!isConfigured) throw new Error('Auth unavailable')
    await resetPassword({ username: email })
  }

  async function confirmPasswordReset(email, code, newPassword) {
    if (!isConfigured) throw new Error('Auth unavailable')
    await confirmResetPassword({ username: email, confirmationCode: code, newPassword })
  }

  async function changePassword(oldPassword, newPassword) {
    if (!isConfigured) throw new Error('Auth unavailable')
    await updatePassword({ oldPassword, newPassword })
  }

  // Creates the DynamoDB profile after the user's first sign-in if it doesn't exist yet.
  async function ensureProfile(cognitoUser, attributes) {
    if (!isConfigured || !cognitoUser) return
    const existing = await getProfile(cognitoUser.userId)
    if (existing) return existing

    const username = attributes?.preferred_username || cognitoUser.username?.split('@')[0] || 'user'
    const { data } = await authClient.models.Profile.create({
      cognitoId: cognitoUser.userId,
      username,
      displayName: attributes?.name || username,
      avatarUrl: attributes?.picture,
    })
    return data
  }

  async function refreshProfile() {
    if (user) await loadProfile(user.userId)
  }

  const isAdmin = profile?.isAdmin ?? false

  return (
    <AuthContext.Provider value={{
      user, profile, loading, isAdmin,
      signUp, confirmEmail, signIn, signInWithGitHub,
      signOut, forgotPassword, confirmPasswordReset, changePassword,
      refreshProfile, ensureProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
