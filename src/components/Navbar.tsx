import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Instagram, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'doctor', label: 'Dr. Homsi' },
    { id: 'journey', label: 'Patient Journey' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] transition-all">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNav('home')} 
          className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] rounded p-1"
        >
          <span className="font-heading text-2xl font-bold tracking-tight text-[#1A1A1A] block group-hover:text-[#008080] transition-colors">
            HOMSI CLINIC
          </span>
          <span className="text-xs uppercase tracking-widest text-[#666666] font-medium block">
            Dermatology • London W5
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-sm font-medium transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] rounded ${
                  isActive ? 'text-[#008080] font-semibold' : 'text-[#1A1A1A] hover:text-[#008080]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#008080] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Contact */}
        <div className="hidden md:flex items-center space-x-5">
          <a
            href={CLINIC_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @homsi.clinic"
            className="p-2 text-[#666666] hover:text-[#008080] transition-colors rounded-full hover:bg-[#F4F7F6]"
          >
            <Instagram className="w-5 h-5" />
          </a>
          
          <a
            href={CLINIC_INFO.phoneTel}
            className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-[#008080] transition-colors py-2 px-3 rounded-lg hover:bg-[#F4F7F6]"
          >
            <Phone className="w-4 h-4 text-[#008080]" />
            <span>+44 7777 285999</span>
          </a>

          <button
            onClick={onBookClick}
            className="bg-[#008080] hover:bg-[#006666] active:bg-[#004D4D] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all transform active:scale-[0.98] shadow-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onBookClick}
            className="bg-[#008080] hover:bg-[#006666] active:bg-[#004D4D] text-white text-xs font-semibold px-3 py-2 rounded-md transition-all"
          >
            Book
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-[#1A1A1A] hover:text-[#008080] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E5E5] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-left text-base font-medium py-2 border-b border-[#E5E5E5]/50 ${
                  activeSection === item.id ? 'text-[#008080] font-semibold' : 'text-[#1A1A1A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={CLINIC_INFO.phoneTel}
              className="flex items-center gap-3 text-sm font-medium text-[#1A1A1A] py-2 px-3 bg-[#F4F7F6] rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#008080]" />
              <span>Call +44 7777 285999</span>
            </a>

            <a
              href={CLINIC_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium text-[#1A1A1A] py-2 px-3 bg-[#F4F7F6] rounded-lg"
            >
              <Instagram className="w-4 h-4 text-[#008080]" />
              <span>Instagram @homsi.clinic</span>
            </a>

            <button
              onClick={() => {
                onBookClick();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#008080] hover:bg-[#006666] active:bg-[#004D4D] text-white text-base font-semibold py-3 rounded-lg text-center transition-colors"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
