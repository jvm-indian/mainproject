import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LiveHeatmap } from '@/components/ecochain/live-heatmap'
import { PickupApprovals } from '@/components/ecochain/pickup-approvals'
import { SHGAllotment } from '@/components/ecochain/shg-allotment'
import { LogOut, Activity, Users, Leaf, Battery, MapPin, CheckCircle2, ShieldAlert, Cpu, Link2 } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Assuming role check would happen here in a real app, e.g.:
  // if (user.user_metadata?.role !== 'admin') redirect('/auth/login')

  // Fetch users for allotment
  const { data: shgs } = await supabase
    .from('users')
    .select('id, name, email, role')
    .eq('role', 'SHG_Worker')

  const { data: campuses } = await supabase
    .from('users')
    .select('id, name, email, role')
    .eq('role', 'Institution')

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24">
      {/* Admin Navbar */}
      <nav className="w-full px-6 md:px-12 lg:px-16 pt-6 mb-12">
        <div className="liquid-glass border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <span className="text-xl font-semibold tracking-tight">EcoChain Command Center</span>
            <span className="ml-4 px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full font-medium border border-red-500/20 uppercase tracking-widest hidden sm:inline-block">System Admin</span>
          </div>
          <form action="/auth/logout" method="post">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      <div className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto space-y-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Waste (Today)</span>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-4xl font-light tracking-tight mb-1">12,450 <span className="text-xl text-gray-500">kg</span></div>
            <div className="text-sm text-green-400 flex items-center gap-1">+14% from yesterday</div>
          </div>
          
          <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active SHG Workers</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-4xl font-light tracking-tight mb-1">342 <span className="text-xl text-gray-500">/ 450</span></div>
            <div className="text-sm text-gray-400 flex items-center gap-1">On field currently</div>
          </div>
          
          <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total CO2 Offset</span>
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-4xl font-light tracking-tight mb-1">8.2 <span className="text-xl text-gray-500">Tons</span></div>
            <div className="text-sm text-emerald-400 flex items-center gap-1">Equivalent to 400 trees planted</div>
          </div>
        </div>

        {/* Live Heatmap */}
        <div>
          <h2 className="text-2xl font-medium tracking-tight mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" /> Live Waste Heatmap
          </h2>
          <div className="w-full bg-black/50 rounded-2xl overflow-hidden border border-white/5 min-h-[400px]">
            <LiveHeatmap />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hardware Diagnostics */}
          <div className="liquid-glass rounded-2xl p-6 md:p-8 border border-white/5">
            <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-gray-400" /> Hardware Diagnostics Hub
            </h2>
            <div className="space-y-4">
              {[
                { id: 'NODE-A01', loc: 'Brigade Road', bat: 85, status: 'Healthy', ping: '2 mins ago' },
                { id: 'NODE-B42', loc: 'Indiranagar Metro', bat: 12, status: 'Critical', ping: '1 min ago' },
                { id: 'NODE-C18', loc: 'MG Road', bat: 94, status: 'Healthy', ping: '5 mins ago' },
                { id: 'NODE-D99', loc: 'Koramangala Block 5', bat: 0, status: 'Offline', ping: '4 hrs ago' },
              ].map((node) => (
                <div key={node.id} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex flex-col">
                    <span className="font-mono text-sm">{node.id}</span>
                    <span className="text-xs text-gray-500">{node.loc}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <Battery className={`w-3 h-3 ${node.bat < 20 ? 'text-red-400' : 'text-green-400'}`} />
                        <span className={`text-sm ${node.bat < 20 ? 'text-red-400' : 'text-gray-300'}`}>{node.bat}%</span>
                      </div>
                      <span className="text-xs text-gray-500">{node.ping}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium w-16 text-center ${
                      node.status === 'Healthy' ? 'bg-green-500/10 text-green-400' :
                      node.status === 'Critical' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {node.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User & Pickup Management */}
          <div className="liquid-glass rounded-2xl p-6 md:p-8 border border-white/5">
            <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" /> Pending Admin Approvals
            </h2>
            
            <div className="mb-6">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Institution Pickup Requests</h3>
              <PickupApprovals />
            </div>

            <div className="w-full h-px bg-white/10 my-6"></div>

            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">User Registrations</h3>
              <div className="space-y-4">
                {[
                  { name: 'Rajesh K.', type: 'SHG Worker', zone: 'South Zone' },
                  { name: 'SJB Institute', type: 'Institution', zone: 'West Zone' },
                  { name: 'Lakshmi M.', type: 'SHG Worker', zone: 'East Zone' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.type} • {user.zone}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors">
                        Review
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/80 text-white text-xs font-medium transition-colors flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-white/10 my-6"></div>

            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Link2 className="w-4 h-4" /> SHG to Campus Allotment
              </h3>
              <p className="text-xs text-gray-400">Assign registered SHG workers to specific campuses. This enables communication between them.</p>
              <SHGAllotment shgs={shgs || []} campuses={campuses || []} />
            </div>
          </div>
        </div>

        {/* Traceability Ledger */}
        <div className="liquid-glass rounded-2xl p-6 md:p-8 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-400" /> Traceability Ledger
            </h2>
            <input 
              type="text" 
              placeholder="Search batch ID or node..." 
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-gray-500 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-medium">Batch ID</th>
                  <th className="pb-3 font-medium">Source Node</th>
                  <th className="pb-3 font-medium">SHG Worker</th>
                  <th className="pb-3 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {[
                  { id: 'BATCH-9021', node: 'NODE-A01', worker: 'Ravi S.', time: '2026-05-12 14:32', status: 'In Transit' },
                  { id: 'BATCH-9020', node: 'NODE-C18', worker: 'Anjali T.', time: '2026-05-12 13:15', status: 'At Processing Center' },
                  { id: 'BATCH-9019', node: 'NODE-B42', worker: 'Kumar P.', time: '2026-05-12 11:45', status: 'Recycled' },
                  { id: 'BATCH-9018', node: 'NODE-C18', worker: 'Lakshmi M.', time: '2026-05-12 09:20', status: 'Recycled' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 font-mono">{row.id}</td>
                    <td className="py-4">{row.node}</td>
                    <td className="py-4">{row.worker}</td>
                    <td className="py-4 text-gray-500">{row.time}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        row.status === 'Recycled' ? 'bg-green-500/10 text-green-400' :
                        row.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
