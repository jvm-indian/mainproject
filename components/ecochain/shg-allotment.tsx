'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, Building, Link2, Loader2, CheckCircle2 } from 'lucide-react'

type Profile = {
  id: string
  name: string
  email: string
  role: string
}

export function SHGAllotment({
  shgs,
  campuses,
}: {
  shgs: Profile[]
  campuses: Profile[]
}) {
  const [selectedSHG, setSelectedSHG] = useState('')
  const [selectedCampus, setSelectedCampus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleAllotment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSHG || !selectedCampus) return

    setIsLoading(true)
    setMessage(null)

    const supabase = createClient()
    
    try {
      const { error } = await supabase
        .from('allotments')
        .insert({
          shg_id: selectedSHG,
          campus_id: selectedCampus
        })

      if (error) {
        if (error.code === '23505') {
          throw new Error('This SHG is already allotted to this Campus.')
        }
        throw error
      }

      setMessage({ type: 'success', text: 'Allotment successful!' })
      // Reset after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to allot SHG.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-black/40 border border-white/5 rounded-xl p-5 mt-4">
      <form onSubmit={handleAllotment} className="flex flex-col gap-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" /> Select SHG Worker
            </label>
            <select
              value={selectedSHG}
              onChange={(e) => setSelectedSHG(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 appearance-none"
              required
            >
              <option value="" disabled>Choose an SHG...</option>
              {shgs.map((shg) => (
                <option key={shg.id} value={shg.id}>{shg.name} ({shg.email})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" /> Select Campus
            </label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 appearance-none"
              required
            >
              <option value="" disabled>Choose a Campus...</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>{campus.name} ({campus.email})</option>
              ))}
            </select>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !selectedSHG || !selectedCampus}
          className="mt-2 w-full py-2.5 rounded-lg bg-primary hover:bg-primary/80 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
          Allot SHG to Campus
        </button>
      </form>
    </div>
  )
}
