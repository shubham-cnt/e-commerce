'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../stores/auth'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo)
      } else if (!requireAuth && isAuthenticated) {
        router.push('/home')
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router, redirectTo])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Redirecting to login...</div>
      </div>
    )
  }

  if (!requireAuth && isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Redirecting to home...</div>
      </div>
    )
  }

  return <>{children}</>
}