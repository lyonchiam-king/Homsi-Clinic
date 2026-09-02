import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, MessageSquare } from 'lucide-react';

export const FloatingMobileBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal bar once scrolled past 250px (hero height)
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E5E5E5] p-3 shadow-lg block sm:hidden"
        >
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <a
              href={CLINIC_INFO.phoneTel}
              className="bg-[#F4F7F6] active:bg-[#E5E5E5] text-[#1A1A1A] py-3 px-3 rounded-lg border border-[#E5E5E5] text-xs font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-[#008080]" />
              <span>Call Clinic</span>
            </a>

            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#008080] active:bg-[#006666] text-white py-3 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
