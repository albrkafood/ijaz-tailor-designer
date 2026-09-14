import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Tariq Al-Mansoor',
      location: 'Dubai, United Arab Emirates',
      garment: 'Bespoke Charcoal 3-Piece Suit & Boski Ensembles',
      rating: 5,
      date: 'February 2025',
      review:
        'I have commissioned suits from Savile Row in London and Milan, but Master Ijaz in Islamabad matches their drape with extraordinary precision. Ordering online from Dubai was seamless; the video consultation clarified every measurement and the floating horsehair canvas feels sublime in GCC climates.',
    },
    {
      id: 2,
      name: 'Dr. Sarah Farooq',
      location: 'London, United Kingdom (Mayfair)',
      garment: 'Hand-Embroidered Velvet Bridal Trousseau',
      rating: 5,
      date: 'January 2025',
      review:
        'Finding reliable Pakistani couture tailoring while living in the UK used to be stressful. Ijaz Designer Tailor crafted my sister’s entire wedding trousseau and my bespoke reception gown. The zardozi work is genuine antique metallic tilla, not cheap machine glitter. Dispatched via DHL right to London without a single wrinkle!',
    },
    {
      id: 3,
      name: 'Aamir Hussain, Esq.',
      location: 'Manhattan, New York, USA',
      garment: 'Navy Pinstripe Executive Suit & Custom Shirts',
      rating: 5,
      date: 'December 2024',
      review:
        'The WhatsApp integration and order tracking system kept me informed throughout the entire cutting and baste fitting process. When my suit arrived in New York, the shoulder pitch and sleeve crown were impeccable. Highly recommended for international Pakistani diaspora executives.',
    },
    {
      id: 4,
      name: 'Malik Zeeshan Abbasi',
      location: 'F-7/2, Islamabad, Pakistan',
      garment: 'Authentic 10-Pound Chinese Boski Shalwar Kameez',
      rating: 5,
      date: 'February 2025',
      review:
        'Our family has been loyal to Master Ijaz for over 18 years. For bespoke women’s couture and designer stitching, no one in the twin cities cuts with this caliber of clean finish. The F-8 Markaz atelier is always welcoming and professional.',
    },
    {
      id: 5,
      name: 'Fatima & Rehan Sheikh',
      location: 'Toronto, Ontario, Canada',
      garment: 'Royal Ivory Groom Sherwani & Bridal Lehenga',
      rating: 5,
      date: 'November 2024',
      review:
        'We ordered our complete wedding attire remotely from Canada. Master Ijaz conducted two video calls with us to ensure our measurements were exact to the millimeter. The compliments we received at our reception were endless. True master craftsmen.',
    },
    {
      id: 6,
      name: 'Salman Khurshid',
      location: 'Riyadh, Kingdom of Saudi Arabia',
      garment: 'Loro Piana Tropical Wool Suits & Waistcoats',
      rating: 5,
      date: 'October 2024',
      review:
        'Exemplary bespoke tailoring. The pick stitching on the lapels and the horn buttons demonstrate the artisan level attention to detail. Fast DHL shipping to Saudi Arabia with protective garment bag packaging.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
          International Client Testimonials
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe6] uppercase tracking-wide font-bold mt-2 mb-4">
          Trusted by Discerning Clients Worldwide
        </h1>
        <p className="text-xs sm:text-sm text-[#959ca9] leading-relaxed">
          Read candid reviews from diplomats, international executives, and bridal couples who trust Ijaz Designer Tailor for bespoke perfection.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-4 border-y border-[#212638] text-xs text-[#a2a9ba]">
        <div className="flex items-center gap-2">
          <div className="flex text-[#c5a880]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="font-bold text-[#f2ede4]">4.9 / 5.0 Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
          <span>100% Bespoke Fit Guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />
          <span>Over 12,000+ Bespoke Garments Hand-Crafted</span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 bg-[#13151f] border border-[#232738] rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-[#c5a880]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-[#71788c]">{rev.date}</span>
              </div>

              <p className="text-xs text-[#d2d7e5] leading-relaxed italic">
                "{rev.review}"
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#202434]">
              <h4 className="text-xs font-serif font-bold text-[#f2ede4]">{rev.name}</h4>
              <p className="text-[11px] text-[#c5a880]">{rev.location}</p>
              <p className="text-[10px] text-[#7b8396] mt-0.5">{rev.garment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
