import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Award } from 'lucide-react';
import { MOCK_BRANDS } from '../../services/mock/mockData';

export function AdminBrandsPage() {
  const [brands, setBrands] = useState(MOCK_BRANDS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const filtered = brands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Brand Management</h1>
          <p className="text-xs text-[#696E79]">Manage trusted brands available in SmartMart catalogue</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowModal(true); }}
          className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
      </div>

      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search brands..."
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-8 pr-3 py-1.5 text-xs"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs text-gray-500 font-bold">{filtered.length} Brands</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">BRAND</th>
                <th className="p-3">LOGO</th>
                <th className="p-3">PRODUCTS</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB] font-medium text-[#282C3F]">
              {filtered.map(brand => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="p-3 font-extrabold flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FF3F6C]" />
                    {brand.name}
                  </td>
                  <td className="p-3">
                    <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain rounded-lg border bg-white p-1" />
                  </td>
                  <td className="p-3 font-bold text-[#00897B]">{brand.productCount} Products</td>
                  <td className="p-3">
                    <span className="bg-[#E0F2F1] text-[#00897B] text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditItem(brand); setShowModal(true); }} className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setBrands(brands.filter(b => b.id !== brand.id))} className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#282C3F]">
                {editItem ? `Edit Brand — ${editItem.name}` : 'Add New Brand'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Brand Name *</label>
                <input defaultValue={editItem?.name || ''} className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]" placeholder="e.g. Amul" />
              </div>
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Logo URL</label>
                <input defaultValue={editItem?.logo || ''} className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]" placeholder="https://..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-[#E9E9EB] py-2.5 rounded-xl font-bold text-[#282C3F] hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-[#FF3F6C] text-white py-2.5 rounded-xl font-bold hover:bg-[#D81B4E]">
                  {editItem ? 'Save Changes' : 'Create Brand'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

