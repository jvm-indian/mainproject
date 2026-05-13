'use client'

import React, { useEffect } from 'react'
import { Award, Leaf, Printer } from 'lucide-react'

export default function CertificatePage() {
  
  // Auto-trigger print dialog when component mounts
  useEffect(() => {
    // Small delay to ensure styles are loaded
    const timer = setTimeout(() => {
      window.print();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8 print:p-0">
      
      {/* Non-printable actions bar */}
      <div className="w-full max-w-4xl flex justify-end mb-8 print:hidden">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-xl"
        >
          <Printer className="w-5 h-5" />
          Save as PDF / Print
        </button>
      </div>

      {/* Printable Certificate Area */}
      <div className="w-full max-w-4xl aspect-[1.414/1] bg-white border-8 border-double border-gray-900 p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl print:shadow-none print:border-4">
        
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Leaf className="w-96 h-96" />
        </div>

        {/* Header */}
        <div className="text-center relative z-10 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center border-4 border-gray-200">
              <Award className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 uppercase text-gray-900" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Certificate of Sustainability
          </h1>
          <p className="text-xl text-gray-500 uppercase tracking-widest font-medium">
            Official Compliance Record
          </p>
        </div>

        {/* Body */}
        <div className="text-center relative z-10 max-w-2xl mx-auto space-y-8">
          <p className="text-lg text-gray-600 italic">This certificate is proudly presented to</p>
          
          <h2 className="text-4xl font-bold border-b-2 border-gray-300 pb-2 inline-block">
            CSE A Section
          </h2>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            For outstanding commitment to environmental responsibility, achieving a <strong className="text-green-700">94.2%</strong> waste segregation efficiency and successfully preventing <strong className="text-black">1,450 kg</strong> of recyclable material from reaching landfills during the month of <strong>May 2026</strong>.
          </p>
        </div>

        {/* Footer Signatures */}
        <div className="flex justify-between items-end relative z-10 pb-8 px-12">
          <div className="text-center">
            <div className="w-48 border-b-2 border-gray-800 mb-2"></div>
            <p className="font-medium text-gray-800 uppercase tracking-wider text-sm">System Admin</p>
            <p className="text-xs text-gray-500">EcoChainAI Network</p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 border-4 border-gray-900 rounded-full flex items-center justify-center mb-4 mx-auto rotate-12">
              <span className="text-gray-900 font-bold uppercase tracking-widest text-sm text-center">Verified<br/>Green</span>
            </div>
            <p className="text-xs text-gray-400 font-mono">ID: ECO-9982-2026</p>
          </div>

          <div className="text-center">
            <div className="w-48 border-b-2 border-gray-800 mb-2"></div>
            <p className="font-medium text-gray-800 uppercase tracking-wider text-sm">Date Issued</p>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

      </div>
    </div>
  )
}
