import React, { useState } from 'react';
import { INTERNATIONAL_REGIONS } from '../data/mockData';
import { 
  Globe, 
  Plane, 
  Video, 
  Ruler, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  HelpCircle,
  Scissors
} from 'lucide-react';

interface InternationalOrdersViewProps {
  onStartCustomOrder: () => void;
}

export const InternationalOrdersView: React.FC<InternationalOrdersViewProps> = ({
  onStartCustomOrder,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('usa');

  const activeRegion = INTERNATIONAL_REGIONS.find((r) => r.id === selectedRegionId) || INTERNATIONAL_REGIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#272c3e] bg-gradient-to-br from-[#131520] via-[#10121b] to-[#0c0d14] p-8 sm:p-12 lg:p-16">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c2030] border border-[#2e354c] text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL BESPOKE ATELIER SERVICE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#f4efe6] tracking-tight uppercase font-bold leading-tight mb-6">
            TAILORING FROM ISLAMABAD TO THE WORLD
          </h1>

          <p className="text-sm sm:text-base text-[#a2a8ba] leading-relaxed mb-8 font-normal">
            Whether you reside in Mayfair, Manhattan, Downtown Dubai, or Toronto, experience the unrivaled craftsmanship of Islamabad’s master bespoke artisans. Submit your measurements online, consult with master cutters over video, and receive bespoke suiting and couture delivered directly to your door.
          </p>

          {/* Explicit Shipping Disclaimer Mandate */}
          <div className="p-4 bg-[#181b28] border border-[#2a3044] rounded-xl text-xs text-[#9aa2b6] mb-8 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#e2e6f2] block mb-0.5">International Transit & Dispatch Policy:</strong>
              Courier transit timelines, customs clearances, and shipping availability are configured and confirmed individually for each bespoke commission by the atelier business owner based on your exact global municipality and seasonal courier schedules.
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onStartCustomOrder}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0b0c10] font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-[#c5a880]/20 transition-all flex items-center gap-2"
            >
              <Scissors className="w-4 h-4" />
              <span>Start Online Custom Order</span>
            </button>

            <a
              href={`https://wa.me/923005001992?text=${encodeURIComponent('Hello Ijaz Designer Tailor! I am an international client interested in ordering bespoke tailoring from Islamabad.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] hover:bg-[#25d366]/30 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>International WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4-Step Global Process */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe6] uppercase mt-1">
            The Remote Bespoke Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Select Garment & Cloth',
              desc: 'Choose from our Men & Women collections or submit your custom photo reference and fabric preferences.',
              icon: Scissors,
            },
            {
              step: '02',
              title: 'Submit Measurements',
              desc: 'Use our guided measuring form, upload existing tailor specs, or schedule a 1-on-1 WhatsApp video call.',
              icon: Ruler,
            },
            {
              step: '03',
              title: 'Master Cutting & Drafting',
              desc: 'Master Ijaz drafts an individual paper pattern, pads horsehair canvas, and oversees hand-sewing in Islamabad.',
              icon: Clock,
            },
            {
              step: '04',
              title: 'Insured Air Dispatch',
              desc: 'Steamed and sealed inside a protective bespoke garment trunk, dispatched via DHL Express / FedEx directly to your doorstep.',
              icon: Plane,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="p-6 bg-[#13151f] border border-[#232738] rounded-2xl relative">
                <span className="text-3xl font-serif font-bold text-[#c5a880]/30 block mb-2">{item.step}</span>
                <div className="w-10 h-10 rounded-xl bg-[#1b1e2c] border border-[#2c3246] flex items-center justify-center text-[#c5a880] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif text-[#f2ede4] font-semibold mb-2">{item.title}</h3>
                <p className="text-xs text-[#8e95a7] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Country & Region Tabs (USA, UK, UAE, Saudi Arabia, Canada, Australia, Europe, Worldwide) */}
      <div className="bg-[#12141c] border border-[#222636] rounded-3xl p-6 sm:p-10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">Worldwide Coverage</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe6] uppercase mt-1 mb-2">
            Country & Regional Services
          </h2>
          <p className="text-xs text-[#8f96a8]">
            Select your country or region to view localized concierge services and past diaspora commissions:
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-[#1f2334] pb-6">
          {INTERNATIONAL_REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegionId(region.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedRegionId === region.id
                  ? 'bg-[#c5a880] text-[#0b0c10] shadow-md font-bold'
                  : 'bg-[#181a26] text-[#8e95a7] hover:text-[#ffffff] border border-[#272c3e]'
              }`}
            >
              {region.name.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Active Region Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Details & Features */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#c5a880] font-semibold uppercase tracking-wider mb-1">
                <Globe className="w-4 h-4" />
                <span>Dedicated International Desk</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe6] font-bold">
                {activeRegion.name}
              </h3>
              <p className="text-xs text-[#8c94a6] mt-2">
                <strong>Key Metropolitans Served:</strong> {activeRegion.cities}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeRegion.features.map((feat, i) => (
                <div key={i} className="p-3 bg-[#171926] border border-[#24293c] rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#d2d7e5] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="p-5 bg-[#171a28] border-l-2 border-[#c5a880] rounded-r-xl">
              <p className="text-xs sm:text-sm text-[#e0e4f0] italic leading-relaxed">
                {activeRegion.testimonial}
              </p>
            </div>
          </div>

          {/* Right Col: Logistics Summary Card */}
          <div className="p-6 bg-[#161824] border border-[#262c3e] rounded-2xl space-y-4">
            <h4 className="text-xs font-semibold text-[#f2ede4] uppercase tracking-wider border-b border-[#212638] pb-2">
              Logistics & Courier Routing
            </h4>

            <div className="space-y-3 text-xs text-[#9aa1b3]">
              <div>
                <span className="text-[#6f7688] block text-[10px] uppercase">International Express Partner</span>
                <span className="text-[#e2e6f2] font-medium">{activeRegion.shippingPartner}</span>
              </div>

              <div>
                <span className="text-[#6f7688] block text-[10px] uppercase">Preferred Settlement Currency</span>
                <span className="text-[#e2e6f2] font-medium">{activeRegion.currency}</span>
              </div>

              <div>
                <span className="text-[#6f7688] block text-[10px] uppercase">Estimated Timeline Guidance</span>
                <span className="text-[#c5a880] font-medium">{activeRegion.typicalTransit}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#23283a] space-y-2">
              <button
                onClick={onStartCustomOrder}
                className="w-full py-3 rounded-xl bg-[#c5a880] hover:bg-[#d8be99] text-[#0b0c10] font-bold text-xs uppercase tracking-wider transition-colors text-center block"
              >
                Place Order for {activeRegion.name.split('(')[0]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
