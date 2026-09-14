import { TailoringOrder, OrderStatus, TrackingStage } from '../types';
import { INITIAL_ORDERS, INITIAL_TRACKING_STAGES } from '../data/mockData';

const STORAGE_KEY = 'ijaz_tailors_orders_v1';

export function getStoredOrders(): TailoringOrder[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveStoredOrders(orders: TailoringOrder[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage', err);
  }
}

export function createNewOrder(orderData: Omit<TailoringOrder, 'id' | 'createdAt' | 'stages' | 'status'>): TailoringOrder {
  const existing = getStoredOrders();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `IJZ-${randomNum}`;

  const stages: TrackingStage[] = INITIAL_TRACKING_STAGES.map((s, idx) => ({
    ...s,
    completed: idx === 0,
    current: idx === 0,
    timestamp: idx === 0 ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined,
  }));

  const newOrder: TailoringOrder = {
    ...orderData,
    id: orderId,
    createdAt: new Date().toISOString(),
    status: 'new',
    stages,
  };

  const updated = [newOrder, ...existing];
  saveStoredOrders(updated);
  return newOrder;
}

export function updateOrderStatus(orderId: string, newStatus: OrderStatus, adminNote?: string, updatedPrice?: number): TailoringOrder | null {
  const orders = getStoredOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const order = orders[index];
  order.status = newStatus;
  if (adminNote !== undefined) order.adminNotes = adminNote;
  if (updatedPrice !== undefined) {
    order.estimatedPrice = updatedPrice;
    order.total = updatedPrice + order.deliveryCharges;
  }

  // Update tracking stages based on status
  const stageMap: Record<OrderStatus, number> = {
    new: 0,
    pending: 0,
    confirmed: 1,
    in_production: 3,
    ready_for_fitting: 4,
    completed: 7,
    shipped: 6,
    cancelled: -1,
  };

  const targetStageIdx = stageMap[newStatus];
  if (targetStageIdx >= 0) {
    order.stages = order.stages.map((stage, idx) => ({
      ...stage,
      completed: idx <= targetStageIdx,
      current: idx === targetStageIdx,
      timestamp: idx <= targetStageIdx && !stage.timestamp ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : stage.timestamp,
    }));
  }

  orders[index] = order;
  saveStoredOrders(orders);
  return order;
}

export function formatPrice(amountUSD: number, _currency?: 'USD' | 'PKR' | 'GBP' | 'AED'): string {
  // Always display prices in PKR (Pakistani Rupees)
  const pkr = Math.round(amountUSD * 278);
  return `PKR ${pkr.toLocaleString('en-US')}`;
}

export function generateWhatsAppMessage(order: TailoringOrder): string {
  const phone = '923005001992'; // Ijaz Designer Tailor Islamabad official WhatsApp
  const lines = [
    `*NEW BESPOKE ORDER ENQUIRY — IJAZ DESIGNER TAILOR*`,
    `--------------------------------------`,
    `*Order Reference:* ${order.id}`,
    `*Customer Name:* ${order.customer.name}`,
    `*Category:* ${order.category.toUpperCase()} (${order.garment.subcategory})`,
    `*Garment:* ${order.garment.name}`,
    `*Fabric Choice:* ${order.fabricChoice === 'in_house' && order.fabric ? `${order.fabric.name} (${order.fabric.color})` : 'Customer-Provided Fabric'}`,
    `*Destination:* ${order.customer.city}, ${order.customer.country}`,
    `*Total Estimated:* PKR ${Math.round(order.total * 278).toLocaleString('en-US')}`,
    ``,
    `*KEY MEASUREMENTS (${order.unit.toUpperCase()}):*`,
  ];

  const m = (order.measurements as unknown) as Record<string, string | undefined>;
  for (const [key, val] of Object.entries(m)) {
    if (val && val.trim() && key !== 'other') {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      lines.push(`• ${formattedKey}: ${val} ${order.unit}`);
    }
  }

  if (m.other) {
    lines.push(`• Additional Specs: ${m.other}`);
  }

  if (order.designInstructions) {
    lines.push(``);
    lines.push(`*Design Instructions:* ${order.designInstructions}`);
  }

  if (order.customer.specialInstructions) {
    lines.push(`*Special Notes:* ${order.customer.specialInstructions}`);
  }

  lines.push(``);
  lines.push(`_Sent via Ijaz Designer Tailor Online Bespoke System (Islamabad)_`);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function generateDirectWhatsAppLink(customerPhone: string, text: string): string {
  const cleanPhone = customerPhone.replace(/\D/g, '');
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
