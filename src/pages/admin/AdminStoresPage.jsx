import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Plus,
  Phone,
  Clock,
  ShoppingCart,
  Users,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';

const INITIAL_STORES = [
  {
    id: 'st-1',
    name: 'SmartMart HSR Layout Superstore',
    address: '27th Main Rd, Sector 1, HSR Layout, Bengaluru - 560102',
    phone: '+91 80 4123 4567',
    manager: 'Rajesh Nair',
    hours: '07:00 AM - 11:00 PM',
    status: 'Open',
    activeCarts: 18,
    totalCarts: 20,
    dailyFootfall: 2450,
    aislesCount: 14
  },
  {
    id: 'st-2',
    name: 'SmartMart Indiranagar Flagship',
    address: '100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru - 560038',
    phone: '+91 80 4234 5678',
    manager: 'Sneha Kulkarni',
    hours: '07:00 AM - 11:00 PM',
    status: 'Open',
    activeCarts: 14,
    totalCarts: 15,
    dailyFootfall: 1820,
    aislesCount: 12
  },
  {
    id: 'st-3',
    name: 'SmartMart Koramangala Hub',
    address: '80 Feet Rd, 4th Block, Koramangala, Bengaluru - 560034',
    phone: '+91 80 4345 6789',
    manager: 'Arun Bhat',
    hours: '07:00 AM - 11:00 PM',
    status: 'Open',
    activeCarts: 10,
    totalCarts: 12,
    dailyFootfall: 1350,
    aislesCount: 10
  },
  {
    id: 'st-4',
    name: 'SmartMart Bellandur Express Hub',
    address: 'Outer Ring Road, Near EcoSpace, Bellandur, Bengaluru - 560103',
    phone: '+91 80 4456 7890',
    manager: 'Meera Iyer',
    hours: '07:30 AM - 10:30 PM',
    status: 'Maintenance',
    activeCarts: 0,
    totalCarts: 10,
    dailyFootfall: 0,
    aislesCount: 8
  }
];

export function AdminStoresPage() {
  const [stores, setStores] = useState(INITIAL_STORES);
  const [showModal, setShowModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const totalCartsDeployed = stores.reduce((acc, s) => acc + s.activeCarts, 0);
  const totalDailyFootfall = stores.reduce((acc, s) => acc + s.dailyFootfall, 0);

  const handleOpenAdd = () => {
    setEditingStore(null);
    setShowModal(true);
  };

  const handleOpenEdit = (store) => {
    setEditingStore(store);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this branch?')) {
      setStores(stores.filter((s) => s.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setStores(
      stores.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Open' ? 'Closed' : 'Open' }
          : s
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" />
            <span>Retail Operations</span>
          </div>
          <h1 className="text-2xl font-black text-[#282C3F]">Physical Supermarket Branches</h1>
          <p className="text-xs text-[#696E79]">Manage physical supermarket locations and Smart Cart hardware allocations</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Store Branch</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Branches', value: stores.filter((s) => s.status === 'Open').length, color: 'text-[#00897B]', bg: 'bg-[#E0F2F1]' },
          { label: 'Total Branches', value: stores.length, color: 'text-[#282C3F]', bg: 'bg-white' },
          { label: 'Active Smart Carts', value: totalCartsDeployed, color: 'text-[#FF3F6C]', bg: 'bg-[#FFF0F4]' },
          { label: 'Daily Store Footfall', value: `${(totalDailyFootfall / 1000).toFixed(1)}k`, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((kpi, idx) => (
          <div key={idx} className={`${kpi.bg} border border-[#E9E9EB] rounded-2xl p-4 shadow-2xs`}>
            <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs font-bold text-[#696E79] mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 hover:border-[#FF3F6C]/40 transition-all shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-[#282C3F]">{s.name}</h3>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      s.status === 'Open'
                        ? 'bg-[#E0F2F1] text-[#00897B]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#696E79]">
                  <MapPin className="w-3.5 h-3.5 text-[#FF3F6C] shrink-0" />
                  <span>{s.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(s)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Branch"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Branch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E9E9EB] text-xs">
              <div className="bg-[#FFFBFC] p-3 rounded-xl border border-[#E9E9EB]">
                <div className="text-gray-500 font-semibold flex items-center gap-1">
                  <ShoppingCart className="w-3.5 h-3.5 text-[#FF3F6C]" />
                  <span>Smart Carts</span>
                </div>
                <div className="font-extrabold text-[#282C3F] text-sm mt-1">
                  {s.activeCarts} / {s.totalCarts} Active
                </div>
              </div>

              <div className="bg-[#FFFBFC] p-3 rounded-xl border border-[#E9E9EB]">
                <div className="text-gray-500 font-semibold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#00897B]" />
                  <span>Daily Footfall</span>
                </div>
                <div className="font-extrabold text-[#282C3F] text-sm mt-1">
                  {s.dailyFootfall.toLocaleString()} shoppers
                </div>
              </div>

              <div className="bg-[#FFFBFC] p-3 rounded-xl border border-[#E9E9EB] col-span-2 sm:col-span-1">
                <div className="text-gray-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Timings</span>
                </div>
                <div className="font-bold text-[#282C3F] text-xs mt-1 truncate">
                  {s.hours}
                </div>
              </div>
            </div>

            {/* Manager and Contact Footer */}
            <div className="flex items-center justify-between text-xs pt-2">
              <div className="text-[#696E79]">
                Manager: <strong className="text-[#282C3F]">{s.manager}</strong> ({s.phone})
              </div>

              <button
                onClick={() => toggleStatus(s.id)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                  s.status === 'Open'
                    ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                    : 'bg-[#E0F2F1] text-[#00897B] hover:bg-teal-100'
                }`}
              >
                {s.status === 'Open' ? 'Set Maintenance' : 'Re-open Branch'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Store Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#282C3F]">
                {editingStore ? 'Edit Branch Location' : 'Add Supermarket Branch'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Branch Name *</label>
                <input
                  defaultValue={editingStore?.name || ''}
                  placeholder="e.g. SmartMart Whitefield Mega Store"
                  className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]"
                />
              </div>

              <div>
                <label className="font-bold text-[#282C3F] block mb-1">Address *</label>
                <input
                  defaultValue={editingStore?.address || ''}
                  placeholder="e.g. ITPL Main Rd, Whitefield, Bengaluru"
                  className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#282C3F] block mb-1">Store Manager</label>
                  <input
                    defaultValue={editingStore?.manager || ''}
                    placeholder="e.g. Rohit Kumar"
                    className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#282C3F] block mb-1">Contact Phone</label>
                  <input
                    defaultValue={editingStore?.phone || ''}
                    placeholder="+91 80 4000 0000"
                    className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#282C3F] block mb-1">Smart Carts Allocated</label>
                  <input
                    type="number"
                    defaultValue={editingStore?.totalCarts || 15}
                    className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#282C3F] block mb-1">Operating Hours</label>
                  <input
                    defaultValue={editingStore?.hours || '07:00 AM - 11:00 PM'}
                    className="w-full border border-[#E9E9EB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF3F6C]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
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
                  {editingStore ? 'Save Changes' : 'Create Branch'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
