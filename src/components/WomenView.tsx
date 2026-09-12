import React, { useState } from 'react';
import { Garment, WomenSubcategory } from '../types';
import { WOMEN_SUBCATEGORIES, GARMENTS } from '../data/mockData';
import { GarmentCard } from './GarmentCard';
import { Sparkles, Scissors, Heart, ShieldCheck, Ruler } from 'lucide-react';

interface WomenViewProps {
  currency: 'USD' | 'PKR' | 'GBP' | 'AED';
  onCustomizeGarment: (garment: Garment) => void;
  onViewGarmentDetails: (garment: Garment) => void;
  onOpenCustomOrderFlow: () => void;
}

export const WomenView: React.FC<WomenViewProps> = ({
  currency,
  onCustomizeGarment,
  onViewGarmentDetails,
  onOpenCustomOrderFlow,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<WomenSubcategory | 'all'>('all');

  const womenGarments = GARMENTS.filter((g) => g.category === 'women');

  const filteredGarments = womenGarments.filter((g) => {
    if (selectedSubcategory !== 'all' && g.subcategory !== selectedSubcategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Women's Haute Couture Hero */}
      <div className="relative rounded-sm overflow-hidden border border-white/10 bg-[#0E0E0E] p-8 sm:p-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HAUTE COUTURE & BRIDAL ATELIER</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-wide uppercase font-bold mb-4">
            Women's Couture & Custom Stitching
          </h1>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-normal">
            Bespoke bridal lehengas with antique zardozi, hand-finished formal wear, master stitching for Maria B, Sana Safinaz & designer lawn, and custom embroidery tailored to perfection.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenCustomOrderFlow}
              className="px-6 py-3 rounded-sm bg-[#C5A059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4B475] transition-all flex items-center gap-2 shadow-lg"
            >
              <Scissors className="w-4 h-4" />
              <span>Order Custom Women’s Couture</span>
            </button>
          </div>
        </div>
      </div>

      {/* 10 Women's Categories Tab Filter */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-serif text-white font-bold uppercase tracking-wider">
            Explore Women's Categories (10 Specializations)
          </h2>
          <span className="text-xs text-white/40 uppercase tracking-widest font-mono">
            {filteredGarments.length} {filteredGarments.length === 1 ? 'Creation' : 'Creations'} Found
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedSubcategory === 'all'
                ? 'bg-[#C5A059] text-black font-bold shadow-md'
                : 'bg-[#121212] text-white/50 hover:text-white border border-white/10'
            }`}
          >
            All Women's
          </button>
          {WOMEN_SUBCATEGORIES.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedSubcategory === sub
                  ? 'bg-[#C5A059] text-black font-bold shadow-md'
                  : 'bg-[#121212] text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Garments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGarments.map((garment) => (
          <GarmentCard
            key={garment.id}
            garment={garment}
            currency={currency}
            onCustomize={onCustomizeGarment}
            onViewDetails={onViewGarmentDetails}
          />
        ))}
      </div>

      {/* Couture Craft Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
        <div className="p-5 bg-[#0E0E0E] border border-white/10 rounded-sm">
          <Sparkles className="w-5 h-5 text-[#C5A059] mb-2" />
          <h3 className="text-sm font-serif font-bold text-white mb-1 uppercase tracking-wider">Authentic Hand Zardozi</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Multi-generational artisan needlework using antique dabka, tilla, kora, sequins, and French knot accents.
          </p>
        </div>
        <div className="p-5 bg-[#0E0E0E] border border-white/10 rounded-sm">
          <Scissors className="w-5 h-5 text-[#C5A059] mb-2" />
          <h3 className="text-sm font-serif font-bold text-white mb-1 uppercase tracking-wider">Designer Cloth Stitching</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Send your unstitched luxury lawn, velvet, or organza suits for master cutting, piping, and couture finish.
          </p>
        </div>
        <div className="p-5 bg-[#0E0E0E] border border-white/10 rounded-sm">
          <Ruler className="w-5 h-5 text-[#C5A059] mb-2" />
          <h3 className="text-sm font-serif font-bold text-white mb-1 uppercase tracking-wider">Bridal Video Fittings</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            International brides in the USA, UK, and UAE enjoy scheduled video fittings to ensure perfect silhouette drape.
          </p>
        </div>
      </div>
    </div>
  );
};
