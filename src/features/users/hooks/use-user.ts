'use client'

import useSWR from 'swr'

import { fetchCurrentUser } from '../services'
import type { User } from '../types'

interface UseUserReturn {
  user: Partial<User> | null
  isLoading: boolean
  error: any
}

export function useUser(): UseUserReturn {
  const { data, error, isLoading } = useSWR('/api/auth/me', fetchCurrentUser, {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  })

  return {
    user: data || null,
    isLoading,
    error
  }
}
