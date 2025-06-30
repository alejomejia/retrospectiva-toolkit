import { NextRequest, NextResponse } from 'next/server'

import { validateCredentials, generateToken, getAllowedUserByUsername } from '@/features/users/utils.server'
import { NODE_ENV } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    if (!validateCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const allowedUser = getAllowedUserByUsername(username)

    const token = await generateToken({
      username: allowedUser?.username,
      role: allowedUser?.role,
      avatarFilename: allowedUser?.avatarFilename
    })

    // Create response
    const response = NextResponse.json({ success: true, user: allowedUser })

    // Set cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
