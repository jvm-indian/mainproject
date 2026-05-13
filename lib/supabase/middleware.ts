import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Skipping auth middleware.')
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedPaths = ['/dashboard', '/messages', '/ai-assistant', '/tasks', '/profile']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect logged in users away from auth pages (BUT EXCLUDE /auth/logout which they need to sign out!)
  if (user && request.nextUrl.pathname.startsWith('/auth/') && request.nextUrl.pathname !== '/auth/logout') {
    const url = request.nextUrl.clone()
    
    // RBAC Routing from Middleware
    const role = user.user_metadata?.role || 'institution';
    if (role === 'admin') url.pathname = '/admin-dashboard';
    else if (role === 'shg_worker') url.pathname = '/worker-home';
    else url.pathname = '/institution-dashboard';
    
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
