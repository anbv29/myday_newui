import React from 'react';
import { useApp } from '../context/AppContext';

export const HowItWorksModal: React.FC = () => {
  const { isHowItWorksOpen, closeHowItWorks, setActivePage } = useApp();

  if (!isHowItWorksOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 flex flex-col gap-6 animate-in fade-in zoom-in-95">
        <button
          onClick={closeHowItWorks}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>

        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6b38d4] text-xs font-bold uppercase tracking-wider w-fit">
            <span className="material-symbols-outlined text-xs">help_outline</span>
            MYDAY Protocol Architecture
          </div>
          <h2 className="font-outfit text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            How The 3D Memorial Calendar Works
          </h2>
          <p className="text-sm text-slate-600">
            Immortalizing human stories on an unshakeable, universal 365-day sovereign continuum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6b38d4] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Only 365 Slots Exist
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every day of the calendar year is an irreplaceable coordinate. From Jan 01 to Dec 31, once a day is claimed, it cannot be duplicated.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Sovereign Outbid Rights
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Anyone can challenge an occupied date by topping the current escrow. The previous holder receives their funds back in full instantly via Razorpay.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Razorpay Escrow Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No private custody risk. All funds are backed by high-durability smart settlement webhooks, verifying provenance with zero slippage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Rich Multimedia Plaque
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Attach high-resolution photos, 48kbps voice notes, custom dedications, and physical holographic certificates sent straight to your door.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={closeHowItWorks}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              closeHowItWorks();
              setActivePage('claim-day');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#6b38d4] hover:bg-[#582cb6] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>✦ Book Your Date Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
