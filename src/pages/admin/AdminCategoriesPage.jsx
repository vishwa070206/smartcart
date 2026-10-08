import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Search, Image as ImageIcon } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../services/mock/mockData';

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditItem(null); setShowModal(true); };
  const openEdit = (cat) => { setEditItem(cat); setShowModal(true); };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Supermarket Categories</h1>
          <p className="text-xs text-[#696E79]">Organize catalog categories, banners, and product assignments</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-8 pr-3 py-1.5 text-xs"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs text-gray-500 font-bold">{filtered.length} Categories</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(cat => (
            <div key={cat.id} className="border border-[#E9E9EB] rounded-xl overflow-hidden hover:border-[#FF3F6C] transition-all group">
              <div className="h-28 bg-[#FFFBFC] overflow-hidden relative">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => openEdit(cat)} className="bg-white shadow p-1.5 rounded-lg hover:bg-blue-50">
                    <Edit className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                    className="bg-white shadow p-1.5 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="font-extrabold text-sm text-[#282C3F]">{cat.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#696E79]">{cat.count} Products</span>
                  <span className="text-[10px] font-bold bg-[#E0F2F1] text-[#00897B] px-2 py-0.5 rounded-full">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#282C3F]">
                {editItem ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Category Name *</label>
                <input
                  defaultValue={editItem?.name || ''}
                  className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF3F6C]"
                  placeholder="e.g. Dairy & Eggs"
                />
              </div>
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">URL Slug *</label>
                <input
                  defaultValue={editItem?.slug || ''}
                  className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF3F6C]"
                  placeholder="e.g. dairy-eggs"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-[#E9E9EB] py-2.5 rounded-xl font-bold text-[#282C3F] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#FF3F6C] text-white py-2.5 rounded-xl font-bold hover:bg-[#D81B4E]"
                >
                  {editItem ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
