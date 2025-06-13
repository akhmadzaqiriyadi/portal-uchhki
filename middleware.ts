import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/user', '/admin']
  const isAdminRoute = pathname.startsWith('/admin')

  const supabase = await createClient()

  // Get the authenticated user securely
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  // If there's an auth error or no user, treat as unauthenticated
  const isAuthenticated = !authError && !!user

  // Redirect to login if not authenticated and trying to access protected routes
  if (!isAuthenticated && protectedRoutes.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If authenticated, check for role-based access
  if (isAuthenticated && user) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    // If a non-admin user tries to access an admin route, redirect them
    if (isAdminRoute && userData?.role !== 'admin') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

// Configure the matcher to run the middleware on all routes except for some static assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}