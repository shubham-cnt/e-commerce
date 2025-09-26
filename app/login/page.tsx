'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../stores/auth'
import AuthGuard from '../authGuard'
import {Label} from '../../components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  
  const { login, isLoading, error: storeError } = useAuthStore()
  const router = useRouter()

  // Focus management for accessibility
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  // Announce errors to screen readers
  useEffect(() => {
    if (storeError || localError) {
      errorRef.current?.focus()
    }
  }, [storeError, localError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    setIsSubmitting(true)

    // Basic client-side validation
    if (!email || !password) {
      setLocalError('Please fill in all required fields.')
      setIsSubmitting(false)
      return
    }

    const result = await login(email, password)
    
    if (result.success) {
      router.push('/home')
    } else {
      setIsSubmitting(false)
    }
  }

  const loading = isLoading || isSubmitting

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Page Heading */}
          <header>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h1>
          </header>

          {/* Alert for screen readers */}
          {(storeError || localError) && (
            <div 
              ref={errorRef}
              tabIndex={-1}
              className="rounded-md bg-red-50 p-4"
              role="alert"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    There was an error with your submission
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{storeError || localError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form 
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={storeError || localError ? "form-error" : undefined}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">
                  Email address
                </Label>
                <input
                  id="email"
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!localError}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">
                  Password
                </Label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!localError}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-blue-300 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                    </span>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            {/* Demo credentials with proper semantics */}
            <section aria-label="Demo credentials" className="text-center">
              <h2 className="text-sm font-medium text-gray-600 mb-2">Demo credentials:</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Email:</strong> user@example.com</p>
                <p><strong>Password:</strong> password123</p>
                <p><strong>Email:</strong> admin@example.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
            </section>
          </form>

          {/* Skip link for keyboard users */}
          {/* <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 text-blue-600"
          >
            Skip to main content
          </a> */}
        </div>
      </div>
    </AuthGuard>
  )
}