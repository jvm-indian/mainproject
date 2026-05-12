import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Dynamic RBAC Routing
      let targetPath = next;
      if (next === '/dashboard' || next === '/') {
        const role = data.user?.user_metadata?.role || 'institution';
        if (role === 'admin') targetPath = '/admin-dashboard';
        else if (role === 'shg_worker') targetPath = '/worker-home';
        else targetPath = '/institution-dashboard';
      }
      return NextResponse.redirect(`${origin}${targetPath}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`)
}
