'use client'

import Link from 'next/link'
import { useAuthStore } from '../stores/auth'

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Next.js App</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span>Welcome, {user?.name}</span>
                  <Link 
                    href="/home" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Home
                  </Link>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            E-commerce
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Built with Zustand state management and ShadCN
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-green-600">You are logged in!</p>
              <Link 
                href="/home"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">Please log in to access the home page</p>
              <Link 
                href="/login"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}