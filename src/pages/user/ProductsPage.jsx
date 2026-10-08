import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/product/ProductCard';
import { Filter, SlidersHorizontal, Search, RefreshCcw } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } from '../../services/mock/mockData';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const brandFilter = searchParams.get('brand') || '';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [selectedBrand, setSelectedBrand] = useState(brandFilter);
  const [sortBy, setSortBy] = useState('smart_score');

  useEffect(() => {
    if (categoryFilter) setSelectedCategory(categoryFilter);
  }, [categoryFilter]);

  let products = [...MOCK_PRODUCTS];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    );
  }

  if (selectedCategory) {
    products = products.filter(p => p.categorySlug === selectedCategory || p.category === selectedCategory);
  }

  if (selectedBrand) {
    products = products.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
  }

  if (sortBy === 'price_asc') products.sort((a, b) => a.price - b.price);
  if (sortBy === 'price_desc') products.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') products.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'smart_score') products.sort((a, b) => b.smartScore - a.smartScore);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSearchQuery('');
    setSortBy('smart_score');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E9E9EB] pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Supermarket Product Catalogue</h1>
          <p className="text-xs text-[#696E79]">Showing {products.length} intelligent products with price comparison scores</p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <label className="text-xs font-bold text-[#696E79]">SORT BY:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#E9E9EB] rounded-lg px-3 py-1.5 text-xs font-bold text-[#282C3F] focus:outline-none focus:border-[#FF3F6C]"
          >
            <option value="smart_score">SmartMart Score (Highest First)</option>
            <option value="rating">Customer Rating</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filter Sidebar */}
        <aside className="space-y-6 bg-white border border-[#E9E9EB] rounded-xl p-5 h-fit shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E9E9EB] pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#282C3F]">
              <SlidersHorizontal className="w-4 h-4 text-[#FF3F6C]" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#FF3F6C] font-semibold hover:underline flex items-center gap-1"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search within filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#282C3F]">Search Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-8 pr-3 py-1.5 text-xs"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#282C3F] block">Categories</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-2 py-1 rounded font-medium ${!selectedCategory ? 'bg-[#FFF0F4] text-[#FF3F6C] font-bold' : 'text-[#696E79] hover:bg-gray-50'}`}
              >
                All Categories
              </button>
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2 py-1 rounded font-medium flex items-center justify-between ${selectedCategory === cat.slug ? 'bg-[#FFF0F4] text-[#FF3F6C] font-bold' : 'text-[#696E79] hover:bg-gray-50'}`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-gray-400">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-3 border-t border-[#E9E9EB]">
            <label className="text-xs font-bold text-[#282C3F] block">Brands</label>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1 text-xs">
              <button
                onClick={() => setSelectedBrand('')}
                className={`w-full text-left px-2 py-1 rounded font-medium ${!selectedBrand ? 'bg-[#FFF0F4] text-[#FF3F6C] font-bold' : 'text-[#696E79] hover:bg-gray-50'}`}
              >
                All Brands
              </button>
              {MOCK_BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.name)}
                  className={`w-full text-left px-2 py-1 rounded font-medium ${selectedBrand.toLowerCase() === b.name.toLowerCase() ? 'bg-[#FFF0F4] text-[#FF3F6C] font-bold' : 'text-[#696E79] hover:bg-gray-50'}`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="bg-white border border-[#E9E9EB] rounded-xl p-12 text-center space-y-3">
              <Search className="w-12 h-12 text-gray-400 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-[#282C3F]">No products found</h3>
              <p className="text-xs text-[#696E79]">Try clearing your search query or selecting a different category.</p>
              <button
                onClick={handleResetFilters}
                className="inline-block bg-[#FF3F6C] text-white text-xs font-bold py-2 px-4 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
