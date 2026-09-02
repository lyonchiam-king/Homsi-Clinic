import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, MapPin, Instagram, Table, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSpreadsheetLog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSpreadsheetLog }) => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-24 sm:pb-16 border-t border-[#E5E5E5]/20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-white">
              HOMSI CLINIC
            </h3>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Dermatology, laser, and aesthetic treatments led by Dr. Abdulaziz Homsi at 56 The Mall, Ealing W5 3TA, London.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @homsi.clinic"
                className="p-2.5 bg-white/10 hover:bg-[#008080] text-white rounded-lg transition-colors inline-flex items-center gap-2 text-xs font-semibold"
              >
                <Instagram className="w-4 h-4" />
                <span>@homsi.clinic</span>
              </a>

              <button
                onClick={onOpenSpreadsheetLog}
                className="p-2.5 bg-white/10 hover:bg-[#008080] text-white rounded-lg transition-colors inline-flex items-center gap-2 text-xs font-semibold"
              >
                <Table className="w-4 h-4" />
                <span>Spreadsheet Log</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-base font-bold text-white">Navigation</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctor')} className="hover:text-white transition-colors">
                  Dr. Abdulaziz Homsi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journey')} className="hover:text-white transition-colors">
                  Patient Journey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pathway')} className="hover:text-white transition-colors">
                  Treatment Pathway
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact &amp; Map
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading text-base font-bold text-white">Contact &amp; Location</h4>
            <div className="space-y-2.5 text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#008080] shrink-0 mt-1" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#008080] shrink-0" />
                <a href={CLINIC_INFO.phoneTel} className="text-white font-medium hover:underline">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="pt-2 text-xs text-white/50">
                Opening Hours: Mon – Sat [TO CONFIRM]
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Medical Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Homsi Clinic. All rights reserved. Medical consultations led by Dr. Abdulaziz Homsi.
          </p>
          <p className="flex items-center gap-1">
            <span>Clinical Precision Meets Reassuring Care</span>
            <Heart className="w-3.5 h-3.5 text-[#008080]" />
          </p>
        </div>

      </div>
    </footer>
  );
};
