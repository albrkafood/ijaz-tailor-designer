import React from 'react';
import { MEN_SUBCATEGORIES, WOMEN_SUBCATEGORIES } from '../data/mockData';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  ShieldCheck,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any) => void;
  onSelectCategory?: (category: 'women') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-white/50 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#C5A059] flex items-center justify-center text-black shadow-md">
                <Scissors className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-bold text-[#C5A059] block uppercase leading-none">
                  IJAZ DESIGNER ATELIER
                </span>
                <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase block mt-1 font-medium">
                  Women's Haute Couture • Islamabad & Worldwide
                </span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-md">
              Islamabad's premier women's designer atelier specializing exclusively in heirloom bridal lehengas, royal ghararas, luxury designer lawn & chiffon stitching, bespoke zardozi embroidery, and contemporary Pakistani couture. Handcrafted with bespoke precision and shipped worldwide.
            </p>

            <div className="space-y-2 text-xs text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Shop 14-16, Beverly Centre, Blue Area / F-6, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>+92 300 5001992 / +92 51 2824991</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>concierge@ijaztailors.com</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/923005001992"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#141414] border border-white/10 text-white hover:border-[#25d366] hover:text-[#25d366] font-bold text-[10px] uppercase tracking-widest transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25d366]" />
                <span>WhatsApp Atelier Concierge</span>
              </a>
            </div>
          </div>

          {/* Women's Categories Col 1 */}
          <div>
            <h4 className="text-[11px] font-serif font-bold text-white uppercase tracking-[0.2em] mb-3">
              Couture Specialties
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              {WOMEN_SUBCATEGORIES.slice(0, 5).map((sub) => (
                <li key={sub}>
                  <button
                    onClick={() => onNavigate('women')}
                    className="hover:text-[#C5A059] transition-colors text-left text-white/60"
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Women's Categories Col 2 */}
          <div>
            <h4 className="text-[11px] font-serif font-bold text-white uppercase tracking-[0.2em] mb-3">
              Designer Stitching & Pret
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              {WOMEN_SUBCATEGORIES.slice(5).map((sub) => (
                <li key={sub}>
                  <button
                    onClick={() => onNavigate('women')}
                    className="hover:text-[#C5A059] transition-colors text-left text-white/60"
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Services & Orders Col */}
          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-serif font-bold text-white uppercase tracking-[0.2em] mb-3">
                Online Tailoring & Services
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button
                    onClick={() => onNavigate('order_online')}
                    className="text-[#C5A059] font-bold hover:underline tracking-wide uppercase text-[10px]"
                  >
                    ✦ Online Custom Order System
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('international')}
                    className="hover:text-[#C5A059] transition-colors text-white/60"
                  >
                    International Ordering (USA, UK, UAE...)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('track_order')}
                    className="hover:text-[#C5A059] transition-colors text-white/60"
                  >
                    Track Your Order
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('bespoke')}
                    className="hover:text-[#C5A059] transition-colors text-white/60"
                  >
                    The Bespoke Craft & Heritage
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="hover:text-[#C5A059] transition-colors text-white/60"
                  >
                    Atelier Lookbook & Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('reviews')}
                    className="hover:text-[#C5A059] transition-colors text-white/60"
                  >
                    Client Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-[#C5A059] transition-colors text-white/60"
                  >
                    Contact & Boutique Location
                  </button>
                </li>
              </ul>
            </div>

            {/* Admin link */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40 hover:text-[#C5A059] transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Atelier Admin Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* International Shipping & Policy Disclaimer */}
        <div className="p-4 bg-[#141414] border border-white/10 rounded-sm text-[11px] text-white/50 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Custom Tailoring & International Courier Policy:</strong>
            International shipping availability and delivery dates are subject to confirmation by the atelier owner based on garment complexity and destination courier clearance. All bespoke orders are backed by our Islamabad atelier master fit guarantee.
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} Ijaz Designer & Tailors. All Rights Reserved. Islamabad, Pakistan.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('track_order')} className="hover:text-[#C5A059]">Order Tracking</button>
            <span>•</span>
            <button onClick={() => onNavigate('international')} className="hover:text-[#C5A059]">Worldwide Shipping</button>
            <span>•</span>
            <button onClick={onOpenAdmin} className="hover:text-[#C5A059]">Master Tailor Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
