import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CATEGORIES } from '../../services/mock/mockData';

export function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-[#E9E9EB] pb-6">
        <h1 className="text-2xl font-black text-[#282C3F]">All Supermarket Categories</h1>
        <p className="text-xs text-[#696E79]">Explore fresh groceries, daily essentials, staples &amp; household care</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.slug}`}
            className="group bg-white border border-[#E9E9EB] rounded-2xl overflow-hidden hover:border-[#FF3F6C] hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="h-44 w-full bg-[#FFFBFC] overflow-hidden p-4">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 border-t border-[#E9E9EB] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#282C3F] group-hover:text-[#FF3F6C]">{cat.name}</h3>
                <p className="text-xs text-[#696E79]">{cat.count} Items available</p>
              </div>
              <span className="text-xs font-bold text-[#FF3F6C] bg-[#FFF0F4] px-2.5 py-1 rounded-full">Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
