import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { X, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectServiceToBook: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectServiceToBook,
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Shared Element Modal Card */}
        <motion.div
          layoutId={`service-card-${service.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white w-full max-w-2xl rounded-xl border border-[#E5E5E5] overflow-hidden shadow-xl z-10 my-auto"
        >
          {/* Header Image Area */}
          <div className="relative h-48 sm:h-64 w-full bg-[#F4F7F6]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#1A1A1A] p-2 rounded-full transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008080]"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Tags overlay */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex gap-2 mb-1">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded bg-[#008080]/90 text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold">{service.title}</h3>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-sm text-[#008080] font-semibold bg-[#F4F7F6] px-3 py-1.5 rounded-md inline-flex">
              <Clock className="w-4 h-4" />
              <span>Typical Session Duration: {service.duration}</span>
            </div>

            <div>
              <p className="text-base text-[#1A1A1A] leading-relaxed font-medium">
                {service.description}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#E5E5E5]">
              <h4 className="font-heading text-lg font-bold text-[#1A1A1A]">
                What to Expect at Homsi Clinic
              </h4>
              <ul className="space-y-2.5">
                {service.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#666666]">
                    <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#666666] italic">
                Follow-up review included with every procedure by Dr. Homsi
              </span>

              <button
                onClick={() => {
                  onSelectServiceToBook(service.title);
                  onClose();
                }}
                className="w-full sm:w-auto bg-[#008080] hover:bg-[#006666] active:bg-[#004D4D] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Book Consultation for {service.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
