import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123', // In real app, never store plain passwords
    name: 'John Doe'
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User'
  }
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const user = MOCK_USERS.find(u => u.email === email && u.password === password)
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true,
            isLoading: false 
          })
          return { success: true }
        } else {
          set({ isLoading: false })
          return { 
            success: false, 
            error: 'Invalid email or password' 
          }
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false 
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)