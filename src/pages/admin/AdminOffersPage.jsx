import React, { useState } from 'react';
import { Plus, Tag, Copy, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { MOCK_OFFERS } from '../../services/mock/mockData';

const EXTENDED_OFFERS = [
  ...MOCK_OFFERS,
  { id: 'off-4', code: 'DAIRY10', title: 'Daily Dairy Special', description: '10% off all Dairy & Eggs products, minimum order ₹299', discountText: '10% OFF', validTill: '2026-10-20', bgGradient: 'from-blue-500 to-cyan-600', usageCount: 1420, usageLimit: 5000, active: true },
  { id: 'off-5', code: 'WEEKEND25', title: 'Weekend Supermarket Bonus', description: 'Saturday & Sunday exclusive: Flat 25% cashback on orders above ₹999', discountText: '25% CASHBACK', validTill: '2026-10-30', bgGradient: 'from-orange-500 to-amber-600', usageCount: 3890, usageLimit: 10000, active: true },
];

export function AdminOffersPage() {
  const [offers, setOffers] = useState(EXTENDED_OFFERS.map((o, i) => ({
    ...o,
    usageCount: o.usageCount || (i + 1) * 420,
    usageLimit: o.usageLimit || 5000,
    active: o.active !== undefined ? o.active : true
  })));
  const [showModal, setShowModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleOffer = (id) => {
    setOffers(offers.map(o => o.id === id ? { ...o, active: !o.active } : o));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Promotions & Coupon Management</h1>
          <p className="text-xs text-[#696E79]">Create, activate, and track promotional offers & discount campaigns</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Offer
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Campaigns', value: offers.filter(o => o.active).length, color: 'text-[#00897B]', bg: 'bg-[#E0F2F1]' },
          { label: 'Total Offers', value: offers.length, color: 'text-[#282C3F]', bg: 'bg-gray-100' },
          { label: 'Total Redemptions', value: offers.reduce((acc, o) => acc + o.usageCount, 0).toLocaleString(), color: 'text-[#FF3F6C]', bg: 'bg-[#FFF0F4]' },
          { label: 'Paused Campaigns', value: offers.filter(o => !o.active).length, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-2xl p-4`}>
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-bold text-[#696E79] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {offers.map(offer => (
          <div key={offer.id} className={`relative rounded-2xl overflow-hidden shadow-sm border ${offer.active ? 'border-transparent' : 'border-gray-200 opacity-60'}`}>
            <div className={`bg-gradient-to-br ${offer.bgGradient} text-white p-5 space-y-3`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-white/20 backdrop-blur text-[10px] font-black px-2 py-0.5 rounded">CODE: {offer.code}</span>
                  <h3 className="font-extrabold text-base mt-2">{offer.title}</h3>
                  <p className="text-xs text-white/80 mt-1">{offer.description}</p>
                </div>
                {!offer.active && (
                  <span className="bg-gray-800/50 text-[10px] font-black px-2 py-0.5 rounded text-white">PAUSED</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <span className="text-lg font-black text-white">{offer.discountText}</span>
                <div className="flex items-center gap-1 text-[11px] text-white/70">
                  <Clock className="w-3 h-3" />
                  Expires {offer.validTill}
                </div>
              </div>
            </div>

            <div className="bg-white p-3 space-y-2">
              {/* Usage Progress */}
              <div className="flex items-center justify-between text-[11px] font-bold text-[#696E79]">
                <span>Usage: {offer.usageCount.toLocaleString()} / {offer.usageLimit.toLocaleString()}</span>
                <span>{Math.round((offer.usageCount / offer.usageLimit) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FF3F6C]"
                  style={{ width: `${Math.min(100, (offer.usageCount / offer.usageLimit) * 100)}%` }}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyCode(offer.code)}
                  className="flex items-center gap-1 text-xs border border-[#E9E9EB] px-2.5 py-1.5 rounded-lg font-bold hover:bg-gray-50"
                >
                  {copiedCode === offer.code ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00897B]" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Code
                </button>
                <button
                  onClick={() => toggleOffer(offer.id)}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-colors ${
                    offer.active
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                      : 'bg-[#E0F2F1] text-[#00897B] hover:bg-teal-50 border border-teal-200'
                  }`}
                >
                  {offer.active ? 'Pause Campaign' : 'Activate Campaign'}
                </button>
                <button
                  onClick={() => setOffers(offers.filter(o => o.id !== offer.id))}
                  className="p-1.5 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#282C3F]">Create New Promotion</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Coupon Code *</label>
                <input className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 font-mono uppercase focus:outline-none focus:border-[#FF3F6C]" placeholder="e.g. SAVE100" />
              </div>
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Campaign Title *</label>
                <input className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]" placeholder="e.g. Weekend Super Sale" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#282C3F] block mb-1">Discount Value</label>
                  <input className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]" placeholder="₹100 or 10%" />
                </div>
                <div>
                  <label className="font-bold text-[#282C3F] block mb-1">Valid Till</label>
                  <input type="date" className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-[#E9E9EB] py-2.5 rounded-xl font-bold text-[#282C3F] hover:bg-gray-50">Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#FF3F6C] text-white py-2.5 rounded-xl font-bold hover:bg-[#D81B4E]">Create Offer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


