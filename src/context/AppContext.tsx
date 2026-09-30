import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavPage, Currency, CalendarSlot, ActivityEvent } from '../types';
import { INITIAL_SLOTS, INITIAL_ACTIVITY_LOGS } from '../data/mockData';

interface AppContextType {
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  selectedSlotId: string;
  setSelectedSlotId: (id: string) => void;
  selectedSlot: CalendarSlot;
  slots: CalendarSlot[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrAmount: number) => string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Modals
  isOutbidModalOpen: boolean;
  outbidTargetSlot: CalendarSlot | null;
  openOutbidModal: (slot?: CalendarSlot | string) => void;
  closeOutbidModal: () => void;
  
  isCertificateModalOpen: boolean;
  certificateTargetSlot: CalendarSlot | null;
  openCertificateModal: (slot?: CalendarSlot | string) => void;
  closeCertificateModal: () => void;
  
  isHowItWorksOpen: boolean;
  openHowItWorks: () => void;
  closeHowItWorks: () => void;
  
  // Actions
  placeOutbid: (slotId: string, amount: number, newTitle: string, handle: string) => void;
  claimNewDate: (data: {
    month: string;
    day: number;
    title: string;
    story: string;
    handle: string;
    tier: 'standard' | 'gold' | 'obsidian';
    amount: number;
    referenceUrl?: string;
    imageUrl?: string;
  }) => string;
  addBlessing: (slotId: string, text: string) => void;
  
  // Activity Feed
  activityLogs: ActivityEvent[];
  
  // Booking prefill helper
  bookingPrefill: { month?: string; day?: number; year?: string } | null;
  setBookingPrefill: (prefill: { month?: string; day?: number; year?: string } | null) => void;
  navigateToClaim: (month?: string, day?: number) => void;
  navigateToDossier: (slotId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INR_TO_USD_RATE = 1 / 83.5;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<NavPage>('3d-calendar');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-0720');
  const [slots, setSlots] = useState<CalendarSlot[]>(INITIAL_SLOTS);
  const [currency, setCurrency] = useState<Currency>('INR');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [isOutbidModalOpen, setIsOutbidModalOpen] = useState(false);
  const [outbidTargetSlot, setOutbidTargetSlot] = useState<CalendarSlot | null>(null);
  
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateTargetSlot, setCertificateTargetSlot] = useState<CalendarSlot | null>(null);
  
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  
  const [activityLogs, setActivityLogs] = useState<ActivityEvent[]>(INITIAL_ACTIVITY_LOGS);
  const [bookingPrefill, setBookingPrefill] = useState<{ month?: string; day?: number; year?: string } | null>(null);

  // Sync scroll on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const selectedSlot = slots.find(s => s.id === selectedSlotId) || slots[1]; // fallback to Jul 20

  const formatPrice = (inrAmount: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(inrAmount * INR_TO_USD_RATE);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `₹${inrAmount.toLocaleString('en-IN')}`;
  };

  const openOutbidModal = (slotOrId?: CalendarSlot | string) => {
    if (typeof slotOrId === 'string') {
      const found = slots.find(s => s.id === slotOrId);
      setOutbidTargetSlot(found || selectedSlot);
    } else if (slotOrId) {
      setOutbidTargetSlot(slotOrId);
    } else {
      setOutbidTargetSlot(selectedSlot);
    }
    setIsOutbidModalOpen(true);
  };

  const closeOutbidModal = () => {
    setIsOutbidModalOpen(false);
    setOutbidTargetSlot(null);
  };

  const openCertificateModal = (slotOrId?: CalendarSlot | string) => {
    if (typeof slotOrId === 'string') {
      const found = slots.find(s => s.id === slotOrId);
      setCertificateTargetSlot(found || selectedSlot);
    } else if (slotOrId) {
      setCertificateTargetSlot(slotOrId);
    } else {
      setCertificateTargetSlot(selectedSlot);
    }
    setIsCertificateModalOpen(true);
  };

  const closeCertificateModal = () => {
    setIsCertificateModalOpen(false);
    setCertificateTargetSlot(null);
  };

  const openHowItWorks = () => setIsHowItWorksOpen(true);
  const closeHowItWorks = () => setIsHowItWorksOpen(false);

