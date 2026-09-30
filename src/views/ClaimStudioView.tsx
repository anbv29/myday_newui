import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MONTH_NAMES } from '../data/mockData';
import confetti from 'canvas-confetti';

export const ClaimStudioView: React.FC = () => {
  const {
    formatPrice,
    currency,
    slots,
    claimNewDate,
    bookingPrefill,
    navigateToDossier
  } = useApp();

  const [month, setMonth] = useState('OCT');
  const [day, setDay] = useState(14);
  const [year, setYear] = useState('2025');
  const [selectedTier, setSelectedTier] = useState<'standard' | 'gold' | 'obsidian'>('gold');

  const [milestoneTitle, setMilestoneTitle] = useState('The Day We Adopted Bruno');
  const [dedicationStory, setDedicationStory] = useState(
    'He looked at us with those amber eyes in the rain, and we knew he had found his forever home. October 14 changed our universe completely.'
  );
  const [handle, setHandle] = useState('@kunal_shah');
  const [referenceUrl, setReferenceUrl] = useState('https://instagram.com/p/bruno_forever');
  const [isPublicStoryboard, setIsPublicStoryboard] = useState(true);
  const [receiptContact, setReceiptContact] = useState('+91 98765 43210 / me@domain.com');

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Apply prefill if routed from elsewhere
  useEffect(() => {
    if (bookingPrefill) {
      if (bookingPrefill.month) setMonth(bookingPrefill.month);
      if (bookingPrefill.day) setDay(bookingPrefill.day);
      if (bookingPrefill.year) setYear(bookingPrefill.year);
    }
  }, [bookingPrefill]);

  // Check if date is claimed in existing slots
  const matchingSlot = slots.find(
    s => s.month.toUpperCase() === month.toUpperCase() && s.day === day && s.status !== 'unclaimed'
  );

  const isClaimed = !!matchingSlot;
  const basePrice = isClaimed ? matchingSlot.settledValue + 10000 : 2999;
  const tierCost = selectedTier === 'obsidian' ? 24999 : selectedTier === 'gold' ? 9999 : 0;
  const subtotal = (isClaimed ? basePrice : 0) + (selectedTier === 'standard' && !isClaimed ? 2999 : tierCost);
  const gstAmount = Math.round(subtotal * 0.18);
  const totalPayable = subtotal + gstAmount;

  const inspirationPrompts = [
    "The day we looked out at the ocean and whispered 'yes' to forever.",
    "Launched our prototype from a crowded kitchen table. The world changed.",
    "Brought home our little girl from the hospital under a canopy of autumn leaves.",
    "He looked at us with those amber eyes in the rain, and we knew he had found his forever home.",
    "The midnight phone call that told us we had won the national grant."
  ];

  const handleInspiration = () => {
    const next = inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)];
    setDedicationStory(next);
  };

  const handleSwitchToOct15 = () => {
    setMonth('OCT');
    setDay(15);
  };

  const handleInitRazorpay = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsRazorpayModalOpen(true);
    }, 700);
  };

  const handleConfirmPayment = () => {
    setIsRazorpayModalOpen(false);
    setPaymentSuccess(true);

    const newSlotId = claimNewDate({
      month,
      day,
      title: milestoneTitle,
      story: dedicationStory,
      handle,
      tier: selectedTier,
      amount: totalPayable,
      referenceUrl
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // confetti
    }

    setTimeout(() => {
      navigateToDossier(newSlotId);
    }, 2000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex justify-center px-4 sm:px-6 lg:px-8 py-8 bg-[#f8fafc]">
      <div className="flex flex-col w-full max-w-[1400px] mx-auto gap-6 pb-24">
        {/* Progress Flow Ribbon */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm flex items-center justify-between overflow-x-auto text-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-1.5 rounded-xl bg-purple-100 text-[#6b38d4] border border-purple-200 shadow-sm">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6b38d4] text-white text-xs font-bold font-outfit">
              1
            </span>
            <span className="font-outfit text-sm truncate font-semibold">1. Select Date & Tier</span>
          </div>

          <span className="material-symbols-outlined text-slate-400 mx-1">chevron_right</span>

          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-1.5 rounded-xl text-slate-500">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold font-outfit">
              2
            </span>
            <span className="font-outfit text-sm truncate font-medium">2. Story & Dedication</span>
          </div>

          <span className="material-symbols-outlined text-slate-400 mx-1">chevron_right</span>

          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-1.5 rounded-xl text-slate-500">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold font-outfit">
              3
            </span>
            <span className="font-outfit text-sm truncate font-medium">3. Attribution Proof</span>
          </div>

          <span className="material-symbols-outlined text-slate-400 mx-1">chevron_right</span>

          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-1.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-800">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold font-outfit">
              4
            </span>
            <span className="font-outfit text-sm truncate font-semibold">4. Razorpay Secure</span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {paymentSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-2xl">verified</span>
              <div>
                <span className="font-outfit font-bold block text-sm">
                  Date Successfully Inscribed & Escrow Locked!
                </span>
                <span className="text-xs text-emerald-700">
                  Universal timestamp generated on permanent ledger. Redirecting to your new live plaque...
                </span>
              </div>
            </div>
            <span className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
          </div>
        )}

        {/* Primary 3-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: Date Valuation & Tier Selection (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Target Epoch Picker Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6b38d4]">calendar_month</span>
                  <h2 className="font-outfit text-xl text-slate-900 font-bold">Target Epoch</h2>
                </div>
                <span className="text-[11px] uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200 font-outfit">
                  UTC-00:00
                </span>
              </div>

              {/* Custom Date Selectors */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <label className="text-[11px] text-slate-500 mb-1 uppercase font-bold font-outfit">
                    Month
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6b38d4] focus:bg-white"
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] text-slate-500 mb-1 uppercase font-bold font-outfit">
                    Day
                  </label>
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6b38d4] focus:bg-white"
                  >
                    {Array.from({ length: 31 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] text-slate-500 mb-1 uppercase font-bold font-outfit">
                    Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6b38d4] focus:bg-white"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="All-Time">All-Time</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Valuation Inspector */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold font-outfit ${
                      isClaimed
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isClaimed ? 'bg-amber-600 animate-pulse' : 'bg-emerald-600'
                      }`}
                    ></span>
                    {isClaimed ? 'CLAIMED · HIGH ACTIVITY' : 'VIRGIN · UNCLAIMED'}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold font-mono">
                    {matchingSlot?.rank ? `Rank #${matchingSlot.rank} Apex` : 'Open Floor'}
                  </span>
                </div>

                <div className="flex flex-col mt-1 text-xs">
                  <span className="text-slate-500">{isClaimed ? 'Current Holder' : 'Base Floor Price'}</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-outfit text-sm text-slate-900 flex items-center gap-1.5 font-bold">
                      <span className={`w-2 h-2 rounded-full ${isClaimed ? 'bg-sky-600' : 'bg-emerald-500'}`}></span>
                      {isClaimed ? matchingSlot.patron : 'Unoccupied'}
                    </span>
                    <span className="font-outfit text-base text-slate-900 font-bold font-mono">
                      {formatPrice(isClaimed ? matchingSlot.settledValue : 2999)}
                    </span>
                  </div>
                </div>

                {isClaimed && (
                  <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 mt-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Min. Outbid Step:</span>
                      <span className="text-[#6b38d4] font-bold font-mono">
                        {formatPrice(basePrice)} (+₹10k)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Outbidding grants perpetual lock rights unless surrendered.
                    </p>
                  </div>
                )}
              </div>

              {/* Unclaimed Recommendation Strip */}
              {isClaimed && (
                <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-lg">auto_awesome</span>
                    <div className="flex flex-col">
                      <span className="font-outfit text-xs text-slate-900 font-bold">October 15 is Unclaimed</span>
                      <span className="text-[11px] text-slate-500">Instant Claim from {formatPrice(2999)} base</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSwitchToOct15}
                    className="px-3 py-1 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-[#6b38d4] hover:text-white hover:border-[#6b38d4] transition-colors shadow-sm cursor-pointer"
                  >
                    Switch
                  </button>
                </div>
              )}
            </div>

            {/* Dedication Prestige Tier Selection */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-3">
              <h3 className="font-outfit text-base text-slate-900 mb-1 flex items-center justify-between font-bold">
                <span>Dedication Prestige Tier</span>
                <span className="text-xs text-[#6b38d4] uppercase font-bold font-mono">Select 1 of 3</span>
              </h3>

              {/* Tier 1: Standard */}
              <label
                onClick={() => setSelectedTier('standard')}
                className={`cursor-pointer group flex items-start justify-between p-4 rounded-2xl border transition-all shadow-sm ${
                  selectedTier === 'standard'
                    ? 'bg-purple-50/50 border-[#6b38d4] ring-2 ring-[#6b38d4]/20'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="tier"
                    value="standard"
                    checked={selectedTier === 'standard'}
                    onChange={() => setSelectedTier('standard')}
                    className="mt-1 accent-[#6b38d4]"
                  />
                  <div className="flex flex-col">
                    <span className="font-outfit text-sm text-slate-900 font-bold">
                      Standard Dedication
                    </span>
                    <span className="text-xs text-slate-500 leading-normal">
                      Digital Plaque + Immutable Ledger Record + GST Invoice
                    </span>
                  </div>
                </div>
                <span className="font-outfit text-sm text-slate-900 font-bold font-mono">
                  {formatPrice(2999)}
                </span>
              </label>

              {/* Tier 2: Gold Immortality (Default) */}
              <label
                onClick={() => setSelectedTier('gold')}
                className={`cursor-pointer group flex items-start justify-between p-4 rounded-2xl border-2 transition-all shadow-md relative overflow-hidden ${
                  selectedTier === 'gold'
                    ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-300/40'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3 z-10">
                  <input
                    type="radio"
                    name="tier"
                    value="gold"
                    checked={selectedTier === 'gold'}
                    onChange={() => setSelectedTier('gold')}
                    className="mt-1 accent-amber-600"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-outfit text-sm text-amber-900 font-bold">
                        Gold Immortality
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase font-black tracking-wider shadow-sm font-outfit">
                        Popular
                      </span>
                    </div>
                    <span className="text-xs text-amber-800 mt-0.5 font-medium leading-normal">
                      3D Prismatic Hologram + Dedicated Audio Note + 1-Yr Outbid Shield
                    </span>
                  </div>
                </div>
                <span className="font-outfit text-base text-amber-800 font-extrabold font-mono z-10">
                  {formatPrice(9999)}
                </span>
              </label>

              {/* Tier 3: Obsidian Crown */}
              <label
                onClick={() => setSelectedTier('obsidian')}
                className={`cursor-pointer group flex items-start justify-between p-4 rounded-2xl border transition-all shadow-sm ${
                  selectedTier === 'obsidian'
                    ? 'bg-sky-50/60 border-sky-600 ring-2 ring-sky-300/40'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="tier"
                    value="obsidian"
                    checked={selectedTier === 'obsidian'}
                    onChange={() => setSelectedTier('obsidian')}
                    className="mt-1 accent-sky-600"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-outfit text-sm text-sky-800 font-bold">
                        Obsidian Crown
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 uppercase font-black border border-sky-200 font-outfit">
                        Sovereign
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-0.5 leading-normal">
                      Top 30 Apex Hall of Fame + Bespoke 3D Token Render + Physical Certificate
                    </span>
                  </div>
                </div>
                <span className="font-outfit text-sm text-slate-900 font-bold font-mono">
                  {formatPrice(24999)}
                </span>
              </label>
            </div>
          </div>

          {/* COLUMN 2: Canvas & Testimony (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <span className="text-xs text-[#6b38d4] uppercase tracking-wider font-bold font-outfit">
                  Canvas & Testimony
                </span>
                <h2 className="font-outfit text-xl text-slate-900 mt-0.5 font-bold">
                  Memorial Composition
                </h2>
              </div>

              {/* Title of Milestone */}
              <div className="flex flex-col gap-1">
                <label className="font-outfit text-sm text-slate-900 font-semibold">
                  Milestone Title
                </label>
                <input
                  type="text"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  maxLength={60}
                  placeholder="e.g. Our Wedding at Lake Como, Genesis Launch"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b38d4] focus:bg-white shadow-sm font-medium"
                />
                <span className="text-[11px] text-slate-500 text-right font-mono">
                  {milestoneTitle.length} / 60 max
                </span>
              </div>

              {/* Dedication Story */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="font-outfit text-sm text-slate-900 font-semibold">
                    Dedication Story
                  </label>
                  <button
                    type="button"
                    onClick={handleInspiration}
                    className="text-xs text-amber-700 font-bold uppercase font-outfit hover:underline cursor-pointer"
                  >
                    Need Inspiration?
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={dedicationStory}
                  onChange={(e) => setDedicationStory(e.target.value)}
                  maxLength={500}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b38d4] focus:bg-white shadow-sm resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Markdown supported (bold, italic, links)</span>
                  <span className="font-mono">{dedicationStory.length} / 500</span>
                </div>
              </div>

              {/* Attribution & Privacy */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
                <h3 className="font-outfit text-sm text-slate-900 font-bold">
                  Attribution & Privacy
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="uppercase font-bold text-slate-500 font-outfit">
                      Attribution Handle
                    </label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="@name or Anonymous"
                      className="bg-white border border-slate-300 text-slate-900 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-[#6b38d4]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="uppercase font-bold text-slate-500 font-outfit">
                      Reference URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={referenceUrl}
                      onChange={(e) => setReferenceUrl(e.target.value)}
                      placeholder="https://..."
                      className="bg-white border border-slate-300 text-slate-900 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-[#6b38d4]"
                    />
                  </div>
                </div>

                {/* Public Storyboard Toggle */}
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-200 bg-white p-3 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-outfit text-xs text-slate-900 font-bold">
                      Public Storyboard
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Allow global visitors to read your story on the 3D globe
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPublicStoryboard}
                    onChange={(e) => setIsPublicStoryboard(e.target.checked)}
                    className="w-5 h-5 accent-[#6b38d4] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Commemorative Photograph Uploader */}
              <div className="flex flex-col gap-1">
                <label className="font-outfit text-sm text-slate-900 font-semibold">
                  Commemorative Photograph
                </label>
                <div className="group relative rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-purple-400 transition-all overflow-hidden shadow-sm">
                  <img
                    alt="Bruno the dog memory preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO7l3Xe6nc8k2QWvUAmtN7IBRwGrLotI3nn7375C-8Lv6xZY8Ga8FC4zjWCuQ214oDddBcLvxgIDUsAVIUJyOQiz_YPQa_cDLlnJ5wc3Wwo1uzqT4cAkjiBl8AnUyu3iLuPODgfOLXMVFUzwrlzZnQYDxII9-2fLM8FuM7ozy5i9oELys8mEdNh8jjJ4v9zEj7NvR-EHDRtsrj6y7syNoi8VJPPb8BrwiYroPpIXVuXXdmcrT1uv9V"
                  />
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-[#6b38d4] text-3xl">
                      cloud_upload
                    </span>
                    <span className="font-outfit text-sm text-slate-900 font-bold">
                      Photograph Attached: bruno_forever.jpg
                    </span>
                    <span className="text-xs text-slate-500">
                      PNG, JPG, HEIC up to 25MB · Encrypted storage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Real-Time Plaque Preview & Razorpay Payment Module (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg relative overflow-hidden flex flex-col gap-4">
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs uppercase text-amber-700 font-bold tracking-widest flex items-center gap-1 font-outfit">
                  <span className="material-symbols-outlined text-base text-amber-600">verified</span>
                  Live Plaque Inscription
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-mono font-bold">
                  HASH: #{month}{day}-99X
                </span>
              </div>

              {/* Physical-style Plaque Inscription Preview */}
              <div className="relative z-10 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-purple-50 border-2 border-amber-200 p-5 shadow-md flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#6b38d4] uppercase font-bold tracking-widest font-outfit">
                      PERPETUAL DATE TOKEN
                    </span>
                    <span className="font-outfit text-3xl font-extrabold text-slate-900 tracking-tight">
                      {month} {day}
                    </span>
                    <span className="text-xs text-amber-700 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {selectedTier === 'obsidian'
                        ? 'Obsidian Crown Tier'
                        : selectedTier === 'gold'
                        ? 'Gold Immortality Tier'
                        : 'Standard Dedication'}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 border border-amber-400 flex items-center justify-center text-white shadow-md">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 3v18"></path>
                      <path d="M3 12h18"></path>
                      <circle cx="12" cy="12" fill="currentColor" fillOpacity="0.3" r="4"></circle>
                    </svg>
                  </div>
                </div>

                <div className="h-px w-full bg-amber-200/80 my-0.5"></div>

                <div className="flex flex-col gap-1">
                  <h4 className="font-outfit text-base text-slate-900 font-bold truncate">
                    {milestoneTitle || 'Untitled Milestone'}
                  </h4>
                  <p className="text-xs text-slate-700 line-clamp-3 italic leading-relaxed">
                    “{dedicationStory || 'No dedication narrative added yet.'}”
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#6b38d4] text-white flex items-center justify-center font-bold text-[10px]">
                      K
                    </div>
                    <span className="text-slate-800 font-bold font-mono">
                      {handle || '@anonymous'}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px] border border-amber-200">
                    LEDGER #84920
                  </span>
                </div>
              </div>

              {/* Ledger & Fee Breakdown */}
              <div className="relative z-10 flex flex-col gap-2 pt-1 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Date Claim / Outbid Escrow</span>
                  <span className="text-slate-900 font-bold font-mono">
                    {formatPrice(isClaimed ? basePrice : 2999)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Immortality Tier Upgrade</span>
                  <span className="text-slate-900 font-bold font-mono">
                    {selectedTier === 'standard' ? '₹0' : formatPrice(tierCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Permanent Ledger & Archival Gas</span>
                  <span className="text-amber-700 font-bold">₹0 (Waived)</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Government GST (18%)</span>
                  <span className="text-slate-900 font-bold font-mono">
                    {formatPrice(gstAmount)}
                  </span>
                </div>

                <div className="h-px w-full bg-slate-200 my-1"></div>

                <div className="flex justify-between items-baseline">
                  <div className="flex flex-col">
                    <span className="font-outfit text-base text-slate-900 font-bold">
                      Total Payable
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Instant Razorpay Settlement
                    </span>
                  </div>
                  <span className="font-outfit text-2xl font-black text-amber-700 font-mono">
                    {formatPrice(totalPayable)}
                  </span>
                </div>
              </div>

              {/* Razorpay Module Container */}
              <div className="relative z-10 flex flex-col gap-3 pt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 font-outfit">
                    Phone or Email for GST Receipt
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={receiptContact}
                      onChange={(e) => setReceiptContact(e.target.value)}
                      placeholder="+91 98765 43210 / me@domain.com"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white shadow-sm font-medium"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-base">
                      lock
                    </span>
                  </div>
                </div>

                {/* Razorpay Trigger Button */}
                <button
                  type="button"
                  disabled={isCheckingOut}
                  onClick={handleInitRazorpay}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-outfit text-sm font-bold tracking-wide active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-amber-400"
                  style={{
                    background: 'linear-gradient(135deg, rgb(217, 119, 6) 0%, rgb(180, 83, 9) 100%)',
                    boxShadow: '0 4px 18px rgba(217, 119, 6, 0.35)'
                  }}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Initializing Razorpay Gateway...</span>
                    </span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg text-amber-200">
                        verified_user
                      </span>
                      <span>Pay {formatPrice(totalPayable)} & Immortalize Date ✦</span>
                    </>
                  )}
                </button>

                <div className="flex flex-col gap-1.5 pt-1 text-center text-xs">
                  <div className="flex items-center justify-center gap-2 text-slate-500 font-outfit font-bold uppercase text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-emerald-600">lock</span>
                      256-Bit SSL
                    </span>
                    <span>•</span>
                    <span>UPI & Cards</span>
                    <span>•</span>
                    <span>NetBanking & EMI</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Powered by Razorpay · Webhook Instant Verification to Supabase Realtime Ledger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Razorpay Simulation Modal */}
        {isRazorpayModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 animate-in fade-in">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                  <div>
                    <span className="font-outfit font-bold text-sm block">Razorpay Trusted Checkout</span>
                    <span className="text-[10px] text-slate-400 font-mono">Merchant: MYDAY Protocol Escrow</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsRazorpayModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {/* Amount Pill */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Total Escrow Authorization:</span>
                <span className="font-outfit text-base font-extrabold text-slate-900 font-mono">
                  {formatPrice(totalPayable)}
                </span>
              </div>

              {/* Payment Methods */}
              <div className="flex flex-col gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="p-3 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 flex items-center justify-between transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#6b38d4] text-xl">qr_code_2</span>
                    <div>
                      <span className="font-bold text-slate-900 block">UPI QR / Instant Pay</span>
                      <span className="text-slate-500 text-[11px]">Google Pay, PhonePe, Paytm, BHIM</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-between transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-slate-700 text-xl">credit_card</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Credit / Debit Cards</span>
                      <span className="text-slate-500 text-[11px]">Visa, Mastercard, RuPay, Amex</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-between transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-slate-700 text-xl">account_balance</span>
                    <div>
                      <span className="font-bold text-slate-900 block">NetBanking</span>
                      <span className="text-slate-500 text-[11px]">All Indian & Global Banks</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>
              </div>

              {/* Simulated Complete Button */}
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Authorize & Lock Escrow</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
