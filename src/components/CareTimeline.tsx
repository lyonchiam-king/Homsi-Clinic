import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { PATIENT_JOURNEY } from '../data/clinicData';
import { Calendar, Stethoscope, Sparkles, ShieldCheck, HeartPulse } from 'lucide-react';

export const CareTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll animation for drawing the line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stepIcons = [Stethoscope, Sparkles, ShieldCheck, HeartPulse];

  return (
    <section id="journey" className="bg-white py-16 sm:py-20 border-b border-[#E5E5E5]" ref={containerRef}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-[900px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#008080] mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Structured Patient Care</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Patient Journey
          </h2>
          <p className="text-base sm:text-lg text-[#666666] mt-3 leading-relaxed">
            From your initial consultation through post-treatment care, every step is explained and accompanied by Dr. Homsi.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-[900px] mx-auto">
          
          {/* Static Background Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-[#E5E5E5] -translate-x-1/2" />

          {/* Signature Moment: Animated Drawing Vertical Line */}
          {!prefersReducedMotion && (
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-[#008080] -translate-x-1/2 shadow-[0_0_12px_rgba(0,128,128,0.6)] z-10"
            />
          )}

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16 relative z-20">
            {PATIENT_JOURNEY.map((item, index) => {
              const Icon = stepIcons[index % stepIcons.length];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.step}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 relative`}
                >
                  
                  {/* Step Content Box */}
                  <div className="sm:w-1/2 pl-12 sm:pl-0 sm:px-4">
                    <div className="bg-[#F4F7F6] p-6 rounded-xl border border-[#E5E5E5] hover:border-[#008080] transition-colors relative group">
                      
                      {/* Step Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#008080] bg-white px-2.5 py-1 rounded border border-[#E5E5E5]">
                          Step {item.step}
                        </span>
                        <span className="text-xs text-[#666666] font-medium italic">
                          {item.tagline}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-[#1A1A1A] mt-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[#666666] mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Timeline Circle Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-2 w-10 h-10 rounded-full bg-white border-2 border-[#008080] flex items-center justify-center text-[#008080] shadow-md z-30 timeline-glow">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Grid */}
                  <div className="hidden sm:block sm:w-1/2" />

                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Follow-up Care Highlight Note */}
        <div className="mt-16 max-w-[900px] mx-auto bg-[#F4F7F6] p-6 rounded-xl border border-[#E5E5E5] text-center">
          <p className="text-sm text-[#1A1A1A] font-semibold">
            &ldquo;Follow-up care is never an afterthought. It is integrated into every treatment schedule we build.&rdquo;
          </p>
          <p className="text-xs text-[#666666] mt-1">
            — Dr. Abdulaziz Homsi
          </p>
        </div>

      </div>
    </section>
  );
};
