import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut, Map, QrCode, Wallet, Award, MapPin, BellRing, Navigation } from 'lucide-react'

export default async function WorkerHomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // if (!user) {
  //   redirect('/auth/login')
  // }

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 md:hidden">
      {/* Note: This page is explicitly designed for mobile (md:hidden prevents desktop styling focus, though we can show it on desktop too, we'll optimize for mobile layout) */}
      
      {/* Top Bar */}
      <nav className="w-full px-4 pt-6 pb-4 bg-gradient-to-b from-black to-transparent sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Green Technician</div>
              <div className="text-xs text-gray-400">Ravi S. • ID: GT-9482</div>
            </div>
          </div>
          <form action="/auth/logout" method="post">
            <button className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </div>
      </nav>

      <div className="px-4 space-y-6">
        {/* Language Selector */}
        <div className="flex gap-2 mb-6">
          <button className="flex-1 py-2 rounded-lg bg-white text-black text-xs font-bold">ENG</button>
          <button className="flex-1 py-2 rounded-lg bg-white/10 text-gray-400 text-xs font-bold hover:bg-white/20">ಕನ್ನಡ</button>
          <button className="flex-1 py-2 rounded-lg bg-white/10 text-gray-400 text-xs font-bold hover:bg-white/20">हिंदी</button>
        </div>

        {/* Daily Task Card */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BellRing className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded tracking-wider">Urgent Collection</span>
            </div>
            <h2 className="text-xl font-bold mb-1">Brigade Road Bin #04</h2>
            <p className="text-sm text-gray-300 mb-4 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-primary" /> 1.2 km away • 92% Full
            </p>
            <button className="w-full py-3 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Navigation className="w-5 h-5" /> Start Route
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-2xl p-5 bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Map className="w-6 h-6 text-blue-400" />
            </div>
            <span className="font-semibold text-sm">Zone Map</span>
          </button>
          
          <button className="rounded-2xl p-5 bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-green-400" />
            </div>
            <span className="font-semibold text-sm">Scan Bin</span>
          </button>
        </div>

        {/* Digital Wallet */}
        <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Wallet className="w-5 h-5 text-yellow-400" /> Earnings (This Week)</h3>
            <span className="text-xs text-gray-400">May 6 - May 12</span>
          </div>
          <div className="text-4xl font-light mb-4">₹2,450</div>
          
          <div className="w-full h-px bg-white/10 mb-4"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">Waste Collected</span>
              <span className="font-semibold">342 kg</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-gray-400 text-xs">Bonus</span>
              <span className="font-semibold text-green-400">+₹200</span>
            </div>
          </div>
        </div>

      </div>
      
      {/* Desktop warning if viewed on large screen */}
      <div className="hidden md:flex fixed inset-0 bg-black/90 z-[100] items-center justify-center p-8 text-center backdrop-blur-sm">
        <div className="max-w-md liquid-glass p-8 rounded-2xl">
          <Navigation className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Mobile Interface</h2>
          <p className="text-gray-400">The SHG Worker dashboard is explicitly designed for mobile devices. Please shrink your window or use a mobile device for the intended experience.</p>
        </div>
      </div>
    </main>
  )
}
