import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PathwayState } from '../types';
import { getPathwayRecommendation } from '../data/clinicData';
import { SlidersHorizontal, Check, ArrowRight, Sparkles, Clock, Target } from 'lucide-react';

interface PathwaySelectorProps {
  onSelectPathwayToBook: (recommendationTitle: string, state: PathwayState) => void;
}

export const PathwaySelector: React.FC<PathwaySelectorProps> = ({ onSelectPathwayToBook }) => {
  const [state, setState] = useState<PathwayState>({
    concern: 'Acne',
    goal: 'Treat',
    preference: 'Comprehensive'
  });

  const recommendation = getPathwayRecommendation(state);

  const concerns: PathwayState['concern'][] = ['Acne', 'Aging', 'Hair'];
  const goals: PathwayState['goal'][] = ['Treat', 'Maintain', 'Prevent'];
  const preferences: PathwayState['preference'][] = ['Quick', 'Comprehensive'];

  return (
    <section id="pathway" className="bg-[#F4F7F6] py-16 sm:py-20 border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-[900px] mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#008080] mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Care Finder</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Find Your Treatment Pathway
          </h2>
          <p className="text-base sm:text-lg text-[#666666] mt-3 leading-relaxed">
            Select your specific skin concern, primary goal, and care preference to receive an instant clinical recommendation from Dr. Homsi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Three Toggle Button Groups) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-[#E5E5E5] space-y-8">
            
            {/* Step 1: Concern */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                1. Primary Concern
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {concerns.map((item) => {
                  const isSelected = state.concern === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setState({ ...state, concern: item })}
                      className={`py-3 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] ${
                        isSelected
                          ? 'bg-[#008080] text-white shadow-xs'
                          : 'bg-[#F4F7F6] text-[#1A1A1A] hover:bg-[#E5E5E5]/60 border border-[#E5E5E5]'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Goal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                2. Clinical Goal
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {goals.map((item) => {
                  const isSelected = state.goal === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setState({ ...state, goal: item })}
                      className={`py-3 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] ${
                        isSelected
                          ? 'bg-[#008080] text-white shadow-xs'
                          : 'bg-[#F4F7F6] text-[#1A1A1A] hover:bg-[#E5E5E5]/60 border border-[#E5E5E5]'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                3. Care Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                {preferences.map((item) => {
                  const isSelected = state.preference === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setState({ ...state, preference: item })}
                      className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] ${
                        isSelected
                          ? 'bg-[#008080] text-white shadow-xs'
                          : 'bg-[#F4F7F6] text-[#1A1A1A] hover:bg-[#E5E5E5]/60 border border-[#E5E5E5]'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                      <span>{item} Care</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chosen Summary Pills */}
            <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]">
              <span>Your Current Selection:</span>
              <span className="font-semibold text-[#008080] bg-[#F4F7F6] px-2.5 py-1 rounded border border-[#E5E5E5]">
                {state.concern} • {state.goal} • {state.preference}
              </span>
            </div>

          </div>

          {/* Recommendation Card Column */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${state.concern}-${state.goal}-${state.preference}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 sm:p-8 rounded-xl border-2 border-[#008080] shadow-sm space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#008080] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-lg">
                  Tailored Pathway
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#008080] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended Clinical Strategy</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#1A1A1A]">
                    {recommendation.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed">
                  {recommendation.summary}
                </p>

                <div className="space-y-3 pt-2 border-t border-[#E5E5E5]">
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 text-[#008080] shrink-0 mt-1" />
                    <div className="text-xs sm:text-sm">
                      <span className="font-semibold text-[#1A1A1A]">Suitable For: </span>
                      <span className="text-[#666666]">{recommendation.suitableFor}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#008080] shrink-0 mt-1" />
                    <div className="text-xs sm:text-sm">
                      <span className="font-semibold text-[#1A1A1A]">Expected Schedule: </span>
                      <span className="text-[#666666]">{recommendation.expectedTime}</span>
                    </div>
                  </div>
                </div>

                {/* Final Action Button handing over to Book Consultation */}
                <div className="pt-4 border-t border-[#E5E5E5]">
                  <button
                    onClick={() => onSelectPathwayToBook(recommendation.title, state)}
                    className="w-full bg-[#008080] hover:bg-[#006666] active:bg-[#004D4D] text-white text-base font-semibold py-3.5 px-6 rounded-lg transition-all transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Book This Treatment</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-[#666666] mt-2">
                    Pre-fills your enquiry form subject &amp; options automatically
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
