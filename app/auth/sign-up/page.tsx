'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Loader2, Globe } from 'lucide-react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [institutionName, setInstitutionName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            full_name: institutionName,
            role: 'institution', // hardcode to EcoChainAI role
          },
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black text-white font-sans relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
      />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to network
        </Link>

        <div className="liquid-glass border border-white/20 p-8 sm:p-10 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Join the Network</h1>
            <p className="text-gray-400 text-sm">Deploy intelligent infrastructure for your institution</p>
          </div>
          
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            <div className="grid gap-2">
              <label htmlFor="institutionName" className="text-sm font-medium text-gray-300">Institution Name</label>
              <input
                id="institutionName"
                type="text"
                placeholder="e.g. City University"
                required
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/50 transition-shadow"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="admin@institution.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/50 transition-shadow"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-shadow"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-shadow"
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-lg py-3 mt-4 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Request Deployment'
              )}
            </button>

            <div className="text-center text-sm text-gray-500 mt-2">
              Already a partner?{' '}
              <Link href="/auth/login" className="text-white hover:underline underline-offset-4">
                Login to Portal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
