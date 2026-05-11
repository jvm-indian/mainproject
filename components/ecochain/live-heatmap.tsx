'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

// Mock data type for smart bins
interface SmartBin {
  id: string;
  lat: number;
  lng: number;
  fillLevel: number; // 0 to 100
  status: 'Online' | 'Offline';
}

const MOCK_BINS: SmartBin[] = [
  { id: '1jb23cs192', lat: 12.9716, lng: 77.5946, fillLevel: 85, status: 'Online' }, // Needs pickup (red)
  { id: '2jb23cs193', lat: 12.9720, lng: 77.5950, fillLevel: 45, status: 'Online' }, // Medium (yellow)
  { id: '3jb23cs194', lat: 12.9710, lng: 77.5940, fillLevel: 10, status: 'Online' }, // Empty (green)
  { id: '4jb23cs195', lat: 12.9730, lng: 77.5960, fillLevel: 95, status: 'Online' }, // Critical (red)
];

export function LiveHeatmap() {
  const [bins, setBins] = useState<SmartBin[]>(MOCK_BINS);

  useEffect(() => {
    const fetchBins = async () => {
      const supabase = createClient();
      try {
        const { data: smartBins, error } = await supabase
          .from('smartbins')
          .select('*');
        
        if (error) throw error;
        
        if (smartBins && smartBins.length > 0) {
          const formatted = smartBins.map((bin) => ({
            id: bin.id,
            lat: parseFloat(bin.location_lat),
            lng: parseFloat(bin.location_lng),
            fillLevel: bin.fill_level_percentage,
            status: bin.network_status as 'Online' | 'Offline'
          }));
          setBins(formatted);
        }
      } catch (err) {
        console.log("Supabase fetch failed for Heatmap, using mock data for smoothness. Error:", err);
      }
    };
    
    fetchBins();
  }, []);

  return (
    <div className="w-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
      <div className="p-4 bg-gray-800/50 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Live Waste Heatmap</h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> Empty
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Medium
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> Full
          </div>
        </div>
      </div>
      
      {/* Map placeholder */}
      <div className="relative w-full h-[500px] bg-gray-950 flex items-center justify-center p-6">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>
        
        {/* Render mockup points */}
        <div className="relative w-full max-w-3xl h-full border border-gray-800/50 rounded-lg">
          {bins.map(bin => {
            // Map lat/lng to arbitrary x/y for mockup visualization
            const x = ((bin.lng - 77.594) * 5000) + 50; 
            const y = ((12.973 - bin.lat) * 5000) + 20;
            
            const color = bin.fillLevel >= 80 ? 'bg-red-500' : bin.fillLevel >= 40 ? 'bg-yellow-500' : 'bg-green-500';
            const pulse = bin.fillLevel >= 80 ? 'animate-pulse' : '';

            return (
              <div 
                key={bin.id}
                className={`absolute w-6 h-6 rounded-full -ml-3 -mt-3 shadow-lg flex items-center justify-center ${color} ${pulse} cursor-pointer hover:scale-125 transition-transform`}
                style={{ left: `${x}%`, top: `${y}%` }}
                title={`Bin ${bin.id} - ${bin.fillLevel}% Full`}
              >
                <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur px-4 py-2 rounded border border-gray-800 text-sm text-gray-300">
          Showing {bins.length} active edge-nodes
        </div>
      </div>
    </div>
  );
}
