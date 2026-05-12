import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { InstitutionalLeaderboard } from '@/components/ecochain/institutional-leaderboard'
import { LogOut, Calendar, Download, Building, Leaf, FileText, ArrowUpRight, TrendingUp, Award } from 'lucide-react'

export default async function InstitutionDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24">
      {/* Institution Navbar */}
      <nav className="w-full px-6 md:px-12 lg:px-16 pt-6 mb-12">
        <div className="liquid-glass border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">TechPark Analytics</span>
          </div>
          <form action="/auth/logout" method="post">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      <div className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto space-y-12">
        
        {/* Header & Impact Summary */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
          <div>
            <h1 className="text-3xl font-light tracking-tight mb-2">Environmental Impact</h1>
            <p className="text-gray-400">Current Month: May 2026</p>
          </div>
          <button className="liquid-glass rounded-full px-6 py-2.5 flex items-center gap-2 text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
            <Download className="w-4 h-4" /> Download Compliance Certificate
          </button>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="liquid-glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Leaf className="w-24 h-24" />
            </div>
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4 block relative z-10">Total Waste Generated</span>
            <div className="text-5xl font-light tracking-tight mb-2 relative z-10">4.2 <span className="text-2xl text-gray-500">Tons</span></div>
            <div className="text-sm text-gray-400 relative z-10">This month</div>
          </div>
          
          <div className="liquid-glass rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-green-500/10 to-transparent">
            <span className="text-green-400/80 text-sm font-medium uppercase tracking-wider mb-4 block">Successfully Segregated</span>
            <div className="text-5xl font-light tracking-tight mb-2 text-green-400">3.8 <span className="text-2xl text-green-400/50">Tons</span></div>
            <div className="text-sm text-green-400/80 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +12% from last month</div>
          </div>
          
          <div className="liquid-glass rounded-2xl p-6 border border-white/5">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4 block">Segregation Efficiency</span>
            <div className="flex items-end gap-2 mb-2">
              <div className="text-5xl font-light tracking-tight text-white">90.4%</div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-4">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '90.4%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Leaderboard */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-400" /> The Green Leaderboard
            </h2>
            <div className="flex-1 bg-black/50 rounded-2xl overflow-hidden border border-white/5">
              <InstitutionalLeaderboard />
            </div>
          </div>

          {/* Sidebar Column: Actions */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-medium tracking-tight mb-0 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" /> Pickup Scheduler
            </h2>
            <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
              <p className="text-sm text-gray-400">Request an immediate ad-hoc pickup outside of your normal schedule.</p>
              
              <div className="grid gap-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">Date & Time</label>
                <input type="datetime-local" className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 w-full" />
              </div>
              
              <div className="grid gap-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">Estimated Volume</label>
                <select className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 w-full appearance-none">
                  <option>Less than 50 kg</option>
                  <option>50 kg - 200 kg</option>
                  <option>Over 200 kg</option>
                </select>
              </div>

              <button className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 mt-2 transition-colors">
                Request Pickup <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4 mt-2">
               <div className="flex items-center gap-3 mb-2">
                 <div className="p-3 bg-white/5 rounded-lg"><FileText className="w-5 h-5 text-gray-300" /></div>
                 <div>
                   <h3 className="font-medium text-sm">Sustainability Report</h3>
                   <p className="text-xs text-gray-500">Auto-generated monthly</p>
                 </div>
               </div>
               <button className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors">
                 Generate PDF
               </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
