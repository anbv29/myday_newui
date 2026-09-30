import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { NavPage } from '../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    slots,
    navigateToDossier,
    openHowItWorks
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // ⌘K hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? slots.filter(s =>
        `${s.month} ${s.day}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.patron.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleNavClick = (page: NavPage, e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={(e) => handleNavClick('3d-calendar', e)}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <img
              alt="MYDAY Brand Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UhKGy1R8dKQosmoIKbaNWyYaNFQF8UfIbY7MxVU6Y4jNt9yNZCB0tdia4UxxUFRIptweMasY6QjG5xSIcpr4WJrywf-QEasFGI5N9Jnamj_sUnd4ebKkI0H0zgzCgsRRgSOoB1V-9-D6ob1DfwJDYnHMf1lpiVWPcKtn7hKIypPuQWpHdX9Bmu8q3X0As1pxQBSY1mANpasMlzbbRIG4x7E6F60iZYccXTQxqXyyCSsjl-HBZq_0kqkj4"
            />
            <span className="font-outfit text-xl text-slate-900 tracking-tight group-hover:text-[#6b38d4] transition-colors font-bold">
              MYDAY
            </span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden lg:block" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={(e) => handleNavClick('3d-calendar', e)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                activePage === '3d-calendar'
                  ? 'text-[#6b38d4] font-semibold bg-[#6b38d4]/10 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              3D Calendar
            </button>
            <button
              onClick={(e) => handleNavClick('top-30-highest-paid', e)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                activePage === 'top-30-highest-paid'
                  ? 'text-[#6b38d4] font-semibold bg-[#6b38d4]/10 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              Top 30 Showcase
            </button>
            <button
              onClick={(e) => handleNavClick('leaderboard-and-trends', e)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                activePage === 'leaderboard-and-trends'
                  ? 'text-[#6b38d4] font-semibold bg-[#6b38d4]/10 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={(e) => handleNavClick('live-activity', e)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                activePage === 'live-activity'
                  ? 'text-[#6b38d4] font-semibold bg-[#6b38d4]/10 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
              }`}
            >
              Live Feed
            </button>
            <button
              onClick={() => openHowItWorks()}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium transition-all cursor-pointer"
            >
              How It Works
            </button>
          </nav>
        </div>

        {/* Right Search, Currency, Book CTA, Profile */}
        <div className="flex items-center gap-3 justify-end flex-1 max-w-2xl">
          {/* Quick Search */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs xl:max-w-sm hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
              search
            </span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search date, occasion, handle..."
              className="w-full h-10 pl-9 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#6b38d4] focus:ring-2 focus:ring-[#6b38d4]/20 transition-all shadow-inner"
            />
            <span className="absolute right-2.5 px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-500 text-[10px] font-semibold tracking-wider border border-slate-300 pointer-events-none">
              ⌘K
            </span>

            {/* Instant Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-2xl p-2 z-50 flex flex-col gap-1 max-h-80 overflow-y-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Matching Dates & Memorials
                </span>
                {searchResults.map(result => (
                  <button
                    key={result.id}
                    onClick={() => {
                      navigateToDossier(result.id);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-1 rounded bg-[#6b38d4]/10 text-[#6b38d4] font-bold text-xs font-outfit">
                        {result.month} {result.day}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-[#6b38d4] truncate max-w-[180px]">
                          {result.title}
                        </span>
                        <span className="text-xs text-slate-500">
                          {result.patron}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-600 font-mono">
                      ₹{result.settledValue.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Toggle */}
          <div className="hidden sm:inline-flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-white text-slate-900 font-bold shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-slate-900 font-bold shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Book Your Date CTA */}
          <button
            onClick={(e) => handleNavClick('claim-day', e)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-white font-outfit text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgb(67, 56, 202) 0%, rgb(79, 70, 229) 100%)',
              boxShadow: '0 4px 14px rgba(67, 56, 202, 0.3)'
            }}
          >
            <span className="tracking-wide flex items-center gap-1.5">
              <span className="text-amber-300">✦</span> Book Your Date
            </span>
          </button>

          {/* User Profile Avatar with Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1 p-0.5 rounded-full bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#6b38d4]/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOoFmS3bkAGhsTeCJ-lKNkeQVuAA9nYSzsNbtld5DnrqWl3erwOUD6XhP7LI5t6FIxqIwoLLrA9ieyvgsrEEGgrXbhCp8SV--x95qbVNPy1udZ8ICQE3KVxw3Jm2rlZFk6T-Zrjf-zszGPf_z0m5ab-9icIEYZOOpYoscGxV_mdzzj7GDnMbQb18OqrRR0QQ-iI4SLDXBXCIFAhEBqm2yQG0cdLUR9A5RcnKu6o6GtSsSisBvo4ac0"
              />
              <span className="material-symbols-outlined text-slate-400 hover:text-slate-700 text-base pr-1">
                expand_more
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6b38d4] flex items-center justify-center font-bold text-sm">
                    K
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Kunal S.</span>
                    <span className="text-xs text-slate-500 font-medium">@kunal_shah · Sovereign</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Ledger Balance:</span>
                    <span className="font-bold text-emerald-600">₹45,000</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Owned Coordinates:</span>
                    <span className="font-bold text-slate-900">2 Memorials</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigateToDossier('slot-0720');
                    setIsProfileOpen(false);
                  }}
                  className="w-full py-1.5 px-2 rounded-lg text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <span>View July 20 Dossier</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button
                  onClick={() => {
                    setActivePage('claim-day');
                    setIsProfileOpen(false);
                  }}
                  className="w-full py-1.5 px-2 rounded-lg text-left text-xs font-semibold text-[#6b38d4] hover:bg-purple-50 transition-colors flex items-center justify-between"
                >
                  <span>✦ Book Another Date</span>
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 px-4 py-4 flex flex-col gap-2">
          <button
            onClick={(e) => handleNavClick('3d-calendar', e)}
            className="px-3 py-2 rounded-lg text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            3D Calendar Showcase
          </button>
          <button
            onClick={(e) => handleNavClick('top-30-highest-paid', e)}
            className="px-3 py-2 rounded-lg text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Top 30 Showcase
          </button>
          <button
            onClick={(e) => handleNavClick('leaderboard-and-trends', e)}
            className="px-3 py-2 rounded-lg text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Leaderboard & Trends
          </button>
          <button
            onClick={(e) => handleNavClick('live-activity', e)}
            className="px-3 py-2 rounded-lg text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Live Feed Stream
          </button>
          <button
            onClick={() => {
              openHowItWorks();
              setMobileMenuOpen(false);
            }}
            className="px-3 py-2 rounded-lg text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            How It Works
          </button>
          <button
            onClick={(e) => handleNavClick('claim-day', e)}
            className="mt-2 w-full py-2.5 rounded-xl bg-[#6b38d4] text-white font-semibold text-sm text-center shadow-md"
          >
            ✦ Book Your Date
          </button>
        </div>
      )}
    </header>
  );
};
