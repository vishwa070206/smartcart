import React, { useState } from 'react';
import {
  Scale,
  Trophy,
  TrendingUp,
  BarChart2,
  PieChart as PieChartIcon,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { MOCK_ADMIN_ANALYTICS, MOCK_PRODUCTS } from '../../services/mock/mockData';

const ATTRIBUTE_WEIGHTS = [
  { attribute: 'Price per Unit (Value)', percentage: 42, color: '#FF3F6C' },
  { attribute: 'Customer Ratings & Reviews', percentage: 24, color: '#00897B' },
  { attribute: 'Nutritional / Organic Purity', percentage: 18, color: '#FF9F1A' },
  { attribute: 'Active Promotional Discount', percentage: 11, color: '#6D214F' },
  { attribute: 'Brand Familiarity', percentage: 5, color: '#3B82F6' }
];

const COMPARISON_CONVERSIONS = [
  { name: 'Direct Purchase (No Compare)', conversionRate: 14.2 },
  { name: 'After 2-Product Comparison', conversionRate: 38.6 },
  { name: 'After 3+ Product Comparison', conversionRate: 46.8 }
];

export function AdminComparisonsPage() {
  const { topComparedPairs } = MOCK_ADMIN_ANALYTICS;
  const [search, setSearch] = useState('');

  const filteredPairs = topComparedPairs.filter((p) =>
    p.pair.toLowerCase().includes(search.toLowerCase()) ||
    p.winner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Shopper Decision Engine</span>
          </div>
          <h1 className="text-2xl font-black text-[#282C3F]">Product Comparison Intelligence</h1>
          <p className="text-xs text-[#696E79]">Inspect customer comparison pairs, winning product ratios, and decision attributes</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#696E79]">Smart Comparison Rate:</span>
          <span className="bg-[#E0F2F1] text-[#00897B] font-extrabold text-xs px-3 py-1 rounded-full">
            +32.6% Decision Velocity
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-[#696E79]">TOTAL COMPARISON SESSIONS</div>
          <div className="text-2xl font-black text-[#282C3F]">3,540</div>
          <div className="text-xs font-bold text-[#00897B] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% month-over-month</span>
          </div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-[#696E79]">CART CONVERSION AFTER COMPARE</div>
          <div className="text-2xl font-black text-[#FF3F6C]">42.5%</div>
          <div className="text-xs font-semibold text-gray-500">
            vs 14.2% without comparison tool
          </div>
        </div>

        <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-[#696E79]">TOP DECISION FACTOR</div>
          <div className="text-2xl font-black text-[#00897B]">Price per Unit</div>
          <div className="text-xs font-semibold text-gray-500">
            42% weight in purchase choice
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decision Attribute Weights */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-[#282C3F]">Customer Decision Drivers</h3>
            <p className="text-xs text-[#696E79]">Which criteria motivate users to select the winning product</p>
          </div>

          <div className="space-y-3 pt-2">
            {ATTRIBUTE_WEIGHTS.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#282C3F]">{item.attribute}</span>
                  <span className="text-[#FF3F6C]">{item.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage * 2}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Lift Chart */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-[#282C3F]">Conversion Lift from Comparison</h3>
            <p className="text-xs text-[#696E79]">Cart checkout probability increases with product transparency</p>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPARISON_CONVERSIONS}>
                <XAxis dataKey="name" stroke="#696E79" fontSize={11} />
                <YAxis
                  stroke="#696E79"
                  fontSize={11}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip formatter={(val) => [`${val}%`, 'Conversion Rate']} />
                <Bar dataKey="conversionRate" fill="#00897B" radius={[6, 6, 0, 0]}>
                  {COMPARISON_CONVERSIONS.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#CBD5E1' : index === 1 ? '#FF9F1A' : '#FF3F6C'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Compared Pairs Section */}
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-[#282C3F]">Top Supermarket Comparison Face-Offs</h3>
            <p className="text-xs text-[#696E79]">Most frequent head-to-head product comparisons and winning outcomes</p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pairs or winners..."
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#282C3F] focus:outline-none focus:border-[#FF3F6C]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPairs.map((pair, idx) => (
            <div
              key={idx}
              className="border border-[#E9E9EB] rounded-2xl p-5 space-y-3 bg-[#FFFBFC] hover:border-[#FF3F6C] transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#FF3F6C] uppercase">
                  PAIR #{idx + 1}
                </span>
                <span className="text-xs font-extrabold text-[#00897B] bg-[#E0F2F1] px-2.5 py-0.5 rounded-full">
                  {pair.count} Sessions
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-[#282C3F]">{pair.pair}</h3>

              <div className="pt-3 border-t border-[#E9E9EB] space-y-2 text-xs">
                <div className="text-[#696E79]">Most Selected Winner:</div>
                <div className="font-extrabold text-[#D81B4E] flex items-center gap-1.5 bg-[#FFF0F4] p-2.5 rounded-xl border border-[#FF3F6C]/20">
                  <Trophy className="w-4 h-4 text-[#FF3F6C] shrink-0" />
                  <span>{pair.winner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
