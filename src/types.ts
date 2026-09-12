export type Currency = 'USD' | 'PKR' | 'GBP' | 'AED';

export type NavigationTab =
  | 'home'
  | 'women'
  | 'services'
  | 'bespoke'
  | 'order_online'
  | 'international'
  | 'gallery'
  | 'reviews'
  | 'contact'
  | 'track_order'
  | 'admin';

export type GenderCategory = 'women';

export type MenSubcategory = string;

export type WomenSubcategory =
  | 'Designer Dresses'
  | 'Custom Stitching'
  | 'Formal Wear'
  | 'Party Wear'
  | 'Wedding Dresses'
  | 'Bridal Wear'
  | 'Shalwar Kameez'
  | '2-Piece & 3-Piece Suits'
  | 'Custom Embroidery'
  | 'Alterations';

export interface Garment {
  id: string;
  name: string;
  category: GenderCategory;
  subcategory: WomenSubcategory;
  description: string;
  basePriceUSD: number;
  basePricePKR: number;
  image: string;
  tags: string[];
  estimatedDays: number;
  fabricSuggestions: string[];
  features?: string[];
}

export interface Fabric {
  id: string;
  name: string;
  type: string;
  color: string;
  colorHex: string;
  pattern: string;
  isPremium: boolean;
  premiumSurchargeUSD: number;
  premiumSurchargePKR: number;
  image: string;
  origin?: string;
}

export interface MenMeasurements {
  chest: string;
  waist: string;
  shoulder: string;
  sleeve: string;
  shirtLength: string;
  trouserWaist: string;
  trouserLength: string;
  hip: string;
  thigh: string;
  other?: string;
}

export interface WomenMeasurements {
  bust: string;
  waist: string;
  hip: string;
  shoulder: string;
  sleeve: string;
  shirtLength: string;
  trouserLength: string;
  dupattaLength: string;
  other?: string;
}

export type OrderStatus =
  | 'new'
  | 'pending'
  | 'confirmed'
  | 'in_production'
  | 'ready_for_fitting'
  | 'completed'
  | 'shipped'
  | 'cancelled';

export interface TrackingStage {
  id: string;
  name: string;
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
  timestamp?: string;
  location?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  country: string;
  city: string;
  deliveryAddress: string;
  specialInstructions?: string;
}

export interface TailoringOrder {
  id: string;
  createdAt: string;
  category: GenderCategory;
  garment: Garment;
  designOption: 'catalog' | 'custom_upload';
  selectedDesignName?: string;
  designInstructions?: string;
  referenceImageUrl?: string;
  fabricChoice: 'in_house' | 'customer_provided';
  fabric?: Fabric;
  customerProvidedFabricDetails?: string;
  unit: 'inches' | 'cm';
  measurements: MenMeasurements | WomenMeasurements;
  measurementSheetUrl?: string;
  customer: CustomerInfo;
  quantity: number;
  estimatedPrice: number;
  deliveryCharges: number;
  total: number;
  currency: 'USD' | 'PKR' | 'GBP' | 'AED';
  paymentMethod: 'online_payment' | 'bank_transfer' | 'international_payment' | 'cash_store';
  status: OrderStatus;
  stages: TrackingStage[];
  adminNotes?: string;
}

export interface AppointmentBooking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  whatsapp: string;
  type: 'in_store_islamabad' | 'virtual_video';
  date: string;
  timeSlot: string;
  interest: 'Women Couture' | 'Haute Bridal & Wedding' | 'Custom Stitching' | 'Alterations';
  notes?: string;
  createdAt: string;
}

export type ActivePage =
  | 'home'
  | 'women'
  | 'services'
  | 'bespoke_tailoring'
  | 'online_order'
  | 'international_orders'
  | 'gallery'
  | 'reviews'
  | 'contact'
  | 'book_appointment'
  | 'track_order'
  | 'admin';
