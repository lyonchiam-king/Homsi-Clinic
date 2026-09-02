import React from 'react';
import { CLINIC_INFO, clinicExteriorImg } from '../data/clinicData';
import { Calendar, Phone, MapPin, CheckCircle2, MessageSquare } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="bg-white border-b border-[#E5E5E5] pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subcopy & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Certification Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F4F7F6] border border-[#E5E5E5] rounded-md text-xs font-semibold text-[#008080]">
              <MapPin className="w-3.5 h-3.5" />
              <span>56 The Mall, London W5 3TA • Dermatologist Led Clinic</span>
            </div>

            {/* Exact Headline as requested */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-[1.15] tracking-tight">
              Dermatology care that explains every step.
            </h1>

            {/* Exact Subcopy as requested */}
            <p className="text-base sm:text-lg text-[#666666] max-w-[640px] leading-relaxed">
              Dr. Abdulaziz Homsi provides professional laser, aesthetic and skin treatments at our W5 clinic.
            </p>

            {/* Micro-assurances */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-[#1A1A1A] font-medium pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008080]" />
                <span>Doctor Consultation Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008080]" />
                <span>Transparent Follow-up Care</span>
              </div>
            </div>

            {/* Primary CTA & Direct Contact Options */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBookClick}
                className="bg-[#008080] hover:bg-[#006666] active:bg-[#004D4D] text-white text-base font-semibold px-8 py-3.5 rounded-lg transition-all transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 text-center"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Consultation</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#F4F7F6] hover:bg-[#E5E5E5]/60 text-[#1A1A1A] text-sm font-semibold px-4 py-3.5 rounded-lg border border-[#E5E5E5] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#008080]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={CLINIC_INFO.phoneTel}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#F4F7F6] hover:bg-[#E5E5E5]/60 text-[#1A1A1A] text-sm font-semibold px-4 py-3.5 rounded-lg border border-[#E5E5E5] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#008080]" />
                  <span>Call Clinic</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Actual Documented Clinic Exterior Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#E5E5E5] bg-[#F4F7F6]">
              <img
                src={clinicExteriorImg}
                alt="Homsi Clinic exterior storefront at 56 The Mall, London W5"
                className="w-full h-[320px] sm:h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Documented Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-lg border border-[#E5E5E5] flex items-center justify-between text-xs text-[#1A1A1A]">
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Homsi Clinic Premise</p>
                  <p className="text-[#666666]">56 The Mall, Ealing, London W5 3TA</p>
                </div>
                <div className="text-right">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#008080] animate-pulse mr-1"></span>
                  <span className="font-semibold text-[#008080]">Open for Appointments</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
