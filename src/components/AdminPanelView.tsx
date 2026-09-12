import React, { useState } from 'react';
import { TailoringOrder, OrderStatus, GenderCategory } from '../types';
import { 
  getStoredOrders, 
  saveStoredOrders, 
  updateOrderStatus, 
  formatPrice, 
  generateDirectWhatsAppLink 
} from '../utils/orderStore';
import { INITIAL_ORDERS } from '../data/mockData';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  MessageCircle, 
  Check, 
  X, 
  RefreshCw, 
  Phone, 
  Mail, 
  MapPin, 
  Scissors, 
  Ruler, 
  FileText,
  Clock,
  ChevronDown
} from 'lucide-react';

interface AdminPanelViewProps {
  currency: 'USD' | 'PKR' | 'GBP' | 'AED';
  onViewOrderTracker: (orderId: string) => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  currency,
  onViewOrderTracker,
}) => {
  const [orders, setOrders] = useState<TailoringOrder[]>(getStoredOrders());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<TailoringOrder | null>(null);

  // Edit fields for selected order modal
  const [newStatus, setNewStatus] = useState<OrderStatus>('new');
  const [newAdminNote, setNewAdminNote] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  const refreshOrders = () => {
    setOrders(getStoredOrders());
  };

  const handleResetToDemo = () => {
    if (window.confirm('Reset all orders to default master tailoring showcase records?')) {
      saveStoredOrders(INITIAL_ORDERS);
      setOrders(INITIAL_ORDERS);
      setSelectedOrder(null);
    }
  };

  const handleOpenDetailModal = (order: TailoringOrder) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setNewAdminNote(order.adminNotes || '');
    setNewPrice(order.estimatedPrice);
    setSaveSuccessMsg('');
  };

  const handleSaveChanges = () => {
    if (!selectedOrder) return;
    const updated = updateOrderStatus(selectedOrder.id, newStatus, newAdminNote, newPrice);
    if (updated) {
      setSelectedOrder({ ...updated });
      refreshOrders();
      setSaveSuccessMsg('Order updated successfully!');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && o.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customer.name.toLowerCase().includes(q);
      const matchCity = o.customer.city.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      if (!matchId && !matchName && !matchCity && !matchPhone) return false;
    }
    return true;
  });

  const statusTabs: { key: string; label: string; count: number }[] = [
    { key: 'all', label: 'All Orders', count: orders.length },
    { key: 'new', label: 'New Orders', count: orders.filter((o) => o.status === 'new').length },
    { key: 'pending', label: 'Pending Orders', count: orders.filter((o) => o.status === 'pending').length },
    { key: 'confirmed', label: 'Confirmed Orders', count: orders.filter((o) => o.status === 'confirmed').length },
    { key: 'in_production', label: 'In Production', count: orders.filter((o) => o.status === 'in_production').length },
    { key: 'ready_for_fitting', label: 'Ready for Fitting', count: orders.filter((o) => o.status === 'ready_for_fitting').length },
    { key: 'completed', label: 'Completed', count: orders.filter((o) => o.status === 'completed').length },
    { key: 'shipped', label: 'Shipped', count: orders.filter((o) => o.status === 'shipped').length },
    { key: 'cancelled', label: 'Cancelled', count: orders.filter((o) => o.status === 'cancelled').length },
  ];

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return 'bg-[#292215] text-[#f59e0b] border-[#5e4b21]';
      case 'confirmed':
        return 'bg-[#152a38] text-[#38bdf8] border-[#1d4f6d]';
      case 'in_production':
        return 'bg-[#261f38] text-[#c084fc] border-[#4c356e]';
      case 'ready_for_fitting':
        return 'bg-[#2b1f15] text-[#fb923c] border-[#5e381b]';
      case 'completed':
        return 'bg-[#183120] text-[#4ade80] border-[#255c36]';
      case 'shipped':
        return 'bg-[#1e293b] text-[#60a5fa] border-[#334155]';
      case 'cancelled':
        return 'bg-[#311818] text-[#f87171] border-[#5c2525]';
      case 'pending':
      default:
        return 'bg-[#1e202e] text-[#9ca3af] border-[#2e3248]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141622] border border-[#262c3e] rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif text-[#f4efe6] font-bold">
                Atelier Master Tailor Admin Panel
              </h1>
              <span className="px-2 py-0.5 rounded bg-[#c5a880] text-[#0b0c10] text-[10px] font-bold uppercase tracking-wider">
                Management Mode
              </span>
            </div>
            <p className="text-xs text-[#8e95a7]">
              Manage bespoke queues, update production stages, edit pricing, and contact clients directly via WhatsApp.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshOrders}
            className="px-3 py-2 rounded-lg bg-[#1c2030] hover:bg-[#252b40] border border-[#2c3348] text-xs text-[#d2d7e5] flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleResetToDemo}
            className="px-3 py-2 rounded-lg bg-[#271d1e] hover:bg-[#382325] border border-[#4d292b] text-xs text-[#fca5a5] transition-colors"
          >
            Reset Demo Orders
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Commissions', val: orders.length, sub: 'All Time' },
          { label: 'In Production', val: orders.filter((o) => o.status === 'in_production').length, sub: 'Cutting Room' },
          { label: 'Pending Fittings', val: orders.filter((o) => o.status === 'ready_for_fitting').length, sub: 'Virtual / Atelier' },
          { label: 'Shipped / Complete', val: orders.filter((o) => o.status === 'shipped' || o.status === 'completed').length, sub: 'Dispatched' },
        ].map((m, i) => (
          <div key={i} className="p-4 bg-[#12141c] border border-[#232738] rounded-xl">
            <span className="text-[11px] text-[#868d9f] uppercase tracking-wider block">{m.label}</span>
            <span className="text-2xl font-serif font-bold text-[#f2ede4] my-1 block">{m.val}</span>
            <span className="text-[10px] text-[#c5a880]">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#212536]">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                statusFilter === tab.key
                  ? 'bg-[#c5a880] text-[#0b0c10] font-semibold shadow-sm'
                  : 'bg-[#151722] text-[#8e95aa] hover:text-[#ffffff] border border-[#242838]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 rounded-full ${statusFilter === tab.key ? 'bg-[#0b0c10]/20 text-[#0b0c10]' : 'bg-[#222738] text-[#71788a]'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Category Filter Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#6e7587] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, Name, City..."
              className="w-full bg-[#141622] border border-[#262b3d] rounded-xl pl-9 pr-3 py-2 text-xs text-[#e2e6f2] placeholder-[#60677c] focus:outline-none focus:border-[#c5a880]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-[#878fa2]">Division:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#141622] border border-[#262b3d] rounded-xl px-3 py-2 text-xs text-[#e2e6f2] focus:outline-none focus:border-[#c5a880]"
            >
              <option value="all">All Divisions (Men & Women)</option>
              <option value="men">Men Only</option>
              <option value="women">Women Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#12141d] border border-[#232738] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161826] text-[#868ea3] uppercase tracking-wider text-[10px] border-b border-[#212638]">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Category & Garment</th>
                <th className="py-3.5 px-4">Cloth</th>
                <th className="py-3.5 px-4">Value</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2334] text-[#cfd4e2]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#788094]">
                    No bespoke orders match the current filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#161826]/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#c5a880]">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#f0ebe2] block">{order.customer.name}</span>
                      <span className="text-[11px] text-[#7d8597]">{order.customer.city}, {order.customer.country}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#e2e6f2] block truncate max-w-[200px]">{order.garment.name}</span>
                      <span className="text-[10px] text-[#c5a880] uppercase tracking-wider">{order.category} • {order.garment.subcategory}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-[#979fad]">
                      {order.fabricChoice === 'in_house' && order.fabric ? (
                        <span>{order.fabric.name}</span>
                      ) : (
                        <span className="italic">Customer Cloth</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#f5ecd7]">
                      {formatPrice(order.total, currency)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${getStatusBadge(order.status)}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetailModal(order)}
                          className="p-1.5 rounded-lg bg-[#1a1d2c] hover:bg-[#252a3e] border border-[#2b3144] text-[#c5a880] transition-colors"
                          title="View & Edit Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={generateDirectWhatsAppLink(
                            order.customer.whatsapp || order.customer.phone,
                            `Hello ${order.customer.name}! This is Master Tailor Ijaz from Islamabad regarding your bespoke order ${order.id} (${order.garment.name}). Current stage: ${order.status.replace(/_/g, ' ')}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#25d366]/20 hover:bg-[#25d366]/30 border border-[#25d366]/40 text-[#25d366] transition-colors"
                          title="Contact Customer on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Order Detailed Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#13151f] border border-[#2a3044] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#212638] bg-[#171926]">
              <div className="flex items-center gap-3">
                <span className="text-xl font-mono font-bold text-[#c5a880]">{selectedOrder.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${getStatusBadge(selectedOrder.status)}`}>
                  {selectedOrder.status.replace(/_/g, ' ')}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-[#868ea2] hover:text-[#ffffff] rounded-lg hover:bg-[#202538]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {saveSuccessMsg && (
                <div className="p-3 bg-[#152e1f] border border-[#235c36] rounded-xl text-[#4ade80] flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#181a26] rounded-xl border border-[#24293c]">
                <div>
                  <h4 className="font-semibold text-[#f0ebe2] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Customer Contact Information</span>
                  </h4>
                  <p className="text-[#cfd4e2]"><strong>Name:</strong> {selectedOrder.customer.name}</p>
                  <p className="text-[#9ea6b8]"><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  <p className="text-[#9ea6b8]"><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                  <p className="text-[#9ea6b8]"><strong>WhatsApp:</strong> {selectedOrder.customer.whatsapp}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#f0ebe2] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Dispatch Address</span>
                  </h4>
                  <p className="text-[#cfd4e2]">{selectedOrder.customer.deliveryAddress}</p>
                  <p className="text-[#9ea6b8]">{selectedOrder.customer.city}, {selectedOrder.customer.country}</p>
                  {selectedOrder.customer.specialInstructions && (
                    <p className="text-[#c5a880] mt-1 italic">
                      Note: "{selectedOrder.customer.specialInstructions}"
                    </p>
                  )}
                </div>
              </div>

              {/* Garment & Design Specs */}
              <div className="p-4 bg-[#181a26] rounded-xl border border-[#24293c] space-y-2">
                <h4 className="font-semibold text-[#f0ebe2] flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Garment & Design Specs</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <span className="text-[#7d8597] block">Category:</span>
                    <span className="font-medium text-[#e2e6f2] uppercase">{selectedOrder.category} ({selectedOrder.garment.subcategory})</span>
                  </div>
                  <div>
                    <span className="text-[#7d8597] block">Garment:</span>
                    <span className="font-medium text-[#e2e6f2]">{selectedOrder.garment.name}</span>
                  </div>
                  <div>
                    <span className="text-[#7d8597] block">Design Profile:</span>
                    <span className="font-medium text-[#e2e6f2]">{selectedOrder.designOption === 'catalog' ? selectedOrder.selectedDesignName : 'Custom Upload'}</span>
                  </div>
                </div>

                {selectedOrder.designInstructions && (
                  <div className="pt-2 border-t border-[#232738]">
                    <span className="text-[#7d8597] block">Design Instructions:</span>
                    <p className="text-[#e2e6f2]">{selectedOrder.designInstructions}</p>
                  </div>
                )}

                {/* Uploaded Reference Image if available */}
                {selectedOrder.referenceImageUrl && (
                  <div className="pt-2 border-t border-[#232738]">
                    <span className="text-[#7d8597] block mb-1">Uploaded Reference Image:</span>
                    <img
                      src={selectedOrder.referenceImageUrl}
                      alt="Customer Reference"
                      className="max-h-48 rounded-lg border border-[#2c3248] object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Measurements Table */}
              <div className="p-4 bg-[#181a26] rounded-xl border border-[#24293c]">
                <h4 className="font-semibold text-[#f0ebe2] mb-2 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Measurements ({selectedOrder.unit.toUpperCase()})</span>
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {Object.entries(selectedOrder.measurements).map(([k, v]) => {
                    if (!v || k === 'other') return null;
                    const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
                    return (
                      <div key={k} className="p-2 bg-[#12141c] rounded border border-[#23273a]">
                        <span className="text-[10px] text-[#788094] block truncate">{label}</span>
                        <span className="font-bold text-[#f0ebe2]">{v} {selectedOrder.unit}</span>
                      </div>
                    );
                  })}
                </div>
                {(selectedOrder.measurements as any).other && (
                  <p className="mt-2 text-[#b0b8cb] text-[11px]">
                    <strong>Additional Specs:</strong> {(selectedOrder.measurements as any).other}
                  </p>
                )}
                {selectedOrder.measurementSheetUrl && (
                  <p className="mt-2 text-[#c5a880] text-[11px]">
                    <strong>Attached Sheet:</strong> {selectedOrder.measurementSheetUrl}
                  </p>
                )}
              </div>

              {/* Admin Modification Form (Status, Notes, Price) */}
              <div className="p-4 bg-[#1a1d2c] rounded-xl border border-[#2d344b] space-y-4">
                <h4 className="font-semibold text-[#c5a880] flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Order Status & Pricing (Business Owner Controls)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#cbd1e2] mb-1">
                      Update Stage / Status:
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                      className="w-full bg-[#12141c] border border-[#2b3146] rounded-lg p-2 text-xs text-[#e2e6f2] focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="new">New Order</option>
                      <option value="pending">Pending Review</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_production">In Production (Cutting & Stitching)</option>
                      <option value="ready_for_fitting">Ready for Fitting</option>
                      <option value="completed">Completed</option>
                      <option value="shipped">Shipped via Courier</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#cbd1e2] mb-1">
                      Estimated Price (USD):
                    </label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full bg-[#12141c] border border-[#2b3146] rounded-lg p-2 text-xs text-[#e2e6f2] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#cbd1e2] mb-1">
                    Internal Tailor Notes & Customer Updates:
                  </label>
                  <textarea
                    rows={2}
                    value={newAdminNote}
                    onChange={(e) => setNewAdminNote(e.target.value)}
                    placeholder="e.g. 'Canvas hand-padded by Master Ijaz. Fitting scheduled for Saturday.'"
                    className="w-full bg-[#12141c] border border-[#2b3146] rounded-lg p-2 text-xs text-[#e2e6f2] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 border-t border-[#212638] bg-[#171926] flex items-center justify-between">
              <a
                href={generateDirectWhatsAppLink(
                  selectedOrder.customer.whatsapp || selectedOrder.customer.phone,
                  `Hello ${selectedOrder.customer.name}! Updating you regarding your order ${selectedOrder.id} at Ijaz Tailors Islamabad. Status: ${newStatus.replace(/_/g, ' ')}. ${newAdminNote}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] hover:bg-[#25d366]/30 text-xs font-semibold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Contact via WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl bg-[#222638] text-xs font-semibold text-[#cbd1e2] hover:bg-[#2b3044]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="px-6 py-2 rounded-xl bg-[#c5a880] text-[#0b0c10] text-xs font-bold uppercase tracking-wider hover:bg-[#d8be99] transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
