import React from 'react';
import { useApp } from '../context/AppContext';

export const StickyCta: React.FC = () => {
  const { setActivePage, formatPrice } = useApp();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 w-full max-w-4xl mx-auto px-4 pointer-events-none">
      <div className="pointer-events-auto p-3 md:px-6 md:py-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl flex items-center justify-between gap-4 transition-transform hover:scale-[1.01]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold shadow-sm shrink-0"
            style={{
              backgroundColor: 'rgb(67, 56, 202)',
              boxShadow: 'rgba(67, 56, 202, 0.25) 0px 2px 10px'
            }}
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
          </div>
          <div className="flex flex-col">
            <span className="font-outfit text-sm md:text-base text-slate-900 font-bold leading-tight">
              Ready to claim your milestone?
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              24 dates permanently sealed in last 24h
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-outfit text-sm text-amber-600 font-extrabold hidden md:inline">
            From {formatPrice(2999)}
          </span>
          <button
            onClick={() => setActivePage('claim-day')}
            className="px-4 py-2.5 rounded-xl text-white font-outfit text-xs md:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgb(67, 56, 202) 0%, rgb(180, 83, 9) 100%)',
              boxShadow: 'rgba(67, 56, 202, 0.35) 0px 6px 20px'
            }}
          >
            Claim Your Date Now
          </button>
        </div>
      </div>
    </div>
  );
};
