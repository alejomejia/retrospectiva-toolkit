import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import { JWT_SECRET, ALLOWED_USERS, NODE_ENV } from '@/lib/config'
import { AuthenticationError, EnvironmentVariablesError } from '@/lib/errors'

import type { User } from './types'

// Parse allowed users from environment variables
export function parseAllowedUsers(): User[] {
  if (!ALLOWED_USERS) {
    throw new EnvironmentVariablesError('Missing environment variables', {
      ALLOWED_USERS
    })
  }

  return ALLOWED_USERS.split(',').map((user) => {
    const [username, password, role, avatarFilename] = user.split(':')
    return {
      username,
      password,
      role,
      avatarFilename
    }
  }) as User[]
}

export function getAllowedUserByUsername(username: string): Partial<User> | null {
  const allowedUsers = parseAllowedUsers()
  return allowedUsers.find((user) => user.username === username) ?? null
}

export function validateCredentials(username: string, password: string): boolean {
  const allowedUsers = parseAllowedUsers()
  const user = allowedUsers.find((user) => user.username === username)

  if (!user) return false

  return user.password === password
}

// Convert JWT_SECRET string to Uint8Array for jose
function getJwtSecret(): Uint8Array {
  if (!JWT_SECRET) {
    throw new EnvironmentVariablesError('JWT_SECRET is not configured')
  }

  return new TextEncoder().encode(JWT_SECRET)
}

// Generate JWT token
export async function generateToken(user: Partial<User>): Promise<string> {
  const secret = getJwtSecret()

  const { username, role, avatarFilename } = user

  return await new SignJWT({ username, role, avatarFilename })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('31d')
    .sign(secret)
}

// Verify JWT token
export async function verifyToken(token: string): Promise<Partial<User> | null> {
  try {
    const secret = getJwtSecret()
    const { payload } = await jwtVerify<User>(token, secret)

    const { username, role, avatarFilename } = payload

    return { username, role, avatarFilename }
  } catch (e) {
    console.log({ e })
    throw new AuthenticationError('Invalid token')
  }
}

// Get current user from cookies
export async function getCurrentUser(): Promise<Partial<User> | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) return null

  return await verifyToken(token)
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}
