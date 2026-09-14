import React, { useState, useEffect, useRef } from 'react';
import { 
  GenderCategory, 
  Garment, 
  Fabric, 
  MenMeasurements, 
  WomenMeasurements, 
  CustomerInfo, 
  TailoringOrder, 
  MenSubcategory, 
  WomenSubcategory 
} from '../types';
import { GARMENTS, FABRICS, MEN_SUBCATEGORIES, WOMEN_SUBCATEGORIES } from '../data/mockData';
import { createNewOrder, formatPrice, generateWhatsAppMessage } from '../utils/orderStore';
import { MeasurementsGuideModal } from './MeasurementsGuideModal';
import bridalLehengaImg from '../assets/images/bridal_lehenga_gown_1789189637531.jpg';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  HelpCircle, 
  Scissors, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  CreditCard, 
  Building, 
  Globe, 
  Store, 
  Calendar,
  X,
  FileText,
  Clock,
  Ruler
} from 'lucide-react';

interface OnlineOrderSystemProps {
  isOpen?: boolean;
  onClose: () => void;
  initialCategory?: any;
  initialGarment?: Garment;
  currency: 'USD' | 'PKR' | 'GBP' | 'AED';
  onOrderCompleted?: (order: TailoringOrder) => void;
  onViewOrderDetails?: (orderId: string) => void;
}

