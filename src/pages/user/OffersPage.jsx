import React from 'react';
import { Tag, Copy, Check } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';
import { MOCK_OFFERS, MOCK_PRODUCTS } from '../../services/mock/mockData';

export function OffersPage() {
  const [copiedCode, setCopiedCode] = React.useState(null);
  const offerProducts = MOCK_PRODUCTS.filter((p) => p.isBestOffer);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-[#E9E9EB] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider">
          <Tag className="w-4 h-4" />
          <span>Promotions &amp; Supermarket Coupons</span>
        </div>
        <h1 className="text-3xl font-black text-[#282C3F]">Active SmartMart Offers</h1>
        <p className="text-xs text-[#696E79]">Apply these coupons at checkout to unlock instant discounts on groceries.</p>
      </div>

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="bg-white border-2 border-[#FF3F6C]/30 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-[#FF3F6C]">{offer.discountText}</span>
                <span className="text-[10px] text-gray-500 font-bold">Valid till {offer.validTill}</span>
              </div>
              <h3 className="text-base font-extrabold text-[#282C3F] mt-2">{offer.title}</h3>
              <p className="text-xs text-[#696E79] mt-1">{offer.description}</p>
            </div>

            <div className="bg-[#FFFBFC] border border-dashed border-[#FF3F6C]/50 rounded-xl p-3 flex items-center justify-between">
              <span className="font-mono font-black text-sm text-[#282C3F] tracking-widest">{offer.code}</span>
              <button
                onClick={() => handleCopy(offer.code)}
                className="bg-[#FFF0F4] hover:bg-[#FF3F6C] text-[#FF3F6C] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Products on Sale */}
      <div className="space-y-4 pt-6 border-t border-[#E9E9EB]">
        <h2 className="text-xl font-extrabold text-[#282C3F]">Products with High Discounts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {offerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
