import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  MousePointer,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MOCK_ADMIN_ANALYTICS } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

const EXTENDED_RECOMMENDATION_STATS = [
  ...MOCK_ADMIN_ANALYTICS.recommendationStats,
  {
    type: 'Healthier Nutritional Alternatives',
    impressions: 22000,
    clicks: 6800,
    ctr: '30.9%',
    conversions: 1950,
    incrementalRevenue: 345000
  },
  {
    type: 'Personalized Repeat Essentials',
    impressions: 54000,
    clicks: 19800,
    ctr: '36.6%',
    conversions: 6200,
    incrementalRevenue: 980000
  }
];

export function AdminRecommendationsPage() {
  const [strategies, setStrategies] = useState([
    { id: 'fbt', name: 'Frequently Bought Together', enabled: true, weight: 85, description: 'Association rule mining based on historical basket co-occurrences' },
    { id: 'budget', name: 'Smart Budget Alternatives', enabled: true, weight: 90, description: 'Recommends high-similarity items when user approaches cart budget limit' },
    { id: 'health', name: 'Nutritional / Organic Swaps', enabled: true, weight: 70, description: 'Higher protein, unpolished, or lower saturated fat alternatives' },
    { id: 'explain', name: 'Transparent "Why Recommended" Explanations', enabled: true, weight: 100, description: 'Displays natural-language reason tags on every recommendation badge' }
  ]);

  const toggleStrategy = (id) => {
    setStrategies(
      strategies.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const updateWeight = (id, newWeight) => {
    setStrategies(
      strategies.map((s) => (s.id === id ? { ...s, weight: Number(newWeight) } : s))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 fill-[#FF3F6C]" />
            <span>AI Recommendation Engine</span>
          </div>
          <h1 className="text-2xl font-black text-[#282C3F]">Recommendation Conversion & Models</h1>
          <p className="text-xs text-[#696E79]">Control recommendation algorithms, weights, and inspect explainability CTR uplift</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#696E79]">Engine Status:</span>
          <span className="bg-[#E0F2F1] text-[#00897B] font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active & Serving</span>
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total AI Impressions', value: '187,000', color: 'text-[#282C3F]', bg: 'bg-white' },
          { label: 'Avg Explainability CTR', value: '32.6%', color: 'text-[#00897B]', bg: 'bg-[#E0F2F1]' },
          { label: 'Incremental Conversions', value: '16,960', color: 'text-[#FF3F6C]', bg: 'bg-[#FFF0F4]' },
          { label: 'Attributed AI Revenue', value: '₹28.4L', color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((kpi, idx) => (
          <div key={idx} className={`${kpi.bg} border border-[#E9E9EB] rounded-2xl p-4 shadow-2xs`}>
            <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs font-bold text-[#696E79] mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Strategy Tuning Section */}
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-[#282C3F]">Algorithm Weight Tuning</h3>
          <p className="text-xs text-[#696E79]">Configure active heuristics and scoring weights used in the SmartMart suggestion pipeline</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className={`border rounded-2xl p-4 space-y-3 transition-all ${
                strategy.enabled
                  ? 'border-[#E9E9EB] bg-[#FFFBFC]'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#282C3F]">{strategy.name}</span>
                  {strategy.id === 'explain' && (
                    <span className="bg-[#FFF0F4] text-[#FF3F6C] text-[10px] font-black px-2 py-0.5 rounded-full">
                      CORE FEATURE
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleStrategy(strategy.id)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    strategy.enabled
                      ? 'bg-[#E0F2F1] text-[#00897B]'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {strategy.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <p className="text-xs text-[#696E79]">{strategy.description}</p>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500">Scoring Weight</span>
                  <span className="text-[#FF3F6C]">{strategy.weight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={strategy.weight}
                  disabled={!strategy.enabled}
                  onChange={(e) => updateWeight(strategy.id, e.target.value)}
                  className="w-full accent-[#FF3F6C] cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance by Algorithm Table */}
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-[#282C3F]">Algorithm Performance Breakdown</h3>
          <p className="text-xs text-[#696E79]">Real-world click-through rate (CTR) and add-to-cart conversions for each recommendation type</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">RECOMMENDATION ALGORITHM TYPE</th>
                <th className="p-3">IMPRESSIONS</th>
                <th className="p-3">CLICKS</th>
                <th className="p-3">CTR</th>
                <th className="p-3">CART CONVERSIONS</th>
                <th className="p-3 text-right">CONVERSION RATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB] font-medium text-[#282C3F]">
              {EXTENDED_RECOMMENDATION_STATS.map((stat, idx) => {
                const convRate = ((stat.conversions / stat.clicks) * 100).toFixed(1);
                return (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-extrabold text-[#282C3F] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF3F6C]" />
                      <span>{stat.type}</span>
                    </td>
                    <td className="p-3">{stat.impressions.toLocaleString()}</td>
                    <td className="p-3">{stat.clicks.toLocaleString()}</td>
                    <td className="p-3 font-extrabold text-[#00897B]">{stat.ctr}</td>
                    <td className="p-3 font-bold text-[#FF3F6C]">
                      {stat.conversions.toLocaleString()} orders
                    </td>
                    <td className="p-3 text-right font-black text-[#282C3F]">{convRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