  const placeOutbid = (slotId: string, amount: number, newTitle: string, handle: string) => {
    const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
    setSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        const newHistoryItem = {
          id: `h-${Date.now()}`,
          holder: formattedHandle,
          date: 'Just now',
          description: `Acquired via Prestige Outbid escrow.`,
          amount,
          isCurrent: true,
          statusText: 'Verified Escrow'
        };

        const updatedHistory = (slot.history || []).map(h => ({ ...h, isCurrent: false }));

        return {
          ...slot,
          title: newTitle || slot.title,
          patron: formattedHandle,
          settledValue: amount,
          outbidsCount: slot.outbidsCount + 1,
          history: [newHistoryItem, ...updatedHistory]
        };
      }
      return slot;
    }));

    // Add to activity logs
    const target = slots.find(s => s.id === slotId);
    if (target) {
      const newLog: ActivityEvent = {
        id: `act-${Date.now()}`,
        type: 'outbid',
        user: formattedHandle,
        dateStr: `${target.month} ${target.day}`,
        amount,
        details: `outbid ${target.month} ${target.day} for ${formatPrice(amount)} via Razorpay`,
        timeAgo: 'Just now',
        channel: 'Razorpay Escrow'
      };
      setActivityLogs(prev => [newLog, ...prev]);
    }

    closeOutbidModal();
  };

  const claimNewDate = (data: {
    month: string;
    day: number;
    title: string;
    story: string;
    handle: string;
    tier: 'standard' | 'gold' | 'obsidian';
    amount: number;
    referenceUrl?: string;
    imageUrl?: string;
  }): string => {
    const formattedHandle = data.handle.startsWith('@') ? data.handle : `@${data.handle}`;
    const newSlotId = `slot-${data.month.toLowerCase()}${data.day}`;
    
    // Check if slot exists or create new
    const existingIndex = slots.findIndex(s => s.month.toUpperCase() === data.month.toUpperCase() && s.day === data.day);
    
    const newSlot: CalendarSlot = {
      id: newSlotId,
      month: data.month.toUpperCase(),
      day: data.day,
      monthIndex: 9, // default
      dayOfYear: 288,
      rank: 25,
      title: data.title || 'Untitled Milestone',
      subtitle: data.story ? data.story.slice(0, 60) + '...' : undefined,
      quote: data.story || undefined,
      patron: formattedHandle,
      patronName: formattedHandle.replace('@', ''),
      settledValue: data.amount,
      outbidsCount: 1,
      tier: data.tier === 'obsidian' ? 'apex' : data.tier === 'gold' ? 'luminous' : 'standard',
      status: 'locked',
      dedicationType: `${data.tier.toUpperCase()} Milestone`,
      imageUrl: data.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO7l3Xe6nc8k2QWvUAmtN7IBRwGrLotI3nn7375C-8Lv6xZY8Ga8FC4zjWCuQ214oDddBcLvxgIDUsAVIUJyOQiz_YPQa_cDLlnJ5wc3Wwo1uzqT4cAkjiBl8AnUyu3iLuPODgfOLXMVFUzwrlzZnQYDxII9-2fLM8FuM7ozy5i9oELys8mEdNh8jjJ4v9zEj7NvR-EHDRtsrj6y7syNoi8VJPPb8BrwiYroPpIXVuXXdmcrT1uv9V',
      tokenIdentifier: `MYDAY-${data.month.toUpperCase()}${String(data.day).padStart(2, '0')}-CLAIM`,
      razorpayHash: `pay_RZP_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      recordedAt: 'Just now',
      audioDuration: data.tier === 'gold' || data.tier === 'obsidian' ? '0:45' : undefined,
      category: 'anniversary',
      history: [
        {
          id: `h-${Date.now()}`,
          holder: formattedHandle,
          date: 'Just now',
          description: `Canonical reservation minted via Razorpay Escrow.`,
          amount: data.amount,
          isCurrent: true,
          statusText: 'Verified Escrow'
        }
      ],
      blessings: []
    };

    if (existingIndex >= 0) {
      setSlots(prev => {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], ...newSlot };
        return copy;
      });
    } else {
      setSlots(prev => [newSlot, ...prev]);
    }

    // Add activity log
    const newLog: ActivityEvent = {
      id: `act-${Date.now()}`,
      type: 'claim',
      user: formattedHandle,
      dateStr: `${data.month} ${data.day}`,
      amount: data.amount,
      details: `claimed ${data.month} ${data.day} for ${formatPrice(data.amount)} via Razorpay`,
      timeAgo: 'Just now',
      channel: 'Razorpay Escrow'
    };
    setActivityLogs(prev => [newLog, ...prev]);

    return newSlotId;
  };

  const addBlessing = (slotId: string, text: string) => {
    if (!text.trim()) return;
    const newBlessing = {
      id: `b-${Date.now()}`,
      name: 'You',
      handle: '@patron_now',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOoFmS3bkAGhsTeCJ-lKNkeQVuAA9nYSzsNbtld5DnrqWl3erwOUD6XhP7LI5t6FIxqIwoLLrA9ieyvgsrEEGgrXbhCp8SV--x95qbVNPy1udZ8ICQE3KVxw3Jm2rlZFk6T-Zrjf-zszGPf_z0m5ab-9icIEYZOOpYoscGxV_mdzzj7GDnMbQb18OqrRR0QQ-iI4SLDXBXCIFAhEBqm2yQG0cdLUR9A5RcnKu6o6GtSsSisBvo4ac0',
      timeAgo: 'Just now',
      text: text.trim()
    };

    setSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        return {
          ...s,
          blessings: [newBlessing, ...(s.blessings || [])]
        };
      }
      return s;
    }));
  };

  const navigateToClaim = (month?: string, day?: number) => {
    if (month && day) {
      setBookingPrefill({ month, day, year: '2025' });
    }
    setActivePage('claim-day');
  };

  const navigateToDossier = (slotId: string) => {
    setSelectedSlotId(slotId);
    setActivePage('date-dossier');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedSlotId,
        setSelectedSlotId,
        selectedSlot,
        slots,
        currency,
        setCurrency,
        formatPrice,
        searchQuery,
        setSearchQuery,
        isOutbidModalOpen,
        outbidTargetSlot,
        openOutbidModal,
        closeOutbidModal,
        isCertificateModalOpen,
        certificateTargetSlot,
        openCertificateModal,
        closeCertificateModal,
        isHowItWorksOpen,
        openHowItWorks,
        closeHowItWorks,
        placeOutbid,
        claimNewDate,
        addBlessing,
        activityLogs,
        bookingPrefill,
        setBookingPrefill,
        navigateToClaim,
        navigateToDossier
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
