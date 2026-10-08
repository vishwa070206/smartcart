import React, { useState } from 'react';
import {
  Users,
  Search,
  Award,
  ShoppingBag,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  Sparkles,
  TrendingUp,
  Download
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const MOCK_CUSTOMERS = [
  {
    id: 'c-101',
    name: 'Vishwanathan G',
    email: 'vishwa@smartmart.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru - 560103',
    ordersCount: 24,
    totalSpent: 38450,
    tier: 'VIP Gold',
    loyaltyPoints: 1250,
    preferredStore: 'HSR Layout Superstore',
    smartCartSessions: 18,
    lastActive: 'Today, 11:20 AM',
    registeredDate: '2024-03-15'
  },
  {
    id: 'c-102',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98451 12345',
    address: '14/B, 12th Cross, Indiranagar, Bengaluru - 560038',
    ordersCount: 16,
    totalSpent: 21900,
    tier: 'Silver',
    loyaltyPoints: 720,
    preferredStore: 'Indiranagar Branch',
    smartCartSessions: 9,
    lastActive: 'Yesterday',
    registeredDate: '2024-06-20'
  },
  {
    id: 'c-103',
    name: 'Rahul Verma',
    email: 'rahul.verma@yahoo.com',
    phone: '+91 99001 88776',
    address: '77, 4th Block, Koramangala, Bengaluru - 560034',
    ordersCount: 9,
    totalSpent: 9800,
    tier: 'Bronze',
    loyaltyPoints: 310,
    preferredStore: 'Koramangala Hub',
    smartCartSessions: 4,
    lastActive: '3 days ago',
    registeredDate: '2025-01-10'
  },
  {
    id: 'c-104',
    name: 'Ananya Roy',
    email: 'ananya.roy@outlook.com',
    phone: '+91 97400 33221',
    address: 'Penthouse 1102, Salarpuria Greenage, Hosur Rd, Bengaluru',
    ordersCount: 31,
    totalSpent: 52100,
    tier: 'VIP Gold',
    loyaltyPoints: 2400,
    preferredStore: 'HSR Layout Superstore',
    smartCartSessions: 26,
    lastActive: 'Today, 09:45 AM',
    registeredDate: '2023-11-05'
  },
  {
    id: 'c-105',
    name: 'Deepak Menon',
    email: 'deepak.menon@gmail.com',
    phone: '+91 96112 55443',
    address: '22, Rose Garden, Sector 7, HSR Layout, Bengaluru',
    ordersCount: 12,
    totalSpent: 16300,
    tier: 'Silver',
    loyaltyPoints: 540,
    preferredStore: 'HSR Layout Superstore',
    smartCartSessions: 7,
    lastActive: '5 days ago',
    registeredDate: '2024-08-14'
  }
];

export function AdminCustomersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const tiers = ['All', 'VIP Gold', 'Silver', 'Bronze'];

  const filtered = customers.filter((c) => {
    const matchesTier = tierFilter === 'All' || c.tier === tierFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    return matchesTier && matchesSearch;
  });

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgSpent = (totalSpentAll / customers.length).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Shopper Intelligence</span>
          </div>
          <h1 className="text-2xl font-black text-[#282C3F]">Customer CRM Directory</h1>
          <p className="text-xs text-[#696E79]">Supermarket customer accounts, loyalty tiers, and purchase lifetime values</p>
        </div>

        <button
          onClick={() => alert('Exporting Customer Directory CSV...')}
          className="flex items-center gap-2 border border-[#E9E9EB] hover:bg-gray-50 text-[#282C3F] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Customer CRM</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Registered', value: customers.length, color: 'text-[#282C3F]', bg: 'bg-white' },
          { label: 'VIP Gold Members', value: customers.filter((c) => c.tier === 'VIP Gold').length, color: 'text-[#FF3F6C]', bg: 'bg-[#FFF0F4]' },
          { label: 'Average LTV', value: `₹${Number(avgSpent).toLocaleString()}`, color: 'text-[#00897B]', bg: 'bg-[#E0F2F1]' },
          { label: 'Smart Cart Shoppers', value: customers.filter((c) => c.smartCartSessions > 0).length, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((kpi, idx) => (
          <div key={idx} className={`${kpi.bg} border border-[#E9E9EB] rounded-2xl p-4 shadow-2xs`}>
            <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs font-bold text-[#696E79] mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Filter and Table Container */}
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setTierFilter(tier)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                  tierFilter === tier
                    ? 'bg-[#FF3F6C] text-white shadow-xs'
                    : 'bg-[#FFFBFC] border border-[#E9E9EB] text-[#696E79] hover:text-[#282C3F]'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#282C3F] focus:outline-none focus:border-[#FF3F6C]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">CUSTOMER</th>
                <th className="p-3">CONTACT</th>
                <th className="p-3">TIER</th>
                <th className="p-3">ORDERS</th>
                <th className="p-3">LIFETIME SPEND</th>
                <th className="p-3">SMART CART TRIPS</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB] font-medium text-[#282C3F]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <div className="font-extrabold text-[#282C3F]">{c.name}</div>
                    <div className="text-[11px] text-gray-500">ID: {c.id}</div>
                  </td>
                  <td className="p-3">
                    <div>{c.email}</div>
                    <div className="text-[11px] text-[#696E79]">{c.phone}</div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${
                        c.tier === 'VIP Gold'
                          ? 'bg-amber-100 text-amber-800'
                          : c.tier === 'Silver'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-orange-50 text-orange-700'
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      {c.tier}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{c.ordersCount} Orders</td>
                  <td className="p-3 font-black text-[#FF3F6C]">{formatCurrency(c.totalSpent)}</td>
                  <td className="p-3 font-bold text-[#00897B]">{c.smartCartSessions} sessions</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="bg-white border border-[#E9E9EB] hover:border-[#FF3F6C] text-[#282C3F] font-bold px-3 py-1 rounded-lg text-xs"
                    >
                      View CRM Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-black text-[#FF3F6C]">CUSTOMER PROFILE 360°</span>
                <h3 className="font-extrabold text-lg text-[#282C3F]">{selectedCustomer.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#FFFBFC] p-4 rounded-xl border border-[#E9E9EB]">
                <div>
                  <span className="text-gray-500 font-semibold block">Loyalty Tier</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {selectedCustomer.tier} ({selectedCustomer.loyaltyPoints} Pts)
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 font-semibold block">Member Since</span>
                  <span className="font-bold text-[#282C3F]">{selectedCustomer.registeredDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-semibold block">Email</span>
                  <span className="font-bold text-[#282C3F]">{selectedCustomer.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-semibold block">Phone</span>
                  <span className="font-bold text-[#282C3F]">{selectedCustomer.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 font-semibold block">Primary Store</span>
                  <span className="font-bold text-[#282C3F]">{selectedCustomer.preferredStore}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 font-semibold block">Delivery Address</span>
                  <span className="font-bold text-[#282C3F]">{selectedCustomer.address}</span>
                </div>
              </div>

              {/* Shopping Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border border-[#E9E9EB] p-3 rounded-xl bg-gray-50">
                  <div className="text-lg font-black text-[#FF3F6C]">
                    {formatCurrency(selectedCustomer.totalSpent)}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 mt-0.5">LIFETIME VALUE</div>
                </div>
                <div className="border border-[#E9E9EB] p-3 rounded-xl bg-gray-50">
                  <div className="text-lg font-black text-[#282C3F]">
                    {selectedCustomer.ordersCount}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 mt-0.5">TOTAL ORDERS</div>
                </div>
                <div className="border border-[#E9E9EB] p-3 rounded-xl bg-gray-50">
                  <div className="text-lg font-black text-[#00897B]">
                    {selectedCustomer.smartCartSessions}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 mt-0.5">SMART CART TRIPS</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="bg-[#282C3F] text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-black"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
