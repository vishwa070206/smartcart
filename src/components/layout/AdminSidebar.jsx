import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Tags, Award, Warehouse, Store, ShoppingBag, Users,
  Gift, Star, Scale, Sparkles, ShoppingCart, BarChart3, FileText, UserCheck,
  ShieldCheck, History, Settings, ChevronDown, ChevronRight, LogOut, ExternalLink
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard }
      ]
    },
    {
      title: 'CATALOG',
      items: [
        { label: 'Products', path: '/admin/products', icon: Package },
        { label: 'Categories', path: '/admin/categories', icon: Tags },
        { label: 'Brands', path: '/admin/brands', icon: Award }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Inventory', path: '/admin/inventory', icon: Warehouse },
        { label: 'Stores', path: '/admin/stores', icon: Store },
        { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
        { label: 'Customers', path: '/admin/customers', icon: Users }
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { label: 'Comparisons', path: '/admin/comparisons', icon: Scale },
        { label: 'Recommendations', path: '/admin/recommendations', icon: Sparkles },
        { label: 'Smart Carts', path: '/admin/smart-carts', icon: ShoppingCart }
      ]
    },
    {
      title: 'ANALYTICS',
      items: [
        { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
        { label: 'Reports', path: '/admin/reports', icon: FileText }
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Users & Roles', path: '/admin/users', icon: ShieldCheck },
        { label: 'Audit Logs', path: '/admin/audit-logs', icon: History },
        { label: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#282C3F] text-white flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-gray-800 overflow-y-auto">
      <div>
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF3F6C] text-white flex items-center justify-center font-black text-lg">
              S
            </div>
            <div>
              <span className="font-extrabold text-base text-white">Smart<span className="text-[#FF3F6C]">Mart</span></span>
              <span className="block text-[9px] text-[#FF3F6C] font-bold uppercase tracking-widest">Admin Control</span>
            </div>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-5 text-xs">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <div className="px-3 text-[10px] font-bold text-gray-400 tracking-wider mb-1.5 uppercase">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={itemIdx}
                      to={item.path}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold transition-colors ${
                        active
                          ? 'bg-[#FF3F6C] text-white shadow-sm'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-gray-800 bg-gray-900/50 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-semibold"
        >
          <span>View Customer Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#FF3F6C]" />
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
