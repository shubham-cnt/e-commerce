'use client'

import { useAuthStore } from '../../stores/auth'
import AuthGuard from '../authGuard'
import {Button} from '../../components/ui/button'
import {Card} from '../../components/ui/card'

export default function HomePage() {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleLogout()
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Home
            </h1>
            <p className="text-lg text-gray-600">
              Hello, <strong>{user?.name}</strong> ({user?.email})
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Information Card */}
            <Card               className="bg-white overflow-hidden shadow rounded-lg"
>
            <section 
              aria-labelledby="profile-heading"
            >
              <div className="px-4 py-5 sm:p-6">
                <h2 id="profile-heading" className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Profile Information
                </h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                    <dd className="text-sm text-gray-900">{user?.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="text-sm text-gray-900">{user?.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="text-sm text-gray-900">{user?.name}</dd>
                  </div>
                </dl>
              </div>
            </section>
            </Card>

            {/* Authentication Status Card */}
            <Card               className="bg-white overflow-hidden shadow rounded-lg"
>
            <section 
              aria-labelledby="auth-status-heading"
            >
              <div className="px-4 py-5 sm:p-6">
                <h2 id="auth-status-heading" className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Authentication Status
                </h2>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">Authenticated</p>
                    <p className="text-sm text-gray-600">You have successfully signed in</p>
                  </div>
                </div>
              </div>
            </section>
            </Card>

            {/* Actions Card */}
            <Card               className="bg-white overflow-hidden shadow rounded-lg"
>
            <section 
              aria-labelledby="actions-heading"
            >
              <div className="px-4 py-5 sm:p-6">
                <h2 id="actions-heading" className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Account Actions
                </h2>
                <Button
                  onClick={handleLogout}
                  onKeyDown={handleKeyDown}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  aria-label="Sign out of your account"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </Button>
              </div>
            </section>
            </Card>
          </div>
        </div>
      </div>

      {/* Skip link for keyboard users */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 text-blue-600"
          >
            Skip to main content
          </a>
    </AuthGuard>
  )
}