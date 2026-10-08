import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Scale, ShoppingCart, Tag, ArrowRight, ShieldCheck, TrendingUp, ChevronRight, Award } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';
import { SmartInsight } from '../../components/common/SmartInsight';
import { MOCK_CATEGORIES, MOCK_BRANDS, MOCK_PRODUCTS, MOCK_OFFERS } from '../../services/mock/mockData';

export function HomePage() {
  const trendingProducts = MOCK_PRODUCTS.filter(p => p.isTrending);
  const bestOffers = MOCK_PRODUCTS.filter(p => p.isBestOffer);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-[#6D214F] via-[#8C2967] to-[#FF3F6C] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
              <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
              <span>Next-Gen Supermarket Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Shop Smarter with <span className="text-[#FFF0F4]">SmartMart</span>
            </h1>
            <p className="text-white/90 text-sm sm:text-base max-w-xl">
              Compare milk, atta, cooking oils &amp; groceries in real-time. Get explainable smart insights, budget controls, and seamless Smart Cart in-store checkout.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="bg-white text-[#FF3F6C] hover:bg-[#FFF0F4] font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm flex items-center gap-2"
              >
                <span>Explore Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/compare"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all text-sm flex items-center gap-2"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Products</span>
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFF0F4]">Live Smart Insight</span>
                <span className="bg-[#00897B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">BEST VALUE</span>
              </div>
              <div className="flex items-center gap-3 bg-white text-[#282C3F] p-3 rounded-xl shadow-sm">
                <img src={MOCK_PRODUCTS[0].image} alt="Amul Milk" className="w-12 h-12 object-contain" />
                <div>
                  <div className="text-xs font-bold">{MOCK_PRODUCTS[0].name}</div>
                  <div className="text-xs font-extrabold text-[#FF3F6C]">₹{MOCK_PRODUCTS[0].price} <span className="line-through text-gray-400 font-normal">₹{MOCK_PRODUCTS[0].mrp}</span></div>
                </div>
              </div>
              <SmartInsight insights={MOCK_PRODUCTS[0].insights} compact />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* 2. CATEGORIES GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#282C3F]">Shop Supermarket Categories</h2>
            <Link to="/categories" className="text-xs font-bold text-[#FF3F6C] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {MOCK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group bg-white border border-[#E9E9EB] rounded-xl p-3 text-center hover:border-[#FF3F6C] hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#FFFBFC] p-1 border border-gray-100 group-hover:scale-105 transition-transform">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-xs font-bold text-[#282C3F] group-hover:text-[#FF3F6C] line-clamp-1">{cat.name}</span>
                <span className="text-[10px] text-[#696E79]">{cat.count} Items</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. PROMOTIONAL OFFERS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className={`bg-gradient-to-br ${offer.bgGradient} text-white p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden`}
            >
              <div>
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase">
                  CODE: {offer.code}
                </span>
                <h3 className="text-lg font-black mt-2">{offer.title}</h3>
                <p className="text-xs text-white/90 mt-1">{offer.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <span className="text-lg font-black text-[#FFF0F4]">{offer.discountText}</span>
                <Link to="/offers" className="bg-white text-[#282C3F] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-100">
                  Claim Offer
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* 4. TRENDING PRODUCTS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF3F6C]" />
              <h2 className="text-xl font-extrabold text-[#282C3F]">Trending Products</h2>
            </div>
            <Link to="/products" className="text-xs font-bold text-[#FF3F6C] hover:underline">See More</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. PRODUCT COMPARISON CTA */}
        <section className="bg-[#FFF0F4] border border-[#FF3F6C]/30 p-8 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C]">
              <Scale className="w-4 h-4" />
              <span>SmartMart Intelligence Feature</span>
            </div>
            <h2 className="text-2xl font-black text-[#282C3F]">Unsure which Milk, Oil, or Atta to Buy?</h2>
            <p className="text-xs text-[#696E79] max-w-xl">
              Compare prices, unit costs, ratings, discounts, and nutritional score side-by-side with instant score breakdowns.
            </p>
          </div>

          <Link
            to="/compare"
            className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm shrink-0"
          >
            LAUNCH COMPARISON ENGINE
          </Link>
        </section>

        {/* 6. BEST OFFERS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#FF3F6C]" />
              <h2 className="text-xl font-extrabold text-[#282C3F]">Best Savings &amp; Discounts</h2>
            </div>
            <Link to="/offers" className="text-xs font-bold text-[#FF3F6C] hover:underline">View All Offers</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bestOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 7. POPULAR BRANDS */}
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#282C3F]">Trusted Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {MOCK_BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="bg-white border border-[#E9E9EB] rounded-xl p-4 text-center hover:border-[#FF3F6C] transition-all flex flex-col items-center justify-center space-y-2 shadow-2xs"
              >
                <Award className="w-6 h-6 text-[#FF3F6C]" />
                <span className="text-xs font-bold text-[#282C3F]">{brand.name}</span>
                <span className="text-[10px] text-[#696E79]">{brand.productCount} Products</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. SMART CART PROMO */}
        <section className="bg-[#282C3F] text-white p-8 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="bg-[#FF3F6C] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              IN-STORE INNOVATION
            </span>
            <h2 className="text-2xl font-black text-white">Shopping in Our Supermarket Branch?</h2>
            <p className="text-xs text-gray-300 max-w-xl">
              Use SmartCart touch tablets on physical shopping carts to scan items live, get instant price comparison popups ("Save ₹25 with alternative"), track your budget, and skip checkout lines.
            </p>
          </div>

          <Link
            to="/smart-cart"
            className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center gap-2 shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Open Smart Cart Interface</span>
          </Link>
        </section>

      </div>
    </div>
  );
}
