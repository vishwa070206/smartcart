import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';
import { useWishlistStore } from '../../store/wishlistStore';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';

export function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlistStore();
  const wishlistedProducts = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E9E9EB] pb-6">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F] flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#FF3F6C] fill-[#FF3F6C]" />
            <span>Saved Wishlist ({wishlistedProducts.length})</span>
          </h1>
          <p className="text-xs text-[#696E79]">Your saved items for quick re-ordering</p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-bold text-[#696E79] hover:text-[#D32F2F] border border-[#E9E9EB] px-3 py-1.5 rounded-lg"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-12 text-center space-y-4">
          <Heart className="w-16 h-16 text-gray-300 mx-auto stroke-1" />
          <h3 className="text-lg font-bold text-[#282C3F]">Your wishlist is currently empty</h3>
          <p className="text-xs text-[#696E79]">Explore products and click the heart icon to save items for later.</p>
          <Link
            to="/products"
            className="inline-block bg-[#FF3F6C] text-white text-xs font-bold py-3 px-6 rounded-xl hover:bg-[#D81B4E]"
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
