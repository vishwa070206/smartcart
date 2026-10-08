import React, { useState } from 'react';
import { Warehouse, AlertTriangle, Plus, Search, RefreshCw, TrendingDown } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

const STORES = ['HSR Layout', 'Indiranagar', 'Koramangala', 'Bellandur'];

export function AdminInventoryPage() {
  const [search, setSearch] = useState('');
  const [selectedStore, setSelectedStore] = useState('HSR Layout');
  const [restockItem, setRestockItem] = useState(null);

  const filtered = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = filtered.filter(p => p.stockCount < 70);
  const wellStocked = filtered.filter(p => p.stockCount >= 70);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Branch Inventory & Stock Control</h1>
          <p className="text-xs text-[#696E79]">Real-time stock alerts and replenishment tracking across all store branches</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedStore}
            onChange={e => setSelectedStore(e.target.value)}
            className="border border-[#E9E9EB] rounded-lg px-3 py-2 text-xs bg-[#FFFBFC] font-semibold"
          >
            {STORES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
          <div>
            <div className="text-xl font-black text-amber-700">{lowStock.length}</div>
            <div className="text-xs font-bold text-amber-600">Low Stock Alerts</div>
          </div>
        </div>
        <div className="bg-[#E0F2F1] border border-teal-200 rounded-2xl p-4 flex items-center gap-3">
          <Warehouse className="w-8 h-8 text-[#00897B] shrink-0" />
          <div>
            <div className="text-xl font-black text-[#00897B]">{wellStocked.length}</div>
            <div className="text-xs font-bold text-[#00897B]">Well Stocked</div>
          </div>
        </div>
        <div className="bg-[#FFF0F4] border border-[#FF3F6C]/30 rounded-2xl p-4 flex items-center gap-3">
          <TrendingDown className="w-8 h-8 text-[#FF3F6C] shrink-0" />
          <div>
            <div className="text-xl font-black text-[#FF3F6C]">{MOCK_PRODUCTS.reduce((acc, p) => acc + p.stockCount, 0).toLocaleString()}</div>
            <div className="text-xs font-bold text-[#FF3F6C]">Total Units in Branch</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-8 pr-3 py-1.5 text-xs"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs text-gray-500 font-bold">{filtered.length} SKUs — {selectedStore}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">PRODUCT</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">PRICE</th>
                <th className="p-3">AVAILABLE STOCK</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 font-semibold text-[#282C3F]">
                  <td className="p-3 flex items-center gap-2">
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-contain rounded border bg-[#FFFBFC] p-0.5" />
                    <span className="truncate max-w-xs font-bold">{p.name}</span>
                  </td>
                  <td className="p-3 text-[#696E79]">{p.category}</td>
                  <td className="p-3 font-extrabold">{formatCurrency(p.price)}</td>
                  <td className="p-3 font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.stockCount < 70 ? 'bg-amber-400' : 'bg-[#00897B]'}`}
                          style={{ width: `${Math.min(100, (p.stockCount / 350) * 100)}%` }}
                        />
                      </div>
                      <span>{p.stockCount} units</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      p.stockCount < 70 ? 'bg-amber-100 text-amber-800' : 'bg-[#E0F2F1] text-[#00897B]'
                    }`}>
                      {p.stockCount < 70 ? '⚠ LOW STOCK' : '✓ STOCKED'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setRestockItem(p)}
                      className="text-xs bg-[#282C3F] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#FF3F6C] transition-colors flex items-center gap-1 ml-auto"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {restockItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#282C3F]">Create Restock Request</h3>
              <button onClick={() => setRestockItem(null)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-[#FFFBFC] border rounded-xl p-3">
                <div className="font-bold text-[#282C3F]">{restockItem.name}</div>
                <div className="text-[#696E79]">Current Stock: <strong className="text-amber-600">{restockItem.stockCount} units</strong></div>
              </div>
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Units to Restock *</label>
                <input type="number" defaultValue="200" min="1" className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]" />
              </div>
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Target Branch</label>
                <select className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]">
                  {STORES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setRestockItem(null)} className="flex-1 border border-[#E9E9EB] py-2.5 rounded-xl font-bold text-[#282C3F] hover:bg-gray-50">Cancel</button>
                <button onClick={() => setRestockItem(null)} className="flex-1 bg-[#FF3F6C] text-white py-2.5 rounded-xl font-bold hover:bg-[#D81B4E]">Submit Restock Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


