import React, { useState } from 'react';
import { User, MapPin, ShoppingBag, Bell, LogOut, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function ProfilePage() {
  const { user, logout, updateProfile } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-[#E9E9EB] pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Customer Profile</h1>
          <p className="text-xs text-[#696E79]">Manage your contact details, addresses, and supermarket preferences</p>
        </div>
        <button
          onClick={logout}
          className="text-xs font-bold text-[#D32F2F] border border-[#D32F2F]/30 px-3 py-1.5 rounded-lg hover:bg-red-50 flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Profile Details Form */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 md:col-span-2 shadow-xs">
          <h3 className="font-extrabold text-base text-[#282C3F] border-b border-[#E9E9EB] pb-2">
            Personal Information
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#282C3F]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-2.5 text-xs text-[#282C3F]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#282C3F]">Email Address</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full bg-gray-100 border border-[#E9E9EB] rounded-lg p-2.5 text-xs text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#282C3F]">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-2.5 text-xs text-[#282C3F]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#FF3F6C] text-white font-bold py-2.5 px-5 rounded-xl hover:bg-[#D81B4E] transition-colors flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saved ? 'SAVED SUCCESSFULLY' : 'SAVE CHANGES'}</span>
            </button>
          </form>
        </div>

        {/* Addresses Box */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E9E9EB] pb-2">
            <MapPin className="w-4 h-4 text-[#FF3F6C]" />
            <h3 className="font-extrabold text-sm text-[#282C3F]">Saved Addresses</h3>
          </div>

          {user?.addresses.map((addr) => (
            <div key={addr.id} className="border border-[#FF3F6C]/30 bg-[#FFF0F4]/30 rounded-xl p-3 text-xs space-y-1">
              <div className="font-bold text-[#FF3F6C]">{addr.title} ({addr.name})</div>
              <p className="text-[#696E79]">{addr.line1}, {addr.line2}, {addr.city} - {addr.pincode}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
