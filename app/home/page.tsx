'use client'

import { useAuthStore } from '../../stores/auth'
import AuthGuard from '../authGuard'

export default function HomePage() {
  const { user, logout } = useAuthStore()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Home
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Hello, {user?.name} ({user?.email})
            </p>
            
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile Information
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>User ID: {user?.id}</p>
                  <p>Email: {user?.email}</p>
                  <p>Name: {user?.name}</p>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Authentication Status
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p className="text-green-600">✓ You are authenticated</p>
                  <p>This is a protected page</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}