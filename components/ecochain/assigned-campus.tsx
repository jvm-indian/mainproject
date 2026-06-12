'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Building, MessageSquare, Loader2 } from 'lucide-react'
import Link from 'next/link'

type AllotmentWithCampus = {
  id: string
  campus: {
    id: string
    name: string
  }
}

export function AssignedCampus({ userId }: { userId: string }) {
  const [allotments, setAllotments] = useState<AllotmentWithCampus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const fetchAllotments = async () => {
      const { data, error } = await supabase
        .from('allotments')
        .select(`
          id,
          campus:users!campus_id(id, name)
        `)
        .eq('shg_id', userId)

      if (!error && data) {
        // supabase returns nested relations as arrays or single objects depending on how it infers foreign keys, 
        // since we query profiles directly it usually returns the single object if it's a many-to-one or one-to-one
        setAllotments(data as any[])
      }
      setIsLoading(false)
    }

    fetchAllotments()

    // Subscribe to realtime updates on allotments table
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'allotments',
          filter: `shg_id=eq.${userId}`
        },
        () => {
          // Re-fetch when there's an update
          fetchAllotments()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  if (isLoading) {
    return (
      <div className="rounded-2xl p-5 bg-white/5 border border-white/10 flex items-center justify-center min-h-[100px]">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    )
  }

  if (allotments.length === 0) {
    return (
      <div className="rounded-2xl p-5 bg-white/5 border border-white/10 text-center">
        <Building className="w-8 h-8 text-gray-500 mx-auto mb-2" />
        <h3 className="font-semibold text-sm text-gray-300">No Campus Assigned</h3>
        <p className="text-xs text-gray-500 mt-1">You will see your assigned campus here once the system admin allots you to one.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {allotments.map((allotment) => (
        <div key={allotment.id} className="rounded-2xl p-5 bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Building className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase rounded tracking-wider">Allotted Campus</span>
            </div>
            <h2 className="text-xl font-bold mb-1">{allotment.campus?.name || 'Unknown Campus'}</h2>
            
            <Link href="/messages" className="mt-4 w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors">
              <MessageSquare className="w-4 h-4" /> Message Campus
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
