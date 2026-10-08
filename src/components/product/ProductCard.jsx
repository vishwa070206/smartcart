import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, ShoppingBag, Check } from 'lucide-react';
import { PriceDisplay } from '../common/PriceDisplay';
import { RatingDisplay } from '../common/RatingDisplay';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCompareStore } from '../../store/compareStore';

export function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { isInCompare, toggleCompare } = useCompareStore();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="group relative bg-white border border-[#E9E9EB] rounded-xl overflow-hidden hover:border-[#FF3F6C]/40 transition-all duration-200 hover:shadow-lg flex flex-col justify-between">
      {/* Top Overlay Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        {product.smartScore ? (
          <span className="bg-[#282C3F] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm tracking-wider">
            SCORE {product.smartScore}
          </span>
        ) : <span />}

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(product.id);
            }}
            title={isCompared ? 'In Compare list' : 'Add to Compare'}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              isCompared
                ? 'bg-[#FF3F6C] text-white'
                : 'bg-white/80 text-[#696E79] hover:text-[#FF3F6C] hover:bg-white shadow-sm'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-[#FFF0F4] text-[#FF3F6C]'
                : 'bg-white/80 text-[#696E79] hover:text-[#FF3F6C] hover:bg-white shadow-sm'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF3F6C]' : ''}`} />
          </button>
        </div>
      </div>

      <Link to={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square w-full bg-[#FFFBFC] p-4 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-[11px] font-semibold text-[#696E79] uppercase tracking-wider">
              {product.brand}
            </div>
            <h3 className="font-semibold text-sm text-[#282C3F] line-clamp-2 mt-0.5 leading-snug group-hover:text-[#FF3F6C] transition-colors">
              {product.name}
            </h3>
            <div className="text-xs text-[#696E79] mt-1 font-medium">{product.variant}</div>
          </div>

          <div className="space-y-2 pt-1 border-t border-[#E9E9EB]">
            <div className="flex items-center justify-between">
              <RatingDisplay rating={product.rating} count={product.reviewsCount} />
              {product.discount && (
                <span className="text-[10px] font-bold text-[#FF3F6C] bg-[#FFF0F4] px-1.5 py-0.5 rounded">
                  {product.discount}
                </span>
              )}
            </div>

            <PriceDisplay price={product.price} mrp={product.mrp} size="md" />
          </div>
        </div>
      </Link>

      {/* Action CTA */}
      <div className="p-3 pt-0">
        <button
          onClick={() => addToCart(product, 1)}
          className="w-full bg-[#FFF0F4] hover:bg-[#FF3F6C] text-[#FF3F6C] hover:text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors duration-200"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
}
