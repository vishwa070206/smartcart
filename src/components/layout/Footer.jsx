import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, RefreshCw, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#282C3F] text-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Value Proposition Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-gray-700/80">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-[#FF3F6C]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">4-Hour Express</h4>
              <p className="text-[11px] text-gray-400">Supermarket items delivered fresh</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-[#FF3F6C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">Intelligent Compare</h4>
              <p className="text-[11px] text-gray-400">Best price &amp; value guarantee</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-[#FF3F6C]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">Smart Cart In-Store</h4>
              <p className="text-[11px] text-gray-400">Scan &amp; skip checkout lines</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-[#FF3F6C]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">Easy Returns</h4>
              <p className="text-[11px] text-gray-400">Instant refund or product replacement</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF3F6C] text-white flex items-center justify-center font-black text-base">
                S
              </div>
              <span className="font-extrabold text-lg text-white">
                Smart<span className="text-[#FF3F6C]">Mart</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              SmartMart is an intelligent supermarket and e-commerce platform designed to help customers discover, compare, save, and shop smarter.
            </p>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-sm mb-3 tracking-wider">SHOP BY CATEGORY</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/categories/dairy-eggs" className="hover:text-white transition-colors">Dairy &amp; Eggs</Link></li>
              <li><Link to="/categories/fresh-produce" className="hover:text-white transition-colors">Fresh Produce</Link></li>
              <li><Link to="/categories/pantry-staples" className="hover:text-white transition-colors">Pantry &amp; Staples</Link></li>
              <li><Link to="/categories/snacks-drinks" className="hover:text-white transition-colors">Snacks &amp; Beverages</Link></li>
              <li><Link to="/categories/household" className="hover:text-white transition-colors">Household Essentials</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-sm mb-3 tracking-wider">INTELLIGENT FEATURES</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/compare" className="hover:text-[#FF3F6C] transition-colors font-bold text-white">Product Comparison Engine</Link></li>
              <li><Link to="/recommendations" className="hover:text-white transition-colors">Explainable Recommendations</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Smart Budget Assistant</Link></li>
              <li><Link to="/smart-cart" className="hover:text-[#FF3F6C] transition-colors font-bold text-[#FF3F6C]">Smart Cart Kiosk Interface</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Promotional Savings</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-sm mb-3 tracking-wider">SUPERMARKET HUBS</h5>
            <p className="text-gray-400 mb-2">HSR Layout Branch: 27th Main Rd, Sector 1, Bengaluru</p>
            <p className="text-gray-400 mb-4">Indiranagar Branch: 100 Feet Rd, Bengaluru</p>
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
              <span className="text-[11px] font-semibold text-gray-300 block">Customer Care Hotline</span>
              <span className="text-sm font-bold text-[#FF3F6C]">1800-425-SMART</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} SmartMart Retails Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for intelligent supermarket shopping</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
