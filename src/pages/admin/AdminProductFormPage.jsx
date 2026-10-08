import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export function AdminProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState(id ? 'Amul Taaza Toned Milk (Pouch)' : '');
  const [brand, setBrand] = useState(id ? 'Amul' : 'Amul');
  const [category, setCategory] = useState(id ? 'Dairy & Eggs' : 'Dairy & Eggs');
  const [price, setPrice] = useState(id ? '54' : '');
  const [mrp, setMrp] = useState(id ? '58' : '');
  const [variant, setVariant] = useState(id ? '1 L' : '');
  const [description, setDescription] = useState(id ? 'Fresh pasteurised toned milk daily essential.' : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Product ${id ? 'updated' : 'created'} successfully!`);
    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 text-xs font-bold text-[#FF3F6C]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product List</span>
        </button>
        <h1 className="text-xl font-black text-[#282C3F]">{id ? 'Edit Product' : 'Add New Supermarket Product'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">Product Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border p-2.5 rounded-lg bg-[#FFFBFC]" />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">Brand</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required className="w-full border p-2.5 rounded-lg bg-[#FFFBFC]" />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">Selling Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border p-2.5 rounded-lg bg-[#FFFBFC]" />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">MRP (₹)</label>
            <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} required className="w-full border p-2.5 rounded-lg bg-[#FFFBFC]" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-[#282C3F]">Description</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2.5 rounded-lg bg-[#FFFBFC]" />
        </div>

        <button type="submit" className="bg-[#FF3F6C] text-white font-extrabold px-6 py-3 rounded-xl shadow-md flex items-center gap-2">
          <Save className="w-4 h-4" />
          <span>SAVE PRODUCT</span>
        </button>
      </form>
    </div>
  );
}
