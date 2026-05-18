import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

import Landing from './pages/Landing'
import BrowsePage from './pages/BrowsePage'
import SkillDetailPage from './pages/SkillDetailPage'
import SubmitPage from './pages/SubmitPage'
import DashboardPage from './pages/DashboardPage'
import DashboardSettingsPage from './pages/DashboardSettingsPage'
import ProfilePage from './pages/ProfilePage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import AuthCallbackPage from './pages/auth/AuthCallbackPage'

import AdminDashboard from './pages/admin/AdminDashboard'

import TermsPage from './pages/legal/TermsPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import CookiesPage from './pages/legal/CookiesPage'
import AcceptableUsePage from './pages/legal/AcceptableUsePage'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/browse', element: <BrowsePage /> },
  { path: '/skills/:slug', element: <SkillDetailPage /> },
  { path: '/submit', element: <SubmitPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/dashboard/settings', element: <DashboardSettingsPage /> },
  { path: '/profile/:username', element: <ProfilePage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/auth/login', element: <LoginPage /> },
  { path: '/auth/signup', element: <SignUpPage /> },
  { path: '/auth/verify-email', element: <VerifyEmailPage /> },
  { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/auth/reset-password', element: <ResetPasswordPage /> },
  { path: '/auth/callback', element: <AuthCallbackPage /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/legal/terms', element: <TermsPage /> },
  { path: '/legal/privacy', element: <PrivacyPage /> },
  { path: '/legal/cookies', element: <CookiesPage /> },
  { path: '/legal/acceptable-use', element: <AcceptableUsePage /> },
  { path: '*', element: <NotFoundPage /> },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          },
        }}
      />
    </AuthProvider>
  )
}
