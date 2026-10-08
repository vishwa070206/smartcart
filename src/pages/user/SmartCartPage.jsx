import React, { useState } from 'react';
import { ShoppingBag, AlertTriangle, CheckCircle2, ArrowRight, Plus, Minus, Trash2, Sparkles, RefreshCcw, Wifi, Scale } from 'lucide-react';
import { useSmartCartStore } from '../../store/smartCartStore';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

export function SmartCartPage() {
  const { session, scanProduct, acceptSuggestion, dismissSuggestion, activeSuggestion, updateItemQty, isScanning } = useSmartCartStore();
  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'scan'

  const budget = session.budgetLimit || 1500;
  const currentTotal = session.currentTotal;
  const remaining = budget - currentTotal;
  const isOverBudget = remaining < 0;

  return (
    <div className="space-y-6">
      
      {/* Top Touch Metric Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-[#1F2332] border border-gray-700 p-5 rounded-2xl flex flex-col justify-between shadow-lg">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">CURRENT TOTAL</span>
          <div className="text-3xl font-black text-[#FF3F6C] mt-1">{formatCurrency(currentTotal)}</div>
          <span className="text-[11px] text-gray-400 mt-2">{session.items.length} Items Scanned</span>
        </div>

        <div className="bg-[#1F2332] border border-gray-700 p-5 rounded-2xl flex flex-col justify-between shadow-lg">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">SMART BUDGET</span>
          <div className="text-3xl font-black text-white mt-1">{formatCurrency(budget)}</div>
          <span className="text-[11px] text-gray-400 mt-2">Target Shopping Cap</span>
        </div>

        <div className={`p-5 rounded-2xl border flex flex-col justify-between shadow-lg ${isOverBudget ? 'bg-[#3B191C] border-[#D32F2F]' : 'bg-[#15342C] border-[#00897B]'}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
            {isOverBudget ? 'BUDGET EXCEEDED BY' : 'BUDGET REMAINING'}
          </span>
          <div className={`text-3xl font-black mt-1 ${isOverBudget ? 'text-[#D32F2F]' : 'text-[#00897B]'}`}>
            {formatCurrency(Math.abs(remaining))}
          </div>
          <span className="text-[11px] text-gray-300 mt-2">
            {isOverBudget ? '⚠ Cheaper alternatives recommended' : '✓ Safe spending range'}
          </span>
        </div>

        <div className="bg-[#1F2332] border border-gray-700 p-5 rounded-2xl flex flex-col justify-end shadow-lg">
          <button
            onClick={() => alert('Proceeding to Smart Cart self-checkout kiosk station...')}
            className="w-full bg-[#FF3F6C] hover:bg-[#D81B4E] text-white py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform"
          >
            <span>CHECKOUT NOW</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* 28. SMART CART ALTERNATIVE SUGGESTION POPUP BANNER */}
      {activeSuggestion && (
        <div className="bg-gradient-to-r from-[#6D214F] to-[#FF3F6C] text-white p-6 rounded-2xl shadow-2xl border-2 border-white/20 space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#FFF0F4]" />
              <span>Smart Suggestion · Better Value Found</span>
            </div>
            <span className="text-xs font-bold text-[#FFF0F4]">Save {formatCurrency(activeSuggestion.savingsAmount)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-black/20 p-4 rounded-xl border border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-300">You Scanned:</span>
              <div className="text-base font-black">{activeSuggestion.scannedProduct.name}</div>
              <div className="text-xs text-gray-300">{formatCurrency(activeSuggestion.scannedProduct.price)} · {activeSuggestion.scannedProduct.rating} ★</div>
            </div>

            <div className="border-l border-white/20 pl-4">
              <span className="text-[10px] uppercase font-bold text-[#FFF0F4]">Recommended Twin Alternative:</span>
              <div className="text-base font-black text-white">{activeSuggestion.betterAlternative.name}</div>
              <div className="text-xs font-bold text-[#FFF0F4]">
                {formatCurrency(activeSuggestion.betterAlternative.price)} (Similarity: {activeSuggestion.betterAlternative.similarity}%)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={acceptSuggestion}
              className="flex-1 bg-white text-[#FF3F6C] hover:bg-[#FFF0F4] font-black py-3 rounded-xl text-sm shadow-md"
            >
              SWITCH PRODUCT &amp; SAVE {formatCurrency(activeSuggestion.savingsAmount)}
            </button>
            <button
              onClick={dismissSuggestion}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl text-xs border border-white/20"
            >
              Keep Original
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Item List & Barcode Scanner Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scanned Items List */}
        <div className="lg:col-span-2 bg-[#1F2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="font-black text-lg text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF3F6C]" />
              <span>Cart Items ({session.items.length})</span>
            </h3>
            <span className="text-xs text-gray-400 font-bold">Auto-Weight Verified</span>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {session.items.map((item) => (
              <div
                key={item.id}
                className="bg-[#282C3F] border border-gray-700/80 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-white">{item.name}</h4>
                  <div className="text-xs text-gray-400">Unit Price: {formatCurrency(item.price)} · Weight: {item.weight}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-600 rounded-xl overflow-hidden bg-gray-800">
                    <button
                      onClick={() => updateItemQty(item.id, -1)}
                      className="p-2 text-white hover:bg-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-black text-sm text-white">{item.qty}</span>
                    <button
                      onClick={() => updateItemQty(item.id, 1)}
                      className="p-2 text-white hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <div className="font-black text-base text-[#FF3F6C]">{formatCurrency(item.price * item.qty)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Touch Scanner Simulation Bar */}
        <div className="bg-[#1F2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="border-b border-gray-800 pb-3">
            <h3 className="font-black text-base text-white">In-Store Barcode Scanner Simulator</h3>
            <p className="text-xs text-gray-400">Tap any item below to simulate physical cart scanner event</p>
          </div>

          <div className="space-y-2">
            {MOCK_PRODUCTS.slice(0, 5).map((p) => (
              <button
                key={p.id}
                onClick={() => scanProduct(p)}
                disabled={isScanning}
                className="w-full text-left bg-[#282C3F] hover:bg-[#FF3F6C] text-white p-3 rounded-xl border border-gray-700 flex items-center justify-between text-xs font-bold transition-colors group"
              >
                <div className="truncate max-w-[180px]">
                  <div className="truncate">{p.name}</div>
                  <div className="text-[10px] text-gray-400 group-hover:text-white/80">{p.brand} · {formatCurrency(p.price)}</div>
                </div>
                <span className="bg-white/10 group-hover:bg-white text-white group-hover:text-[#FF3F6C] px-2.5 py-1 rounded-lg text-[10px] font-black">
                  + SCAN
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