export const OnlineOrderSystem: React.FC<OnlineOrderSystemProps> = ({
  isOpen = true,
  onClose,
  initialGarment,
  currency,
  onOrderCompleted,
  onViewOrderDetails,
}) => {
  // Step state (1 to 9)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Category is strictly women
  const category: GenderCategory = 'women';

  // Step 2: Garment
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(initialGarment || GARMENTS[0] || null);
  const [garmentSubfilter, setGarmentSubfilter] = useState<string>('all');

  // Step 3: Design
  const [designOption, setDesignOption] = useState<'catalog' | 'custom_upload'>('catalog');
  const [selectedDesignName, setSelectedDesignName] = useState<string>('Royal Anarkali & Flared Silhouette');
  const [designInstructions, setDesignInstructions] = useState<string>('');
  const [referenceImageName, setReferenceImageName] = useState<string>('');
  const [referenceImagePreview, setReferenceImagePreview] = useState<string>('');

  // Step 4: Fabric
  const [fabricChoice, setFabricChoice] = useState<'in_house' | 'customer_provided'>('in_house');
  const [selectedFabric, setSelectedFabric] = useState<Fabric>(FABRICS[0]);
  const [customerProvidedFabricDetails, setCustomerProvidedFabricDetails] = useState<string>('');

  // Step 5: Measurements
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [womenMeasurements, setWomenMeasurements] = useState<WomenMeasurements>({
    bust: '36',
    waist: '28',
    hip: '39',
    shoulder: '15',
    sleeve: '22',
    shirtLength: '42',
    trouserLength: '39',
    dupattaLength: '2.5 yards',
    other: '',
  });
  const [measurementSheetName, setMeasurementSheetName] = useState<string>('');
  const [showMeasurementGuide, setShowMeasurementGuide] = useState<boolean>(false);

  // Step 6: Order Details
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    country: 'United States',
    city: '',
    deliveryAddress: '',
    specialInstructions: '',
  });

  // Step 7: Quantity & Calculation
  const [quantity, setQuantity] = useState<number>(1);

  // Step 8: Payment Option
  const [paymentMethod, setPaymentMethod] = useState<'online_payment' | 'bank_transfer' | 'international_payment' | 'cash_store'>('online_payment');

  // Step 9: Confirmed Order State
  const [createdOrder, setCreatedOrder] = useState<TailoringOrder | null>(null);

  // Sync initial props
  useEffect(() => {
    if (initialGarment) {
      setSelectedGarment(initialGarment);
      if (initialGarment.subcategory) {
        setGarmentSubfilter(initialGarment.subcategory);
      }
      setCurrentStep(3); // jump to step 3 if garment was preselected
    } else {
      if (GARMENTS.length > 0) setSelectedGarment(GARMENTS[0]);
    }
  }, [initialGarment, isOpen]);

  // Filter garments for Step 2
  const filteredGarments = GARMENTS.filter((g) => {
    if (garmentSubfilter !== 'all' && g.subcategory !== garmentSubfilter) return false;
    return true;
  });

  // Calculate prices
  const basePrice = selectedGarment ? selectedGarment.basePriceUSD : 450;
  const fabricSurcharge = fabricChoice === 'in_house' && selectedFabric.isPremium ? selectedFabric.premiumSurchargeUSD : 0;
  const unitPrice = basePrice + fabricSurcharge;
  const subtotal = unitPrice * quantity;
  const isDomestic = customerInfo.country.toLowerCase().includes('pakistan');
  const deliveryFee = isDomestic ? 12 : 45;
  const grandTotal = subtotal + deliveryFee;

  // File upload handlers
  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setReferenceImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMeasurementSheetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMeasurementSheetName(file.name);
    }
  };

  // Submit Order in Step 8 -> Step 9
  const handleFinalOrderSubmit = () => {
    if (!selectedGarment) return;

    const newOrder = createNewOrder({
      category: 'women',
      garment: selectedGarment,
      designOption,
      selectedDesignName,
      designInstructions,
      referenceImageUrl: referenceImagePreview,
      fabricChoice,
      fabric: fabricChoice === 'in_house' ? selectedFabric : undefined,
      customerProvidedFabricDetails,
      unit,
      measurements: womenMeasurements,
      measurementSheetUrl: measurementSheetName,
      customer: customerInfo,
      quantity,
      estimatedPrice: subtotal,
      deliveryCharges: deliveryFee,
      total: grandTotal,
      currency: 'USD',
      paymentMethod,
    });

    setCreatedOrder(newOrder);
    setCurrentStep(9);
    onOrderCompleted?.(newOrder);
  };

  if (!isOpen) return null;

  const stepsList = [
    { num: 1, label: 'Specialty' },
    { num: 2, label: 'Garment' },
    { num: 3, label: 'Design' },
    { num: 4, label: 'Fabric' },
    { num: 5, label: 'Measurements' },
    { num: 6, label: 'Details' },
    { num: 7, label: 'Summary' },
    { num: 8, label: 'Payment' },
    { num: 9, label: 'Confirmation' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0D0D0D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-6 max-h-[95vh] flex flex-col text-white">
        
        {/* Header with Title & Step Progress */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#121212] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                Women’s Haute Couture Concierge
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-bold uppercase tracking-wide">
              Online Custom Order System
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white rounded-sm hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="hidden md:flex items-center justify-between px-6 py-3 bg-[#0A0A0A] border-b border-white/10 overflow-x-auto text-[10px]">
          {stepsList.map((step) => {
            const isPassed = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div key={step.num} className="flex items-center gap-1.5 shrink-0">
                <div
                  className={`w-5 h-5 rounded-sm flex items-center justify-center font-bold text-[9px] transition-all ${
                    isPassed
                      ? 'bg-[#C5A059] text-black'
                      : isCurrent
                      ? 'bg-white text-black ring-1 ring-[#C5A059]'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {isPassed ? <Check className="w-3 h-3 text-black" /> : step.num}
                </div>
                <span
                  className={`uppercase tracking-widest text-[9px] font-bold ${
                    isCurrent ? 'text-white' : isPassed ? 'text-[#C5A059]' : 'text-white/30'
                  }`}
                >
                  {step.label}
                </span>
                {step.num < 9 && <span className="text-white/20 mx-1">›</span>}
              </div>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
          
          {/* ===================================================
              STEP 1 — Select Haute Couture Specialty
          ==================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 1 of 9</span>
                <h3 className="text-2xl font-serif text-white font-bold uppercase mt-1 mb-2">
                  Select Couture Specialty
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-serif italic">
                  Ijaz Designer Tailor specializes exclusively in women’s luxury haute couture, heirloom bridal wear, designer lawn/chiffon stitching, and custom zardozi embroidery.
                </p>
              </div>

              {/* 10 Women Specialties Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {WOMEN_SUBCATEGORIES.map((subcat) => {
                  const isCurrent = garmentSubfilter === subcat;
                  return (
                    <div
                      key={subcat}
                      onClick={() => {
                        setGarmentSubfilter(subcat);
                        const match = GARMENTS.find((g) => g.subcategory === subcat);
                        if (match) setSelectedGarment(match);
                        setCurrentStep(2);
                      }}
                      className={`p-4 rounded-sm border transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#C5A059] bg-[#161616] shadow-md'
                          : 'border-white/10 bg-[#0F0F0F] hover:border-[#C5A059]/60 hover:bg-[#141414]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">
                            Couture Division
                          </span>
                          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                        </div>
                        <h4 className="text-sm font-serif text-white font-bold mb-1 uppercase tracking-wide">
                          {subcat}
                        </h4>
                        <p className="text-[11px] text-white/50 leading-relaxed font-serif italic">
                          {subcat.includes('Bridal') && 'Heirloom lehengas & farshi ghararas with antique dabka zardozi.'}
                          {subcat.includes('Custom Stitching') && 'Designer suits (Maria B, Elan, Crimson) with runway piping & cutwork.'}
                          {subcat.includes('Dresses') && 'Flowy raw silk peshwas, maxis, and floor-length angrakha silhouettes.'}
                          {subcat.includes('Formal') && '2-piece & 3-piece luxury velvet, banarsi, and pure silk formal ensembles.'}
                          {subcat.includes('Party') && 'Contemporary festive party wear with crystal handwork.'}
                          {subcat.includes('Wedding') && 'Guest of honour, sister of bride, and reception couture outfits.'}
                          {subcat.includes('Shalwar') && 'Classic Pakistani kurtas, tulip shalwars, and straight cigarette pants.'}
                          {subcat.includes('Suits') && 'Luxury ready-to-wear tailored 2-Piece and 3-Piece collections.'}
                          {subcat.includes('Embroidery') && 'Artisanal neckline, daman, and sleeve hand embroidery by master craftsmen.'}
                          {subcat.includes('Alterations') && 'Precision fitting, resizing, and refashioning of luxury pret and bridal wear.'}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                        <span>Select & View Garments</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================
              STEP 2 — Select Garment
          ==================================================== */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 2 of 9</span>
                  <h3 className="text-xl font-serif text-white font-bold uppercase">
                    Select Your Women's Haute Couture Garment
                  </h3>
                </div>
                <div className="text-xs text-white/50">
                  Specialty: <span className="text-[#C5A059] font-bold uppercase">{garmentSubfilter === 'all' ? 'All Collections' : garmentSubfilter}</span>
                </div>
              </div>

              {/* Subcategory Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 py-1">
                <button
                  onClick={() => setGarmentSubfilter('all')}
                  className={`px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    garmentSubfilter === 'all'
                      ? 'bg-[#C5A059] text-black'
                      : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  All (10 Specialties)
                </button>
                {WOMEN_SUBCATEGORIES.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setGarmentSubfilter(sub)}
                    className={`px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors ${
                      garmentSubfilter === sub
                        ? 'bg-[#C5A059] text-black'
                        : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Garments Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {filteredGarments.map((garment) => {
                  const isSelected = selectedGarment?.id === garment.id;
                  return (
                    <div
                      key={garment.id}
                      onClick={() => setSelectedGarment(garment)}
                      className={`relative rounded-sm border p-3 flex flex-col justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#141414] shadow-lg'
                          : 'border-white/10 bg-[#0F0F0F] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-2.5 bg-black">
                          <img
                            src={garment.image}
                            alt={garment.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = bridalLehengaImg;
                            }}
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur rounded-sm text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">
                            {garment.subcategory}
                          </span>
                        </div>
                        <h4 className="text-sm font-serif font-bold text-white mb-1 line-clamp-2 uppercase">
                          {garment.name}
                        </h4>
                        <p className="text-[11px] text-white/50 line-clamp-2 mb-2">
                          {garment.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <span className="font-bold text-[#C5A059]">
                          {formatPrice(garment.basePriceUSD, currency)}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider ${
                          isSelected ? 'bg-[#C5A059] text-black' : 'bg-white/10 text-white/60'
                        }`}>
                          {isSelected ? '✓ Chosen' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================
              STEP 3 — Choose Design
          ==================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 3 of 9</span>
                <h3 className="text-xl font-serif text-white font-bold uppercase">
                  Choose Silhouette & Styling
                </h3>
                <p className="text-xs text-white/50">
                  Select from our master-tailored women's silhouettes, or upload your own reference design image.
                </p>
              </div>

              {/* Design Type Toggle */}
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setDesignOption('catalog')}
                  className={`py-2.5 px-4 rounded-sm border text-[11px] font-bold uppercase tracking-widest transition-all ${
                    designOption === 'catalog'
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'bg-[#141414] border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  Select from Available Cuts
                </button>
                <button
                  type="button"
                  onClick={() => setDesignOption('custom_upload')}
                  className={`py-2.5 px-4 rounded-sm border text-[11px] font-bold uppercase tracking-widest transition-all ${
                    designOption === 'custom_upload'
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'bg-[#141414] border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  Upload Reference Image
                </button>
              </div>

              {designOption === 'catalog' ? (
                <div className="space-y-3">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-white/70">
                    Curated Couture Silhouette & Neckline Profile:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'Royal Anarkali & Flared Silhouette', desc: 'Sweeping 36-kali flared drape with fitted bodice, cancan layer, and sheer sleeves' },
                      { name: 'Contemporary Straight Raw Silk Cut', desc: 'Sleek long shirt with organza cutwork daaman, boat neck, and cigarette trousers' },
                      { name: 'Traditional Angrakha & Farshi Drape', desc: 'Regal overlapping crossover neckline with artisanal dori tassels and scalloped border' },
                    ].map((d) => (
                      <div
                        key={d.name}
                        onClick={() => setSelectedDesignName(d.name)}
                        className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                          selectedDesignName === d.name
                            ? 'border-[#C5A059] bg-[#141414]'
                            : 'border-white/10 bg-[#0F0F0F] hover:border-white/20'
                        }`}
                      >
                        <h4 className="text-xs font-serif font-bold text-white mb-1 uppercase tracking-wider">{d.name}</h4>
                        <p className="text-[11px] text-white/50">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 p-5 bg-[#141414] border border-white/10 rounded-sm">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-white/80">
                    Upload Reference Image or Sketch:
                  </label>
                  <p className="text-xs text-white/50 font-serif italic">
                    Upload a photo from Instagram, Pinterest, a designer catalogue (Maria B, Elan, Asim Jofa), or an existing suit you love.
                  </p>
                  
                  <div className="border border-dashed border-white/20 rounded-sm p-6 text-center hover:border-[#C5A059] transition-colors relative bg-black/40">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReferenceUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      {referenceImageName ? referenceImageName : 'Click or Drag & Drop Image Here'}
                    </p>
                    <span className="text-[10px] text-white/40">JPG, PNG, WEBP (Max 15MB)</span>
                  </div>

                  {referenceImagePreview && (
                    <div className="mt-3 flex items-center gap-3 p-2 bg-[#1A1A1A] rounded-sm border border-white/10">
                      <img
                        src={referenceImagePreview}
                        alt="Reference"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-sm border border-white/10"
                      />
                      <div className="text-xs">
                        <span className="text-[#C5A059] font-bold uppercase tracking-wider block text-[11px]">Reference Image Uploaded</span>
                        <p className="text-white/50 text-[11px]">Our master cutters and embroiders will replicate your design with couture precision.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Design Instructions */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-white/80 mb-1">
                  Add Design Instructions & Neckline/Border Styling Preferences:
                </label>
                <textarea
                  rows={3}
                  value={designInstructions}
                  onChange={(e) => setDesignInstructions(e.target.value)}
                  placeholder="e.g., 'Include organza lace attachments on sleeves, deep back neckline with handmade potli buttons, 2-inch silk facing inside the daaman, and raw silk trouser with organza pleats...'"
                  className="w-full bg-[#141414] border border-white/10 rounded-sm p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          )}

          {/* ===================================================
              STEP 4 — Choose Fabric
          ==================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 4 of 9</span>
                <h3 className="text-xl font-serif text-white font-bold uppercase">
                  Choose Fabric & Color
                </h3>
                <p className="text-xs text-white/50">
                  Select from our imported vault of Italian wools, Chinese Boski silks, Egyptian cottons, or send your own cloth.
                </p>
              </div>

              {/* In-House vs Customer Fabric Toggle */}
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setFabricChoice('in_house')}
                  className={`py-2.5 px-4 rounded-sm border text-[11px] font-bold uppercase tracking-widest transition-all ${
                    fabricChoice === 'in_house'
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'bg-[#141414] border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  Atelier Luxury Cloth Vault
                </button>
                <button
                  type="button"
                  onClick={() => setFabricChoice('customer_provided')}
                  className={`py-2.5 px-4 rounded-sm border text-[11px] font-bold uppercase tracking-widest transition-all ${
                    fabricChoice === 'customer_provided'
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'bg-[#141414] border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  I Will Provide My Own Fabric
                </button>
              </div>

              {fabricChoice === 'in_house' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {FABRICS.map((fabric) => {
                      const isSelected = selectedFabric.id === fabric.id;
                      return (
                        <div
                          key={fabric.id}
                          onClick={() => setSelectedFabric(fabric)}
                          className={`p-3 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#141414] shadow-lg'
                              : 'border-white/10 bg-[#0F0F0F] hover:border-white/20'
                          }`}
                        >
                          <div>
                            {/* Color Swatch & Type */}
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="w-5 h-5 rounded-full border border-white/30 shrink-0 shadow-inner"
                                style={{ backgroundColor: fabric.colorHex }}
                              />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-white truncate">
                                {fabric.color}
                              </span>
                            </div>
                            <h4 className="text-xs font-serif font-bold text-white mb-1 line-clamp-1 uppercase">
                              {fabric.name}
                            </h4>
                            <p className="text-[10px] text-white/50 mb-1">{fabric.type}</p>
                            <span className="text-[9px] text-white/40 block">Origin: {fabric.origin}</span>
                          </div>

                          <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                            <span className="text-[#C5A059] font-bold">
                              {fabric.isPremium ? `+${formatPrice(fabric.premiumSurchargeUSD, currency)}` : 'Standard'}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider ${
                              isSelected ? 'bg-[#C5A059] text-black' : 'text-white/40'
                            }`}>
                              {isSelected ? '✓ Selected' : 'Choose'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-[#141414] border border-white/10 rounded-sm space-y-3">
                  <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
                    Customer-Provided Fabric Instructions:
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed font-serif italic">
                    You can dispatch or drop off your unstitched fabric (e.g. Maria B, Sana Safinaz, Scabal suit cut, or heritage fabric) directly to our Islamabad atelier:
                  </p>
                  <div className="p-3 bg-black/50 rounded-sm text-xs text-[#C5A059] border border-white/10">
                    <strong className="text-white">Delivery Address:</strong> Ijaz Designer Tailor, Shop # 7, Basement Panther Plaza, Near Meezan Bank, F-8 Markaz, Islamabad, Pakistan. Phone: +92 300 5001992
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-white/80 mb-1">
                      Describe your fabric (Type, meters/yards, brand, color):
                    </label>
                    <input
                      type="text"
                      value={customerProvidedFabricDetails}
                      onChange={(e) => setCustomerProvidedFabricDetails(e.target.value)}
                      placeholder="e.g. '4.5 meters dark blue Italian tweed wool by Holland & Sherry'"
                      className="w-full bg-black/60 border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================
              STEP 5 — Measurements
          ==================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 5 of 9</span>
                  <h3 className="text-xl font-serif text-white font-bold uppercase">
                    Custom Tailoring Measurements
                  </h3>
                  <p className="text-xs text-white/50">
                    Precision bespoke fitting for Women's Haute Couture Form.
                  </p>
                </div>

                {/* Unit Switcher */}
                <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-sm border border-white/10">
                  <button
                    type="button"
                    onClick={() => setUnit('inches')}
                    className={`px-3 py-1 rounded-sm text-[10px] uppercase tracking-wider font-bold transition-all ${
                      unit === 'inches' ? 'bg-[#C5A059] text-black' : 'text-white/50'
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 rounded-sm text-[10px] uppercase tracking-wider font-bold transition-all ${
                      unit === 'cm' ? 'bg-[#C5A059] text-black' : 'text-white/50'
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              {/* Helper Buttons: Upload Measurement Sheet & Help With Measurements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#141414] border border-white/10 rounded-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Upload Measurement Sheet</span>
                  </div>
                  <label className="cursor-pointer px-3 py-1 rounded-sm bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-[#C5A059]">
                    <span>Browse</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png,.jpeg"
                      onChange={handleMeasurementSheetUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setShowMeasurementGuide(true)}
                  className="p-3 bg-[#141414] border border-white/10 hover:border-[#C5A059] rounded-sm flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white block">I Need Help With Measurements</span>
                      <span className="text-[10px] text-white/50">View diagram, video consult & standard sizes (XS - 3XL)</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>

              {measurementSheetName && (
                <div className="p-2.5 bg-[#141414] border border-[#25d366]/40 rounded-sm text-xs text-[#25d366] flex items-center justify-between">
                  <span>Attached Measurement File: <strong>{measurementSheetName}</strong></span>
                  <button onClick={() => setMeasurementSheetName('')} className="text-white hover:text-[#C5A059] text-[10px] uppercase tracking-wider font-bold">
                    Remove
                  </button>
                </div>
              )}

              {/* Form Fields: WOMEN EXCLUSIVE */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'bust', label: 'Bust' },
                  { key: 'waist', label: 'Waist' },
                  { key: 'hip', label: 'Hip' },
                  { key: 'shoulder', label: 'Shoulder' },
                  { key: 'sleeve', label: 'Sleeve Length' },
                  { key: 'shirtLength', label: 'Shirt / Kameez Length' },
                  { key: 'trouserLength', label: 'Trouser / Shalwar Length' },
                  { key: 'dupattaLength', label: 'Dupatta Length' },
                ].map((field) => (
                  <div key={field.key} className="bg-[#141414] p-2.5 rounded-sm border border-white/10">
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-white/70 mb-1">
                      {field.label} ({unit})
                    </label>
                    <input
                      type="text"
                      value={(womenMeasurements as any)[field.key]}
                      onChange={(e) =>
                        setWomenMeasurements({ ...womenMeasurements, [field.key]: e.target.value })
                      }
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                ))}
                <div className="col-span-2 sm:col-span-4 bg-[#141414] p-2.5 rounded-sm border border-white/10">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/70 mb-1">
                    Custom Tailoring Notes (Armhole, Front/Back Neck Depth, Daaman / Ghera Flare, Trouser Cut):
                  </label>
                  <input
                    type="text"
                    value={womenMeasurements.other || ''}
                    onChange={(e) => setWomenMeasurements({ ...womenMeasurements, other: e.target.value })}
                    placeholder="e.g. Front Neck: 7 in, Back Neck: 4.5 in, Armhole: 8.5 in, Daaman Flare: 26 in, Straight cigarette pants with bottom slit"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-2.5 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              STEP 6 — Order Details
          ==================================================== */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 6 of 9</span>
                <h3 className="text-xl font-serif text-white font-bold uppercase">
                  Customer & Delivery Details
                </h3>
                <p className="text-xs text-white/50">
                  Please enter your contact details and shipping address for bespoke dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="e.g. client@domain.com"
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="e.g. +44 7700 900142"
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.whatsapp}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })}
                    placeholder="e.g. +44 7700 900142"
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">Country *</label>
                  <select
                    value={customerInfo.country}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, country: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="United States">United States (USA)</option>
                    <option value="United Kingdom">United Kingdom (UK)</option>
                    <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                    <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Pakistan">Pakistan (Local Delivery / In-Store Pickup)</option>
                    <option value="Germany">Germany / Europe</option>
                    <option value="Worldwide">Other Worldwide Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    placeholder="e.g. London, Dubai, New York, Islamabad"
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">Delivery Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={customerInfo.deliveryAddress}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryAddress: e.target.value })}
                    placeholder="Full street address, apartment / suite number, postal code"
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-white/80 mb-1">Special Instructions for Master Tailor</label>
                  <input
                    type="text"
                    value={customerInfo.specialInstructions || ''}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, specialInstructions: e.target.value })}
                    placeholder="e.g. 'Needed urgently before October 15 wedding gala'"
                    className="w-full bg-[#141414] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              STEP 7 — ORDER SUMMARY
          ==================================================== */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 7 of 9</span>
                <h3 className="text-xl font-serif text-white font-bold uppercase">
                  Order Summary & Specification Review
                </h3>
                <p className="text-xs text-white/50">
                  Verify all tailoring specifications, fabric selections, and measurements before proceeding to payment options.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left 2 Cols: Garment Specs Recap */}
                <div className="md:col-span-2 space-y-4">
                  <div className="p-4 bg-[#141414] border border-white/10 rounded-sm flex gap-4">
                    <img
                      src={selectedGarment?.image}
                      alt={selectedGarment?.name}
                      className="w-24 h-28 object-cover rounded-sm shrink-0 border border-white/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = bridalLehengaImg;
                      }}
                    />
                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-widest block">
                        {category.toUpperCase()} • {selectedGarment?.subcategory}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-white uppercase">
                        {selectedGarment?.name}
                      </h4>
                      <p className="text-white/50 text-[11px] leading-relaxed">{selectedGarment?.description}</p>
                      <div className="pt-1 text-white/70">
                        <strong className="text-white">Design Cut:</strong> {designOption === 'catalog' ? selectedDesignName : 'Custom Reference Upload'}
                      </div>
                      <div className="text-white/70">
                        <strong className="text-white">Fabric:</strong> {fabricChoice === 'in_house' ? `${selectedFabric.name} (${selectedFabric.color})` : 'Customer Provided Fabric'}
                      </div>
                    </div>
                  </div>

                  {/* Measurements Recap Table */}
                  <div className="p-4 bg-[#141414] border border-white/10 rounded-sm">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h5 className="text-xs font-serif font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Submitted Measurements ({unit.toUpperCase()})</span>
                      </h5>
                      <button
                        onClick={() => setCurrentStep(5)}
                        className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:underline font-bold"
                      >
                        Edit Measurements
                      </button>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs">
                      {Object.entries(womenMeasurements).map(([k, v]) => {
                        if (!v || k === 'other') return null;
                        const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
                        return (
                          <div key={k} className="p-2 bg-[#0D0D0D] rounded-sm border border-white/10">
                            <span className="text-[9px] uppercase tracking-wider text-white/40 block truncate">{label}</span>
                            <span className="font-bold text-white">{v} {unit}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Col: Price Breakdown & Quantity */}
                <div className="p-5 bg-[#141414] border border-white/10 rounded-sm flex flex-col justify-between space-y-4">
                  <div>
                    <h5 className="text-xs font-serif font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                      Price Calculation
                    </h5>

                    <div className="space-y-2.5 text-xs text-white/60">
                      <div className="flex justify-between">
                        <span>Base Garment Price:</span>
                        <span className="text-white font-medium">{formatPrice(basePrice, currency)}</span>
                      </div>

                      {fabricChoice === 'in_house' && selectedFabric.isPremium && (
                        <div className="flex justify-between">
                          <span>Premium Fabric Surcharge:</span>
                          <span className="text-[#C5A059] font-bold">+{formatPrice(selectedFabric.premiumSurchargeUSD, currency)}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center py-2 border-y border-white/10">
                        <span className="text-white font-medium">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-6 h-6 rounded-sm bg-white/10 text-white hover:bg-white/20 font-bold flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="font-bold text-white">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-6 h-6 rounded-sm bg-white/10 text-white hover:bg-white/20 font-bold flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <span>Estimated Subtotal:</span>
                        <span className="text-white font-medium">{formatPrice(subtotal, currency)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Courier & Transit ({isDomestic ? 'Domestic' : 'International Air'}):</span>
                        <span className="text-white font-medium">{formatPrice(deliveryFee, currency)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Estimated Total:</span>
                      <span className="text-xl font-serif font-bold text-[#C5A059]">
                        {formatPrice(grandTotal, currency)}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/40 block font-serif italic">
                      *Subject to review by Master Tailor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              STEP 8 — PAYMENT
          ==================================================== */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Step 8 of 9</span>
                <h3 className="text-xl font-serif text-white font-bold uppercase">
                  Payment Interface
                </h3>
                <p className="text-xs text-white/50 font-serif italic">
                  Select your preferred settlement method. No immediate deduction is made until master cutter confirms measurements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Online Payment */}
                <div
                  onClick={() => setPaymentMethod('online_payment')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    paymentMethod === 'online_payment'
                      ? 'border-[#C5A059] bg-[#141414] shadow-lg'
                      : 'border-white/10 bg-[#0F0F0F] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-sm bg-white/5 text-[#C5A059]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">Online Payment</h4>
                      <span className="text-[10px] text-white/40">Credit / Debit Card (Visa, Mastercard, Amex)</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50 mt-2">
                    Secure checkout link generated after specification audit.
                  </p>
                </div>

                {/* 2. Bank Transfer */}
                <div
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#C5A059] bg-[#141414] shadow-lg'
                      : 'border-white/10 bg-[#0F0F0F] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-sm bg-white/5 text-[#C5A059]">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">Bank Transfer</h4>
                      <span className="text-[10px] text-white/40">Habib Bank Limited (HBL) / Meezan Bank Pakistan</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50 mt-2">
                    IBAN & account details will be shared on order confirmation.
                  </p>
                </div>

                {/* 3. International Payment */}
                <div
                  onClick={() => setPaymentMethod('international_payment')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    paymentMethod === 'international_payment'
                      ? 'border-[#C5A059] bg-[#141414] shadow-lg'
                      : 'border-white/10 bg-[#0F0F0F] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-sm bg-white/5 text-[#C5A059]">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">International Payment</h4>
                      <span className="text-[10px] text-white/40">Wise, SWIFT Wire, Payoneer</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50 mt-2">
                    Optimal exchange rates for international clients in USA, UK, UAE & Europe.
                  </p>
                </div>

                {/* 4. Cash / Pay at Store */}
                <div
                  onClick={() => setPaymentMethod('cash_store')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    paymentMethod === 'cash_store'
                      ? 'border-[#C5A059] bg-[#141414] shadow-lg'
                      : 'border-white/10 bg-[#0F0F0F] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-sm bg-white/5 text-[#C5A059]">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">Cash / Pay at Store</h4>
                      <span className="text-[10px] text-white/40">Panther Plaza, F-8 Markaz, Islamabad</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50 mt-2">
                    Pay upon in-person baste fitting or final collection in Islamabad.
                  </p>
                </div>
              </div>

              {/* Secure Placeholder Notice */}
              <div className="p-4 bg-[#141414] border border-white/10 rounded-sm flex items-center gap-3 text-xs text-white/60">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>
                  <strong className="text-white">Bespoke Quality Guarantee:</strong> No immediate online deduction; your order will be submitted directly to our master tailoring docket for personal confirmation.
                </span>
              </div>
            </div>
          )}

          {/* ===================================================
              STEP 9 — ORDER CONFIRMATION
          ==================================================== */}
          {currentStep === 9 && createdOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-2">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                  Order Registered Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold uppercase mt-1">
                  Your tailoring request has been received.
                </h3>
                <p className="text-xs text-white/50 max-w-lg mx-auto mt-2 font-serif italic">
                  Our master cutting artisan in Islamabad is reviewing your pattern specifications, fabric allocation, and measurements.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-6 bg-[#141414] border border-white/10 rounded-sm max-w-lg mx-auto text-left space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block">Order Reference ID</span>
                    <span className="text-lg font-mono font-bold text-[#C5A059]">{createdOrder.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block">Estimated Completion</span>
                    <span className="text-xs font-semibold text-white">12 - 16 Business Days</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-white/60">
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="text-white font-medium">{createdOrder.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category & Garment:</span>
                    <span className="text-white font-medium">{createdOrder.category.toUpperCase()} • {createdOrder.garment.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fabric Choice:</span>
                    <span className="text-white font-medium">
                      {createdOrder.fabricChoice === 'in_house' && createdOrder.fabric ? `${createdOrder.fabric.name} (${createdOrder.fabric.color})` : 'Customer Provided'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination:</span>
                    <span className="text-white font-medium">{createdOrder.customer.city}, {createdOrder.customer.country}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="font-bold text-white">Total Order Value:</span>
                    <span className="font-bold text-[#C5A059]">{formatPrice(createdOrder.total, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Button & Close */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateWhatsAppMessage(createdOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#25d366] hover:bg-[#20b858] text-black font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Order on WhatsApp</span>
                </a>

                {onViewOrderDetails && (
                  <button
                    type="button"
                    onClick={() => onViewOrderDetails(createdOrder.id)}
                    className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black font-bold text-[11px] uppercase tracking-widest transition-colors"
                  >
                    Track This Order Now
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white/10 hover:bg-white/15 text-white font-bold text-[11px] uppercase tracking-widest transition-colors"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Navigation Buttons */}
        {currentStep < 9 && (
          <div className="px-6 py-4 border-t border-white/10 bg-[#121212] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 8 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-md"
              >
                <span>Proceed to Step {currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalOrderSubmit}
                className="px-7 py-2.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-lg"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Submit Custom Tailoring Order</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Measurement Guide Modal Helper */}
      <MeasurementsGuideModal
        category="women"
        isOpen={showMeasurementGuide}
        onClose={() => setShowMeasurementGuide(false)}
        onApplyStandardSize={(sizeVals) => {
          setWomenMeasurements((prev) => ({ ...prev, ...sizeVals }));
        }}
      />
    </div>
  );
};
