import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export const OutbidModal: React.FC = () => {
  const { isOutbidModalOpen, closeOutbidModal, outbidTargetSlot, placeOutbid, formatPrice, currency } = useApp();

  const slot = outbidTargetSlot;
  const currentVal = slot ? slot.settledValue : 185000;
  const minStep = currentVal >= 100000 ? 10000 : 5000;
  const defaultStake = currentVal + minStep;

  const [stakeAmount, setStakeAmount] = useState<number>(defaultStake);
  const [newTitle, setNewTitle] = useState('');
  const [handle, setHandle] = useState('@kunal_shah');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (slot) {
      setStakeAmount(slot.settledValue + minStep);
      setNewTitle(`In Honor of ${slot.title}`);
    }
  }, [slot]);

  if (!isOutbidModalOpen || !slot) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOutbid(slot.id, stakeAmount, newTitle, handle);
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // confetti fallback
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8 shadow-2xl border border-slate-200 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-2xl">gavel</span>
            <h3 className="font-outfit text-xl font-bold text-slate-900">
              Challenge {slot.month} {slot.day}
            </h3>
          </div>
          <button
            onClick={closeOutbidModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Current vs Target Bid */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Current Valuation ({slot.patron}):</span>
            <span className="font-bold text-slate-900 font-mono">
              {formatPrice(slot.settledValue)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-amber-800 font-semibold">Minimum Outbid Step:</span>
            <span className="font-outfit text-lg font-black text-amber-600 font-mono">
              {formatPrice(currentVal + minStep)}
            </span>
          </div>
        </div>

        {/* Outbid Form Fields */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">
              Your Outbid Stake ({currency})
            </label>
            <div className="mt-1 p-2 rounded-xl bg-slate-50 border border-slate-300 flex items-center focus-within:ring-2 focus-within:ring-amber-500 focus-within:bg-white">
              <span className="text-lg text-slate-700 px-2 font-bold font-mono">
                {currency === 'USD' ? '$' : '₹'}
              </span>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                min={currentVal + minStep}
                step={5000}
                className="w-full bg-transparent px-2 font-outfit text-xl font-bold text-amber-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">
              New Memorial Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. In Memory of Our Infinite Horizons"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6b38d4] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">
              Your Patron Handle
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@handle"
              className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#6b38d4] focus:bg-white transition-all font-mono"
            />
          </div>
        </div>

        {/* Escrow Terms Note */}
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
          <span className="material-symbols-outlined text-amber-600 text-base shrink-0 mt-0.5">verified_user</span>
          <p>
            Funds are locked in high-security Razorpay Escrow. If the current holder counter-bids within 24h, your stake is returned instantly with 0% deduction.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={closeOutbidModal}
            className="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isProcessing || stakeAmount < currentVal + minStep}
            onClick={handleConfirm}
            className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-600 text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Locking Escrow...
              </span>
            ) : (
              <span>Confirm {formatPrice(stakeAmount)}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
