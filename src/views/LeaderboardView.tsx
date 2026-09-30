import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryFilter } from '../types';

export const LeaderboardView: React.FC = () => {
  const {
    slots,
    formatPrice,
    openOutbidModal,
    navigateToDossier,
    navigateToClaim,
    activityLogs
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeTimeframe, setActiveTimeframe] = useState<'all' | 'month' | 'week' | 'today'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter leaderboard rows
  const filteredSlots = slots.filter(s => {
    const matchesSearch = searchFilter === '' ||
      `${s.month} ${s.day}`.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.patron.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    return matchesSearch && matchesCat;
  }).sort((a, b) => (a.rank || 999) - (b.rank || 999));

  const itemsPerPage = 7;
  const paginatedSlots = filteredSlots.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col w-full relative">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[540px] h-[320px] bg-[#6b38d4]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-24 right-1/4 w-[420px] h-[300px] bg-pink-500/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Header & Intel Command Center */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-pink-700 text-xs font-bold uppercase tracking-wider shadow-xs border border-rose-200/60 font-outfit">
                <span className="w-2 h-2 rounded-full bg-pink-600 animate-ping"></span>
                Live Consensus Ledger
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-xs font-outfit">
                <span className="material-symbols-outlined text-xs text-[#6b38d4]">bolt</span>
                Block Height #884,912
              </span>
            </div>
            <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Global Date Leaderboard & Realtime Activity
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Explore the most contested, celebrated, and highest-valued days in human memory. Synchronized seamlessly via Supabase realtime telemetry.
            </p>
          </div>

          {/* Quick Ticker Pill */}
          <div className="flex items-center gap-3 self-start lg:self-auto p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                alt="Collector"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXNm3MTikmToIBCMe_7wVcMHLj2GnIZVaT4_0m9ord2uc_6dDA8KKNiWg6fdtBkDykSfO8vTvi7u_RFSmdJ3WR6Og2qy2CvU8YRl-1bRrjbaJxZObWnYbOZlaaiiZiqG8fif8vTlfS5oiH-gx9SxwLY0ghQI6Qw9SdPIV2i7CRCi5BJyhPDnRsQ9AUqC8ceblDiyHICyjJauwwD9JGvMP2YkhUq_OF0c_DKuP466nYO8hUi9jHLLaT"
              />
              <img
                className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                alt="Collector"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAECyIWIZIQyTytcb13it5vdwsCLn5yoe0wlsHDft4NqGJFaWtNhYNhUeTZbkSaufUXPshMZ1bvHygaOg-rzcgTzUDJr7nxFipWTmoGcied3zqo-k6SMOmsu1unbws3nT14E4ccEZMAvkEvPdGDoCcS62kZ-CsMggL0UuY5j6wZP-l8exqsXZ_O7kHyxUs9OhkcisjxW_vzPdeQhPOeLxP-pLhw5a231bXOEETEdY72gI7vDOA6_OXz"
              />
              <img
                className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                alt="Collector"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeyv9mRqf87Xo17bnlMtMfATeMIjZR5gAS7Sudy373B-dYJQeHQo5zrgUdLIwVCikYDCCs_oE68YWoGfP-c085xqNGaOFuK3vHPLgp5lr1HfADJjUh6sx8kEcmQxZtbsz9znO4WXRuJ8VvPFespBCCyWGDWvpAcTP6zgXDy4RNKd7cYfEwmtcxYrzepSh5CxnHPTOvNC1U_wh7G_WEC6QylfWltbqIpyNmfIe6mVO_r6Zeekik-KCm"
              />
            </div>
            <div className="flex flex-col pr-1">
              <span className="font-outfit text-xs font-bold text-pink-700">18 NEW CLAIMS</span>
              <span className="text-xs text-slate-800">Transacted in the last 60m</span>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm group hover:border-[#6b38d4]/40 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 font-outfit">
                All-Time Volume
              </span>
              <span className="p-1.5 rounded-lg bg-purple-50 text-[#6b38d4]">
                <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-outfit text-2xl font-extrabold text-slate-900 font-mono">
                {formatPrice(4825000)}
              </span>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold inline-flex items-center font-outfit">
                <span className="material-symbols-outlined text-xs">north_east</span>18.4%
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-slate-500 text-xs">
              <span>Weekly surge</span>
              <svg className="w-24 h-6 text-[#6b38d4]" fill="none" viewBox="0 0 100 25">
                <path d="M0 20 L20 18 L40 22 L60 12 L75 14 L90 5 L100 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                <path d="M0 20 L20 18 L40 22 L60 12 L75 14 L90 5 L100 2 L100 25 L0 25 Z" fill="currentColor" fillOpacity="0.12"></path>
              </svg>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm group hover:border-amber-400/40 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 font-outfit">
                Most Contested Date
              </span>
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                <span className="material-symbols-outlined text-lg">local_fire_department</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-outfit text-2xl font-extrabold text-amber-800">
                October 14
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold font-outfit">
                HOT
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">14 Active Outbid Battles</span>
              <span className="font-bold text-slate-800 font-mono">{formatPrice(340000)} Current</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm group hover:border-blue-400/40 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 font-outfit">
                Average Claim Value
              </span>
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-lg">insights</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-outfit text-2xl font-extrabold text-slate-900 font-mono">
                {formatPrice(18400)}
              </span>
              <span className="text-xs text-slate-500">/ day</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">Floor: {formatPrice(5000)}</span>
              <span className="text-blue-700 font-semibold font-outfit">+9.2% mo/mo</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm group hover:border-[#6b38d4]/40 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 font-outfit">
                Active Claimants
              </span>
              <span className="p-1.5 rounded-lg bg-purple-50 text-[#6b38d4]">
                <span className="material-symbols-outlined text-lg">supervised_user_circle</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-outfit text-2xl font-extrabold text-slate-900">
                612
              </span>
              <span className="text-xs text-slate-500">Sovereigns</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="w-full bg-slate-100 rounded-full h-2 mr-2 overflow-hidden border border-slate-200">
                <div className="bg-[#6b38d4] h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
              <span className="text-xs font-bold text-[#6b38d4] shrink-0 font-outfit">
                84% Capacity
              </span>
            </div>
          </div>
        </div>

        {/* Command Filters, Category Pills & Search */}
        <div className="flex flex-col gap-4 p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer font-outfit ${
                  activeCategory === 'all'
                    ? 'bg-[#6b38d4] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🏆</span> All-Time Highest Paid
              </button>
              <button
                onClick={() => setActiveCategory('trending')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer font-outfit ${
                  activeCategory === 'trending'
                    ? 'bg-[#6b38d4] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🔥</span> Trending & Outbid
              </button>
              <button
                onClick={() => setActiveCategory('anniversary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer font-outfit ${
                  activeCategory === 'anniversary'
                    ? 'bg-[#6b38d4] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>💍</span> Love & Anniversaries
              </button>
              <button
                onClick={() => setActiveCategory('startup')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer font-outfit ${
                  activeCategory === 'startup'
                    ? 'bg-[#6b38d4] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🚀</span> Milestones & Startups
              </button>
              <button
                onClick={() => setActiveCategory('historic')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer font-outfit ${
                  activeCategory === 'historic'
                    ? 'bg-[#6b38d4] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🎉</span> Historic Days
              </button>
            </div>

            {/* Timeframe Range */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0 self-start xl:self-auto text-xs">
              <button
                onClick={() => setActiveTimeframe('all')}
                className={`px-3 py-1 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                  activeTimeframe === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setActiveTimeframe('month')}
                className={`px-3 py-1 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                  activeTimeframe === 'month' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setActiveTimeframe('week')}
                className={`px-3 py-1 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                  activeTimeframe === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setActiveTimeframe('today')}
                className={`px-3 py-1 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                  activeTimeframe === 'today' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Today
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="relative w-full sm:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search date (e.g. Oct 14), title, or sovereign..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#6b38d4] focus:ring-2 focus:ring-[#6b38d4]/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto text-slate-500 text-xs">
              <span>Displaying <strong className="text-slate-900 font-semibold">{filteredSlots.length} of 365</strong> records</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="inline-flex items-center gap-1 text-[#6b38d4] font-semibold">
                <span className="material-symbols-outlined text-base">sync</span> Realtime feed live
              </span>
            </div>
          </div>
        </div>

        {/* Split Layout: Left Leaderboard Table & Right Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Podium Spotlight & Master Table */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Podium Spotlight Cards for Top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              {/* Silver #2: Dec 31 */}
              <div className="order-2 md:order-1 relative p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#6b38d4]/40 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-outfit text-sm font-bold">
                      2
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold font-outfit">
                      SILVER
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-outfit text-xl text-slate-900 font-bold">Dec 31</span>
                    <span className="text-xs text-slate-500">New Year's Eve</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                    "The night we built the foundation of our eternal bond under Reykjavik auroras."
                  </p>
                </div>
                <div className="flex flex-col gap-1 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Valuation</span>
                    <span className="font-outfit text-base text-slate-900 font-extrabold font-mono">
                      {formatPrice(385000)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sovereign: <span className="text-slate-800 font-medium">Kabir & Tara</span></span>
                    <span className="text-pink-600 font-semibold font-mono">9 Outbids</span>
                  </div>
                </div>
              </div>

              {/* Apex #1: Oct 14 */}
              <div className="order-1 md:order-2 relative p-5 rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 border-2 border-amber-300 shadow-lg md:-mt-4 flex flex-col justify-between overflow-hidden ring-1 ring-amber-400/40">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white shadow-xs text-xs font-black font-outfit">
                      <span className="material-symbols-outlined text-sm">crown</span> #1 APEX SOVEREIGN
                    </div>
                    <span className="flex items-center gap-1 text-amber-800 text-xs font-bold font-outfit uppercase">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> LOCKED
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-outfit text-2xl text-amber-900 font-extrabold">Oct 14</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-bold font-outfit">
                      Historic Launch
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium line-clamp-2 mb-4">
                    "Foundation Day for HyperMatrix & The Promise of Lifelong Conquest."
                  </p>
                </div>
                <div className="flex flex-col gap-1 pt-3 bg-white/95 border border-amber-200/80 p-3 rounded-xl shadow-xs text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Current Apex Bid</span>
                    <div className="flex items-center gap-1">
                      <span className="font-outfit text-base text-amber-800 font-extrabold font-mono">
                        {formatPrice(420000)}
                      </span>
                      <span className="material-symbols-outlined text-[#6b38d4] text-sm" title="Razorpay Verified">verified</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Claimant: <span className="text-amber-900 font-bold">Devraj S.</span></span>
                    <span className="text-[#6b38d4] font-bold font-mono">14 Outbids</span>
                  </div>
                </div>
              </div>

              {/* Bronze #3: Feb 14 */}
              <div className="order-3 md:order-3 relative p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-outfit text-sm font-bold">
                      3
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-outfit">
                      BRONZE
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-outfit text-xl text-slate-900 font-bold">Feb 14</span>
                    <span className="text-xs text-slate-500">Valentine's Day</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                    "Ten years of laughter, coffee mornings, and unconditional sanctuary."
                  </p>
                </div>
                <div className="flex flex-col gap-1 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Valuation</span>
                    <span className="font-outfit text-base text-slate-900 font-extrabold font-mono">
                      {formatPrice(295000)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sovereign: <span className="text-slate-800 font-medium">Aarav & Meera</span></span>
                    <span className="text-pink-600 font-semibold font-mono">11 Outbids</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Master Table */}
            <div className="overflow-x-auto rounded-3xl bg-white border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-600 border-b border-slate-200 text-xs font-bold uppercase font-outfit tracking-wider">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Dedication & Owner</th>
                    <th className="py-3 px-4 text-right">Valuation</th>
                    <th className="py-3 px-4 text-center">Contests</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedSlots.map((slot) => {
                    const isRank1 = slot.rank === 1;
                    const isRank2 = slot.rank === 2;
                    const isRank3 = slot.rank === 3;

                    return (
                      <tr key={slot.id} className="group hover:bg-purple-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                              isRank1
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : isRank2
                                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                : isRank3
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            #{String(slot.rank || '0').padStart(2, '0')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-outfit text-sm font-bold text-slate-900">
                              {slot.month} {slot.day}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Day {slot.dayOfYear}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col max-w-xs">
                            <span className="font-semibold text-slate-900 group-hover:text-[#6b38d4] transition-colors truncate">
                              {slot.title}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <span className="font-medium text-slate-700 font-mono">{slot.patron}</span>
                              <span className="material-symbols-outlined text-[13px] text-[#6b38d4]">verified</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className="font-outfit text-sm font-extrabold text-amber-800 font-mono">
                              {formatPrice(slot.settledValue)}
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Razorpay Secured
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-outfit uppercase">
                            {slot.outbidsCount} BATTLES
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-outfit uppercase ${
                              slot.status === 'locked'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : slot.status === 'contested'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                slot.status === 'locked'
                                  ? 'bg-amber-600'
                                  : slot.status === 'contested'
                                  ? 'bg-rose-600 animate-pulse'
                                  : 'bg-slate-400'
                              }`}
                            ></span>
                            {slot.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => navigateToDossier(slot.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-all cursor-pointer"
                              title="View Memorial Dossier"
                            >
                              <span className="material-symbols-outlined text-base">visibility</span>
                            </button>
                            <button
                              onClick={() => openOutbidModal(slot)}
                              className="px-2.5 py-1 rounded-lg bg-[#6b38d4] text-white text-xs font-bold uppercase font-outfit hover:brightness-110 active:scale-95 shadow-xs transition-all cursor-pointer"
                            >
                              Outbid
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <span>Showing 1-7 of 100 immortalized positions</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-400 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#6b38d4] text-white font-bold shadow-xs">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100">
                    3
                  </button>
                  <span className="px-1 text-slate-400">...</span>
                  <button className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100">
                    14
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Telemetry Stream & 365 Heatmap */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Realtime Telemetry Stream */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-600 animate-ping"></span>
                  <span className="font-outfit text-base text-slate-900 font-bold">
                    Realtime Telemetry Stream
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-[#6b38d4] text-[10px] font-bold font-outfit uppercase">
                  Auto-Refresh
                </span>
              </div>

              {/* Feed Event Cards */}
              <div className="flex flex-col gap-2.5">
                {activityLogs.slice(0, 4).map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-slate-100/70 transition-all flex items-start gap-3"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        act.type === 'outbid'
                          ? 'bg-rose-50 border border-rose-200 text-pink-600'
                          : act.type === 'claim'
                          ? 'bg-purple-50 border border-purple-200 text-[#6b38d4]'
                          : act.type === 'audio'
                          ? 'bg-blue-50 border border-blue-200 text-blue-600'
                          : 'bg-amber-50 border border-amber-200 text-amber-600'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {act.type === 'outbid'
                          ? 'gavel'
                          : act.type === 'claim'
                          ? 'workspace_premium'
                          : act.type === 'audio'
                          ? 'mic'
                          : 'trending_up'}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {act.user} on {act.dateStr}
                        </span>
                        {act.amount > 0 && (
                          <span className="text-xs font-bold text-amber-600 font-mono">
                            {formatPrice(act.amount)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 truncate">{act.details}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {act.timeAgo} · {act.channel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => alert("All 84 telemetry blocks indexed in immutable ledger storage.")}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View All 84 Activity Logs</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

            {/* 365-Day Density Heatmap */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-outfit text-base text-slate-900 font-bold block">
                    365-Day Density Heatmap
                  </span>
                  <span className="text-xs text-slate-500">Global distribution across 12 months</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-pink-700 text-xs font-bold font-outfit">
                  84% FULL
                </span>
              </div>

              {/* Heatmap Grid */}
              <div className="flex flex-col gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="grid grid-cols-12 gap-1 text-center text-[10px] text-slate-500 font-bold font-outfit">
                  <span>J</span><span>F</span><span>M</span><span>A</span><span>M</span><span>J</span>
                  <span>J</span><span>A</span><span>S</span><span>O</span><span>N</span><span>D</span>
                </div>

                <div className="grid grid-cols-12 gap-1.5 h-24">
                  {/* J */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-amber-500 shadow-xs" title="Jan 1: Genesis Apex"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/75"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/45"></span>
                  </div>
                  {/* F */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-[#6b38d4]/50"></span>
                    <span className="flex-1 rounded bg-pink-600 shadow-xs" title="Feb 14: Valentine Apex"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/70"></span>
                  </div>
                  {/* M */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/40"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/65"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                  </div>
                  {/* A */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-[#6b38d4]/60"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-amber-500"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/45"></span>
                  </div>
                  {/* M */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/50"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/40"></span>
                  </div>
                  {/* J */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-[#6b38d4]/45"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/80"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                  </div>
                  {/* J */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/45"></span>
                    <span className="flex-1 rounded bg-amber-500" title="Jul 20: Apollo Day"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/65"></span>
                  </div>
                  {/* A */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-[#6b38d4]/55"></span>
                    <span className="flex-1 rounded bg-amber-500" title="Aug 15: Sovereign Battle"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/75"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                  </div>
                  {/* S */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/45"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/65"></span>
                  </div>
                  {/* O */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-[#6b38d4]/75"></span>
                    <span className="flex-1 rounded bg-amber-500 shadow-sm ring-1 ring-amber-600/40" title="Oct 14: APEX #1"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/85"></span>
                    <span className="flex-1 rounded bg-amber-500/80"></span>
                  </div>
                  {/* N */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-blue-600"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/45"></span>
                    <span className="flex-1 rounded bg-slate-200"></span>
                  </div>
                  {/* D */}
                  <div className="flex flex-col gap-1">
                    <span className="flex-1 rounded bg-[#6b38d4]/55"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/75"></span>
                    <span className="flex-1 rounded bg-[#6b38d4]/90"></span>
                    <span className="flex-1 rounded bg-slate-700 shadow-xs" title="Dec 31: Silver Apex"></span>
                  </div>
                </div>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between text-slate-600 text-[11px] font-outfit pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-200 border border-slate-300"></span> Available (Floor)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-[#6b38d4]"></span> Claimed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Apex Battle
                </span>
              </div>

              {/* Unclaimed Date Finder Callout */}
              <div className="mt-1 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 font-outfit">Unclaimed Date Finder</span>
                  <span className="text-[11px] text-slate-500">58 virgin calendar coordinates open</span>
                </div>
                <button
                  onClick={() => navigateToClaim('OCT', 15)}
                  className="px-3 py-1.5 rounded-xl bg-[#6b38d4] hover:bg-[#582cb6] text-white text-xs font-bold uppercase font-outfit transition-all shadow-xs cursor-pointer"
                >
                  Search Open
                </button>
              </div>
            </div>

            {/* Apex Claimant Dossier Spotlight */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-3">
              <span className="text-xs text-pink-700 uppercase font-bold tracking-wider font-outfit">
                Apex Claimant Dossier
              </span>
              <div className="flex items-center gap-3">
                <img
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400 shadow-sm"
                  alt="Devraj S."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2eayl149AaTVrv4dKCydQkIJ2kDfIai5Gi-jxCB9QuHK0tUnf7BXilD5_qc__OuZ4ksV_bXYI71BfZZX7WylVAUVGuMbV8toctM_caFupnkpfhe56W_p29TZysFhCtr-y-Va3BU6xDIXVNeNnukz2iBZxWeu2TmFibwcGpeRnq6S-sUErzIO5-8u510GXLZzlx03sO65ryVUBdxiUfzDs2VFXWXJQPiRdmi_9Z4NrxYIvEizhIJFD"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-outfit text-base text-slate-900 font-bold">Devraj S.</span>
                    <span className="material-symbols-outlined text-[#6b38d4] text-base">verified</span>
                  </div>
                  <span className="text-xs text-slate-500">3 Calendar Claims · Apex Patron</span>
                  <span className="text-xs font-bold text-pink-700 font-mono">
                    {formatPrice(590000)} Portfolio
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "October 14 represents the foundation of everything our team built. To have it sovereignly minted and verified permanently preserves the legacy."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
