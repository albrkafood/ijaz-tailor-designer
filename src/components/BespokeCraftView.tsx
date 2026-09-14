import React from 'react';
import { Scissors, Ruler, Sparkles, Shield, Clock, Award, Check, Heart, Eye } from 'lucide-react';
import coutureHeroImg from '../assets/images/couture_hero_atelier_1789189621964.jpg';
import bridalLehengaImg from '../assets/images/bridal_lehenga_gown_1789189637531.jpg';
import zardoziEmbroideryImg from '../assets/images/zardozi_embroidery_1789189650001.jpg';
import silkCuttingImg from '../assets/images/silk_pattern_cutting_1789189665520.jpg';
import peshwasGownImg from '../assets/images/peshwas_couture_gown_1789189678425.jpg';

interface BespokeCraftViewProps {
  onStartCustomOrder: () => void;
}

export const BespokeCraftView: React.FC<BespokeCraftViewProps> = ({ onStartCustomOrder }) => {
  const craftGallery = [
    {
      image: bridalLehengaImg,
      title: 'Heirloom Bridal Architecture',
      subtitle: '36-Kali Flared Volume & Can-Can',
      desc: 'Each bridal lehenga incorporates 36 meticulously measured panels, reinforced horsehair hem facing, and triple-tier can-can for majestic runway volume.',
    },
    {
      image: zardoziEmbroideryImg,
      title: 'Wooden Adda Hand Embroidery',
      subtitle: 'Antique Dabka, Nakshi & Real Pearls',
      desc: 'Master artisans stretch pure silk velvet over solid sheesham frames, applying intricate needlework with zero machine shortcuts.',
    },
    {
      image: silkCuttingImg,
      title: 'Master Pattern Drafting',
      subtitle: 'Individual Contoured Paper Patterns',
      desc: 'Bespoke cutting based on 28+ precise female measurements, accounting for neckline depth, bust contours, armhole ease, and floor clearance.',
    },
    {
      image: peshwasGownImg,
      title: 'Kalidar Peshwas Silhouettes',
      subtitle: 'Pure Mulberry Silk & Sheer Organza',
      desc: 'Floor-sweeping traditional anarkalis and peshwas dresses finished with hand-dyed silk piping, pearl drops, and scalloped tissue borders.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#141414] border border-white/10 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
          <Scissors className="w-3 h-3" />
          <span>WOMEN'S HAUTE COUTURE ATELIER • ISLAMABAD</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white uppercase tracking-wide font-bold">
          The Art of Women's Bespoke Tailoring
        </h1>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-serif italic">
          At Ijaz Designer Tailor Islamabad, our studio is dedicated exclusively to the grace, proportions, and grandeur of women's bespoke fashion. From royal heirloom bridal trousseaux to runway-ready unstitched luxury designer suits, every stitch is executed by hand.
        </p>
      </div>

      {/* 2-Column Story: Master Tailor Ijaz & The Islamabad Atelier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#141414] border border-white/10 rounded-sm p-8 sm:p-12">
        <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-black/60 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
            <Award className="w-3.5 h-3.5" />
            <span>Over 3 Decades of Bespoke Mastery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
            Master Cutter Ijaz & His Team of Artisans
          </h2>

          <p>
            Located at Panther Plaza, F-8 Markaz, Islamabad, our atelier has dressed three generations of brides, dignitaries, and fashion connoisseurs. We specialize exclusively in ladies' traditional and contemporary couture—ensuring waist cinches, bustlines, sleeve flares, and lehenga lengths fall in immaculate harmony.
          </p>

          <p>
            Unlike mass alterations or commercial ready-to-wear factories, every garment is cut from individual paper drafts. We utilize authentic silk inner linings, soft cotton slips, concealed YKK zippers, reinforced hook plackets, and custom-dyed silk piping.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-2xl font-serif font-bold text-[#C5A059] block">28+</span>
              <span className="text-[11px] text-white/50">Precise Female Measurements Taken</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-[#C5A059] block">50+</span>
              <span className="text-[11px] text-white/50">Hours of Hand Embroidery per Ensemble</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group">
          <img
            src={coutureHeroImg}
            alt="Islamabad Atelier"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0D0D0D]/90 backdrop-blur-md rounded-sm border border-white/10">
            <p className="text-xs text-white/90 font-serif italic">
              "A true women's couture creation does not simply fit the body; it flatters the poise, celebrates the silhouette, and carries heirloom dignity."
            </p>
            <span className="text-[10px] text-[#C5A059] uppercase tracking-wider block mt-1 font-bold">
              — Master Ijaz, Designer Tailor Islamabad
            </span>
          </div>
        </div>
      </div>

      {/* Visual Artisanal Craft Gallery */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">Inside The Atelier</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white uppercase font-bold mt-1">
            Artisanal Craftsmanship in Focus
          </h2>
          <p className="text-xs text-white/50 font-serif italic mt-1">
            Every step in our Islamabad workroom honours traditional South Asian textile artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftGallery.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-white/10 hover:border-[#C5A059]/60 rounded-sm overflow-hidden transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur rounded-sm text-[9px] uppercase tracking-wider text-[#C5A059] font-bold border border-white/10">
                  {item.subtitle}
                </span>
              </div>

              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-white/60 leading-relaxed font-serif italic mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 6 Pillars of Women's Couture Tailoring */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">Uncompromising Quality</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white uppercase font-bold mt-1">
            The 6 Pillars of Couture Construction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Individual Women\'s Pattern Drafting',
              desc: 'We never alter generic factory templates. A custom master paper pattern is drafted by hand for each client, considering bust contours, shoulder slopes, neck pitch, and specific waist-to-hip flare angles.',
              icon: Ruler,
            },
            {
              title: 'Multi-Layered Can-Can & Flare Architecture',
              desc: 'Bridal lehengas and royal farshi skirts are engineered with double or triple-layer stiffened can-can crinoline, horsehair hem bands, and cotton waistbands to ensure effortless 360-degree grace.',
              icon: Shield,
            },
            {
              title: 'Authentic Adda Hand-Zardozi & Aari',
              desc: 'No automated embroidery. Pure antique dabka, marori, resham, kora, and genuine pearls are hand-stitched by multigenerational karigars on wooden frames.',
              icon: Scissors,
            },
            {
              title: 'Curated Pure Fabrics & Raw Silks',
              desc: 'We source exclusively from authenticated looms: 80g Rawaan silk, Chinese Mulberry silk, organza tissue, Italian micro-velvet, and authentic pure chiffons.',
              icon: Sparkles,
            },
            {
              title: 'Live Video Baste Fitting & Draping',
              desc: 'Overseas clients in the UK, USA, and Gulf countries connect directly with Master Cutter Ijaz via HD video call to inspect the baste muslin drape before final closures are set.',
              icon: Clock,
            },
            {
              title: 'Lifetime Bespoke Fit Guarantee',
              desc: 'Every bespoke creation includes complimentary alteration margins (up to 3 inches inside seams) so your heirloom gown can be adjusted seamlessly as life evolves.',
              icon: Award,
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 bg-[#141414] border border-white/10 hover:border-white/20 rounded-sm transition-all">
                <div className="w-10 h-10 rounded-sm bg-black border border-white/10 flex items-center justify-center text-[#C5A059] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-serif text-white font-bold uppercase tracking-wider mb-2">{pillar.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-serif italic">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center bg-[#141414] border border-[#C5A059]/30 rounded-sm p-8 sm:p-12 max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">Exclusive Commission</span>
        <h3 className="text-2xl font-serif text-white uppercase font-bold">
          Ready to Commission Your Masterpiece?
        </h3>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-serif italic">
          Start your custom order online today. We guide you step-by-step through garments, designs, fabric selection, and measurements.
        </p>
        <div className="pt-2">
          <button
            onClick={onStartCustomOrder}
            className="px-8 py-3.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black font-bold text-[11px] uppercase tracking-widest transition-colors shadow-lg"
          >
            Start Online Custom Order
          </button>
        </div>
      </div>
    </div>
  );
};
