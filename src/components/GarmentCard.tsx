import React from 'react';
import { Garment } from '../types';
import { formatPrice } from '../utils/orderStore';
import { Clock, Scissors, Eye, Sparkles } from 'lucide-react';
import bridalLehengaImg from '../assets/images/bridal_lehenga_gown_1789189637531.jpg';

interface GarmentCardProps {
  garment: Garment;
  currency: 'USD' | 'PKR' | 'GBP' | 'AED';
  onCustomize: (garment: Garment) => void;
  onViewDetails: (garment: Garment) => void;
}

export const GarmentCard: React.FC<GarmentCardProps> = ({
  garment,
  currency,
  onCustomize,
  onViewDetails,
}) => {
  return (
    <div className="group bg-[#141414] border border-white/10 rounded-sm overflow-hidden hover:border-[#C5A059]/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between">
      <div>
        {/* Garment Image with Hover Zoom */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
          <img
            src={garment.image}
            alt={garment.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = bridalLehengaImg;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

          {/* Subcategory Pill */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-[#0D0D0D]/90 backdrop-blur-md rounded-sm border border-white/10 text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">
              {garment.subcategory}
            </span>
          </div>

          {/* Gender badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 bg-[#0D0D0D]/90 backdrop-blur-md rounded-sm text-[9px] uppercase tracking-widest text-white/60 font-semibold border border-white/10">
              {garment.category === 'men' ? 'Gentleman' : 'Haute Couture'}
            </span>
          </div>

          {/* Quick Details Overlay Trigger */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onViewDetails(garment)}
              className="p-2 rounded-sm bg-[#0D0D0D]/90 border border-white/10 text-white/80 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
              title="Quick View Garment Specs"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-serif text-white font-medium leading-snug line-clamp-2 group-hover:text-[#C5A059] transition-colors mb-2">
            {garment.name}
          </h3>

          <p className="text-xs text-white/50 line-clamp-2 mb-3 leading-relaxed">
            {garment.description}
          </p>

          {/* Fabric Recommendations Chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {garment.fabricSuggestions.slice(0, 2).map((fab) => (
              <span
                key={fab}
                className="text-[10px] px-2 py-0.5 rounded-sm bg-white/5 text-white/70 border border-white/10"
              >
                {fab}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Turnaround & Price & Action */}
      <div className="p-4 sm:p-5 pt-0 border-t border-white/10 mt-2">
        <div className="flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>~{garment.estimatedDays} days craft</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-white/40 uppercase tracking-wider block">From</span>
            <span className="text-base font-bold text-[#C5A059] font-serif">
              {formatPrice(garment.basePriceUSD, currency)}
            </span>
          </div>
        </div>

        <button
          onClick={() => onCustomize(garment)}
          className="w-full mt-2 py-2.5 px-3 rounded-sm bg-[#1A1A1A] hover:bg-[#C5A059] text-white hover:text-black border border-white/10 hover:border-[#C5A059] font-bold text-[11px] tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Customize & Order</span>
        </button>
      </div>
    </div>
  );
};
