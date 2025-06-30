import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ success: true })

    // Clear the auth cookie
    response.cookies.delete('auth-token')

    // Redirect to /login after clearing the cookie
    response.headers.set('Location', '/login')

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
