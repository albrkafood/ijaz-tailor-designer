import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Check } from 'lucide-react';

interface ContactViewProps {
  onBookAppointment: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBookAppointment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Inquiry',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
          Islamabad Atelier & Global Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe6] uppercase tracking-wide font-bold mt-2 mb-4">
          Contact Our Master Tailors
        </h1>
        <p className="text-xs sm:text-sm text-[#959ca9] leading-relaxed">
          Whether you would like to visit our flagship boutique in Islamabad or require bespoke advice from abroad via WhatsApp and video consultation, our team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Col */}
        <div className="space-y-6">
          <div className="p-6 bg-[#13151f] border border-[#232738] rounded-2xl space-y-4">
            <h3 className="text-base font-serif font-bold text-[#f2ede4] border-b border-[#212638] pb-3">
              Flagship Atelier Location
            </h3>

            <div className="flex items-start gap-3 text-xs text-[#a3abbd]">
              <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#f0ebe2] block text-sm">Ijaz Designer & Tailors</strong>
                <span>Shop # 14-16, Beverly Centre, Jinnah Avenue, Blue Area / F-6, Islamabad, 44000, Pakistan</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-[#a3abbd]">
              <Phone className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#f0ebe2] block">Atelier Phone Lines</strong>
                <span>+92 51 2824991 / +92 300 5001992</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-[#a3abbd]">
              <MessageCircle className="w-5 h-5 text-[#25d366] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#f0ebe2] block">WhatsApp Concierge Desk</strong>
                <span>+92 300 5001992 (Instant Response)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-[#a3abbd]">
              <Mail className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#f0ebe2] block">Client Inquiries</strong>
                <span>concierge@ijaztailors.com</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#13151f] border border-[#232738] rounded-2xl space-y-3 text-xs text-[#a3abbd]">
            <h3 className="text-base font-serif font-bold text-[#f2ede4] border-b border-[#212638] pb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c5a880]" />
              <span>Atelier Opening Hours</span>
            </h3>
            <div className="flex justify-between py-1 border-b border-[#1e2334]">
              <span>Monday – Saturday:</span>
              <span className="text-[#e2e6f2] font-semibold">11:00 AM – 9:30 PM PKT</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1e2334]">
              <span>Friday:</span>
              <span className="text-[#e2e6f2] font-semibold">3:00 PM – 10:00 PM PKT</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Sunday:</span>
              <span className="text-[#c5a880] font-semibold">By VIP Appointment Only</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookAppointment}
                className="w-full py-2.5 rounded-xl bg-[#c5a880] text-[#0b0c10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8be99] transition-colors text-center block"
              >
                Book An Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form */}
        <div className="lg:col-span-2 p-8 bg-[#13151f] border border-[#232738] rounded-2xl shadow-xl">
          <h3 className="text-xl font-serif font-bold text-[#f2ede4] mb-2">
            Send Master Cutter a Message
          </h3>
          <p className="text-xs text-[#8f96a8] mb-6">
            Have a custom cloth inquiry, wedding event date, or international order query? Leave a message below and our master cutter will respond within 24 hours.
          </p>

          {sent ? (
            <div className="p-8 text-center bg-[#18261e] border border-[#265e38] rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f2ede4]">
                Message Delivered to Master Cutter
              </h4>
              <p className="text-xs text-[#a3cfb1]">
                Thank you for reaching out, {formData.name}. Our bespoke team will contact you via WhatsApp or Email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#cbd1e2] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Khan"
                    className="w-full bg-[#171a26] border border-[#292f44] rounded-xl p-3 text-[#f2ede4] placeholder-[#5c6478] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#cbd1e2] mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000 or +44 / +971"
                    className="w-full bg-[#171a26] border border-[#292f44] rounded-xl p-3 text-[#f2ede4] placeholder-[#5c6478] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#cbd1e2] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-[#171a26] border border-[#292f44] rounded-xl p-3 text-[#f2ede4] placeholder-[#5c6478] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#cbd1e2] mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#171a26] border border-[#292f44] rounded-xl p-3 text-[#f2ede4] focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Bespoke Inquiry">Bespoke Inquiry</option>
                    <option value="International Order">International Order (USA / UK / UAE / Gulf)</option>
                    <option value="Bridal & Groom Consultation">Bridal & Groom Consultation</option>
                    <option value="Fabric & Cloth Sourcing">Fabric & Cloth Sourcing</option>
                    <option value="Alteration Request">Alteration Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#cbd1e2] mb-1">Your Message or Requirements *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the occasion, desired fabrics, timelines, or any bespoke design requests..."
                  className="w-full bg-[#171a26] border border-[#292f44] rounded-xl p-3 text-[#f2ede4] placeholder-[#5c6478] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="https://wa.me/923005001992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#25d366] hover:underline flex items-center gap-1 font-medium"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Or message directly on WhatsApp</span>
                </a>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#c5a880] text-[#0b0c10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8be99] transition-all flex items-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
