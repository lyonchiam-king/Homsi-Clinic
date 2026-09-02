import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { PathwayState } from '../types';
import { MapPin, Phone, MessageSquare, Instagram, Send, CheckCircle2, Table, Clock } from 'lucide-react';

interface ContactSectionProps {
  prefilledSubject?: string;
  pathwaySelection?: PathwayState | null;
  onOpenSpreadsheetLog: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledSubject,
  pathwaySelection,
  onOpenSpreadsheetLog,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Dermatologist Consultation',
    preferredDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefilledSubject) {
      setFormData(prev => ({ ...prev, service: prefilledSubject }));
    }
  }, [prefilledSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        concern: pathwaySelection?.concern,
        goal: pathwaySelection?.goal,
        preference: pathwaySelection?.preference,
      };

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Dermatologist Consultation',
          preferredDate: '',
          message: ''
        });
      } else {
        const errJson = await res.json();
        setErrorMsg(errJson.error || 'Failed to submit enquiry. Please try calling directly.');
      }
    } catch (err) {
      setErrorMsg('Network issue. Please call us directly on +44 7777 285999 or message on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-16 sm:py-20 border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        
        {/* Section Title */}
        <div className="max-w-[900px] mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#008080] mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Clinic Location &amp; Booking</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Book Your Consultation or Visit Us
          </h2>
          <p className="text-base sm:text-lg text-[#666666] mt-3 leading-relaxed">
            Located at 56 The Mall in Ealing, London W5. Submit your enquiry below or message Dr. Homsi&apos;s clinic team directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#F4F7F6] p-6 rounded-xl border border-[#E5E5E5] space-y-5">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white text-[#008080] rounded-lg border border-[#E5E5E5] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#1A1A1A]">Clinic Address</h4>
                  <a
                    href={CLINIC_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#666666] hover:text-[#008080] transition-colors mt-0.5 block underline underline-offset-2"
                  >
                    {CLINIC_INFO.address}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 pt-3 border-t border-[#E5E5E5]">
                <div className="p-2.5 bg-white text-[#008080] rounded-lg border border-[#E5E5E5] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#1A1A1A]">Direct Telephone</h4>
                  <a
                    href={CLINIC_INFO.phoneTel}
                    className="text-base font-semibold text-[#008080] hover:underline mt-0.5 block"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                  <span className="text-xs text-[#666666]">Tappable direct clinic connection</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 pt-3 border-t border-[#E5E5E5]">
                <div className="p-2.5 bg-white text-[#008080] rounded-lg border border-[#E5E5E5] shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#1A1A1A]">Instant WhatsApp</h4>
                  <a
                    href={CLINIC_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#008080] hover:underline mt-0.5"
                  >
                    <span>Click to Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Social Profile */}
              <div className="flex items-start gap-4 pt-3 border-t border-[#E5E5E5]">
                <div className="p-2.5 bg-white text-[#008080] rounded-lg border border-[#E5E5E5] shrink-0 mt-0.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#1A1A1A]">Official Instagram</h4>
                  <a
                    href={CLINIC_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#666666] hover:text-[#008080] transition-colors mt-0.5 block"
                  >
                    {CLINIC_INFO.instagramHandle}
                  </a>
                </div>
              </div>

              {/* Clinic Hours */}
              <div className="flex items-start gap-4 pt-3 border-t border-[#E5E5E5]">
                <div className="p-2.5 bg-white text-[#008080] rounded-lg border border-[#E5E5E5] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#666666]">
                  <h4 className="font-heading text-base font-bold text-[#1A1A1A] mb-0.5">Opening Hours</h4>
                  <p>Mon – Sat: [TO CONFIRM]</p>
                  <p className="mt-0.5 text-[#008080] font-medium">Appointments by booking</p>
                </div>
              </div>

            </div>

            {/* Embedded Map Container */}
            <div className="rounded-xl overflow-hidden border border-[#E5E5E5] h-64 bg-[#F4F7F6]">
              <iframe
                title="Homsi Clinic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2798606404986!2d-0.306079!3d51.512613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760de2be702e6d%3A0xb08573ef8a546d1c!2s56%20The%20Mall%2C%20London%20W5%203TA%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Interactive Consultation Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E5E5E5] shadow-xs">
            
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E5E5E5]">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#1A1A1A]">
                  Request a Consultation
                </h3>
                <p className="text-xs text-[#666666] mt-1">
                  Direct submission to Dr. Homsi&apos;s team with automated timestamped spreadsheet logging.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenSpreadsheetLog}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#008080] bg-[#F4F7F6] hover:bg-[#E5E5E5]/60 px-3 py-2 rounded-md border border-[#E5E5E5] transition-colors"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Spreadsheet Log</span>
              </button>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#F4F7F6] border border-[#008080] rounded-xl text-center space-y-4">
                <div className="w-12 h-12 bg-[#008080] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-2xl font-bold text-[#1A1A1A]">
                  Enquiry Received
                </h4>
                <p className="text-sm text-[#666666] max-w-md mx-auto">
                  Thank you! Your consultation request has been recorded in our clinic booking sheet. Dr. Abdulaziz Homsi&apos;s team will call you shortly to confirm your appointment time.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#008080] underline"
                  >
                    Submit another request
                  </button>
                  <span className="hidden sm:inline text-xs text-[#666666]">•</span>
                  <button
                    type="button"
                    onClick={onOpenSpreadsheetLog}
                    className="text-xs font-semibold text-[#008080] flex items-center gap-1"
                  >
                    <Table className="w-3.5 h-3.5" />
                    <span>View Spreadsheet Log</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] bg-white text-sm text-[#1A1A1A] focus:border-[#008080] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 7700 900123"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] bg-white text-sm text-[#1A1A1A] focus:border-[#008080] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sarah@example.co.uk"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] bg-white text-sm text-[#1A1A1A] focus:border-[#008080] transition-colors"
                    />
                  </div>

                  {/* Service / Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Service / Subject
                    </label>
                    <input
                      type="text"
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] bg-[#F4F7F6] text-sm text-[#1A1A1A] font-medium focus:border-[#008080] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] bg-white text-sm text-[#1A1A1A] focus:border-[#008080] transition-colors"
                    />
                  </div>

                  {/* Quick WhatsApp Helper next to form */}
                  <div className="flex flex-col justify-end">
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#F4F7F6] hover:bg-[#E5E5E5]/60 text-[#1A1A1A] text-xs font-semibold rounded-lg border border-[#E5E5E5] transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#008080]" />
                      <span>Prefer WhatsApp instead?</span>
                    </a>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Skin Concern or Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your skin condition or any questions for Dr. Homsi..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] bg-white text-sm text-[#1A1A1A] focus:border-[#008080] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#008080] hover:bg-[#006666] active:bg-[#004D4D] text-white text-base font-semibold px-8 py-3.5 rounded-lg transition-all transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Booking Enquiry</span>
                      </>
                    )}
                  </button>

                  <span className="text-xs text-[#666666] italic text-center sm:text-right">
                    Follow-up care included with every service
                  </span>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
