import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const DossierView: React.FC = () => {
  const {
    selectedSlot,
    formatPrice,
    openOutbidModal,
    openCertificateModal,
    addBlessing,
    navigateToClaim,
    navigateToDossier
  } = useApp();

  const slot = selectedSlot;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [blessingInputText, setBlessingInputText] = useState('');
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio synth simulation for Voice Note Dedication
  const togglePlayAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    } else {
      setIsPlayingAudio(true);
      // Play a soft bell chord using browser AudioContext
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, audioCtx.currentTime); // 528 Hz harmonic love frequency
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 3);
      } catch (e) {
        // AudioContext fallback
      }

      audioIntervalRef.current = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 45) {
            setIsPlayingAudio(false);
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handlePostBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blessingInputText.trim()) return;
    addBlessing(slot.id, blessingInputText);
    setBlessingInputText('');
  };

  const minOutbid = slot.settledValue + (slot.settledValue >= 100000 ? 10000 : 5000);

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient Atmospheric Radiant Conduits */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] bg-gradient-to-b from-amber-200/25 via-purple-200/30 to-transparent blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-[48rem] right-0 w-[42rem] h-[30rem] bg-gradient-to-l from-indigo-200/20 via-purple-100/30 to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* 1. DATE DOSSIER HERO PLAQUE */}
        <section className="relative rounded-3xl bg-white/95 border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)] overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-100/60 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-purple-100/60 blur-3xl pointer-events-none"></div>

          {/* Overline Metadata Matrix */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 font-outfit text-xs uppercase tracking-widest shadow-sm flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                DATE DOSSIER #{slot.id.replace('slot-', '')}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-xs uppercase tracking-wider text-slate-600 font-bold font-outfit">
                SOVEREIGN CANON
              </span>
              <span className="text-slate-300">/</span>
              <span className="px-3 py-0.5 rounded-full bg-amber-100/70 text-amber-900 border border-amber-300/50 text-xs tracking-widest uppercase font-bold font-outfit">
                {slot.rank ? `RANK #${slot.rank} GLOBALLY` : 'SOVEREIGN TIER'}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs uppercase font-bold font-outfit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              IMMUTABLE LEDGER ACTIVE
            </div>
          </div>

          {/* Center Hero Grid: Date Medal + Valuation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* 3D Sunburst Plaque Display (Col 1-5) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group cursor-pointer w-full max-w-sm aspect-square rounded-2xl bg-gradient-to-br from-amber-300 via-amber-200/50 to-[#6b38d4]/30 p-1 shadow-2xl hover:shadow-[0_20px_50px_rgba(217,119,6,0.25)] transition-all duration-500 hover:scale-[1.02] border border-amber-300/80">
                <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-white via-amber-50/40 to-slate-50/90 backdrop-blur-xl p-6 flex flex-col justify-between items-center text-center relative overflow-hidden border border-white shadow-inner">
                  <div className="absolute inset-0 bg-radial from-amber-200/40 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                  <div className="w-full flex justify-between items-center z-10">
                    <span className="text-xs uppercase text-amber-900 font-extrabold tracking-widest flex items-center gap-1 bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1 rounded-full border border-amber-300/80 shadow-sm font-outfit">
                      <span className="material-symbols-outlined text-sm text-amber-600">stars</span>
                      {slot.tier === 'apex' ? 'APEX TIER' : 'LUMINOUS TIER'}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold tracking-wider font-mono">
                      DAY {slot.dayOfYear}/365
                    </span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center z-10">
                    <span className="font-outfit text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 bg-clip-text text-transparent drop-shadow-sm">
                      {slot.day}
                    </span>
                    <span className="font-outfit text-3xl sm:text-4xl tracking-widest uppercase text-slate-900 font-black -mt-2">
                      {slot.month === 'JUL' ? 'JULY' : slot.month === 'OCT' ? 'OCTOBER' : slot.month}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-[0.25em] mt-1 font-outfit">
                      ETERNAL COORDINATE
                    </span>
                  </div>

                  <div className="w-full z-10 flex items-center justify-between pt-2 text-slate-500 border-t border-amber-200/60">
                    <span className="text-xs font-bold tracking-widest text-slate-700 uppercase font-outfit">
                      {slot.dedicationType || 'PERPETUAL SOVEREIGNTY'}
                    </span>
                    <span className="material-symbols-outlined text-amber-600 text-lg">verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Valuation Dossier Information & CTAs (Col 6-12) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Valuation Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/40 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
                <div className="flex flex-col gap-1 z-10">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-bold font-outfit">
                    CURRENT RECOGNIZED VALUATION
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-outfit text-3xl sm:text-4xl font-black text-amber-600 tracking-tight font-mono">
                      {formatPrice(slot.settledValue)}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      (${Math.round(slot.settledValue / 83.5).toLocaleString()} USD)
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 flex items-center gap-1.5 pt-1">
                    <span>Held by sovereign patron:</span>
                    <span className="font-semibold text-[#6b38d4] inline-flex items-center gap-1 font-mono">
                      {slot.patron}
                      <span className="material-symbols-outlined text-xs text-amber-500">verified</span>
                    </span>
                  </p>
                </div>

                {/* Sparkline */}
                <div className="hidden sm:flex flex-col items-end gap-1 z-10">
                  <span className="text-xs uppercase text-slate-500 font-bold font-outfit">
                    HISTORICAL GAIN
                  </span>
                  <span className="font-outfit text-base font-bold text-emerald-600 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-base">trending_up</span> +6,068%
                  </span>
                  <svg className="w-32 h-10 text-amber-500" fill="none" viewBox="0 0 120 40">
                    <path d="M0 38 L30 35 L60 26 L90 14 L120 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                    <path d="M0 38 L30 35 L60 26 L90 14 L120 4 V40 H0 Z" fill="currentColor" fillOpacity="0.18"></path>
                  </svg>
                </div>
              </div>

              {/* Description Brief */}
              <p className="text-base text-slate-600 leading-relaxed">
                {slot.quote ||
                  "July 20th encapsulates humanity's highest celestial achievement and an immutable covenant of romantic devotion. A high-demand apex day governed by sovereign auction rights under MYDAY Protocol."}
              </p>

              {/* Action Buttons Suite */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => openOutbidModal(slot)}
                  className="flex-1 min-w-[240px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-outfit text-sm font-extrabold uppercase tracking-wider shadow-md hover:shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">gavel</span>
                  <span>Challenge / Outbid (Min {formatPrice(minOutbid)})</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Memorial dedication link copied to clipboard!");
                    }
                  }}
                  className="px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-outfit text-sm font-semibold transition-all flex items-center gap-2 shadow-sm hover:border-purple-300 hover:text-[#6b38d4] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-[#6b38d4]">share</span>
                  <span>Share Dedication ↗</span>
                </button>

                <button
                  onClick={() => openCertificateModal(slot)}
                  className="px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-outfit text-sm font-semibold transition-all flex items-center gap-2 shadow-sm hover:border-amber-400 hover:text-amber-800 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-amber-600">verified</span>
                  <span>Official Certificate</span>
                </button>
              </div>

              {/* Micro-Trust Badges */}
              <div className="flex items-center gap-4 pt-1 text-slate-500 text-xs font-outfit">
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm text-emerald-600">security</span> ESCROW GUARANTEE
                </span>
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm text-[#6b38d4]">history_edu</span> PERPETUAL DEED
                </span>
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm text-amber-600">flash_on</span> INSTANT SETTLEMENT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE DEDICATION STORY PLAQUE (FEATURED STORY) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Story Container (Col 1-8) */}
          <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-[#6b38d4] border border-purple-200 text-xs font-bold uppercase tracking-wider font-outfit">
                  ✦ CANONICAL MEMORIAL DEDICATION
                </span>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Recorded: {slot.recordedAt}</span>
                </div>
              </div>

              {/* Title & Beneficiaries */}
              <div className="flex flex-col gap-1">
                <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  {slot.title}
                </h2>
                <div className="flex items-center gap-3 flex-wrap text-sm text-slate-600">
                  <span>
                    Dedicated with endless love to:{' '}
                    <strong className="text-[#6b38d4] font-semibold">
                      {slot.dedicatedTo || 'Sarah & The Dreamers'}
                    </strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    Attributed by:
                    <span className="text-slate-900 font-bold font-mono">{slot.patron}</span>
                    <span className="material-symbols-outlined text-amber-500 text-xs">verified</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Grand Editorial Quote */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="material-symbols-outlined absolute top-3 left-3 text-slate-300 text-5xl pointer-events-none select-none">
                format_quote
              </span>
              <p className="relative z-10 font-outfit text-base sm:text-lg text-slate-800 leading-relaxed italic pl-6">
                “{slot.quote || 'Two giant leaps: mankind landing on the lunar surface in 1969, and Sarah saying yes under the stars in 2021. This date is forever etched as the day courage met destiny. May our journey know no earthly ceiling.'}”
              </p>
            </div>

            {/* Audio Dedication Player Pill */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-500/5 via-amber-50/40 to-purple-500/5 border border-purple-300/30">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={togglePlayAudio}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6b38d4] to-violet-700 text-white flex items-center justify-center shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0 ring-2 ring-[#6b38d4]/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isPlayingAudio ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex flex-col">
                  <span className="font-outfit text-sm font-bold text-slate-900">
                    Voice Note Dedication
                  </span>
                  <span className="text-xs text-slate-500">
                    {isPlayingAudio ? 'Transmitting audio note from patron...' : 'Personal voice transmission from the patron'}
                  </span>
                </div>
              </div>

              {/* Animated Equalizer Waveform */}
              <div className="flex items-center gap-1.5 w-full sm:w-48 justify-end">
                <div className={`w-1 h-3 bg-[#6b38d4] rounded-full ${isPlayingAudio ? 'animate-pulse' : ''}`}></div>
                <div className={`w-1 h-6 bg-[#6b38d4] rounded-full ${isPlayingAudio ? 'animate-bounce' : ''}`}></div>
                <div className={`w-1 h-8 bg-amber-500 rounded-full ${isPlayingAudio ? 'animate-pulse' : ''}`}></div>
                <div className={`w-1 h-4 bg-[#6b38d4] rounded-full ${isPlayingAudio ? 'animate-bounce' : ''}`}></div>
                <div className={`w-1 h-7 bg-amber-600 rounded-full ${isPlayingAudio ? 'animate-pulse' : ''}`}></div>
                <div className={`w-1 h-10 bg-[#6b38d4] rounded-full ${isPlayingAudio ? 'animate-bounce' : ''}`}></div>
                <div className={`w-1 h-5 bg-amber-500 rounded-full ${isPlayingAudio ? 'animate-pulse' : ''}`}></div>
                <div className="w-1 h-3 bg-slate-300 rounded-full"></div>
                <div className={`w-1 h-6 bg-[#6b38d4] rounded-full ${isPlayingAudio ? 'animate-pulse' : ''}`}></div>
                <span className="font-outfit text-sm text-amber-700 font-bold pl-2 font-mono">
                  {isPlayingAudio ? `0:${String(audioProgress).padStart(2, '0')}` : (slot.audioDuration || '0:45')}
                </span>
              </div>
            </div>

            {/* Attached Memory Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] shadow-sm border border-slate-200">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Apollo 11 lunar landing archive"
                  src={slot.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCFdjN4lx26NLGAVOvwIl2sJ7v-Uh6EH3KSnL4chzvCBuS61KEV2E-5s3rLsULImtG-j8SzEWq5ojjZuAxD6b2nIlucW2v5z79M_a24TMJBUQfPMVJlc6BHYupZEBu5JA72cVzOUG25mIGXySWF7GkoGy2zzaDWBZzKLSuQeEUCKoyTqgQQ2tY62Xc0v7IyD0xvkUKuRb1_QSposOQKQzYTE76BMBzX2mwck2ia5P53WhlASBNgPcye"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-outfit">
                    1969 ARCHIVE
                  </span>
                  <p className="font-outfit text-sm text-white font-semibold">
                    Tranquility Base Lunar Landing
                  </p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] shadow-sm border border-slate-200">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Starlit proposal milestone"
                  src={slot.secondaryImageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBd9WqJMy7PDah2e9Ui3znF18A-1ICQOFIuxQhcLtUHwF9XIfmuA-9jUiXC0AfNy4cX15GQ6XZbdECNdvxHxr8YV_2juRKVdrnyfY69Ix5qjAUCSWg6rYPhR608PQLtoRVvA1lzg2QOC7pa7mdEwa7yCPNdcWwzL55Nx4yhAdtYaMOhL4Gfwj4UFwHzG6aMTpbf8BXzG-_R4KWmXRBZfTNnlbL0Wm_lcs66dOZfy7V5DBL-Y1jyYo9_"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 font-outfit">
                    2021 MILESTONE
                  </span>
                  <p className="font-outfit text-sm text-white font-semibold">
                    Under the Constellations, Sarah said yes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Registry Specs & Escrow Ledger (Col 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Provenance Specs Card */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-outfit text-lg text-slate-900 font-bold">
                  Provenance Specs
                </span>
                <span className="material-symbols-outlined text-amber-600 text-xl">token</span>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">Token Identifier</span>
                  <span className="font-mono text-slate-900 font-bold">{slot.tokenIdentifier}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">Global Rank</span>
                  <span className="font-outfit text-amber-600 font-bold">
                    #{slot.rank || 'N/A'} in Volume
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">Dedication Type</span>
                  <span className="text-slate-900 font-medium">{slot.dedicationType || 'Cosmic & Milestone'}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">Total Bids To Date</span>
                  <span className="font-outfit text-[#6b38d4] font-bold">{slot.outbidsCount + 5} Recorded</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-600">Royalty Share</span>
                  <span className="text-slate-900 font-medium">5% to Space Edu Fund</span>
                </div>
              </div>

              {/* Razorpay Authenticity Banner */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 shadow-sm flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-600 text-lg">verified_user</span>
                  <span className="text-xs uppercase text-amber-800 font-bold font-outfit">
                    RAZORPAY IMMUTABLE HASH
                  </span>
                </div>
                <p className="text-xs text-slate-900 font-mono font-semibold truncate">
                  {slot.razorpayHash}
                </p>
                <span className="text-[11px] text-slate-500">
                  State verification timestamped on Universal Ledger. 100% Escrow secured.
                </span>
              </div>
            </div>

            {/* Chief Dedicator Profile Card */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col gap-3">
              <span className="text-xs uppercase text-slate-500 font-bold font-outfit tracking-wider">
                CHIEF DEDICATOR
              </span>
              <div className="flex items-center gap-3">
                <img
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#6b38d4]"
                  alt="Chief dedicator"
                  src={slot.patronAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBFxmqADNPOwHLbFl499-8xWhI3IvODZ-bKobCkFXLL-5EWK8PrEdm3sVCSeoqlfICd08vw-bxr74DRE_Zt4EKgrIEI4TEG6C6RXW2ibRCigqjw26tvCnCSEZ1EG8AtjB6BuX9a4yZSmcZ8NAt_PEDSqgvjbAzfQMZG9JqdWW3FUx87cgStoYN__WapGVqs6anBdikTl6Q3mTUOoiDUdaL1Qk5KaInbTDluiTtxKRw7JjaLjeLm91IK"}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-outfit text-base text-slate-900 font-bold">
                      {slot.patronName || 'Arjun V.'}
                    </span>
                    <span className="material-symbols-outlined text-amber-500 text-sm">verified</span>
                  </div>
                  <span className="text-xs text-[#6b38d4] font-medium font-mono">
                    {slot.patron}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Custodian of 4 Sovereign Dates
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic pt-1 leading-relaxed">
                “July 20th will never be relinquished unless a true custodian surpasses our bid to build the dream.”
              </p>
            </div>
          </div>
        </section>

        {/* 3. CLAIM HISTORY & OUTBID BATTLES */}
        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-xs uppercase tracking-wider font-bold font-outfit">
                BIDDING DEED CHRONICLES
              </span>
              <h3 className="font-outfit text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Claim History & Outbid Battles
              </h3>
              <p className="text-xs text-slate-600">
                Full unalterable provenance trail for Universal Coordinate: {slot.day}-{slot.month}
              </p>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-500 font-bold font-outfit">
                  INITIAL CLAIM
                </span>
                <span className="font-outfit text-sm text-slate-900 font-bold font-mono">
                  {formatPrice(2999)}
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-amber-700 font-bold font-outfit">
                  LATEST RECORD
                </span>
                <span className="font-outfit text-sm text-amber-600 font-bold font-mono">
                  {formatPrice(slot.settledValue)}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Stack */}
          <div className="relative flex flex-col gap-4 before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-slate-200">
            {(slot.history && slot.history.length > 0 ? slot.history : [
              {
                id: '1',
                holder: slot.patron,
                date: 'July 2024',
                description: 'Acquired via Prestige Outbid auction with verified dedication transfer.',
                amount: slot.settledValue,
                isCurrent: true,
                statusText: 'Verified Escrow'
              },
              {
                id: '2',
                holder: '@lunar_enthusiast',
                date: 'March 2024',
                description: 'Held sovereign deed for 116 days. Commemorated Apollo Lunar Orbiter test flight.',
                amount: 120000,
                statusText: 'Relinquished via Outbid'
              },
              {
                id: '3',
                holder: '@space_odyssey',
                date: 'November 2023',
                description: 'Outbid original patron with dedication to Voyager 1 mission milestones.',
                amount: 65000,
                statusText: 'Relinquished via Outbid'
              },
              {
                id: '4',
                holder: '@neil_fan',
                date: 'January 2023',
                description: 'First canonical reservation made on MYDAY Sovereign Registry platform launch.',
                amount: 2999,
                isGenesis: true,
                statusText: 'Genesis Baseline Tier'
              }
            ]).map((h) => (
              <div key={h.id} className="relative flex items-start gap-4 pl-12 group">
                <div
                  className={`absolute left-4 top-1.5 w-4 h-4 rounded-full ring-4 transition-transform ${
                    h.isCurrent
                      ? 'bg-amber-500 ring-amber-100 group-hover:scale-125'
                      : h.isGenesis
                      ? 'bg-blue-500 ring-blue-100'
                      : 'bg-[#6b38d4] ring-purple-100'
                  }`}
                />
                <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      {h.isCurrent && (
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-white text-[10px] uppercase font-black font-outfit">
                          CURRENT HOLDER
                        </span>
                      )}
                      {h.isGenesis && (
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] uppercase font-bold font-outfit">
                          GENESIS BASE CLAIM
                        </span>
                      )}
                      <span className="font-outfit text-sm font-bold text-slate-900 font-mono">
                        {h.holder}
                      </span>
                      <span className="text-slate-500 text-xs">• {h.date}</span>
                    </div>
                    <p className="text-xs text-slate-600">{h.description}</p>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center">
                    <span className="font-outfit text-base font-bold text-slate-900 font-mono">
                      {formatPrice(h.amount)}
                    </span>
                    <span className="text-[11px] text-slate-400">{h.statusText}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ADJACENT DATES & COMMUNITY BLESSINGS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Adjacent Dates & Challenge Callout (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-outfit text-base text-slate-900 font-bold">
                  Adjacent Calendar Slots
                </span>
                <span className="text-xs text-slate-500 uppercase font-bold font-outfit">
                  ORBITAL NEIGHBORS
                </span>
              </div>

              {/* Neighbor 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center font-bold shadow-sm">
                    <span className="text-[10px] uppercase text-slate-400 font-outfit">JUL</span>
                    <span className="font-outfit text-base text-amber-600 -mt-1 font-extrabold">19</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-outfit text-sm font-bold text-slate-900">July 19</span>
                    <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available to Claim
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigateToClaim('JUL', 19)}
                  className="px-4 py-2 rounded-xl bg-[#6b38d4] hover:bg-[#582cb6] text-white font-outfit text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Claim {formatPrice(2999)}
                </button>
              </div>

              {/* Neighbor 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center font-bold shadow-sm">
                    <span className="text-[10px] uppercase text-slate-400 font-outfit">JUL</span>
                    <span className="font-outfit text-base text-[#6b38d4] -mt-1 font-extrabold">21</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-outfit text-sm font-bold text-slate-900">July 21</span>
                    <span className="text-xs text-slate-500">Claimed by @sol_seeker</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-outfit text-xs font-bold text-amber-600 font-mono">
                    {formatPrice(35000)}
                  </span>
                  <button
                    onClick={() => navigateToDossier('slot-0721')}
                    className="text-xs text-[#6b38d4] hover:underline font-medium cursor-pointer"
                  >
                    View Dossier →
                  </button>
                </div>
              </div>
            </div>

            {/* Sovereign Challenge Teaser Box */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-purple-50/40 border border-amber-200/90 p-6 shadow-sm flex flex-col gap-3 relative overflow-hidden">
              <span className="text-xs uppercase text-amber-800 font-extrabold tracking-wider flex items-center gap-1.5 font-outfit">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                DO YOU OWN THIS DATE IN YOUR HEART?
              </span>
              <h4 className="font-outfit text-xl font-bold text-slate-900 tracking-tight">
                Place a Sovereign Challenge
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A deposit of {formatPrice(minOutbid)} immediately starts a 24-hour settlement window. If uncontested, the dedication plaque and certificate rewrite in your honor.
              </p>
              <button
                onClick={() => openOutbidModal(slot)}
                className="mt-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-outfit text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">gavel</span>
                <span>Initiate Challenge</span>
              </button>
            </div>
          </div>

          {/* Community Blessings & Tributes Stream (Col 6-12) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-outfit text-lg font-bold text-slate-900">
                  Blessings & Tributes
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                  {slot.blessings ? slot.blessings.length : 42}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-bold uppercase font-outfit">
                REALTIME FEED
              </span>
            </div>

            {/* Input Strip */}
            <form onSubmit={handlePostBlessing} className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
              <input
                type="text"
                value={blessingInputText}
                onChange={(e) => setBlessingInputText(e.target.value)}
                placeholder={`Leave an immutable blessing for ${slot.title.slice(0, 24)}...`}
                className="flex-1 bg-transparent px-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#6b38d4] hover:bg-[#582cb6] text-white font-outfit text-xs font-semibold active:scale-95 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <span>Bless</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>

            {/* Feed List */}
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
              {(slot.blessings || []).map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm flex items-start gap-3 transition-all hover:bg-slate-100/60"
                >
                  <img
                    alt={b.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                    src={b.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBBxt5JBRzZVtwmyVyGHDrMhFJ-GOb8TtzxA0Nz4mvYgg9yRELwwmbaYPAGpJbZtFsE70U4c8wBsqVbYf4lO8tZ2zZdQgdT03s0rsD3jGb-9xdXORFq9whETZ4hUzOJsMJgHVvc8s8HK6mYmXjEhT90GmQxDANrcEHXoHz15gvdDUAYh03AjKkmd4RZkdipe-OwobkjyYPuy3HiIaF-e7hKcUwH0YgRpPMir_1JamClNtwzSPppueP_"}
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-outfit text-xs sm:text-sm font-bold text-slate-900">
                        {b.name}{' '}
                        <span className="text-slate-400 font-normal text-xs font-mono">
                          • {b.handle}
                        </span>
                      </span>
                      <span className="text-xs text-slate-400">{b.timeAgo}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      “{b.text}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
