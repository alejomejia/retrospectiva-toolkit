import { AuthenticationError } from '@/lib/errors'
import type { User } from './types'

// Send credentials to login endpoint
export async function login(username: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('Usuario o contraseña incorrectos')
  }
}

// Logout user
export async function logout() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST'
  })

  if (!response.ok) {
    throw new AuthenticationError('Logout failed')
  }
}

// Get current user information
export async function fetchCurrentUser(): Promise<User> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new AuthenticationError('Get current user failed')
  }

  const data = await response.json()

  return data.user
}
