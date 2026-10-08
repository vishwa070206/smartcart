import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = query.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_PRODUCTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-[#E9E9EB] pb-6">
        <h1 className="text-2xl font-black text-[#282C3F]">
          Search Results {query && <span>for "{query}"</span>}
        </h1>
        <p className="text-xs text-[#696E79]">Found {results.length} matching products</p>
      </div>

      {results.length === 0 ? (
        <div className="bg-white border border-[#E9E9EB] rounded-2xl p-12 text-center space-y-3">
          <Search className="w-12 h-12 text-gray-400 mx-auto stroke-1" />
          <h3 className="text-base font-bold text-[#282C3F]">No products match "{query}"</h3>
          <p className="text-xs text-[#696E79]">Try searching for 'Milk', 'Oil', 'Atta', 'Amul', or 'Fortune'.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
