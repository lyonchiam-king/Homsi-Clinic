import React from 'react';
import { UserCheck, ShieldCheck, MapPin } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const highlights = [
    {
      icon: UserCheck,
      title: 'Dermatologist Led',
      sub: 'Direct medical consultation & treatment by Dr. Abdulaziz Homsi'
    },
    {
      icon: ShieldCheck,
      title: 'Follow-up Care',
      sub: 'Post-treatment review & personal care included with every service'
    },
    {
      icon: MapPin,
      title: 'W5 Location',
      sub: '56 The Mall, London W5 3TA — Ealing Central location'
    }
  ];

  return (
    <section className="bg-[#F4F7F6] border-b border-[#E5E5E5] py-6 sm:py-8">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-lg border border-[#E5E5E5] flex items-start gap-4 transition-all hover:border-[#008080]"
              >
                <div className="p-2.5 bg-[#F4F7F6] rounded-md text-[#008080] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] mt-0.5 leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
