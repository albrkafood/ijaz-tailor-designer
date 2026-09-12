import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Scissors, Heart, ShieldCheck, Award } from 'lucide-react';
import bridalLehengaImg from '../assets/images/bridal_lehenga_gown_1789189637531.jpg';
import silkCuttingImg from '../assets/images/silk_pattern_cutting_1789189665520.jpg';
import peshwasGownImg from '../assets/images/peshwas_couture_gown_1789189678425.jpg';

interface CategorySelectorProps {
  selectedCategory?: string;
  onSelectCategory?: (category: 'women') => void;
  onStartCustomOrder: (category: 'women') => void;
  onExploreCollection?: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelectCategory,
  onStartCustomOrder,
  onExploreCollection,
}) => {
  const womenSpecialties = [
    {
      title: 'Haute Bridal & Wedding Wear',
      subtitle: 'Heirloom Lehengas, Royal Farshi Ghararas & Shararas',
      desc: 'Masterpieces with 36-kali flared volume, antique dabka, naqshi, real pearls, and zardozi hand embroidery.',
      tag: 'Couture Flagship',
      image: bridalLehengaImg,
    },
    {
      title: 'Luxury Designer Stitching',
      subtitle: 'Maria B, Crimson, Elan, Sana Safinaz & Asim Jofa',
      desc: 'Runway-quality stitching with custom cutwork lace attachments, silk facings, pearl tassels, and inner slips.',
      tag: 'Signature Service',
      image: silkCuttingImg,
    },
    {
      title: 'Designer Dresses & Peshwas',
      subtitle: 'Pure Raw Silk Peshwas, Maxis & Angrakha Silhouettes',
      desc: 'Flared floor-length royal silhouettes tailored to your exact height, bust, and flare specifications.',
      tag: 'Bespoke Fit',
      image: peshwasGownImg,
    },
  ];

  const allCategoriesList = [
    'Designer Dresses',
    'Custom Stitching',
    'Formal Wear',
    'Party Wear',
    'Wedding Dresses',
    'Bridal Wear',
    'Shalwar Kameez',
    '2-Piece & 3-Piece Suits',
    'Custom Embroidery',
    'Alterations & Fitting',
  ];

  return (
    <section className="relative py-8 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="p-6 sm:p-12 rounded-sm bg-gradient-to-br from-[#0D0D0D] via-[#121212] to-[#161616] border border-white/10 shadow-2xl">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#1A1A1A] border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCLUSIVE WOMEN'S COUTURE ATELIER</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white uppercase leading-tight font-bold">
            Haute Couture & Designer Stitching
          </h1>
          <p className="text-white/50 mt-4 italic font-serif text-base sm:text-lg leading-relaxed">
            Crafting royal bridal heirlooms, couture formal wear, and precision designer stitching from Islamabad to discerning clients across the globe.
          </p>
        </div>

        {/* 3 Featured Women Specialties Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {womenSpecialties.map((spec, idx) => (
            <div
              key={idx}
              className="group relative bg-[#1A1A1A] border border-white/10 hover:border-[#C5A059] transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={spec.image}
                  alt={spec.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5 z-10">
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold bg-black/70 px-2 py-0.5 border border-white/10 rounded-sm self-start mb-2">
                    {spec.tag}
                  </span>
                  <h3 className="text-xl font-serif text-white font-bold mb-0.5">
                    {spec.title}
                  </h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-wider">
                    {spec.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#121212] flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-white/60 leading-relaxed font-serif italic">
                  {spec.desc}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (onExploreCollection) onExploreCollection();
                      else if (onSelectCategory) onSelectCategory('women');
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] hover:text-[#D4B475] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Designs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartCustomOrder('women')}
                    className="text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-[#C5A059] hover:text-black text-white px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
                  >
                    Order Custom
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 10 Women Categories Pill Showcase */}
        <div className="p-6 bg-[#0E0E0E] border border-white/10 rounded-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                Complete Atelier Capabilities
              </span>
              <h3 className="text-lg font-serif font-bold text-white uppercase">
                All 10 Women’s Atelier Specialties
              </h3>
            </div>
            <button
              onClick={() => onStartCustomOrder('women')}
              className="self-start sm:self-auto px-6 py-2 rounded-sm bg-[#C5A059] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4B475] shadow-md transition-all flex items-center gap-2"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Custom Tailoring Order</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {allCategoriesList.map((item) => (
              <div
                key={item}
                onClick={() => {
                  if (onExploreCollection) onExploreCollection();
                  else if (onSelectCategory) onSelectCategory('women');
                }}
                className="flex items-center gap-2 p-2.5 bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 hover:border-[#C5A059]/60 rounded-sm cursor-pointer transition-colors group"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span className="text-[11px] text-white/80 group-hover:text-white font-medium truncate">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Presence & Quality Guarantee Banner */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 py-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            <Award className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">
              Worldwide Bridal Trunk Express: USA • UK • UAE • Canada • Australia • Europe
            </span>
          </div>

          <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider text-white/50">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              Master Couturière Fitting Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
