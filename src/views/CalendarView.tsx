import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MONTH_NAMES, DAYS_IN_MONTH } from '../data/mockData';

export const CalendarView: React.FC = () => {
  const {
    slots,
    formatPrice,
    openOutbidModal,
    navigateToDossier,
    navigateToClaim,
    setActivePage
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'apex' | 'high_rollers' | 'recent'>('all');
  const [calendarViewMode, setCalendarViewMode] = useState<'iso' | 'front' | 'flat'>('front');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(9); // October
  const [tableSearch, setTableSearch] = useState('');
  const [tableCategory, setTableCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Top 3 Podium
  const rank1 = slots.find(s => s.rank === 1) || slots[0];
  const rank2 = slots.find(s => s.rank === 2) || slots[1];
  const rank3 = slots.find(s => s.rank === 3) || slots[2];

  // Ranks 4 to 10
  const luminousSlots = slots.filter(s => s.rank && s.rank >= 4 && s.rank <= 10).sort((a, b) => (a.rank || 0) - (b.rank || 0));

  // Ranks 11 to 30
  const perpetualSlots = slots.filter(s => s.rank && s.rank >= 11 && s.rank <= 30).sort((a, b) => (a.rank || 0) - (b.rank || 0));

  // Continuing Ledger (Ranks 31+)
  const continuingSlots = slots
    .filter(s => {
      if (!s.rank || s.rank <= 30) return false;
      const matchesSearch = tableSearch === '' || 
        `${s.month} ${s.day}`.toLowerCase().includes(tableSearch.toLowerCase()) ||
        s.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
        s.patron.toLowerCase().includes(tableSearch.toLowerCase());
      const matchesCategory = tableCategory === 'all' || s.category === tableCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const itemsPerPage = 10;
  const paginatedContinuing = continuingSlots.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPerspectiveStyle = () => {
    switch (calendarViewMode) {
      case 'iso':
        return { transform: 'perspective(1200px) rotateX(20deg) rotateZ(-2deg) scale(0.96)' };
      case 'front':
        return { transform: 'perspective(1200px) rotateX(8deg) rotateZ(0deg) scale(0.98)' };
      case 'flat':
      default:
        return { transform: 'perspective(1200px) rotateX(0deg) rotateZ(0deg) scale(1)' };
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO HEADER & VOLUME STAT RIBBON */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-purple-50/40 to-[#faf8ff] py-12 md:py-16 border-b border-slate-200/60">
        {/* Ambient Radial Flares */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-200/35 via-pink-200/20 to-transparent blur-[120px] rounded-full"></div>
        <div className="pointer-events-none absolute top-1/3 -left-48 w-96 h-96 bg-amber-200/30 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest font-outfit">
              WORLD'S FIRST 3D CALENDAR MEMORIAL PLATFORM
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-4 max-w-4xl font-outfit text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Own the Day That{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgb(67, 56, 202) 0%, rgb(219, 39, 119) 50%, rgb(217, 119, 6) 100%)'
              }}
            >
              Changed Everything.
            </span>
          </h1>

          {/* Subhead */}
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Claim your most cherished anniversary, breakthrough, or historic milestone. Immortalize your personal story on the permanent 3D calendar. Outbid, celebrate, and showcase to the world.
          </p>

          {/* Action Cluster */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#matrix-view"
              className="px-6 py-3 rounded-xl text-white font-outfit text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgb(67, 56, 202) 0%, rgb(49, 46, 129) 100%)',
                boxShadow: 'rgba(67, 56, 202, 0.32) 0px 6px 20px'
              }}
            >
              Explore Top 30 Calendar
            </a>
            <a
              href="#hall-of-fame"
              className="px-6 py-3 rounded-xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 font-outfit text-base font-semibold shadow-xs transition-all cursor-pointer"
            >
              View Top 30 Hall of Fame
            </a>
          </div>

          {/* Live Stat Ribbon */}
          <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-outfit">
                Coordinates Occupied
              </span>
              <span className="mt-1 font-outfit text-2xl font-bold" style={{ color: 'rgb(67, 56, 202)' }}>
                341 / 365 Days
              </span>
              <span className="text-xs text-slate-600 flex items-center gap-1 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 93.4% Ledger Density
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-outfit">
                Settled Protocol Gross
              </span>
              <span className="mt-1 font-outfit text-2xl text-amber-600 font-bold font-mono">
                {formatPrice(4825000)}
              </span>
              <span className="text-xs text-slate-600 flex items-center gap-1 mt-0.5 font-medium">
                <span className="material-symbols-outlined text-[13px] text-emerald-600">trending_up</span> +14.2% Past 7 Days
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-outfit">
                Apex Highest Bid
              </span>
              <span className="mt-1 font-outfit text-2xl text-blue-600 font-bold font-mono">
                {formatPrice(250000)}
              </span>
              <span className="text-xs text-slate-600 truncate max-w-[180px] mt-0.5 font-medium">
                October 14 · @alexandra_v
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-outfit">
                Proof of Escrow
              </span>
              <span className="mt-1 font-outfit text-2xl text-slate-900 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 text-2xl">verified</span> Razorpay
              </span>
              <span className="text-xs text-slate-600 mt-0.5 font-medium">
                Instant Claim Lock
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 3D INTERACTIVE CALENDAR SHOWCASE */}
      <section className="w-full py-16 bg-[#faf8ff] relative overflow-hidden" id="matrix-view">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-purple-100/50 via-pink-50/40 to-transparent blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 relative z-10">
          {/* Header & Filter Controls */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider font-outfit">
              <span className="material-symbols-outlined text-xs">military_tech</span>
              Sovereign Continuum · Valued #01 to #30
            </div>
            <h2 className="mt-2 font-outfit text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Top 30 Highest-Paid Calendar Showcase
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              The 30 most immortalized calendar coordinates across all 365 days, ranked in descending order of locked protocol escrow. Outbid or claim unshakeable ownership.
            </p>

            {/* Filter Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-white shadow-xs border border-slate-200">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#6b38d4] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All Top 30
              </button>
              <button
                onClick={() => setActiveFilter('apex')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'apex'
                    ? 'bg-[#6b38d4] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                👑 Apex Tier (#1-#10)
              </button>
              <button
                onClick={() => setActiveFilter('high_rollers')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'high_rollers'
                    ? 'bg-[#6b38d4] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                ⚡ ₹1L+ High Rollers
              </button>
              <button
                onClick={() => setActiveFilter('recent')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'recent'
                    ? 'bg-[#6b38d4] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                🔥 Recent Outbids
              </button>
            </div>
          </div>

          {/* 3D Angle Toggle Ribbon */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-slate-500 font-semibold font-outfit uppercase tracking-wider">
              3D Matrix Canvas
            </span>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <button
                onClick={() => setCalendarViewMode('iso')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  calendarViewMode === 'iso' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Isometric 3D
              </button>
              <button
                onClick={() => setCalendarViewMode('front')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  calendarViewMode === 'front' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Front Tilt
              </button>
              <button
                onClick={() => setCalendarViewMode('flat')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  calendarViewMode === 'flat' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Flat Board
              </button>
            </div>
          </div>

          {/* The Showcase Container with 3D Perspective */}
          <div
            className="relative w-full rounded-3xl bg-white p-4 sm:p-6 md:p-8 shadow-xl border border-slate-200/90 transition-transform duration-700 ease-out"
            style={getPerspectiveStyle()}
          >
            {/* Top 3 Asymmetrical Hero Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-8">
              {/* Rank 2: July 20 */}
              <div className="rounded-2xl bg-slate-50/70 p-5 flex flex-col justify-between border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-outfit text-[11px] text-slate-700 uppercase font-bold tracking-widest shadow-2xs">
                    RANK #02
                  </span>
                  <span className="font-outfit text-base text-amber-600 font-bold font-mono">
                    {formatPrice(rank2.settledValue)}
                  </span>
                </div>
                <div
                  onClick={() => navigateToDossier(rank2.id)}
                  className="my-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 text-[#6b38d4]">
                    <span className="material-symbols-outlined text-sm">event</span>
                    <span className="font-outfit text-base font-bold text-[#6b38d4]">
                      {rank2.month} {rank2.day}
                    </span>
                  </div>
                  <div className="font-outfit text-slate-900 font-semibold truncate mt-0.5 group-hover:text-[#6b38d4] transition-colors">
                    “{rank2.title}”
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {rank2.quote || 'Dedicated to human audacity and the 500k engineers who dared to conquer tranquility.'}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">{rank2.patron} · {rank2.outbidsCount} Outbids</span>
                  <button
                    onClick={() => openOutbidModal(rank2)}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-[#6b38d4] hover:text-white hover:border-[#6b38d4] text-xs uppercase font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    Challenge
                  </button>
                </div>
              </div>

              {/* Rank 1: Oct 14 (#1 ALL-TIME APEX RECORD) */}
              <div
                className="rounded-2xl p-6 flex flex-col justify-between border-2 border-amber-400 shadow-xl ring-2 ring-amber-200/60 hover:scale-[1.01] transition-all relative"
                style={{
                  background: 'linear-gradient(rgb(255, 251, 235) 0%, rgb(254, 243, 199) 40%, rgb(255, 255, 255) 100%)',
                  borderColor: 'rgb(245, 158, 11)',
                  boxShadow: 'rgba(217, 119, 6, 0.16) 0px 12px 36px'
                }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white font-outfit text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <span className="material-symbols-outlined text-xs">military_tech</span> #1 ALL-TIME APEX RECORD
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                      01
                    </span>
                    <div>
                      <span className="font-outfit text-xl text-amber-700 font-extrabold">
                        {rank1.month} {rank1.day}
                      </span>
                      <span className="block font-outfit text-[10px] text-slate-500 uppercase font-bold">
                        Sovereign Day
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-outfit text-xl text-amber-600 font-extrabold font-mono">
                      {formatPrice(rank1.settledValue)}
                    </span>
                    <span className="block text-[11px] text-amber-700 font-medium">
                      {rank1.outbidsCount} Outbids Settled
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => navigateToDossier(rank1.id)}
                  className="my-3 cursor-pointer group"
                >
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-2 shadow-inner border border-slate-200">
                    <img
                      alt="Northern Lights Arctic Memorial"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={rank1.imageUrl}
                    />
                  </div>
                  <div className="font-outfit text-base text-slate-900 font-bold group-hover:text-amber-700 transition-colors truncate">
                    “{rank1.title}”
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                    {rank1.quote}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-amber-200/60">
                  <div className="flex items-center gap-1.5">
                    <img
                      alt="Alexandra portrait"
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-400"
                      src={rank1.patronAvatar}
                    />
                    <span className="text-xs text-slate-900 font-bold">{rank1.patron}</span>
                    <span className="material-symbols-outlined text-amber-500 text-xs">verified</span>
                  </div>
                  <button
                    onClick={() => openOutbidModal(rank1)}
                    className="px-4 py-1.5 rounded-xl bg-amber-500 text-white font-outfit text-xs font-bold shadow-md hover:bg-amber-600 transition-all cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgb(217, 119, 6) 0%, rgb(180, 83, 9) 100%)',
                      boxShadow: 'rgba(217, 119, 6, 0.35) 0px 4px 14px'
                    }}
                  >
                    Outbid #1 Plaque
                  </button>
                </div>
              </div>

              {/* Rank 3: Jan 01 */}
              <div className="rounded-2xl bg-slate-50/70 p-5 flex flex-col justify-between border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-outfit text-[11px] text-slate-700 uppercase font-bold tracking-widest shadow-2xs">
                    RANK #03
                  </span>
                  <span className="font-outfit text-base text-amber-600 font-bold font-mono">
                    {formatPrice(rank3.settledValue)}
                  </span>
                </div>
                <div
                  onClick={() => navigateToDossier(rank3.id)}
                  className="my-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 text-[#6b38d4]">
                    <span className="material-symbols-outlined text-sm">event</span>
                    <span className="font-outfit text-base font-bold text-[#6b38d4]">
                      {rank3.month} {rank3.day}
                    </span>
                  </div>
                  <div className="font-outfit text-slate-900 font-semibold truncate mt-0.5 group-hover:text-[#6b38d4] transition-colors">
                    “{rank3.title}”
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {rank3.quote || 'Two folding desks, negative runway, and sovereign conviction in perpetual memory.'}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">{rank3.patron} · {rank3.outbidsCount} Outbids</span>
                  <button
                    onClick={() => openOutbidModal(rank3)}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-[#6b38d4] hover:text-white hover:border-[#6b38d4] text-xs uppercase font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    Challenge
                  </button>
                </div>
              </div>
            </div>

            {/* Ranks #04 to #10 · Luminous Sovereign Tier */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-outfit text-xs text-slate-500 uppercase tracking-wider font-bold">
                  Ranks #04 to #10 · Luminous Sovereign Tier
                </span>
                <span className="text-xs text-amber-700 font-semibold">
                  All ₹85,000+ Valued
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {luminousSlots.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => navigateToDossier(slot.id)}
                    className="group p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#6b38d4] hover:bg-white hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        #{String(slot.rank).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-[#6b38d4] font-bold font-outfit">
                        {slot.month} {slot.day}
                      </span>
                    </div>
                    <span className="font-outfit text-xs text-amber-600 font-bold mt-1 font-mono">
                      {formatPrice(slot.settledValue)}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate mt-0.5">
                      {slot.patron}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranks #11 to #30 · Perpetual Memorial Coordinates */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-outfit text-xs text-slate-500 uppercase tracking-wider font-bold">
                  Ranks #11 to #30 · Perpetual Memorial Coordinates
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Instant Escrow Outbid Enabled
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
                {perpetualSlots.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => navigateToDossier(slot.id)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-400 font-bold font-mono">
                        #{slot.rank}
                      </span>
                      <span className="text-[10px] text-[#6b38d4] font-bold font-outfit">
                        {slot.month} {slot.day}
                      </span>
                    </div>
                    <span className="font-outfit text-[11px] text-amber-600 font-bold mt-1 font-mono">
                      {formatPrice(slot.settledValue)}
                    </span>
                    <span className="text-[9px] text-slate-500 truncate">
                      {slot.patron}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 365 Days Interactive Month Navigator & Grid Inspector */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6b38d4] text-xl">view_module</span>
                  <span className="font-outfit text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Full 365-Day Matrix Exploration
                  </span>
                </div>
                {/* Month Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
                  {MONTH_NAMES.map((m, i) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMonthIndex(i)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedMonthIndex === i
                          ? 'bg-[#6b38d4] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day cells for the selected month */}
              <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-12 gap-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                {Array.from({ length: DAYS_IN_MONTH[selectedMonthIndex] }).map((_, dIndex) => {
                  const dayNum = dIndex + 1;
                  const monthName = MONTH_NAMES[selectedMonthIndex];
                  const existing = slots.find(s => s.month.toUpperCase() === monthName && s.day === dayNum);

                  const isApex = existing?.tier === 'apex';
                  const isClaimed = !!existing && existing.status !== 'unclaimed';

                  return (
                    <button
                      key={dayNum}
                      onClick={() => {
                        if (existing && existing.status !== 'unclaimed') {
                          navigateToDossier(existing.id);
                        } else {
                          navigateToClaim(monthName, dayNum);
                        }
                      }}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-14 ${
                        isApex
                          ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:scale-105 shadow-xs'
                          : isClaimed
                          ? 'bg-white border-purple-200 text-slate-800 hover:border-[#6b38d4] hover:shadow-xs'
                          : 'bg-slate-100/80 border-slate-200/80 text-slate-400 hover:bg-white hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-outfit font-extrabold text-xs">
                          {dayNum}
                        </span>
                        {isApex ? (
                          <span className="material-symbols-outlined text-[11px] text-amber-600">stars</span>
                        ) : isClaimed ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6b38d4]"></span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        )}
                      </div>
                      <span className="text-[9px] truncate font-medium">
                        {isApex
                          ? 'Apex'
                          : isClaimed
                          ? existing.patron
                          : 'Claim'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONTINUING LEDGER: RANKS #31 to #60+ */}
      <section className="w-full py-16 bg-white relative border-t border-slate-200/80" id="hall-of-fame">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
                <span className="material-symbols-outlined text-xs">leaderboard</span>
                Sovereign Ledger Registry
              </div>
              <h2 className="mt-2 font-outfit text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Continuing Ledger: Ranks #31 to #60+
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                Active calendar coordinates ranked by locked protocol escrow. Fully protected under blockchain timestamps with live non-custodial outbid access.
              </p>
            </div>

            {/* Filter and Category Controls */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-slate-400 text-sm pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Filter dates or handles..."
                  className="pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6b38d4] focus:bg-white w-48 sm:w-56"
                />
              </div>

              <select
                value={tableCategory}
                onChange={(e) => setTableCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold border border-slate-200 shadow-2xs focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="historic">Historic</option>
                <option value="anniversary">Anniversary</option>
                <option value="startup">Startup</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto rounded-2xl bg-white shadow-sm border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-slate-200 font-outfit">
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">Date Coordinate</th>
                  <th className="py-3.5 px-4">Memorial Title</th>
                  <th className="py-3.5 px-4">Claimed By</th>
                  <th className="py-3.5 px-4 text-right">Settled Value</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {paginatedContinuing.map((slot) => (
                  <tr
                    key={slot.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                      #{slot.rank}
                    </td>
                    <td className="py-3.5 px-4 text-[#6b38d4] font-bold font-outfit">
                      <button
                        onClick={() => navigateToDossier(slot.id)}
                        className="hover:underline cursor-pointer"
                      >
                        {slot.month} {slot.day}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium max-w-xs truncate">
                      {slot.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">
                      {slot.patron}
                    </td>
                    <td className="py-3.5 px-4 text-right font-outfit text-amber-600 font-bold font-mono">
                      {formatPrice(slot.settledValue)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => openOutbidModal(slot)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:bg-[#6b38d4] hover:text-white hover:border-[#6b38d4] text-xs uppercase font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
                      >
                        Outbid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900">31–40</strong> of{' '}
              <strong className="text-slate-900">365</strong> Claimed Coordinates
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 disabled:opacity-40"
              >
                Previous
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-[#6b38d4] text-white font-bold shadow-xs">
                1
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                3
              </button>
              <span className="px-1 text-slate-400">…</span>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                12
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LIVE ACTIVITY TICKER */}
      <section className="w-full bg-slate-100 py-3 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-outfit">
              LIVE STREAM
            </span>
          </div>

          {/* Scrolling Ticker Items */}
          <div className="flex items-center gap-4 overflow-x-auto text-xs text-slate-600 py-1">
            <span className="flex items-center gap-1 shrink-0">
              <strong className="text-slate-900">@rohan_k</strong> claimed{' '}
              <span className="text-[#6b38d4] font-semibold">Dec 25</span> for {formatPrice(45000)} via Razorpay ·{' '}
              <span className="text-slate-400">2m ago</span>
            </span>
            <span className="text-slate-300">/</span>
            <span className="flex items-center gap-1 shrink-0">
              <strong className="text-slate-900">@maya_venture</strong> outbid{' '}
              <span className="text-[#6b38d4] font-semibold">Nov 11</span> by +{formatPrice(5000)} ·{' '}
              <span className="text-slate-400">8m ago</span>
            </span>
            <span className="text-slate-300">/</span>
            <span className="flex items-center gap-1 shrink-0">
              <strong className="text-slate-900">@ananya_h</strong> sealed{' '}
              <span className="text-[#6b38d4] font-semibold">Aug 15</span> ledger certificate ·{' '}
              <span className="text-slate-400">14m ago</span>
            </span>
          </div>

          <div className="shrink-0 hidden lg:block text-xs font-semibold text-slate-500 font-mono">
            341 / 365 Days Verified
          </div>
        </div>
      </section>
    </div>
  );
};
