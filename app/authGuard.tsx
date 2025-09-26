'use client'

import { useEffect, useRef } from 'react'
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
  const announcedRef = useRef(false)

  useEffect(() => {
    if (!isLoading && !announcedRef.current) {
      if (requireAuth && !isAuthenticated) {
        announcedRef.current = true
        router.push(redirectTo)
      } else if (!requireAuth && isAuthenticated) {
        announcedRef.current = true
        router.push('/home')
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router, redirectTo])

  // Accessible loading indicator
  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        role="status"
        aria-live="polite"
        aria-label="Loading authentication status"
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            aria-hidden="true"
          ></div>
          <p className="sr-only">Loading authentication status, please wait...</p>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
            aria-hidden="true"
          ></div>
          <p>Redirecting to login page...</p>
          <p className="sr-only">Authentication required. Redirecting to login page.</p>
        </div>
      </div>
    )
  }

  if (!requireAuth && isAuthenticated) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
            aria-hidden="true"
          ></div>
          <p>Redirecting to home...</p>
          <p className="sr-only">You are already authenticated. Redirecting to home.</p>
        </div>
      </div>
    )
  }

  return (
    <div id="main-content" tabIndex={-1}>
      {children}
    </div>
  )
}