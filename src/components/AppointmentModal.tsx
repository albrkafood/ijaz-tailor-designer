import React, { useState } from 'react';
import { AppointmentBooking } from '../types';
import { X, Calendar, Clock, Video, MapPin, Check, Sparkles, PhoneCall } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    type: 'virtual_video' as 'in_store_islamabad' | 'virtual_video',
    date: '',
    timeSlot: '14:00 - 15:00 PKT',
    interest: 'Men Bespoke' as 'Men Bespoke' | 'Women Couture' | 'Wedding & Bridal' | 'Alterations',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-8 text-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider">
              Book Bespoke Fitting Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-sm hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-sm bg-[#C5A059] text-black flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif font-bold text-white uppercase tracking-wide">
              Appointment Request Scheduled
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our bespoke concierge will confirm your {formData.type === 'in_store_islamabad' ? 'in-store Islamabad fitting' : 'WhatsApp/Zoom video consultation'} for <strong>{formData.date || 'your selected date'}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-sm bg-[#C5A059] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4B475] transition-all"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Type selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'virtual_video' })}
                className={`p-3 rounded-sm border text-left transition-all ${
                  formData.type === 'virtual_video'
                    ? 'border-[#C5A059] bg-[#161616]'
                    : 'border-white/10 bg-[#121212] text-white/50'
                }`}
              >
                <Video className="w-4 h-4 text-[#C5A059] mb-1" />
                <span className="font-bold text-white block text-[11px] uppercase tracking-wider">Virtual Video Call</span>
                <span className="text-[10px] text-white/40">Worldwide via Zoom or WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'in_store_islamabad' })}
                className={`p-3 rounded-sm border text-left transition-all ${
                  formData.type === 'in_store_islamabad'
                    ? 'border-[#C5A059] bg-[#161616]'
                    : 'border-white/10 bg-[#121212] text-white/50'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#C5A059] mb-1" />
                <span className="font-bold text-white block text-[11px] uppercase tracking-wider">Islamabad Atelier</span>
                <span className="text-[10px] text-white/40">Panther Plaza, F-8 Markaz</span>
              </button>
            </div>

            <div>
              <label className="block font-bold text-white/70 mb-1 uppercase tracking-wider">Your Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aamir Khan"
                className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-white/70 mb-1 uppercase tracking-wider">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+44 or +971 or +92..."
                  className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block font-bold text-white/70 mb-1 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@domain.com"
                  className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-white/70 mb-1 uppercase tracking-wider">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block font-bold text-white/70 mb-1 uppercase tracking-wider">Area of Interest</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value as any })}
                  className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-white focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Men Bespoke">Gentlemen's Bespoke Suiting</option>
                  <option value="Women Couture">Women's Haute Couture</option>
                  <option value="Wedding & Bridal">Bridal & Groom Wedding Wear</option>
                  <option value="Alterations">Master Alterations & Restyling</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-white/70 mb-1 uppercase tracking-wider">Consultation Notes / Occasion</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. 'Looking for 3 bespoke suits for an international conference in London...'"
                className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-sm bg-white/5 text-white/60 hover:text-white hover:bg-white/10 font-bold uppercase tracking-wider text-[11px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-sm bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[11px] hover:bg-[#D4B475] transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
