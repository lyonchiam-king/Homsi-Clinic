import React from 'react';
import { motion } from 'motion/react';
import { drHomsiImg, CLINIC_INFO } from '../data/clinicData';
import { ShieldCheck, UserCheck, HeartHandshake, Award } from 'lucide-react';

export const DoctorSection: React.FC = () => {
  return (
    <section id="doctor" className="bg-[#F4F7F6] py-16 sm:py-20 border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Photo of Dr. Homsi */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-[#E5E5E5] bg-white shadow-sm">
              <img
                src={drHomsiImg}
                alt="Dr. Abdulaziz Homsi, Lead Dermatologist at Homsi Clinic London"
                className="w-full h-[400px] sm:h-[480px] object-cover object-top"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-lg border border-[#E5E5E5]">
                <h4 className="font-heading text-lg font-bold text-[#1A1A1A]">
                  {CLINIC_INFO.doctor}
                </h4>
                <p className="text-xs text-[#008080] font-semibold mt-0.5">
                  {CLINIC_INFO.doctorTitle}
                </p>
                <div className="mt-2 text-xs text-[#666666] flex items-center gap-1.5 pt-2 border-t border-[#E5E5E5]">
                  <ShieldCheck className="w-4 h-4 text-[#008080]" />
                  <span>Dermatologist Led • W5 Ealing Clinic</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Focusing on Medical Credibility & Clear Explanations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#008080] mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Medical Leadership</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                Medical expertise delivered with patient, clear guidance.
              </h2>
            </div>

            <p className="text-base text-[#1A1A1A] leading-relaxed font-normal">
              At Homsi Clinic, we believe that effective dermatology and aesthetic care begins with absolute clarity. Dr. Abdulaziz Homsi leads every consultation personally, taking time to explain skin physiology, treatment rationale, expected outcomes, and post-care steps without rushed medical jargon.
            </p>

            <p className="text-base text-[#666666] leading-relaxed">
              Whether you are addressing persistent acne, seeking precise laser hair removal, or considering subtle aesthetic enhancements, our approach is defined by clinical precision, an immaculate environment, and honest advice about what will produce the safest, most restorative result for your skin.
            </p>

            {/* Verification Proof Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-lg border border-[#E5E5E5]">
                <div className="flex items-center gap-2 text-[#008080] font-semibold text-sm mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Follow-Up Care Included</span>
                </div>
                <p className="text-xs text-[#666666]">
                  Every medical treatment includes a post-procedure check to ensure proper healing and long-term satisfaction.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-[#E5E5E5]">
                <div className="flex items-center gap-2 text-[#008080] font-semibold text-sm mb-1">
                  <Award className="w-4 h-4" />
                  <span>Clean Clinic Atmosphere</span>
                </div>
                <p className="text-xs text-[#666666]">
                  Our W5 Ealing premises are maintained to strict hygienic clinical standards for complete peace of mind.
                </p>
              </div>
            </div>

            {/* Patient Feedback Quote */}
            <blockquote className="bg-white p-5 rounded-lg border-l-4 border-l-[#008080] border-y border-r border-[#E5E5E5] text-sm text-[#1A1A1A] italic">
              &ldquo;Dr. Homsi was incredibly patient and explained every step of my laser treatment before we even started. I felt completely reassured throughout the entire process.&rdquo;
            </blockquote>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
