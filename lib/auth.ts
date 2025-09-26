import { useAuthStore } from '../stores/auth'

// Client-side auth check
export const checkAuth = () => {
  if (typeof window === 'undefined') return false
  return useAuthStore.getState().isAuthenticated
}

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null
  return useAuthStore.getState().user
}