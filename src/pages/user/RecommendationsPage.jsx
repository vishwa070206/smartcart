import React from 'react';
import { Sparkles, Info, CheckCircle2 } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';
import { SmartInsight } from '../../components/common/SmartInsight';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';

export function RecommendationsPage() {
  const recommendations = MOCK_PRODUCTS.map((p) => ({
    product: p,
    explainability: p.recommendationReason || 'Recommended based on your shopping frequency in Dairy & Staples.'
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-[#E9E9EB] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 fill-[#FF3F6C]" />
          <span>Explainable AI Engine</span>
        </div>
        <h1 className="text-3xl font-black text-[#282C3F]">Personalized Supermarket Recommendations</h1>
        <p className="text-xs text-[#696E79]">
          SmartMart never displays unexplained recommendations. Every product below details exact reasons why it matches your cart history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(({ product, explainability }) => (
          <div
            key={product.id}
            className="bg-white border border-[#E9E9EB] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#FF3F6C]/40 transition-all shadow-2xs"
          >
            <div>
              <div className="bg-[#FFF0F4] border border-[#FF3F6C]/20 rounded-xl p-2.5 mb-3 flex items-start gap-2 text-xs text-[#282C3F]">
                <Info className="w-4 h-4 text-[#FF3F6C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-[#D81B4E] block">Why Recommended?</span>
                  <span className="text-gray-700">{explainability}</span>
                </div>
              </div>
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
