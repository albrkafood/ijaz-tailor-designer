import React from 'react';
import { Scissors, Sparkles, Shield, Clock, Ruler, Award, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ServicesViewProps {
  onStartCustomOrder: () => void;
  onNavigateCategory: (category: 'women') => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onStartCustomOrder,
  onNavigateCategory,
}) => {
  const serviceList = [
    {
      id: 'bridal-couture',
      title: 'Haute Bridal Lehengas & Royal Farshi Ghararas',
      tag: 'Bridal Trousseau',
      desc: 'Heirloom bridal lehengas, 36-panel farshi ghararas, and royal wedding shararas adorned with pure antique dabka, kora, marori, and cultured pearls.',
      points: [
        '360-degree voluminous flare with reinforced double/triple can-can',
        'Custom dual-dupatta settings for bridal ceremonies',
        'Pure silk velvet, organza tissue, and heavy raw silk bases',
        'Live video drape fittings for overseas diaspora brides',
      ],
    },
    {
      id: 'designer-suits',
      title: 'Luxury Designer Suit Stitching (Maria B, Elan, Sana Safinaz)',
      tag: 'Signature Service',
      desc: 'Master stitching for premium unstitched lawn, organza, and velvet designer collections with meticulous laser lace inlays and silk facings.',
      points: [
        'Customized neckline cuts, armhole curves, and body contouring',
        'Delicate organza laser-cut border attachments & silk piping',
        'Pure breathable cotton/silk inner slips tailored to length',
        'Custom pants, tulip shalwars, palazzos, and straight trousers',
      ],
    },
    {
      id: 'designer-dresses',
      title: 'Floor-Length Peshwas, Royal Maxis & Angrakha Silhouettes',
      tag: 'Bespoke Fit',
      desc: 'Sweeping 16-kali to 24-kali flared traditional and contemporary gowns tailored in pure raw silk, organza, and Italian georgette.',
      points: [
        'Engineered to your exact shoulder-to-floor clearance',
        'Hand-embellished bodice, tassels, and pearl dori details',
        'Coordinated crushed silk churidars and scalloped tissue dupattas',
        'Comfortable breathable inner bodice boning on request',
      ],
    },
    {
      id: 'custom-embroidery',
      title: 'Bespoke Adda Hand-Zardozi & Aari Needlework',
      tag: 'Artisan Heritage',
      desc: 'Commission custom embroidery on fabrics of your choice—recreating archival motifs, personal monograms, or matching heirloom family shawls.',
      points: [
        'Handcrafted by multigenerational karigars on wooden adda frames',
        'Authentic antique dabka, resham silk floss, sequins, and nakshi',
        'Personal monogramming and wedding date calligraphic embroidery',
        'Full fabric sourcing from Pakistan\'s finest looms',
      ],
    },
    {
      id: 'party-formal',
      title: 'Luxury Festive, Party Wear & 2-Piece / 3-Piece Pret',
      tag: 'Ready-to-Couture',
      desc: 'Refined evening ensembles, organza wraps, velvet jackets, and festive kurtas tailored for dinners, Eid, mehendi, and family celebrations.',
      points: [
        'Custom sleeve detailing: bell sleeves, pearl cuffs, slit designs',
        'Delicate cutwork hemlines and handcrafted fabric buttons',
        'Tailored matching slips and undergarment support',
        'Fast turnaround for festive and holiday deadlines',
      ],
    },
    {
      id: 'master-alterations',
      title: 'Couture Bridal Restyling & Precision Fitting Alterations',
      tag: 'Restoration',
      desc: 'Surgical alterations for overseas purchases, heirloom bridal gown resizing, bodice restructuring, can-can volume replacement, and hem adjusting.',
      points: [
        'Up to 3-inch seam allowances preserved for future adjustments',
        'Bodice tapering, armhole re-sculpting, and neckline lowering/raising',
        'Can-can renewal and delicate beadwork restoration',
        'In-person fitting in Islamabad or guided video session',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#141414] border border-white/10 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
          <Scissors className="w-3 h-3" />
          <span>EXCLUSIVE WOMEN'S TAILORING SERVICES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white uppercase tracking-wide font-bold">
          Comprehensive Atelier Services
        </h1>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-serif italic">
          Every service is performed in our Islamabad workshop with singular dedication to female silhouette precision, heirloom embroidery, and designer finishing.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceList.map((srv) => (
          <div
            key={srv.id}
            className="p-6 bg-[#141414] border border-white/10 hover:border-[#C5A059]/60 rounded-sm transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-black border border-white/10 text-[#C5A059] font-bold">
                  {srv.tag}
                </span>
                <Sparkles className="w-4 h-4 text-[#C5A059] opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-base font-serif font-bold text-white uppercase tracking-wide leading-snug mb-2 group-hover:text-[#C5A059] transition-colors">
                {srv.title}
              </h3>

              <p className="text-xs text-white/60 leading-relaxed font-serif italic mb-4">
                {srv.desc}
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4">
                {srv.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={onStartCustomOrder}
                className="text-xs text-[#C5A059] hover:text-white font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <span>Start Order</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Quote Box */}
      <div className="p-8 bg-[#141414] border border-white/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold block">
            The Master Tailor's Promise
          </span>
          <h4 className="text-lg font-serif font-bold text-white uppercase">
            Guaranteed Fit & Unmatched Finishes
          </h4>
          <p className="text-xs text-white/60 max-w-xl font-serif italic">
            Whether stitching a Maria B lawn suit or crafting an antique dabka bridal lehenga, our master cutters treat every commission as a runway showpiece.
          </p>
        </div>

        <button
          onClick={onStartCustomOrder}
          className="px-6 py-3 rounded-sm bg-[#C5A059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4B475] transition-colors whitespace-nowrap shadow-lg"
        >
          Book Your Custom Stitching
        </button>
      </div>
    </div>
  );
};
