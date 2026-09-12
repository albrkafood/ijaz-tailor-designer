import React, { useState } from 'react';
import { GenderCategory } from '../types';
import { X, Check, Video, Ruler, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';

interface MeasurementsGuideModalProps {
  category?: GenderCategory;
  isOpen: boolean;
  onClose: () => void;
  onApplyStandardSize?: (sizeValues: Record<string, string>) => void;
}

export const MeasurementsGuideModal: React.FC<MeasurementsGuideModalProps> = ({
  category = 'women',
  isOpen,
  onClose,
  onApplyStandardSize,
}) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'presets'>('instructions');

  if (!isOpen) return null;

  const womenInstructions = [
    { name: 'Bust', desc: 'Measure around the fullest part of your bust wearing your usual comfortable undergarment, keeping the tape level.' },
    { name: 'Waist', desc: 'Measure around the slimmest part of your natural waistline (typically 1-2 inches above the navel).' },
    { name: 'Hip', desc: 'Stand with heels together and measure around the fullest point of your hips and buttocks.' },
    { name: 'Shoulder', desc: 'Measure across the back from the edge tip of the left shoulder bone to the right shoulder bone.' },
    { name: 'Sleeve Length', desc: 'From the tip of the shoulder bone down the arm to your wrist or desired sleeve length (full, 3/4, or churidar).' },
    { name: 'Shirt / Kameez Length', desc: 'From the highest point of the shoulder near the neck seam down front to desired hemline (knee, calf, or ankle).' },
    { name: 'Trouser / Shalwar Length', desc: 'From where you tie your waistline down along the outside leg to the ankle bone or top of foot.' },
    { name: 'Dupatta Length', desc: 'Standard is 2.5 to 3.0 yards; specify if extra length is needed for head draping or heavy bridal matha-patti.' },
    { name: 'Daaman / Ghera Flare', desc: 'Desired bottom width of the shirt or total circumference of anarkali / peshwas kalis.' },
    { name: 'Armhole Circumference', desc: 'Wrap tape comfortably around the top of the arm and armpit socket with two fingers breathing room.' },
  ];

  const womenStandardSizes: Record<string, Record<string, string>> = {
    'Small (US 4-6 / UK 8-10)': { bust: '34', waist: '27', hip: '37', shoulder: '14.5', sleeve: '22', shirtLength: '40', trouserLength: '38', dupattaLength: '2.5 yards' },
    'Medium (US 8-10 / UK 12)': { bust: '37', waist: '30', hip: '40', shoulder: '15.0', sleeve: '22.5', shirtLength: '42', trouserLength: '39', dupattaLength: '2.5 yards' },
    'Large (US 12-14 / UK 14-16)': { bust: '40', waist: '33', hip: '43', shoulder: '15.5', sleeve: '23', shirtLength: '42', trouserLength: '40', dupattaLength: '2.75 yards' },
    'XL (US 16 / UK 18)': { bust: '43', waist: '36', hip: '46', shoulder: '16.0', sleeve: '23.5', shirtLength: '43', trouserLength: '40', dupattaLength: '2.75 yards' },
    'XXL (US 18-20 / UK 20-22)': { bust: '46', waist: '39', hip: '49', shoulder: '16.5', sleeve: '24', shirtLength: '44', trouserLength: '40.5', dupattaLength: '2.75 yards' },
  };

  const instructions = womenInstructions;
  const currentSizes = womenStandardSizes;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wider">
                Women's Couture Measurement Guide
              </h3>
              <p className="text-xs text-white/50 font-serif italic">
                Haute Couture & Bridal Measurement Specifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-sm hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Call Assistance Alert */}
        <div className="px-6 py-3 bg-[#161616] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <Video className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>Need live assistance? Our master couturier can guide you over a 1-on-1 WhatsApp video call.</span>
          </div>
          <a
            href={`https://wa.me/923005001992?text=${encodeURIComponent("Hello Ijaz Designer & Tailors Islamabad! I need help taking my women's couture measurements for my custom order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[11px] px-3 py-1.5 rounded-sm bg-[#25d366] text-black font-bold uppercase tracking-wider hover:bg-[#20b858] transition-colors flex items-center gap-1.5"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Video Call Tailor</span>
          </a>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 px-6 bg-[#0A0A0A]">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 text-[11px] font-bold uppercase tracking-widest border-b-2 mr-6 transition-all ${
              activeTab === 'instructions'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            Point-by-Point Instructions
          </button>
          {onApplyStandardSize && (
            <button
              onClick={() => setActiveTab('presets')}
              className={`py-3 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all ${
                activeTab === 'presets'
                  ? 'border-[#C5A059] text-[#C5A059]'
                  : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              Quick Standard Size Baseline
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'instructions' ? (
            <div className="space-y-3">
              <p className="text-xs text-white/50 mb-4 font-serif italic">
                Use a flexible soft measuring tape. Stand upright and relaxed without holding your breath or pulling the tape too tight.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {instructions.map((item, idx) => (
                  <div key={item.name} className="p-3 bg-[#141414] border border-white/10 rounded-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-sm bg-[#C5A059] text-black text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">{item.name}</h4>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed pl-7">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-white/50 font-serif italic">
                Select a standard size as a convenient starting baseline. You can still modify any individual inch/cm value in the form:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(currentSizes).map(([sizeName, values]) => (
                  <div key={sizeName} className="p-4 bg-[#141414] border border-white/10 rounded-sm hover:border-[#C5A059] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">{sizeName}</h4>
                      <button
                        onClick={() => {
                          onApplyStandardSize?.(values);
                          onClose();
                        }}
                        className="px-3 py-1 rounded-sm bg-[#C5A059] text-black text-[10px] uppercase tracking-widest font-bold hover:bg-[#D4B475] transition-colors"
                      >
                        Apply Baseline
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-white/50">
                      {Object.entries(values).slice(0, 6).map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-white/10 py-0.5">
                          <span className="capitalize text-white/40">{k}:</span>
                          <span className="text-white font-medium">{v}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#121212] flex justify-between items-center">
          <span className="text-xs text-white/40 font-serif italic">
            Tip: You can also upload a tailor measurement card or image in Step 5.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-[11px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Got It, Continue Form
          </button>
        </div>
      </div>
    </div>
  );
};
