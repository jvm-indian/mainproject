'use client'

import React, { useState } from 'react'
import { Calendar, ArrowUpRight, Loader2, CheckCircle2 } from 'lucide-react'

export function PickupScheduler({ institutionName }: { institutionName: string }) {
  const [date, setDate] = useState('')
  const [volume, setVolume] = useState('Less than 50 kg')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!date) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/pickup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          payload: { institutionName, date, volume }
        })
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        setDate('')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-medium tracking-tight mb-0 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-400" /> Pickup Scheduler
      </h2>
      <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
        <p className="text-sm text-gray-400">Request an immediate ad-hoc pickup outside of your normal schedule.</p>
        
        {success ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
            <div>
              <p className="font-medium text-white">Request Submitted</p>
              <p className="text-xs text-gray-400 mt-1">Pending Admin Approval</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-2">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Date & Time</label>
              <input 
                type="datetime-local" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 w-full" 
              />
            </div>
            
            <div className="grid gap-2">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Estimated Volume</label>
              <select 
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 w-full appearance-none"
              >
                <option>Less than 50 kg</option>
                <option>50 kg - 200 kg</option>
                <option>Over 200 kg</option>
              </select>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={isLoading || !date}
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 mt-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Request Pickup'}
              {!isLoading && <ArrowUpRight className="w-4 h-4" />}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
