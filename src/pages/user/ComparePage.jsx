import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle2, Trophy, Plus, X, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useCompareStore } from '../../store/compareStore';
import { useCartStore } from '../../store/cartStore';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

export function ComparePage() {
  const { compareList, removeFromCompare, addToCompare, clearCompare } = useCompareStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState('milk');

  // Resolved compare products
  const selectedProducts = MOCK_PRODUCTS.filter((p) => compareList.includes(p.id));

  // Determine winners
  let winnerProduct = selectedProducts.length > 0
    ? selectedProducts.reduce((prev, curr) => (curr.smartScore > prev.smartScore ? curr : prev))
    : null;

  let cheapestProduct = selectedProducts.length > 0
    ? selectedProducts.reduce((prev, curr) => (curr.price < prev.price ? curr : prev))
    : null;

  let topRatedProduct = selectedProducts.length > 0
    ? selectedProducts.reduce((prev, curr) => (curr.rating > prev.rating ? curr : prev))
    : null;

  const quickPresets = [
    { label: 'Compare Toned Milk (Amul vs Heritage)', ids: ['p-101', 'p-102'] },
    { label: 'Compare 5kg Wheat Atta (Aashirvaad vs Fortune)', ids: ['p-105', 'p-106'] },
    { label: 'Compare Sunflower Oil (Fortune vs Saffola)', ids: ['p-103', 'p-104'] }
  ];

  const handleApplyPreset = (ids) => {
    clearCompare();
    ids.forEach((id) => addToCompare(id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E9E9EB] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Intelligent Comparison Engine</span>
          </div>
          <h1 className="text-3xl font-black text-[#282C3F]">Product Comparison &amp; Score Matrix</h1>
          <p className="text-xs text-[#696E79]">Compare prices, unit rates, nutrition, and customer scores side-by-side.</p>
        </div>

        <div className="flex items-center gap-3">
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-[#696E79] hover:text-[#D32F2F] border border-[#E9E9EB] px-3 py-1.5 rounded-lg"
            >
              Clear All ({compareList.length})
            </button>
          )}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-[#FFFBFC] border border-[#E9E9EB] p-4 rounded-xl space-y-2">
        <span className="text-xs font-bold text-[#696E79]">Popular Comparison Presets:</span>
        <div className="flex flex-wrap items-center gap-2">
          {quickPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset.ids)}
              className="bg-white border border-[#FF3F6C]/30 text-[#FF3F6C] hover:bg-[#FF3F6C] hover:text-white px-3 py-1 rounded-full text-xs font-bold transition-all shadow-2xs"
            >
              + {preset.label}
            </button>
          ))}
        </div>
      </div>

      {selectedProducts.length === 0 ? (
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-12 text-center space-y-4">
          <Scale className="w-16 h-16 text-[#696E79] mx-auto stroke-1" />
          <h3 className="text-lg font-bold text-[#282C3F]">No products selected for comparison</h3>
          <p className="text-xs text-[#696E79] max-w-md mx-auto">
            Browse products and click the <b>Compare icon</b> on any item card, or select one of the popular comparison presets above.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#FF3F6C] text-white text-xs font-bold py-3 px-6 rounded-xl shadow-md hover:bg-[#D81B4E]"
          >
            Browse Products Catalogue
          </Link>
        </div>
      ) : (
        <>
          {/* Top Winners Badges Section */}
          {winnerProduct && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Winner 1: Best Overall */}
              <div className="bg-gradient-to-br from-[#FFF0F4] to-white border-2 border-[#FF3F6C] p-5 rounded-2xl shadow-sm relative overflow-hidden space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 bg-[#FF3F6C] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                    <Trophy className="w-3 h-3 fill-white" /> BEST OVERALL WINNER
                  </span>
                  <span className="text-xs font-black text-[#FF3F6C]">SCORE {winnerProduct.smartScore}/100</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={winnerProduct.image} alt={winnerProduct.name} className="w-12 h-12 object-contain" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#282C3F] line-clamp-1">{winnerProduct.name}</h4>
                    <div className="text-xs font-bold text-[#FF3F6C]">{formatCurrency(winnerProduct.price)}</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#FF3F6C]/20 text-[11px] text-[#282C3F] font-medium space-y-1">
                  <div className="font-bold text-[#D81B4E]">Why Best Overall?</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00897B]" /> Lower unit price &amp; high value ratio</div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00897B]" /> Highest customer review rating ({winnerProduct.rating}★)</div>
                </div>
              </div>

              {/* Winner 2: Cheapest */}
              {cheapestProduct && (
                <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#00897B] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      CHEAPEST CHOICE
                    </span>
                    <span className="text-xs font-bold text-[#00897B]">{formatCurrency(cheapestProduct.price)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={cheapestProduct.image} alt={cheapestProduct.name} className="w-12 h-12 object-contain" />
                    <div>
                      <h4 className="text-xs font-extrabold text-[#282C3F] line-clamp-1">{cheapestProduct.name}</h4>
                      <div className="text-[11px] text-[#696E79]">Lowest cost out of selected items</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Winner 3: Best Rated */}
              {topRatedProduct && (
                <div className="bg-white border border-[#E9E9EB] p-5 rounded-2xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#6D214F] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      HIGHEST RATED
                    </span>
                    <span className="text-xs font-bold text-[#6D214F]">{topRatedProduct.rating} ★</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={topRatedProduct.image} alt={topRatedProduct.name} className="w-12 h-12 object-contain" />
                    <div>
                      <h4 className="text-xs font-extrabold text-[#282C3F] line-clamp-1">{topRatedProduct.name}</h4>
                      <div className="text-[11px] text-[#696E79]">{topRatedProduct.reviewsCount} customer reviews</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comparison Matrix Table */}
          <div className="bg-white border border-[#E9E9EB] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB]">
                    <th className="p-4 text-xs font-extrabold text-[#696E79] uppercase tracking-wider w-48">
                      PRODUCT METRIC
                    </th>
                    {selectedProducts.map((p) => {
                      const isWinner = winnerProduct && winnerProduct.id === p.id;
                      return (
                        <th key={p.id} className={`p-4 min-w-[220px] ${isWinner ? 'bg-[#FFF0F4]/60 border-x-2 border-[#FF3F6C]' : ''}`}>
                          <div className="relative space-y-2">
                            <button
                              onClick={() => removeFromCompare(p.id)}
                              className="absolute -top-1 -right-1 text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <img src={p.image} alt={p.name} className="w-16 h-16 object-contain mx-auto" />
                            <div className="text-center">
                              <div className="text-[10px] font-bold text-[#696E79] uppercase">{p.brand}</div>
                              <h4 className="text-xs font-extrabold text-[#282C3F] line-clamp-2">{p.name}</h4>
                              <div className="mt-1 font-black text-sm text-[#FF3F6C]">{formatCurrency(p.price)}</div>
                              <button
                                onClick={() => addToCart(p, 1)}
                                className="mt-2 text-[11px] font-bold bg-[#FF3F6C] text-white px-3 py-1.5 rounded-lg w-full"
                              >
                                ADD TO CART
                              </button>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9EB] text-xs text-[#282C3F]">
                  
                  {/* Row: Smart Score */}
                  <tr className="bg-gray-50/50">
                    <td className="p-4 font-extrabold text-[#282C3F]">SmartMart Score</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-center">
                        <div className="inline-block px-3 py-1 rounded-full font-black text-xs bg-[#282C3F] text-white shadow-xs">
                          {p.smartScore} / 100
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: MRP & Discount */}
                  <tr>
                    <td className="p-4 font-bold text-[#696E79]">MRP &amp; Savings</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-center font-semibold">
                        <span className="line-through text-gray-400">{formatCurrency(p.mrp)}</span>
                        <span className="block text-[#00897B] font-bold text-[11px]">{p.discount}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Rating */}
                  <tr>
                    <td className="p-4 font-bold text-[#696E79]">Customer Rating</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-center font-bold">
                        <span className="text-[#00897B] font-black">{p.rating} ★</span> ({p.reviewsCount})
                      </td>
                    ))}
                  </tr>

                  {/* Row: Variant Weight */}
                  <tr>
                    <td className="p-4 font-bold text-[#696E79]">Variant / Net Quantity</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-center font-medium">
                        {p.variant}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Score Breakdown Detail */}
                  <tr>
                    <td className="p-4 font-bold text-[#696E79]">Score Breakdown</td>
                    {selectedProducts.map((p) => {
                      const breakdown = p.comparisonScoreBreakdown || { price: 90, rating: 90, satisfaction: 90, value: 90 };
                      return (
                        <td key={p.id} className="p-4 space-y-1.5 text-[10px]">
                          <div className="flex justify-between"><span>Price Score:</span><span className="font-bold">{breakdown.price}</span></div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#FF3F6C] h-full" style={{ width: `${breakdown.price}%` }} />
                          </div>
                          <div className="flex justify-between pt-1"><span>Rating Score:</span><span className="font-bold">{breakdown.rating}</span></div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#00897B] h-full" style={{ width: `${breakdown.rating}%` }} />
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
