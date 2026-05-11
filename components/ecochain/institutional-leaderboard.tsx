'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Institution {
  id: string;
  name: string;
  segregatedWeight: number;
  unsegregatedWeight: number;
  score: number;
  rank: number;
}

const MOCK_LEADERBOARD: Institution[] = [
  { id: '1', name: 'Global Tech Park', segregatedWeight: 1450, unsegregatedWeight: 120, score: 92, rank: 1 },
  { id: '2', name: 'City Hospital', segregatedWeight: 890, unsegregatedWeight: 150, score: 85, rank: 2 },
  { id: '3', name: 'Sunrise High School', segregatedWeight: 420, unsegregatedWeight: 90, score: 82, rank: 3 },
  { id: '4', name: 'Downtown Mall', segregatedWeight: 2100, unsegregatedWeight: 800, score: 72, rank: 4 },
  { id: '5', name: 'Central University', segregatedWeight: 1100, unsegregatedWeight: 550, score: 66, rank: 5 },
];

export function InstitutionalLeaderboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [data, setData] = useState<Institution[]>(MOCK_LEADERBOARD);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const supabase = createClient();
      try {
        const { data: users, error } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'Institution')
          .order('institution_score', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        
        if (users && users.length > 0) {
          const formatted = users.map((u, i) => ({
            id: u.id,
            name: u.name,
            segregatedWeight: 0, // In a real app, calculate from WasteLogs
            unsegregatedWeight: 0, 
            score: u.institution_score || 0,
            rank: i + 1
          }));
          setData(formatted);
        }
      } catch (err) {
        console.log("Supabase fetch failed, using mock data for smoothness. Error:", err);
      }
    };
    
    fetchLeaderboard();
  }, []);

  return (
    <div ref={ref} className="w-full bg-[#101010] rounded-2xl overflow-hidden border border-white/5">
      <div className="p-6 sm:p-8 bg-[#212121] border-b border-white/5">
        <h3 className="text-xl sm:text-2xl font-medium text-[#E1E0CC]">Institutional Rankings</h3>
        <p className="text-sm text-gray-500 mt-2">Ranking based on segregation efficiency over the last 30 days.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#101010] text-gray-500 text-xs sm:text-sm tracking-wider">
              <th className="p-4 sm:p-6 font-normal border-b border-white/5">Rank</th>
              <th className="p-4 sm:p-6 font-normal border-b border-white/5">Institution</th>
              <th className="p-4 sm:p-6 font-normal border-b border-white/5 hidden sm:table-cell">Segregated (kg)</th>
              <th className="p-4 sm:p-6 font-normal border-b border-white/5 hidden sm:table-cell">Unsegregated (kg)</th>
              <th className="p-4 sm:p-6 font-normal border-b border-white/5 text-right">Efficiency Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((inst, i) => (
              <motion.tr 
                key={inst.id} 
                className="hover:bg-[#212121] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              >
                <td className="p-4 sm:p-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    inst.rank === 1 ? 'bg-[#DEDBC8]/20 text-[#DEDBC8]' :
                    inst.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                    inst.rank === 3 ? 'bg-orange-600/20 text-orange-500' :
                    'bg-black/50 text-gray-500'
                  }`}>
                    {inst.rank}
                  </div>
                </td>
                <td className="p-4 sm:p-6 text-[#E1E0CC]">{inst.name}</td>
                <td className="p-4 sm:p-6 text-gray-400 hidden sm:table-cell">{inst.segregatedWeight.toLocaleString()}</td>
                <td className="p-4 sm:p-6 text-gray-400 hidden sm:table-cell">{inst.unsegregatedWeight.toLocaleString()}</td>
                <td className="p-4 sm:p-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-16 sm:w-24 h-1 bg-black rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#DEDBC8]"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${inst.score}%` } : { width: 0 }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      ></motion.div>
                    </div>
                    <span className="text-[#E1E0CC] w-8 text-sm">{inst.score}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
