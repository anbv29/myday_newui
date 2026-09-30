import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActivePage, openHowItWorks } = useApp();

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 pt-16 pb-12">
      <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                alt="MYDAY Brand Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UhKGy1R8dKQosmoIKbaNWyYaNFQF8UfIbY7MxVU6Y4jNt9yNZCB0tdia4UxxUFRIptweMasY6QjG5xSIcpr4WJrywf-QEasFGI5N9Jnamj_sUnd4ebKkI0H0zgzCgsRRgSOoB1V-9-D6ob1DfwJDYnHMf1lpiVWPcKtn7hKIypPuQWpHdX9Bmu8q3X0As1pxQBSY1mANpasMlzbbRIG4x7E6F60iZYccXTQxqXyyCSsjl-HBZq_0kqkj4"
              />
              <span className="font-outfit text-xl text-slate-900 tracking-tight font-bold">
                MYDAY
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Immortalize dates that changed your life. Sovereign, verified, and unalterable memorial claims across the global 365-day continuum.
            </p>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-700 text-xs font-semibold uppercase tracking-wider border border-slate-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Supabase Realtime · 99.98% Live Sync
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider border border-amber-200">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                Razorpay Verified
              </span>
            </div>
          </div>

          {/* Protocol Ledger Navigation */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="font-outfit text-sm font-bold text-slate-900 uppercase tracking-wider">
              Protocol Ledger
            </span>
            <button
              onClick={() => setActivePage('3d-calendar')}
              className="text-left text-sm text-slate-600 hover:text-[#6b38d4] transition-colors py-1 cursor-pointer"
            >
              3D Matrix Grid
            </button>
            <button
              onClick={() => setActivePage('top-30-highest-paid')}
              className="text-left text-sm text-slate-600 hover:text-[#6b38d4] transition-colors py-1 cursor-pointer"
            >
              Apex Top 30 Days
            </button>
            <button
              onClick={() => setActivePage('leaderboard-and-trends')}
              className="text-left text-sm text-slate-600 hover:text-[#6b38d4] transition-colors py-1 cursor-pointer"
            >
              Historical Valuation Index
            </button>
            <button
              onClick={() => setActivePage('live-activity')}
              className="text-left text-sm text-slate-600 hover:text-[#6b38d4] transition-colors py-1 cursor-pointer"
            >
              Realtime Claim Stream
            </button>
          </div>

          {/* Immortalized Value Card */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="font-outfit text-sm font-bold text-slate-900 uppercase tracking-wider">
              Immortalized Value
            </span>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1.5">
              <span className="font-outfit text-2xl text-amber-600 font-extrabold tracking-tight">
                $420,850 USD
              </span>
              <span className="text-xs text-slate-600 leading-normal">
                Total volume transacted across 365 sovereign calendar records. Powered by high-durability immutable storage.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025 MYDAY Protocol Ltd. All calendar coordinates immutable under universal timestamp ledger.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => openHowItWorks()}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Terms of Claim
            </button>
            <button
              onClick={() => openHowItWorks()}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Privacy & Escrow
            </button>
            <button
              onClick={() => openHowItWorks()}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Documentation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
