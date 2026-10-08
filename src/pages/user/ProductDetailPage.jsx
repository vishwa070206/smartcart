import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Scale, ShoppingBag, ArrowRight, ShieldCheck, Check, Star, Sparkles } from 'lucide-react';
import { PriceDisplay } from '../../components/common/PriceDisplay';
import { RatingDisplay } from '../../components/common/RatingDisplay';
import { SmartInsight } from '../../components/common/SmartInsight';
import { ProductCard } from '../../components/product/ProductCard';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCompareStore } from '../../store/compareStore';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { isInCompare, toggleCompare } = useCompareStore();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const similarProducts = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#696E79]">
        <Link to="/" className="hover:text-[#FF3F6C]">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#FF3F6C]">Products</Link>
        <span>/</span>
        <span className="text-[#282C3F] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white border border-[#E9E9EB] rounded-2xl p-6 shadow-xs">
        
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-[#FFFBFC] border border-gray-100 rounded-xl p-8 flex items-center justify-center relative">
            <img src={product.image} alt={product.name} className="object-contain h-full w-full max-h-96" />
            <span className="absolute top-4 left-4 bg-[#282C3F] text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
              SMARTMART SCORE {product.smartScore}/100
            </span>
          </div>
        </div>

        {/* Info & Purchase Panel */}
        <div className="space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF3F6C]">{product.brand}</span>
              <span className="text-xs font-bold text-[#00897B] bg-[#E0F2F1] px-2.5 py-1 rounded-full">In Stock ({product.stockCount} available)</span>
            </div>

            <h1 className="text-2xl font-black text-[#282C3F] leading-tight">{product.name}</h1>
            <div className="text-xs text-[#696E79] font-semibold">Variant: {product.variant}</div>

            <div className="flex items-center gap-4 pt-1">
              <RatingDisplay rating={product.rating} count={product.reviewsCount} />
              <span className="text-xs text-[#696E79]">Verified Supermarket Product</span>
            </div>

            <div className="pt-2 border-t border-[#E9E9EB]">
              <PriceDisplay price={product.price} mrp={product.mrp} discount={product.discount} size="lg" />
              <p className="text-[11px] text-[#696E79] mt-1">Inclusive of all local taxes. Delivery within 4 hours.</p>
            </div>

            {/* SmartMart Insights Box */}
            <SmartInsight insights={product.insights} />

            <p className="text-xs text-[#696E79] leading-relaxed pt-2 border-t border-[#E9E9EB]">
              {product.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#E9E9EB]">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E9E9EB] rounded-xl overflow-hidden bg-[#FFFBFC]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 font-bold text-sm text-[#282C3F] hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 font-extrabold text-sm text-[#282C3F]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 font-bold text-sm text-[#282C3F] hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-[#FFF0F4] hover:bg-[#FF3F6C] text-[#FF3F6C] hover:text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#FF3F6C] hover:bg-[#D81B4E] text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md text-sm"
              >
                <span>BUY NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => toggleCompare(product.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 border py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isCompared
                    ? 'border-[#FF3F6C] bg-[#FF3F6C] text-white'
                    : 'border-[#E9E9EB] text-[#282C3F] hover:border-[#FF3F6C]'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isCompared ? 'In Compare List' : 'Add to Compare'}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 border py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isWishlisted
                    ? 'border-[#FF3F6C] bg-[#FFF0F4] text-[#FF3F6C]'
                    : 'border-[#E9E9EB] text-[#282C3F] hover:border-[#FF3F6C]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF3F6C]' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted' : 'Save to Wishlist'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications & Nutrition Tabs/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Specs */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-3">
          <h3 className="font-extrabold text-[#282C3F] text-base border-b border-[#E9E9EB] pb-2">
            Product Specifications
          </h3>
          <dl className="divide-y divide-[#E9E9EB] text-xs">
            {Object.entries(product.specifications || {}).map(([key, val]) => (
              <div key={key} className="py-2 flex justify-between">
                <dt className="text-[#696E79] font-medium">{key}</dt>
                <dd className="font-bold text-[#282C3F]">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Nutrition */}
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-3">
          <h3 className="font-extrabold text-[#282C3F] text-base border-b border-[#E9E9EB] pb-2">
            Nutritional Value
          </h3>
          <dl className="divide-y divide-[#E9E9EB] text-xs">
            {Object.entries(product.nutrition || {}).map(([key, val]) => (
              <div key={key} className="py-2 flex justify-between">
                <dt className="text-[#696E79] font-medium">{key}</dt>
                <dd className="font-bold text-[#00897B]">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>

      {/* Similar Recommended Products */}
      {similarProducts.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-[#E9E9EB]">
          <h2 className="text-xl font-extrabold text-[#282C3F]">Similar &amp; Alternative Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
