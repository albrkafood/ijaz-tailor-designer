import React, { useState } from 'react';
import { TailoringOrder } from '../types';
import { getStoredOrders, formatPrice, generateWhatsAppMessage } from '../utils/orderStore';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  Scissors, 
  Sparkles, 
  MessageCircle, 
  User, 
  MapPin, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface TrackOrderViewProps {
  currency: 'USD' | 'PKR' | 'GBP' | 'AED';
  onNewOrderClick: () => void;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({ currency, onNewOrderClick }) => {
  const [orderIdQuery, setOrderIdQuery] = useState('');
  const [contactQuery, setContactQuery] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<TailoringOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const allOrders = getStoredOrders();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSearched(true);

    const cleanId = orderIdQuery.trim().toUpperCase();
    const cleanContact = contactQuery.trim().toLowerCase();

    if (!cleanId) {
      setErrorMsg('Please enter your Order ID (e.g. IJZ-91024)');
      return;
    }

    const found = allOrders.find((o) => {
      const idMatch = o.id.toUpperCase() === cleanId;
      if (!idMatch) return false;

      // If contact provided, verify
      if (cleanContact) {
        const emailMatch = o.customer.email.toLowerCase().includes(cleanContact);
        const phoneMatch = o.customer.phone.replace(/\D/g, '').includes(cleanContact.replace(/\D/g, ''));
        return emailMatch || phoneMatch;
      }
      return true;
    });

    if (found) {
      setMatchedOrder(found);
    } else {
      setMatchedOrder(null);
      setErrorMsg(`No bespoke order found matching reference ${cleanId}. Please check the ID or try one of the sample references below.`);
    }
  };

  const loadSampleOrder = (sampleId: string) => {
    setOrderIdQuery(sampleId);
    setContactQuery('');
    const found = allOrders.find((o) => o.id === sampleId);
    if (found) {
      setMatchedOrder(found);
      setSearched(true);
      setErrorMsg('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>REAL-TIME BESPOKE PRODUCTION PROGRESS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide uppercase font-bold mb-3">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
          Monitor your garment’s precision journey from initial paper pattern drafting in our Islamabad atelier through cutting, baste fitting, hand-finishing, and international courier dispatch.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-[#0E0E0E] border border-white/10 rounded-sm p-6 sm:p-8 mb-8 shadow-xl">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wider">
                Order ID *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={orderIdQuery}
                  onChange={(e) => setOrderIdQuery(e.target.value)}
                  placeholder="e.g. IJZ-91024 or IJZ-88419"
                  className="w-full bg-[#141414] border border-white/10 rounded-sm px-4 py-3 text-sm text-white uppercase tracking-wider placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wider">
                Phone or Email (Optional Verification)
              </label>
              <input
                type="text"
                value={contactQuery}
                onChange={(e) => setContactQuery(e.target.value)}
                placeholder="e.g. client@domain.com or phone"
                className="w-full bg-[#141414] border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Quick Demo Test Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-white/40">Try Live Sample Orders:</span>
              <button
                type="button"
                onClick={() => loadSampleOrder('IJZ-91024')}
                className="px-2.5 py-1 rounded-sm bg-[#161616] hover:bg-white/10 text-[#C5A059] border border-white/10 font-mono text-[11px]"
              >
                IJZ-91024 (Men Suit)
              </button>
              <button
                type="button"
                onClick={() => loadSampleOrder('IJZ-88419')}
                className="px-2.5 py-1 rounded-sm bg-[#161616] hover:bg-white/10 text-[#C5A059] border border-white/10 font-mono text-[11px]"
              >
                IJZ-88419 (Women Bridal)
              </button>
              <button
                type="button"
                onClick={() => loadSampleOrder('IJZ-94112')}
                className="px-2.5 py-1 rounded-sm bg-[#161616] hover:bg-white/10 text-[#C5A059] border border-white/10 font-mono text-[11px]"
              >
                IJZ-94112 (Shipped to USA)
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Track Order</span>
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-800/40 rounded-sm flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Result Card */}
      {matchedOrder ? (
        <div className="space-y-6">
          {/* Top Order Summary Card */}
          <div className="bg-[#0E0E0E] border border-white/10 rounded-sm p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-[#C5A059]">
                    {matchedOrder.id}
                  </span>
                  <span className={`text-[11px] px-3 py-1 rounded-sm uppercase tracking-wider font-bold border ${
                    matchedOrder.status === 'completed'
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
                      : matchedOrder.status === 'shipped'
                      ? 'bg-sky-950/40 text-sky-400 border-sky-800/40'
                      : 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30'
                  }`}>
                    Status: {matchedOrder.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Ordered on {new Date(matchedOrder.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={generateWhatsAppMessage(matchedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-sm bg-[#25d366] text-black hover:bg-[#20b858] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3 bg-[#141414] rounded-sm border border-white/10">
                <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px] font-bold">Customer & Destination</span>
                <p className="font-bold text-white">{matchedOrder.customer.name}</p>
                <p className="text-white/50 text-[11px]">{matchedOrder.customer.city}, {matchedOrder.customer.country}</p>
              </div>

              <div className="p-3 bg-[#141414] rounded-sm border border-white/10">
                <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px] font-bold">Garment & Category</span>
                <p className="font-bold text-white">{matchedOrder.garment.name}</p>
                <p className="text-[#C5A059] text-[11px] uppercase tracking-wider font-semibold">{matchedOrder.category} • {matchedOrder.garment.subcategory}</p>
              </div>

              <div className="p-3 bg-[#141414] rounded-sm border border-white/10">
                <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px] font-bold">Selected Cloth</span>
                <p className="font-bold text-white">
                  {matchedOrder.fabricChoice === 'in_house' && matchedOrder.fabric ? `${matchedOrder.fabric.name}` : 'Customer-Provided Cloth'}
                </p>
                <p className="text-white/50 text-[11px]">{matchedOrder.fabric?.color || 'Atelier Dispatch'}</p>
              </div>
            </div>

            {matchedOrder.adminNotes && (
              <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-sm text-xs text-[#C5A059]">
                <strong>Master Tailor Note:</strong> {matchedOrder.adminNotes}
              </div>
            )}
          </div>

          {/* Sequential 8 Stages Tracker */}
          <div className="bg-[#0E0E0E] border border-white/10 rounded-sm p-6 sm:p-8 shadow-xl">
            <h3 className="text-base font-serif text-white font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#C5A059]" />
              <span>Tailoring Stage Progression</span>
            </h3>

            {/* Vertical / Horizontal Step Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-8 my-2">
              {matchedOrder.stages.map((stage, idx) => {
                const isCompleted = stage.completed;
                const isCurrent = stage.current;

                return (
                  <div key={stage.id} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-[#C5A059] border-[#C5A059] text-black'
                          : isCurrent
                          ? 'bg-black border-white text-white ring-4 ring-[#C5A059]/30 animate-pulse'
                          : 'bg-[#141414] border-white/20 text-white/30'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Stage Details */}
                    <div className="bg-[#141414] border border-white/10 p-4 rounded-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold uppercase tracking-wider ${isCurrent ? 'text-[#C5A059]' : isCompleted ? 'text-white' : 'text-white/40'}`}>
                            {stage.name}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-sm bg-[#C5A059] text-black text-[10px] font-bold uppercase tracking-wider">
                              In Progress
                            </span>
                          )}
                        </div>
                        {stage.timestamp && (
                          <span className="text-[11px] text-white/40 font-mono">{stage.timestamp}</span>
                        )}
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : searched && !errorMsg ? (
        <div className="text-center py-12 text-white/40">
          <p>Order not found.</p>
        </div>
      ) : null}
    </div>
  );
};
