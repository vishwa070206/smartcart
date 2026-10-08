import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Scale, User, Tag, Sparkles, Menu, X, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCompareStore } from '../../store/compareStore';
import { useAuthStore } from '../../store/authStore';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openCartDrawer = useCartStore((state) => state.openCartDrawer);
  const cartCount = useCartStore((state) => state.getCartCount());
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const compareCount = useCompareStore((state) => state.compareList.length);
  const { user, isAuthenticated } = useAuthStore();

  const searchSuggestions = searchQuery.trim().length > 1
    ? MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E9E9EB] shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#6D214F] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#FF3F6C]" />
        <span>Try the <b>Smart Budget Assistant</b> &amp; <b>Intelligent Product Comparison</b> today!</span>
        <Link to="/compare" className="underline font-bold hover:text-[#FFF0F4]">Compare Now</Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#FF3F6C] text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-md">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#282C3F] leading-none">
                Smart<span className="text-[#FF3F6C]">Mart</span>
              </span>
              <span className="text-[10px] text-[#696E79] font-semibold tracking-wider">SUPERMARKET &amp; AI</span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm">
            <Link
              to="/categories"
              className={`hover:text-[#FF3F6C] transition-colors ${isActive('/categories') ? 'text-[#FF3F6C]' : 'text-[#282C3F]'}`}
            >
              Categories
            </Link>
            <Link
              to="/offers"
              className={`flex items-center gap-1 hover:text-[#FF3F6C] transition-colors ${isActive('/offers') ? 'text-[#FF3F6C]' : 'text-[#282C3F]'}`}
            >
              <Tag className="w-4 h-4 text-[#FF3F6C]" />
              <span>Offers</span>
            </Link>
            <Link
              to="/compare"
              className={`flex items-center gap-1.5 hover:text-[#FF3F6C] transition-colors relative ${isActive('/compare') ? 'text-[#FF3F6C]' : 'text-[#282C3F]'}`}
            >
              <Scale className="w-4 h-4" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="bg-[#FF3F6C] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              )}
            </Link>
            <Link
              to="/smart-cart"
              className="flex items-center gap-1.5 bg-[#FFF0F4] text-[#FF3F6C] px-3 py-1 rounded-full hover:bg-[#FF3F6C] hover:text-white transition-all font-bold text-xs"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Smart Cart UI</span>
            </Link>
          </nav>

          {/* Prominent Search Bar */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, brands, groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-10 pr-4 py-2 text-sm text-[#282C3F] placeholder-[#696E79] focus:outline-none focus:border-[#FF3F6C] focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-[#696E79] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </form>

            {/* Dropdown Suggestions */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E9E9EB] rounded-lg shadow-lg overflow-hidden z-50">
                <div className="p-2 text-xs font-bold text-[#696E79] uppercase bg-[#FFFBFC] border-b border-[#E9E9EB]">
                  Instant Suggestions
                </div>
                {searchSuggestions.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="flex items-center gap-3 p-2.5 hover:bg-[#FFF0F4] transition-colors border-b border-[#E9E9EB] last:border-0"
                  >
                    <img src={product.image} alt={product.name} className="w-9 h-9 object-contain rounded" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#282C3F] truncate">{product.name}</div>
                      <div className="text-[10px] text-[#696E79]">{product.brand} · {product.variant}</div>
                    </div>
                    <div className="text-xs font-bold text-[#FF3F6C]">₹{product.price}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons Right */}
          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="relative p-2 text-[#282C3F] hover:text-[#FF3F6C] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF3F6C] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCartDrawer}
              className="relative flex items-center gap-2 bg-[#282C3F] hover:bg-[#FF3F6C] text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#FF3F6C] group-hover:bg-white text-white group-hover:text-[#FF3F6C] text-xs font-bold rounded-full px-1.5 py-0.2">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown / Admin Link */}
            {isAuthenticated ? (
              <div className="relative group">
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/profile'}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#FFFBFC] text-[#282C3F]"
                >
                  <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-[#FF3F6C]" />
                  <span className="text-xs font-bold hidden md:inline">{user.name.split(' ')[0]}</span>
                </Link>
                {user?.role === 'admin' && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E9E9EB] rounded-lg shadow-lg hidden group-hover:block p-1 z-50">
                    <Link to="/admin" className="block px-3 py-2 text-xs font-bold text-[#FF3F6C] hover:bg-[#FFF0F4] rounded">
                      Admin Portal Dashboard
                    </Link>
                    <Link to="/profile" className="block px-3 py-2 text-xs font-semibold text-[#282C3F] hover:bg-gray-50 rounded">
                      Customer Profile
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold text-[#282C3F] hover:text-[#FF3F6C] border border-[#E9E9EB] px-3 py-1.5 rounded-lg"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#282C3F]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Row */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-9 pr-3 py-2 text-xs"
              />
              <Search className="w-3.5 h-3.5 text-[#696E79] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </form>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E9E9EB] p-4 space-y-3 font-semibold text-sm">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#282C3F]">Home</Link>
          <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#282C3F]">Categories</Link>
          <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#FF3F6C]">Special Offers</Link>
          <Link to="/compare" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#282C3F]">Compare Products ({compareCount})</Link>
          <Link to="/smart-cart" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#FF3F6C]">Smart Cart Kiosk</Link>
          <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#282C3F]">My Orders</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#D81B4E] font-bold">
              ⚡ Open Admin Console
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
