import React, { useState } from 'react';
import { Sparkles, Eye, Scissors } from 'lucide-react';
import coutureHeroImg from '../assets/images/couture_hero_atelier_1789189621964.jpg';
import bridalLehengaImg from '../assets/images/bridal_lehenga_gown_1789189637531.jpg';
import zardoziEmbroideryImg from '../assets/images/zardozi_embroidery_1789189650001.jpg';
import silkCuttingImg from '../assets/images/silk_pattern_cutting_1789189665520.jpg';
import peshwasGownImg from '../assets/images/peshwas_couture_gown_1789189678425.jpg';
import emeraldFarshiImg from '../assets/images/emerald_farshi_lehenga_1789191079145.jpg';
import goldTissueGhararaImg from '../assets/images/gold_tissue_gharara_1789191097782.jpg';
import pakistaniDesignerSuitImg from '../assets/images/pakistani_designer_suit_1789191113837.jpg';
import banarasiShararaImg from '../assets/images/banarasi_sharara_1789191130820.jpg';
import chiffonPartySuitImg from '../assets/images/chiffon_party_suit_1789359966118.jpg';
import angrakhaPartySuitImg from '../assets/images/angrakha_party_suit_1789359979529.jpg';
import organzaPartySuitImg from '../assets/images/organza_party_suit_1789359989144.jpg';
import mirrorPartySuitImg from '../assets/images/mirror_party_suit_1789360001450.jpg';
import velvetPartySuitImg from '../assets/images/velvet_party_suit_1789360011421.jpg';

