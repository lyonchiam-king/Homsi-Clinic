import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/clinicData';
import { ServiceItem } from '../types';
import { ServiceModal } from './ServiceModal';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="bg-white py-16 sm:py-20 border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-[900px] mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#008080] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Treatments</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            What We Offer
          </h2>
          <p className="text-base sm:text-lg text-[#666666] mt-3 leading-relaxed">
            Medical expertise delivered with clear step-by-step explanations, calibrated technology, and comprehensive follow-up care.
          </p>
        </div>

        {/* Card Grid (4 Services in exact order) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              layoutId={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="group bg-[#F4F7F6] rounded-xl border border-[#E5E5E5] overflow-hidden hover:border-[#008080] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Area */}
                <div className="relative h-48 w-full overflow-hidden bg-[#E5E5E5]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-white/95 text-[#008080] rounded border border-[#E5E5E5] backdrop-blur-xs shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-xl font-bold text-[#1A1A1A] group-hover:text-[#008080] transition-colors">
                      {service.title}
                    </h3>
                    <div className="p-1.5 rounded-full bg-white text-[#666666] group-hover:text-[#008080] group-hover:bg-[#008080]/10 transition-colors border border-[#E5E5E5]">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-sm text-[#666666] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Tap Target */}
              <div className="px-6 py-3.5 bg-white border-t border-[#E5E5E5] flex items-center justify-between text-xs font-semibold text-[#008080]">
                <span>Tap to view details &amp; care plan</span>
                <span className="text-[#666666] font-normal">{service.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Shared Element Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectServiceToBook={onSelectServiceToBook}
      />
    </section>
  );
};
