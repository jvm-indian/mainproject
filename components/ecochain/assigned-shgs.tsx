'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, MessageSquare, Loader2 } from 'lucide-react'
import Link from 'next/link'

type AllotmentWithSHG = {
  id: string
  shg: {
    id: string
    name: string
  }
}

export function AssignedSHGs({ userId }: { userId: string }) {
  const [allotments, setAllotments] = useState<AllotmentWithSHG[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const fetchAllotments = async () => {
      const { data, error } = await supabase
        .from('allotments')
        .select(`
          id,
          shg:users!shg_id(id, name)
        `)
        .eq('campus_id', userId)

      if (!error && data) {
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
          filter: `campus_id=eq.${userId}`
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
      <div className="rounded-2xl p-6 bg-black/40 border border-white/5 flex items-center justify-center min-h-[150px]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (allotments.length === 0) {
    return (
      <div className="rounded-2xl p-6 bg-black/40 border border-white/5 text-center flex flex-col items-center justify-center min-h-[150px]">
        <Users className="w-8 h-8 text-gray-500 mb-3" />
        <h3 className="font-medium text-gray-300">No SHG Workers Assigned</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm">Green Technicians will appear here once they are allotted to your campus by the system administrator.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {allotments.map((allotment) => (
        <div key={allotment.id} className="rounded-xl p-5 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded tracking-wider">Assigned Tech</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">{allotment.shg?.name || 'Unknown Worker'}</h3>
          </div>
          
          <Link href="/messages" className="mt-4 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" /> Message
          </Link>
        </div>
      ))}
    </div>
  )
}
