'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle2, Clock, MapPin, Truck } from 'lucide-react'

type PickupRequest = {
  id: string
  institutionName: string
  date: string
  volume: string
  status: 'Pending' | 'Approved'
}

export function PickupApprovals() {
  const [requests, setRequests] = useState<PickupRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/pickup')
      if (res.ok) {
        const data = await res.json()
        setRequests(data.requests)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
    // Poll every 5 seconds for demo
    const interval = setInterval(fetchRequests, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch('/api/pickup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', payload: { id } })
      })
      if (res.ok) {
        setRequests(requests.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (isLoading) return <div className="text-sm text-gray-500 animate-pulse">Loading live requests...</div>

  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <div className="text-sm text-gray-500">No active pickup requests.</div>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" /> {req.institutionName}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date(req.date).toLocaleString()} • {req.volume}
              </span>
            </div>
            
            <div className="flex gap-2">
              {req.status === 'Pending' ? (
                <button 
                  onClick={() => handleApprove(req.id)}
                  className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/80 text-white text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" /> Approve
                </button>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium flex items-center gap-1 border border-green-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Scheduled
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