interface GalleryViewProps {
  onStartCustomOrder: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onStartCustomOrder }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'bridal' | 'dresses' | 'party_wear' | 'designer_stitching' | 'embroidery'>('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Imperial Crimson Zardozi Bridal Lehenga',
      category: 'bridal',
      tag: 'Haute Bridal',
      image: bridalLehengaImg,
      desc: 'Heavy heritage scarlet bridal lehenga featuring 36 hand-embroidered panels of antique dabka, nakshi, and pearls.',
    },
    {
      id: 2,
      title: 'Heritage Emerald Velvet Royal Farshi Lehenga',
      category: 'bridal',
      tag: 'Farshi Gharara',
      image: emeraldFarshiImg,
      desc: 'Regal dark emerald Italian micro-velvet bridal farshi lehenga adorned with kundan, marori needlework, and antique gold tilla borders.',
    },
    {
      id: 3,
      title: 'Traditional Adda Zardozi Hand Embroidery',
      category: 'embroidery',
      tag: 'Hand Zardozi',
      image: zardoziEmbroideryImg,
      desc: 'Authentic needlework on wooden adda with pure dabka, kora, sequins, and micro-pearls for bespoke bridal orders.',
    },
    {
      id: 4,
      title: 'Couture Hand-Embellished Organza Peshwas',
      category: 'dresses',
      tag: 'Peshwas Gown',
      image: peshwasGownImg,
      desc: '16-kali flared floor-length peshwas in sheer organza with hand-rendered resham floral motifs and embellished bodice.',
    },
    {
      id: 5,
      title: 'Pure Chiffon Hand-Embroidered Festive Party Suit',
      category: 'party_wear',
      tag: 'Party Wear',
      image: chiffonPartySuitImg,
      desc: 'Festive pure crinkle chiffon 3-piece suit with delicate tilla embroidery, sequins, and pearl work for formal occasions.',
    },
    {
      id: 6,
      title: 'Raw Silk Angrakha Style Party Wear Sharara',
      category: 'party_wear',
      tag: 'Party Wear',
      image: angrakhaPartySuitImg,
      desc: 'Emerald raw silk crossover Angrakha embellished with gotta patti and paired with flared crushed silk sharara.',
    },
    {
      id: 7,
      title: 'Luxury Organza Shimmer Long Shirt & Gharara',
      category: 'party_wear',
      tag: 'Party Wear',
      image: organzaPartySuitImg,
      desc: 'Champagne gold shimmer organza party wear suit with resham threadwork, pearl beadings, and flared silk pants.',
    },
    {
      id: 8,
      title: 'Royal Sapphire Georgette Mirror-Work Party Suit',
      category: 'party_wear',
      tag: 'Party Wear',
      image: mirrorPartySuitImg,
      desc: 'Dazzling sapphire blue party suit featuring authentic mirror work, sitara sparkle, and gotta scalloped dupatta.',
    },
    {
      id: 9,
      title: 'Plum Italian Velvet & Brocade Winter Party Suit',
      category: 'party_wear',
      tag: 'Party Wear',
      image: velvetPartySuitImg,
      desc: 'Midnight plum micro-velvet shirt with kora dabka handwork on cuffs paired with gold banarasi brocade trousers.',
    },
    {
      id: 10,
      title: 'Master Shears Pattern Drafting & Cutting',
      category: 'designer_stitching',
      tag: 'Master Cutter',
      image: silkCuttingImg,
      desc: 'Individual paper patterns and chalk markings tailored specifically for ladies silhouettes and designer fabric.',
    },
    {
      id: 11,
      title: 'Heavily Embellished Net & Silk Gharara Set',
      category: 'bridal',
      tag: 'Nikah Gharara',
      image: goldTissueGhararaImg,
      desc: 'Classic Lucknowi cut tiered gharara in gold tissue and French net with intricate tilla work and matching embellished veil.',
    },
    {
      id: 12,
      title: 'Luxury Pret Finishing with Cutwork & Silk Piping',
      category: 'designer_stitching',
      tag: 'Designer Suit',
      image: pakistaniDesignerSuitImg,
      desc: 'Full bespoke stitching of Maria B, Sana Safinaz, and Elan luxury collections with authentic organza finishes.',
    },
    {
      id: 13,
      title: 'Royal Banarasi Gold Brocade Sharara Ensemble',
      category: 'dresses',
      tag: 'Banarasi Sharara',
      image: banarasiShararaImg,
      desc: 'Lustrous woven banarasi jamawar flared sharara paired with hand-embroidered raw silk short kurti and crinkle chiffon dupatta.',
    },
  ];

  const filtered = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#141414] border border-white/10 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
          <Sparkles className="w-3 h-3" />
          <span>WOMEN'S HAUTE COUTURE LOOKBOOK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white uppercase tracking-wide font-bold">
          Atelier Masterpiece Gallery
        </h1>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-serif italic">
          Explore recent bespoke commissions handcrafted in our Islamabad workshop for clients across Pakistan, the United Kingdom, the United States, and the Arabian Gulf.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 pb-4">
        {[
          { key: 'all', label: 'All Creations' },
          { key: 'bridal', label: 'Bridal & Farshi Lehengas' },
          { key: 'party_wear', label: 'Festive & Party Wear Suits' },
          { key: 'dresses', label: 'Peshwas & Royal Gowns' },
          { key: 'designer_stitching', label: 'Designer Suit Stitching' },
          { key: 'embroidery', label: 'Adda Zardozi Handwork' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as any)}
            className={`px-4 py-2 rounded-sm text-[11px] font-medium uppercase tracking-wider transition-all ${
              activeFilter === tab.key
                ? 'bg-[#C5A059] text-black font-bold shadow-md'
                : 'bg-[#141414] text-white/70 hover:text-white border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-sm overflow-hidden bg-[#141414] border border-white/10 hover:border-[#C5A059]/60 transition-all flex flex-col justify-between"
          >
            <div className="aspect-[3/4] overflow-hidden relative bg-black">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = bridalLehengaImg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-3 left-3">
                <span className="text-[9px] px-2.5 py-0.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/15 text-[#C5A059] uppercase tracking-wider font-bold">
                  {item.tag}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-serif font-bold text-white group-hover:text-[#C5A059] transition-colors leading-snug uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-serif italic mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Commission CTA */}
      <div className="p-8 bg-[#141414] border border-white/10 rounded-sm text-center space-y-3">
        <h3 className="text-lg font-serif font-bold text-white uppercase">
          Have a Specific Women's Design Reference in Mind?
        </h3>
        <p className="text-xs text-white/60 max-w-md mx-auto font-serif italic">
          Upload any picture from Pinterest, runway shows, or designer lookbooks during our online order flow.
        </p>
        <button
          onClick={onStartCustomOrder}
          className="px-6 py-2.5 rounded-sm bg-[#C5A059] text-black font-bold text-[11px] uppercase tracking-wider hover:bg-[#D4B475] transition-colors"
        >
          Upload Your Design & Order
        </button>
      </div>
    </div>
  );
};
