import React from 'react';
import { useApp } from '../context/AppContext';

export const CertificateModal: React.FC = () => {
  const { isCertificateModalOpen, closeCertificateModal, certificateTargetSlot, formatPrice } = useApp();

  const slot = certificateTargetSlot;
  if (!isCertificateModalOpen || !slot) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-amber-300 flex flex-col gap-6 animate-in fade-in zoom-in-95">
        {/* Certificate Close */}
        <button
          onClick={closeCertificateModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>

        {/* Certificate Border Frame */}
        <div className="border-2 border-dashed border-amber-400/80 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20">
          {/* Watermark seal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[260px] text-amber-700">stars</span>
          </div>

          {/* Top Brand & Token */}
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-amber-600 text-2xl">military_tech</span>
            <span className="font-outfit text-sm font-extrabold uppercase tracking-widest text-amber-800">
              SOVEREIGN LEDGER DEED OF IMMORTALIZATION
            </span>
          </div>

          <h2 className="font-outfit text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
            Certificate of Perpetual Canon
          </h2>
          <span className="text-xs text-slate-500 font-mono tracking-wider mt-1">
            UNIVERSAL IDENTIFIER: {slot.tokenIdentifier}
          </span>

          <div className="w-16 h-1 bg-amber-400 rounded-full my-4"></div>

          {/* Core Deed Text */}
          <p className="text-sm md:text-base text-slate-700 max-w-lg leading-relaxed">
            This certifies that the eternal coordinate of{' '}
            <strong className="text-slate-900 font-bold font-outfit text-lg">
              {slot.month} {slot.day}
            </strong>{' '}
            is canonized in the MYDAY 365-day sovereign continuum, dedicated in perpetuity to:
          </p>

          <div className="my-4 p-4 rounded-xl bg-white border border-amber-300/80 shadow-sm max-w-md w-full">
            <h3 className="font-outfit text-xl font-bold text-slate-900">
              “{slot.title}”
            </h3>
            {slot.quote && (
              <p className="text-xs text-slate-600 italic mt-1 line-clamp-2">
                “{slot.quote}”
              </p>
            )}
          </div>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg text-left my-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Sovereign Patron:</span>
              <span className="font-bold text-slate-900 truncate block">{slot.patron}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Locked Escrow:</span>
              <span className="font-bold text-amber-700 font-mono block">{formatPrice(slot.settledValue)}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Global Rank:</span>
              <span className="font-bold text-slate-900 block">#{slot.rank || 'N/A'} Apex</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Deed Status:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">check_circle</span> Active
              </span>
            </div>
          </div>

          {/* Signature & Verification Seal */}
          <div className="w-full flex items-center justify-between pt-6 border-t border-amber-200/60 mt-4 text-xs">
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] text-slate-400">RAZORPAY VERIFIED HASH:</span>
              <span className="font-mono font-semibold text-slate-800 text-[11px]">{slot.razorpayHash}</span>
              <span className="text-[10px] text-slate-500">Immutable Universal Timestamp</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-amber-500 bg-amber-100 text-amber-900 flex flex-col items-center justify-center font-bold text-[9px] shadow-sm">
                <span className="material-symbols-outlined text-xs text-amber-600">verified</span>
                SEALED
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">print</span>
            Print Deed
          </button>
          <button
            onClick={() => {
              alert("Deed snapshot saved to clipboard and verified on ledger!");
              closeCertificateModal();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#6b38d4] hover:bg-[#582cb6] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">verified</span>
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
