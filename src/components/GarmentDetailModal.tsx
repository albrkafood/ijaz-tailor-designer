import React from 'react';
import { Garment } from '../types';
import { formatPrice } from '../utils/orderStore';
import { X, Scissors, Clock, Check, Sparkles, ShieldCheck } from 'lucide-react';
import bridalLehengaImg from '../assets/images/bridal_lehenga_gown_1789189637531.jpg';

interface GarmentDetailModalProps {
  garment: Garment | null;
  currency: 'USD' | 'PKR' | 'GBP' | 'AED';
  onClose: () => void;
  onCustomize: (garment: Garment) => void;
}

export const GarmentDetailModal: React.FC<GarmentDetailModalProps> = ({
  garment,
  currency,
  onClose,
  onCustomize,
}) => {
  if (!garment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-sm bg-[#C5A059] text-black uppercase tracking-wider font-bold">
              {garment.category.toUpperCase()} • {garment.subcategory}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-sm hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-[#141414] border border-white/10">
              <img
                src={garment.image}
                alt={garment.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = bridalLehengaImg;
                }}
              />
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight uppercase tracking-wide">
                  {garment.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {garment.description}
                </p>

                <div className="space-y-2 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span>Estimated Turnaround: ~{garment.estimatedDays} business days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>Full Bespoke 100% Fit Guarantee</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5 font-bold">
                    Recommended Luxury Cloths:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {garment.fabricSuggestions.map((fab) => (
                      <span
                        key={fab}
                        className="text-[10px] px-2.5 py-1 rounded-sm bg-[#161616] border border-white/10 text-white/70 uppercase tracking-wider font-medium"
                      >
                        {fab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-white/50 uppercase tracking-wider font-mono">Tailored Starting at:</span>
                  <span className="text-2xl font-serif font-bold text-[#C5A059]">
                    {formatPrice(garment.basePriceUSD, currency)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onCustomize(garment);
                  }}
                  className="w-full py-3 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Customize & Order In Custom Order System</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
