"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Calendar as CalIcon, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const START_DATE = new Date("2026-01-03T21:00:00"); 
const RETURN_DATE = new Date("2026-01-10T18:00:00"); 

const tripMessages: Record<number, { theme: string; message: string; subtext: string; color: string }> = {
  0: {
    theme: "Leaving",
    message: "I'm already missing you my baby",
    subtext: "Itna nahi ro mera bacha i promise i'll be back before you know it.",
    color: "from-blue-600/20"
  },
  1: {
    theme: "Day One",
    message: "Pehla din ho gaya complete.",
    subtext: "Mubarak ho meri jaaaaaaaaannnnnnn, bas 6 din aur bache hain.",
    color: "from-purple-600/20"
  },
  2: {
    theme: "Day Two",
    message: "You're always on my mind babygirl",
    subtext: "Jitna bhi busy rehlun tumhari yaad aati rehti h janu.",
    color: "from-indigo-600/20"
  },
  3: {
     theme: "Day Three",  
    message: "Pata h miss kar rahi ho meri jaan and i miss you too baby",
    subtext: "bas 4 din aur bache hain janeman.",
    color: "from-teal-600/20"
  },
  4: {
    theme: "Day Four",
    message: "Mubarak ho aadhe se ziyada tou hogaya",
    subtext: "Just 3 more days to go my love, itna nahi roya karo na mera bacha.",
    color: "from-orange-600/20"
  },
  5: {
     theme: "Day Five",
    message: "Bas 2 din aur bache hain meri jaan",
    subtext: "Qasmay itni yaad arahi h bas tum milo aik dafa chorna nahi h maine tumhe.",
    color: "from-rose-600/20"
  },
  6: {
    theme: "Day Six",
    message: "Aakhri raat haiiiiiiiiii hehehehehe",
    subtext: "Bas aakhri dafa yahan soraha hun phir dekho tum agle din pohoncha hua hunga.",
    color: "from-amber-600/20"
  },
  7: {
    theme: "Day Seven",
    message: "YESSSSSSSS AAJ ARAHA HUNNNNNNNNNNN",
    subtext: "Bas kuch ghante aur meri jaan, ab tou rona band kardo.",
    color: "from-emerald-600/20"
  }
};

export default function LinearJourneyApp() {
  const [activeDay, setActiveDay] = useState(0); 
  const [currentDayOfTrip, setCurrentDayOfTrip] = useState(0); 
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const updateStats = () => {
      const now = new Date().getTime();
      const start = START_DATE.getTime();
      const end = RETURN_DATE.getTime();

      const diffInMs = now - start;
      const dayIdx = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const clampedDay = Math.min(Math.max(dayIdx, 0), 7);
      
      setCurrentDayOfTrip(clampedDay);
      setActiveDay(clampedDay); 

      const total = end - start;
      const elapsed = now - start;
      setProgress(Math.min(Math.max((elapsed / total) * 100, 0), 100));

      const diff = end - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  const currentContent = tripMessages[activeDay] || tripMessages[7];

  return (
    <main className="min-h-screen bg-[#020408] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      <div className={`absolute inset-0 bg-gradient-to-b ${currentContent.color} to-transparent transition-colors duration-1000`} />

      <div className="z-10 w-full max-w-xl space-y-10">
        
        <header className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl font-mono font-bold text-white tracking-tighter">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-slate-500 tracking-widest">{label.charAt(0)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-blue-400 font-semibold">
            <Sparkles size={12} />
            <span>Until we are back together</span>
          </div>
        </header>

        <div className="relative group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl"
            >
              <h2 className="text-xs tracking-[0.5em] uppercase text-white/40 font-bold">
                {currentContent.theme}
              </h2>
              <p className="text-3xl md:text-4xl font-serif italic text-white leading-tight">
                "{currentContent.message}"
              </p>
              <p className="text-slate-400 font-light leading-relaxed">
                {currentContent.subtext}
              </p>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={() => setActiveDay(prev => Math.max(0, prev - 1))}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={20} className="text-slate-400" />
          </button>
          <button 
            onClick={() => setActiveDay(prev => Math.min(7, prev + 1))}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={20} className="text-slate-400" />
          </button>
        </div>

<div className="space-y-4">
  <div className="relative">
    
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      />
    </div>

    <div className="absolute right-0 -top-1 translate-x-1/2">
       <motion.div
         animate={progress > 95 ? { scale: [1, 1.2, 1] } : {}}
         transition={{ repeat: Infinity, duration: 2 }}
       >
         <Heart 
           size={16} 
           className={`${progress > 99 ? "text-pink-500 fill-pink-500" : "text-slate-700"} transition-colors duration-1000`} 
         />
       </motion.div>
    </div>
  </div>

  <div className="flex justify-between items-center text-[10px] tracking-widest text-slate-500 font-bold uppercase">
    <div className="flex flex-col items-start">
      <span className="text-white/40">Day {currentDayOfTrip}</span>
      <span>Started</span>
    </div>
    
    <div className="text-center">
      <span className="text-blue-400">{progress.toFixed(1)}% Completed</span>
    </div>

    <div className="flex flex-col items-end">
      <span className={`${progress > 90 ? "text-pink-400" : "text-white/40"} transition-colors`}>Home</span>
      <span>Arrival</span>
    </div>
  </div>
</div>

      </div>

      <footer className="absolute bottom-8 flex flex-col items-center gap-2">
         <p className="text-[10px] tracking-[0.4em] text-slate-600 uppercase font-medium">Built for my world</p>
      </footer>
    </main>
  );
}