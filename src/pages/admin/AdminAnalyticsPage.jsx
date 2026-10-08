import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  Download,
  Filter,
  BarChart3,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { MOCK_ADMIN_ANALYTICS } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

const HOURLY_TRAFFIC = [
  { time: '08:00', shoppers: 45, sales: 32000 },
  { time: '10:00', shoppers: 120, sales: 86000 },
  { time: '12:00', shoppers: 180, sales: 145000 },
  { time: '14:00', shoppers: 110, sales: 92000 },
  { time: '16:00', shoppers: 195, sales: 168000 },
  { time: '18:00', shoppers: 260, sales: 245000 },
  { time: '20:00', shoppers: 220, sales: 190000 },
  { time: '22:00', shoppers: 75, sales: 54000 }
];

const BASKET_SIZE_DISTRIBUTION = [
  { range: '₹0 - ₹500', count: 420 },
  { range: '₹500 - ₹1,500', count: 890 },
  { range: '₹1,500 - ₹3,000', count: 640 },
  { range: '₹3,000 - ₹5,000', count: 310 },
  { range: '₹5,000+', count: 120 }
];

export function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('revenue');

  const { summary, salesOverTime, categoryShare, smartCartMonitoring } = MOCK_ADMIN_ANALYTICS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Store Intelligence & Reporting</span>
          </div>
          <h1 className="text-2xl font-black text-[#282C3F]">Deep Analytics & Supermarket Trends</h1>
          <p className="text-xs text-[#696E79]">Real-time sales velocity, Smart Cart conversion correlations, and basket insights</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex bg-[#FFFBFC] border border-[#E9E9EB] rounded-xl p-1 text-xs font-bold">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-colors uppercase ${
                  timeRange === range
                    ? 'bg-[#FF3F6C] text-white'
                    : 'text-[#696E79] hover:text-[#282C3F]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting Analytics CSV Report...')}
            className="flex items-center gap-2 border border-[#E9E9EB] hover:bg-gray-50 text-[#282C3F] font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>TOTAL REVENUE</span>
            <DollarSign className="w-4 h-4 text-[#00897B]" />
          </div>
          <div className="text-2xl font-black text-[#282C3F]">{formatCurrency(summary.totalRevenue)}</div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#00897B]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs previous period</span>
          </div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>AVG BASKET VALUE</span>
            <ShoppingCart className="w-4 h-4 text-[#FF3F6C]" />
          </div>
          <div className="text-2xl font-black text-[#282C3F]">₹1,840</div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#00897B]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.4% with Smart Cart guidance</span>
          </div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>AI RECOMMENDATION CTR</span>
            <Sparkles className="w-4 h-4 text-[#FF9F1A]" />
          </div>
          <div className="text-2xl font-black text-[#282C3F]">18.4%</div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#00897B]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.2% explainability boost</span>
          </div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#696E79]">
            <span>SMART CART UPTIME</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-[#282C3F]">99.4%</div>
          <div className="text-xs font-semibold text-gray-500">
            42 active hardware tablets
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-[#282C3F]">Revenue Trend & Forecast</h3>
              <p className="text-xs text-[#696E79]">Weekly gross merchandise volume across all branches</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('revenue')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                  activeTab === 'revenue' ? 'bg-[#FF3F6C] text-white' : 'bg-gray-100 text-[#696E79]'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setActiveTab('traffic')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                  activeTab === 'traffic' ? 'bg-[#FF3F6C] text-white' : 'bg-gray-100 text-[#696E79]'
                }`}
              >
                Hourly Footfall
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'revenue' ? (
                <AreaChart data={salesOverTime}>
                  <defs>
                    <linearGradient id="analyticsSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF3F6C" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FF3F6C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#696E79" fontSize={12} />
                  <YAxis
                    stroke="#696E79"
                    fontSize={12}
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#FF3F6C"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#analyticsSales)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={HOURLY_TRAFFIC}>
                  <XAxis dataKey="time" stroke="#696E79" fontSize={12} />
                  <YAxis stroke="#696E79" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="shoppers" fill="#00897B" radius={[6, 6, 0, 0]} name="In-Store Shoppers" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-[#282C3F]">Category Share</h3>
            <p className="text-xs text-[#696E79]">Sales distribution by product classification</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShare}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E9E9EB] text-xs">
            {categoryShare.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-[#696E79] font-semibold">{c.name}</span>
                <span className="font-extrabold text-[#282C3F] ml-auto">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row: Basket Sizes & Smart Cart Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basket Size Distribution */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-[#282C3F]">Basket Size Distribution</h3>
          <p className="text-xs text-[#696E79]">Customer transaction frequency segmented by total ticket size</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BASKET_SIZE_DISTRIBUTION} layout="vertical">
                <XAxis type="number" stroke="#696E79" fontSize={12} />
                <YAxis dataKey="range" type="category" stroke="#696E79" fontSize={11} width={90} />
                <Tooltip />
                <Bar dataKey="count" fill="#FF9F1A" radius={[0, 6, 6, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smart Cart Lift Comparison */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-[#282C3F]">Smart Cart Impact & Efficiency</h3>
          <p className="text-xs text-[#696E79]">Performance uplift observed with Smart Cart tablet usage vs traditional carts</p>

          <div className="space-y-4 pt-2">
            {[
              {
                metric: 'Average Order Value (AOV)',
                smartCart: '₹2,140',
                regular: '₹1,420',
                lift: '+50.7%'
              },
              {
                metric: 'Checkout Queue Time',
                smartCart: '45 seconds',
                regular: '8.5 mins',
                lift: '-91.2%'
              },
              {
                metric: 'Budget Feature Adoption',
                smartCart: '74% shoppers',
                regular: 'N/A',
                lift: 'High retention'
              },
              {
                metric: 'Product Comparison Triggers',
                smartCart: '3.8 per session',
                regular: 'N/A',
                lift: 'Informed buying'
              }
            ].map((item, i) => (
              <div key={i} className="border border-[#E9E9EB] rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-xs text-[#282C3F]">{item.metric}</div>
                  <div className="text-[11px] text-[#696E79] mt-0.5">
                    Smart Cart: <strong className="text-[#00897B]">{item.smartCart}</strong> vs Standard: {item.regular}
                  </div>
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E0F2F1] px-2.5 py-1 rounded-full">
                  {item.lift}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
