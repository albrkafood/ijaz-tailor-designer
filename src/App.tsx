import React, { useState } from 'react';
import { Currency, GenderCategory, Garment, NavigationTab } from './types';
import { GARMENTS, WOMEN_SUBCATEGORIES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { CategorySelector } from './components/CategorySelector';
import { GarmentCard } from './components/GarmentCard';
import { OnlineOrderSystem } from './components/OnlineOrderSystem';
import { TrackOrderView } from './components/TrackOrderView';
import { InternationalOrdersView } from './components/InternationalOrdersView';
import { AdminPanelView } from './components/AdminPanelView';
import { WomenView } from './components/WomenView';
import { ServicesView } from './components/ServicesView';
import { BespokeCraftView } from './components/BespokeCraftView';
import { GalleryView } from './components/GalleryView';
import { ReviewsView } from './components/ReviewsView';
import { ContactView } from './components/ContactView';
import { GarmentDetailModal } from './components/GarmentDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { Footer } from './components/Footer';
import coutureHeroImg from './assets/images/couture_hero_atelier_1789189621964.jpg';
import bridalLehengaImg from './assets/images/bridal_lehenga_gown_1789189637531.jpg';
import zardoziEmbroideryImg from './assets/images/zardozi_embroidery_1789189650001.jpg';
import silkCuttingImg from './assets/images/silk_pattern_cutting_1789189665520.jpg';
import peshwasGownImg from './assets/images/peshwas_couture_gown_1789189678425.jpg';
import { 
  Scissors, 
  Sparkles, 
  Globe, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  ChevronRight, 
  Ruler, 
  Star,
  CheckCircle2,
  Calendar,
  Lock,
  Award,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<GenderCategory>('women');
  const [currency, setCurrency] = useState<Currency>('PKR');
  
  // Modals & Overlays
  const [isOrderSystemOpen, setIsOrderSystemOpen] = useState(false);
  const [selectedGarmentForOrder, setSelectedGarmentForOrder] = useState<Garment | undefined>(undefined);
  const [viewingGarment, setViewingGarment] = useState<Garment | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');

  // Hero interactive artwork state
  const [heroActiveImage, setHeroActiveImage] = useState<string>(bridalLehengaImg);
  const [heroActiveTitle, setHeroActiveTitle] = useState<string>('Imperial Crimson Zardozi Bridal Lehenga');
  const [heroActiveDesc, setHeroActiveDesc] = useState<string>('36-Panel Heirloom Hand-Embroidered Dabka, Kora & Pearls');

  // Handlers
  const handleStartCustomOrder = (garment?: Garment, category?: GenderCategory) => {
    if (category) setSelectedCategory(category);
    setSelectedGarmentForOrder(garment);
    setIsOrderSystemOpen(true);
  };

  const handleOpenOrderWithCategory = (cat: GenderCategory = 'women') => {
    setSelectedCategory(cat);
    setSelectedGarmentForOrder(undefined);
    setIsOrderSystemOpen(true);
  };

  const handleOpenGarmentDetails = (garment: Garment) => {
    setViewingGarment(garment);
  };

  const handleViewTracker = (orderId: string) => {
    setActiveTrackingId(orderId);
    setCurrentTab('track_order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Featured garments for homepage (curated couture including bridal, festive party wear & designer stitching)
  const featuredIds = ['w-bridal-1', 'w-bridal-2', 'w-party-3', 'w-party-5', 'w-party-7', 'w-wedding-1', 'w-dress-1', 'w-3piece-1'];
  const displayedFeatured = GARMENTS.filter((g) => featuredIds.includes(g.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#C5A059] selection:text-black">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#080808] border-b border-white/5 py-1.5 px-4 text-center text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-white/60 flex items-center justify-center gap-2.5 sm:gap-3">
        <span className="text-[#C5A059] font-medium">Islamabad Designer Tailor</span>
        <span className="text-white/20">•</span>
        <span>Worldwide Express</span>
        <span className="text-white/20">•</span>
        <span className="text-[#C5A059] font-medium">Bespoke Fit Guarantee</span>
      </div>

      {/* Main Global Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenAdmin={() => {
          setCurrentTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="min-h-[80vh]">
        {currentTab === 'home' && (
          <div className="space-y-16">
            {/* Editorial Luxury Hero Section with Visual Showcase */}
            <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#0B0B0B]">
              {/* Atelier Ambience Backdrop Image */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
                <img
                  src={coutureHeroImg}
                  alt="Atelier Backdrop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter blur-[2px] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/90 to-[#0B0B0B]/60" />
              </div>

              {/* Ambient Gold Glow */}
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#C5A059]/15 blur-[160px] rounded-full pointer-events-none z-0" />

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Left Column: Atelier Narrative & CTAs */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#141414]/90 border border-white/15 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059] shadow-md backdrop-blur">
                      <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>IJAZ DESIGNER TAILOR • F-8 MARKAZ, ISLAMABAD</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase font-bold text-white leading-[1.1]">
                      Haute Couture & <br />
                      <span className="italic font-serif text-[#C5A059]">Designer Stitching</span>
                    </h1>

                    <p className="text-xs sm:text-base text-white/70 leading-relaxed font-serif italic max-w-xl">
                      From heirloom bridal lehengas, 36-panel royal farshi ghararas, and hand-embellished raw silk peshwas to precision designer suit stitching (Maria B, Sana Safinaz, Crimson, Elan) and custom embroidery. Handcrafted in Islamabad and delivered worldwide with personal video fittings.
                    </p>

                    {/* Quality Highlights Chips */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[11px] text-white/80 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                        36-Kali Flared Volume & Can-Can
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[11px] text-white/80 font-medium">
                        <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                        Pure Antique Dabka & Zardozi
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[11px] text-white/80 font-medium">
                        <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                        Worldwide DHL Doorstep Delivery
                      </span>
                    </div>

                    {/* Primary Call to Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => handleStartCustomOrder()}
                        className="px-7 py-3.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black font-bold text-[11px] uppercase tracking-widest shadow-xl transition-all flex items-center gap-2"
                      >
                        <Scissors className="w-4 h-4" />
                        <span>Launch Custom Order System</span>
                      </button>

                      <button
                        onClick={() => setIsAppointmentOpen(true)}
                        className="px-5 py-3.5 rounded-sm bg-[#161616] border border-white/15 text-white hover:text-[#C5A059] hover:border-[#C5A059] font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-[#C5A059]" />
                        <span>Book Video Consultation</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTab('women');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-3.5 rounded-sm bg-transparent border border-white/10 text-white/70 hover:text-white hover:border-white/30 font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-1.5"
                      >
                        <span>View 10 Categories</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Hero Visual Showcase Artwork */}
                  <div className="lg:col-span-5">
                    <div className="relative bg-[#141414] border border-[#C5A059]/40 rounded-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-sm bg-black/85 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">
                          ★ Masterpiece Collection
                        </span>
                        <span className="px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-wider text-white/70 border border-white/10 font-semibold">
                          Islamabad Atelier
                        </span>
                      </div>

                      {/* Main Featured Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-black">
                        <img
                          src={heroActiveImage}
                          alt={heroActiveTitle}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                        {/* Bottom Overlay Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 bg-gradient-to-t from-black via-black/90 to-transparent space-y-1">
                          <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold block">
                            Featured Masterwork
                          </span>
                          <h3 className="text-lg font-serif font-bold text-white leading-tight">
                            {heroActiveTitle}
                          </h3>
                          <p className="text-[11px] text-white/60 font-serif italic line-clamp-1">
                            {heroActiveDesc}
                          </p>
                        </div>
                      </div>

                      {/* Interactive 4-Thumbnail Preview Strip */}
                      <div className="p-3 bg-[#0D0D0D] border-t border-white/10">
                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-2">
                          Explore Atelier Craftsmanship (Click to preview):
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            {
                              img: bridalLehengaImg,
                              label: 'Bridal Lehenga',
                              title: 'Imperial Crimson Zardozi Bridal Lehenga',
                              desc: '36-Panel Heirloom Hand-Embroidered Dabka, Kora & Pearls',
                            },
                            {
                              img: zardoziEmbroideryImg,
                              label: 'Adda Work',
                              title: 'Traditional Wooden Adda Zardozi Handwork',
                              desc: 'Master artisans embroidering gold dabka and sequins on silk velvet',
                            },
                            {
                              img: silkCuttingImg,
                              label: 'Master Cutting',
                              title: 'Bespoke Shears Pattern Cutting & Markings',
                              desc: 'Individual paper patterns and chalk lines tailored for ladies silhouette',
                            },
                            {
                              img: peshwasGownImg,
                              label: 'Royal Peshwas',
                              title: 'Champagne Ivory Flared Raw Silk Peshwas',
                              desc: 'Sweeping kalidar gown with sheer dupatta and tilla bodice',
                            },
                          ].map((thumb, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setHeroActiveImage(thumb.img);
                                setHeroActiveTitle(thumb.title);
                                setHeroActiveDesc(thumb.desc);
                              }}
                              className={`relative aspect-square rounded-sm overflow-hidden border transition-all text-left group/thumb ${
                                heroActiveImage === thumb.img
                                  ? 'border-[#C5A059] ring-1 ring-[#C5A059]'
                                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                              }`}
                            >
                              <img
                                src={thumb.img}
                                alt={thumb.label}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-top"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 px-1 text-[8px] text-white/80 font-bold truncate text-center">
                                {thumb.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 4-Pillar Atelier Credibility & Trust Strip */}
                <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#C5A059]">
                      <Award className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">3 Decades Heritage</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      Founded by Master Cutter Ijaz in Islamabad, serving presidential and high-fashion families.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#C5A059]">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">50+ Hours Handwork</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      Pure antique dabka, marori, resham, and cultured pearl needlework on traditional wooden adda.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#C5A059]">
                      <Globe className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">Worldwide Express</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      Safe tracked courier delivery to clients in the UK, USA, Canada, UAE, Saudi Arabia, and Europe.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#C5A059]">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">100% Fit Guarantee</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      Interactive video fitting consultation and individual posture pattern drafting for every client.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* Haute Couture Specialties Bento Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CategorySelector
                selectedCategory="women"
                onSelectCategory={() => setSelectedCategory('women')}
                onStartCustomOrder={(cat) => handleOpenOrderWithCategory(cat)}
                onExploreCollection={() => {
                  setCurrentTab('women');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </section>

            {/* Showcase Grid for Women's Couture */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
                    Couture Collection
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white uppercase font-bold">
                    Featured Women's Couture & Stitching
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setCurrentTab('women');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-bold text-[#C5A059] hover:text-[#D4B475] flex items-center gap-1 uppercase tracking-widest transition-colors"
                >
                  <span>Explore All 10 Women's Categories</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Garment Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedFeatured.map((garment) => (
                  <GarmentCard
                    key={garment.id}
                    garment={garment}
                    currency={currency}
                    onCustomize={(g) => handleStartCustomOrder(g, g.category)}
                    onViewDetails={handleOpenGarmentDetails}
                  />
                ))}
              </div>
            </section>

            {/* Complete 9-Step Online Tailoring Flow Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-sm border border-white/10 bg-gradient-to-br from-[#121212] via-[#161616] to-[#0E0E0E] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="max-w-3xl space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#1A1A1A] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>9-STEP BESPOKE ENGINE</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-serif text-white uppercase font-bold leading-tight">
                    Order Bespoke Tailoring Online in Minutes
                  </h2>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-serif italic">
                    Designed for clients worldwide. Pick Garment → Choose Design or Upload Custom Reference → Select Fabric & Color → Enter Measurements or Standard Baseline → Add Delivery Details → Order Confirmation on WhatsApp.
                  </p>

                  {/* Visual Step Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2 text-[10px] uppercase tracking-wider font-semibold">
                    {[
                      '1. Category',
                      '2. Garment',
                      '3. Design / Photo',
                      '4. Fabric & Color',
                      '5. Measurements',
                      '6. Delivery Details',
                      '7. Cost Summary',
                      '8. Secure Pay Choice',
                      '9. WhatsApp Order',
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-sm bg-[#0D0D0D] border border-white/10 text-white/80 text-center"
                      >
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => handleStartCustomOrder()}
                      className="px-8 py-3.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <Scissors className="w-4 h-4" />
                      <span>Start Custom Order Flow</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentTab('track_order');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 rounded-sm bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
                    >
                      Track Existing Order
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Order Tracking Widget on Homepage */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#141414] border border-white/10 rounded-sm p-8 text-center space-y-4 shadow-xl">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                  Already Have A Commission in Progress?
                </span>
                <h3 className="text-2xl font-serif text-white uppercase font-bold">
                  Track Your Tailoring Order
                </h3>
                <p className="text-xs text-white/50 max-w-lg mx-auto leading-relaxed">
                  Follow your garment through all 8 stages: Order Received → Design Confirmed → Fabric Selected → Cutting & Stitching → Fitting → Final Finishing → Ready/Shipped → Completed.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCurrentTab('track_order');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-3 rounded-sm bg-white/5 hover:bg-[#C5A059] hover:text-black border border-white/10 text-[11px] font-bold uppercase tracking-widest text-white transition-colors"
                  >
                    Open Live Order Tracker
                  </button>
                </div>
              </div>
            </section>

            {/* Pillars of Quality Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Floating Horsehair Canvas',
                    desc: 'Zero chemical glue fusing. Natural canvas allows suit jackets to conform to body heat.',
                    icon: ShieldCheck,
                  },
                  {
                    title: 'Chinese 10-Pound Boski',
                    desc: 'Directly sourced heavy spun silk for executive & ceremonial Shalwar Kameez.',
                    icon: Sparkles,
                  },
                  {
                    title: 'Hand Zardozi Needlework',
                    desc: 'Generational craftsmanship with antique dabka, tilla, kora, and crystal stones.',
                    icon: Scissors,
                  },
                  {
                    title: 'International Dispatch',
                    desc: 'Protected in custom travel garment bags and shipped with full courier tracking.',
                    icon: Globe,
                  },
                ].map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div key={idx} className="p-6 bg-[#141414] border border-white/10 rounded-sm">
                      <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-serif font-bold text-white mb-1 uppercase tracking-wider">{p.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Dedicated Women's Collection View */}
        {currentTab === 'women' && (
          <WomenView
            currency={currency}
            onCustomizeGarment={(g) => handleStartCustomOrder(g, 'women')}
            onViewGarmentDetails={handleOpenGarmentDetails}
            onOpenCustomOrderFlow={() => handleStartCustomOrder(undefined, 'women')}
          />
        )}

        {/* Online Order System Dedicated View / Flow */}
        {currentTab === 'order_online' && (
          <div className="py-8">
            <OnlineOrderSystem
              initialCategory={selectedCategory}
              initialGarment={selectedGarmentForOrder}
              currency={currency}
              onClose={() => setCurrentTab('home')}
              onViewOrderDetails={(orderId) => {
                setActiveTrackingId(orderId);
                setCurrentTab('track_order');
              }}
            />
          </div>
        )}

        {/* International Ordering Dedicated View */}
        {currentTab === 'international' && (
          <InternationalOrdersView
            onStartCustomOrder={() => handleStartCustomOrder()}
          />
        )}

        {/* Order Tracking View */}
        {currentTab === 'track_order' && (
          <TrackOrderView
            currency={currency}
            onNewOrderClick={() => handleStartCustomOrder()}
          />
        )}

        {/* Bespoke Craft & Atelier Heritage */}
        {currentTab === 'bespoke' && (
          <BespokeCraftView
            onStartCustomOrder={() => handleStartCustomOrder()}
          />
        )}

        {/* Atelier Services */}
        {currentTab === 'services' && (
          <ServicesView
            onStartCustomOrder={() => handleStartCustomOrder()}
            onNavigateCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentTab(cat);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Gallery / Lookbook */}
        {currentTab === 'gallery' && (
          <GalleryView
            onStartCustomOrder={() => handleStartCustomOrder()}
          />
        )}

        {/* Reviews View */}
        {currentTab === 'reviews' && <ReviewsView />}

        {/* Contact View */}
        {currentTab === 'contact' && (
          <ContactView onBookAppointment={() => setIsAppointmentOpen(true)} />
        )}

        {/* Admin Dashboard View */}
        {currentTab === 'admin' && (
          <AdminPanelView
            currency={currency}
            onViewOrderTracker={handleViewTracker}
          />
        )}
      </main>

      {/* Online Order Modal (when triggered from buttons anywhere) */}
      {isOrderSystemOpen && (
        <div className="fixed inset-0 z-50 bg-[#000000]/85 backdrop-blur-md overflow-y-auto p-2 sm:p-6 flex items-center justify-center">
          <div className="w-full max-w-5xl my-auto">
            <OnlineOrderSystem
              initialCategory={selectedCategory}
              initialGarment={selectedGarmentForOrder}
              currency={currency}
              onClose={() => setIsOrderSystemOpen(false)}
              onViewOrderDetails={(orderId) => {
                setIsOrderSystemOpen(false);
                handleViewTracker(orderId);
              }}
            />
          </div>
        </div>
      )}

      {/* Garment Details Modal */}
      <GarmentDetailModal
        garment={viewingGarment}
        currency={currency}
        onClose={() => setViewingGarment(null)}
        onCustomize={(g) => handleStartCustomOrder(g, g.category)}
      />

      {/* Appointment Consultation Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      {/* WhatsApp Floating Concierge Button */}
      <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/923005001992?text=Hello%20Ijaz%20Designer%20Tailor%20Islamabad!%20I%20would%20like%20to%20inquire%20about%20bespoke%20tailoring."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25d366] text-[#0b0c10] font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline tracking-wider font-semibold">WhatsApp Concierge</span>
        </a>
      </aside>

      {/* Comprehensive Atelier Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={setSelectedCategory}
        onOpenAdmin={() => {
          setCurrentTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
