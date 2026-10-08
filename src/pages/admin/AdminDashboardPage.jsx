import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, ShoppingBag, Users, ShoppingCart, TrendingUp, Sparkles, Scale, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { MOCK_ADMIN_ANALYTICS } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

export function AdminDashboardPage() {
  const { summary, salesOverTime, categoryShare, smartCartMonitoring } = MOCK_ADMIN_ANALYTICS;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E9E9EB] p-6 rounded-2xl shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Executive Supermarket Control Dashboard</h1>
          <p className="text-xs text-[#696E79]">Real-time store metrics, Smart Cart active sessions &amp; recommendation performance</p>
        </div>

        <Link
          to="/admin/smart-carts"
          className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Monitor 42 Active Smart Carts</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>TOTAL STORE REVENUE</span>
            <DollarSign className="w-4 h-4 text-[#00897B]" />
          </div>
          <div className="text-2xl font-black text-[#282C3F]">{formatCurrency(summary.totalRevenue)}</div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#00897B]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{summary.revenueGrowth} vs last week</span>
          </div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>TOTAL ORDERS</span>
            <ShoppingBag className="w-4 h-4 text-[#FF3F6C]" />
          </div>
          <div className="text-2xl font-black text-[#282C3F]">{summary.totalOrders.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#00897B]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{summary.ordersGrowth} volume increase</span>
          </div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>ACTIVE SMART CARTS</span>
            <ShoppingCart className="w-4 h-4 text-[#6D214F]" />
          </div>
          <div className="text-2xl font-black text-[#6D214F]">{summary.activeSmartCarts} Carts</div>
          <div className="text-[11px] text-[#696E79] font-semibold">Across HSR &amp; Indiranagar branches</div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>RECOMMENDATION CTR</span>
            <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
          </div>
          <div className="text-2xl font-black text-[#FF3F6C]">{summary.recommendationConversion}</div>
          <div className="text-[11px] text-[#696E79] font-semibold">High conversion from explainable cards</div>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E9E9EB] pb-3">
            <h3 className="font-extrabold text-base text-[#282C3F]">Weekly Sales Trend &amp; Revenue</h3>
            <span className="text-xs font-bold text-[#00897B] bg-[#E0F2F1] px-2.5 py-1 rounded-full">Weekly Analytics</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesOverTime}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3F6C" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF3F6C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#696E79" fontSize={12} />
                <YAxis stroke="#696E79" fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Area type="monotone" dataKey="revenue" stroke="#FF3F6C" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="font-extrabold text-base text-[#282C3F] border-b border-[#E9E9EB] pb-3">
            Revenue Share by Category
          </h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-xs">
            {categoryShare.map((c, i) => (
              <div key={i} className="flex items-center justify-between font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </div>
                <span>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Smart Cart Live Session Table */}
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E9E9EB] pb-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#FF3F6C]" />
            <h3 className="font-extrabold text-base text-[#282C3F]">Active Smart Cart In-Store Sessions</h3>
          </div>
          <Link to="/admin/smart-carts" className="text-xs font-bold text-[#FF3F6C] hover:underline flex items-center gap-1">
            <span>View All Sessions</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">CART ID</th>
                <th className="p-3">BRANCH STORE</th>
                <th className="p-3">CUSTOMER</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">BATTERY</th>
                <th className="p-3">CURRENT TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB] font-medium text-[#282C3F]">
              {smartCartMonitoring.map((cart) => (
                <tr key={cart.cartId} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-[#FF3F6C]">{cart.cartId}</td>
                  <td className="p-3">{cart.store}</td>
                  <td className="p-3 font-semibold">{cart.customer}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      cart.status === 'Active' ? 'bg-[#E0F2F1] text-[#00897B]' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {cart.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{cart.battery}%</td>
                  <td className="p-3 font-extrabold text-[#282C3F]">{formatCurrency(cart.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
