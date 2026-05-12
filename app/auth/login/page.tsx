'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Loader2, Phone, Mail } from 'lucide-react'

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      
      // RBAC Routing
      const role = data.user?.user_metadata?.role || 'institution'
      if (role === 'admin') {
        router.push('/admin-dashboard')
      } else if (role === 'shg_worker') {
        router.push('/worker-home')
      } else {
        router.push('/institution-dashboard')
      }
      
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      if (!otpSent) {
        // Send OTP
        const { error } = await supabase.auth.signInWithOtp({
          phone: `+91${phone}`, // Assuming India for SHG context
        })
        if (error) throw error
        setOtpSent(true)
      } else {
        // Verify OTP
        const { data, error } = await supabase.auth.verifyOtp({
          phone: `+91${phone}`,
          token: otp,
          type: 'sms',
        })
        if (error) throw error
        
        // RBAC Routing
        const role = data.user?.user_metadata?.role || 'shg_worker' // Default phone users to worker
        if (role === 'admin') router.push('/admin-dashboard')
        else if (role === 'institution') router.push('/institution-dashboard')
        else router.push('/worker-home')
        
        router.refresh()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred or SMS provider not configured')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black text-white font-sans relative overflow-hidden">
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
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">EcoChainAI</h1>
            <p className="text-gray-400 text-sm">Unified Access Portal</p>
          </div>
          
          {/* Auth Method Toggle */}
          <div className="flex bg-black/40 rounded-lg p-1 mb-8">
            <button
              onClick={() => { setAuthMethod('email'); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${authMethod === 'email' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <Mail className="w-4 h-4" /> Email
            </button>
            <button
              onClick={() => { setAuthMethod('phone'); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${authMethod === 'phone' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <Phone className="w-4 h-4" /> Phone
            </button>
          </div>
          
          {authMethod === 'email' ? (
            <form onSubmit={handleEmailLogin} className="flex flex-col gap-5">
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

              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-600 bg-black/50 text-white focus:ring-white/50" 
                />
                <label htmlFor="remember" className="text-sm text-gray-400">Remember Me</label>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-lg py-3 mt-2 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Secure Login'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePhoneLogin} className="flex flex-col gap-5">
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                <div className="flex">
                  <span className="bg-black/50 border border-white/10 border-r-0 rounded-l-lg px-4 py-3 text-gray-400 flex items-center">+91</span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    required
                    value={phone}
                    disabled={otpSent}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 bg-black/50 border border-white/10 rounded-r-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/50 transition-shadow disabled:opacity-50"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="grid gap-2">
                  <label htmlFor="otp" className="text-sm font-medium text-gray-300">One Time Password (OTP)</label>
                  <input
                    id="otp"
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/50 transition-shadow tracking-widest text-center"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="checkbox" 
                  id="rememberPhone" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-600 bg-black/50 text-white focus:ring-white/50" 
                />
                <label htmlFor="rememberPhone" className="text-sm text-gray-400">Remember Me (Save Time)</label>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-lg py-3 mt-2 flex items-center justify-center"
                disabled={isLoading || (phone.length < 10)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : otpSent ? (
                  'Verify & Login'
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          )}

          <div className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="text-white hover:underline underline-offset-4">
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
