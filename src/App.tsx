/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyCta } from './components/StickyCta';
import { OutbidModal } from './components/OutbidModal';
import { CertificateModal } from './components/CertificateModal';
import { HowItWorksModal } from './components/HowItWorksModal';

import { CalendarView } from './views/CalendarView';
import { DossierView } from './views/DossierView';
import { LeaderboardView } from './views/LeaderboardView';
import { ClaimStudioView } from './views/ClaimStudioView';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  const renderCurrentView = () => {
    switch (activePage) {
      case '3d-calendar':
      case 'top-30-highest-paid':
        return <CalendarView />;
      case 'date-dossier':
        return <DossierView />;
      case 'leaderboard-and-trends':
      case 'live-activity':
        return <LeaderboardView />;
      case 'claim-day':
        return <ClaimStudioView />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#0f172a] selection:bg-[#7c3aed] selection:text-white relative">
      <Navbar />

      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {(activePage === '3d-calendar' || activePage === 'top-30-highest-paid') && (
        <StickyCta />
      )}

      <Footer />

      {/* Global Modals */}
      <OutbidModal />
      <CertificateModal />
      <HowItWorksModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
