/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { DoctorSection } from './components/DoctorSection';
import { CareTimeline } from './components/CareTimeline';
import { PathwaySelector } from './components/PathwaySelector';
import { ContactSection } from './components/ContactSection';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { Footer } from './components/Footer';
import { SpreadsheetModal } from './components/SpreadsheetModal';
import { PathwayState } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [prefilledSubject, setPrefilledSubject] = useState('Dermatologist Consultation');
  const [pathwaySelection, setPathwaySelection] = useState<PathwayState | null>(null);
  const [spreadsheetModalOpen, setSpreadsheetModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromService = (serviceTitle: string) => {
    setPrefilledSubject(serviceTitle);
    scrollToSection('contact');
  };

  const handleBookFromPathway = (recommendationTitle: string, state: PathwayState) => {
    setPrefilledSubject(`Pathway: ${recommendationTitle}`);
    setPathwaySelection(state);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans pb-16 sm:pb-0">
      
      {/* Sticky Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onBookClick={() => scrollToSection('contact')}
      />

      {/* Main Page Layout in Exact Order */}
      <main className="flex-1">
        
        {/* 1. Hero (Split layout) */}
        <Hero onBookClick={() => scrollToSection('contact')} />

        {/* 2. Trust Strip (Badge row) */}
        <TrustStrip />

        {/* 3. Services (4 cards in exact order) */}
        <ServicesSection onSelectServiceToBook={handleBookFromService} />

        {/* 4. The Doctor (Two-column story) */}
        <DoctorSection />

        {/* 5. Patient Journey (Vertical Timeline + Signature Care Line) */}
        <CareTimeline />

        {/* 6. Treatment Pathway Selector (Interactive Piece) */}
        <PathwaySelector onSelectPathwayToBook={handleBookFromPathway} />

        {/* 7. Contact (Map, Details, Enquiry Form) */}
        <ContactSection
          prefilledSubject={prefilledSubject}
          pathwaySelection={pathwaySelection}
          onOpenSpreadsheetLog={() => setSpreadsheetModalOpen(true)}
        />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenSpreadsheetLog={() => setSpreadsheetModalOpen(true)}
      />

      {/* Floating Bar on Mobile */}
      <FloatingMobileBar />

      {/* Google Sheets / Spreadsheet Log Inspector Modal */}
      <SpreadsheetModal
        isOpen={spreadsheetModalOpen}
        onClose={() => setSpreadsheetModalOpen(false)}
      />

    </div>
  );
}
