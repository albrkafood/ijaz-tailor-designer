import React, { useState } from 'react';
import { ActivePage, Currency } from '../types';
import { 
  Scissors, 
  Globe, 
  Search, 
  Menu, 
  X, 
  Calendar, 
  ShieldCheck, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentTab?: ActivePage;
  onNavigate?: (tab: ActivePage) => void;
  activePage?: ActivePage;
  setActivePage?: (page: ActivePage) => void;
  selectedCategory?: string;
  setSelectedCategory?: (cat: any) => void;
  currency: Currency;
  setCurrency?: (c: Currency) => void;
  onCurrencyChange?: (c: Currency) => void;
  onOpenOrderFlow?: (category?: any, garmentId?: string) => void;
  onOpenAppointment?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  activePage,
  setActivePage,
  currency,
  setCurrency,
  onCurrencyChange,
  onOpenOrderFlow,
  onOpenAppointment,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const currentPage = currentTab || activePage || 'home';

  const navigateTo = (page: ActivePage) => {
    if (onNavigate) onNavigate(page);
    if (setActivePage) setActivePage(page);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCurrencySelect = (c: Currency) => {
    if (onCurrencyChange) onCurrencyChange(c);
    if (setCurrency) setCurrency(c);
  };

  const handleCustomOrderClick = () => {
    if (onOpenOrderFlow) {
      onOpenOrderFlow('women');
    } else if (onNavigate) {
      onNavigate('order_online' as any);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10">
      {/* Top International Announcement Bar */}
      <div className="bg-[#0A0A0A] px-4 sm:px-8 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/60 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
          <span className="text-white/80 font-medium truncate max-w-[200px] sm:max-w-none">
            Bespoke Bridal & Designer Tailor
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px]">
          <button 
            onClick={() => navigateTo('international_orders' as any)}
            className="hover:text-[#C5A059] flex items-center gap-1.5 transition-colors text-white/70 hover:text-white"
          >
            <Globe className="w-3 h-3 text-[#C5A059]" />
            <span>Worldwide Orders</span>
          </button>
          <button
            onClick={() => {
              if (onOpenAdmin) onOpenAdmin();
              else navigateTo('admin');
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-sm border transition-colors ${
              currentPage === 'admin'
                ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                : 'border-white/10 text-white/50 hover:text-white hover:border-[#C5A059]'
            }`}
            title="Atelier Admin Dashboard"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="text-left flex flex-col group cursor-pointer"
          >
            <span className="text-2xl sm:text-3xl font-serif tracking-[0.2em] text-[#C5A059] uppercase group-hover:text-[#D4B475] transition-colors font-bold">
              IJAZ
            </span>
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/80 group-hover:text-white transition-colors font-medium">
              DESIGNER TAILOR
            </span>
            <span className="text-[7.5px] tracking-[0.25em] text-[#C5A059]/70 uppercase font-semibold">
              HAUTE COUTURE • BRIDAL • BESPOKE STITCHING
            </span>
          </button>

          {/* Navigation Links Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 text-[11px] uppercase tracking-widest font-medium text-white/70">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors pb-1 ${currentPage === 'home' ? 'text-white border-b border-[#C5A059] font-bold' : 'hover:text-[#C5A059]'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('women')}
              className={`transition-colors pb-1 flex items-center gap-1 ${currentPage === 'women' ? 'text-white border-b border-[#C5A059] font-bold' : 'hover:text-[#C5A059]'}`}
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Couture Collections</span>
            </button>
            <button
              onClick={() => navigateTo('bespoke_tailoring' as any)}
              className={`transition-colors pb-1 ${currentPage === 'bespoke_tailoring' || (currentPage as string) === 'bespoke' ? 'text-white border-b border-[#C5A059] font-bold' : 'hover:text-[#C5A059]'}`}
            >
              Atelier Craft
            </button>
            <button
              onClick={() => navigateTo('services')}
              className={`transition-colors pb-1 ${currentPage === 'services' ? 'text-white border-b border-[#C5A059] font-bold' : 'hover:text-[#C5A059]'}`}
            >
              Services
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className={`transition-colors pb-1 ${currentPage === 'gallery' ? 'text-white border-b border-[#C5A059] font-bold' : 'hover:text-[#C5A059]'}`}
            >
              Lookbook
            </button>
            <button
              onClick={() => navigateTo('international_orders' as any)}
              className={`transition-colors pb-1 ${currentPage === 'international_orders' || (currentPage as string) === 'international' ? 'text-white border-b border-[#C5A059] font-bold' : 'hover:text-[#C5A059]'}`}
            >
              International
            </button>
            <button
              onClick={() => navigateTo('track_order')}
              className={`flex items-center gap-1.5 transition-colors pb-1 ${currentPage === 'track_order' ? 'text-white border-b border-[#C5A059] font-bold' : 'hover:text-[#C5A059]'}`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#C5A059] transition-colors"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0F0F0F] border border-white/10 rounded-sm shadow-2xl py-2 z-50">
                  <button
                    onClick={() => navigateTo('reviews')}
                    className="w-full text-left px-4 py-2 text-[11px] uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#C5A059]"
                  >
                    Client Reviews
                  </button>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="w-full text-left px-4 py-2 text-[11px] uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#C5A059]"
                  >
                    Boutique & Contact
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {onOpenAppointment && (
              <button
                onClick={onOpenAppointment}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-sm border border-white/20 text-[11px] font-bold uppercase tracking-widest text-white/80 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Book Consultation</span>
              </button>
            )}

            {/* Prominent Custom Order System Trigger */}
            <button
              onClick={handleCustomOrderClick}
              className="px-5 sm:px-6 py-2 rounded-sm bg-[#C5A059] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4B475] shadow-lg transition-all flex items-center gap-2"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Online Custom Order</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm text-white/70 hover:text-white hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F0F] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="pb-3 border-b border-white/10">
            <button
              onClick={() => navigateTo('women')}
              className="w-full py-2.5 px-3 rounded-sm bg-[#141414] border border-[#C5A059]/40 text-[11px] uppercase tracking-wider font-bold text-center text-[#C5A059] hover:border-[#C5A059]"
            >
              👗 EXPLORE WOMEN'S HAUTE COUTURE (10 CATEGORIES)
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-xs uppercase tracking-wider text-white/70">
            <button
              onClick={() => navigateTo('home')}
              className="text-left py-2 px-2 hover:bg-white/5 hover:text-[#C5A059] rounded-sm font-medium"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('women')}
              className="text-left py-2 px-2 hover:bg-white/5 hover:text-[#C5A059] rounded-sm font-medium"
            >
              Women's Couture (Bridal, Formal, Designer Stitching)
            </button>
            <button
              onClick={() => navigateTo('bespoke_tailoring' as any)}
              className="text-left py-2 px-2 hover:bg-white/5 hover:text-[#C5A059] rounded-sm font-medium"
            >
              Atelier Craft & Heritage
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="text-left py-2 px-2 hover:bg-white/5 hover:text-[#C5A059] rounded-sm font-medium"
            >
              Services (Stitching, Embroidery, Alterations)
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className="text-left py-2 px-2 hover:bg-white/5 hover:text-[#C5A059] rounded-sm font-medium"
            >
              Gallery & Lookbook
            </button>
            <button
              onClick={() => navigateTo('international_orders' as any)}
              className="text-left py-2 px-2 hover:bg-white/5 hover:text-[#C5A059] rounded-sm font-medium text-[#C5A059]"
            >
              International Orders (USA, UK, UAE...)
            </button>
            <button
              onClick={() => navigateTo('track_order')}
              className="text-left py-2 px-2 hover:bg-white/5 hover:text-[#C5A059] rounded-sm font-medium flex items-center justify-between"
            >
              <span>Track Your Order</span>
              <Search className="w-4 h-4 text-[#C5A059]" />
            </button>
            <button
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
                else navigateTo('admin');
              }}
              className="text-left py-2 px-2 bg-white/5 text-[#C5A059] rounded-sm font-medium flex items-center justify-between"
            >
              <span>Atelier Admin Panel</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleCustomOrderClick();
              }}
              className="w-full py-2.5 rounded-sm bg-[#C5A059] text-black font-bold text-center text-[11px] tracking-widest uppercase hover:bg-[#D4B475]"
            >
              Start Online Custom Order
            </button>
            {onOpenAppointment && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full py-2.5 rounded-sm border border-white/20 text-[11px] font-bold uppercase tracking-widest text-center text-white hover:border-[#C5A059]"
              >
                Book Bridal Consultation
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
