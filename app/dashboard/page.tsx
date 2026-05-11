import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navigation/navbar'
import { LiveHeatmap } from '@/components/ecochain/live-heatmap'
import { InstitutionalLeaderboard } from '@/components/ecochain/institutional-leaderboard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* VEX-style Dashboard Navbar */}
      <nav className="w-full px-6 md:px-12 lg:px-16 pt-6 mb-12">
        <div className="liquid-glass border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">EcoChainAI Hub</div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <span className="text-gray-300">Overview</span>
            <span className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Analytics</span>
            <span className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Nodes</span>
          </div>
          <div>
            <form action="/auth/logout" method="post">
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="px-6 md:px-12 lg:px-16 pb-24 max-w-[1600px] mx-auto flex flex-col gap-12">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">Platform Overview</h1>
          <p className="text-gray-400">Monitor active edge-nodes and institutional segregation metrics.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Heatmap Section */}
          <div className="flex flex-col h-full">
            <LiveHeatmap />
          </div>

          {/* Leaderboard Section */}
          <div className="flex flex-col h-full">
            <InstitutionalLeaderboard />
          </div>
        </div>
      </div>
    </main>
  )
}
