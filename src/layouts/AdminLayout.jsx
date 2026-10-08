import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function AdminLayout() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex bg-[#F8F8F9] text-[#282C3F] font-sans antialiased">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#E9E9EB] px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-lg text-[#282C3F]">SmartMart Supermarket Intelligence &amp; Admin Hub</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#696E79] hover:text-[#282C3F] rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3F6C] rounded-full" />
            </button>
            <div className="h-6 w-px bg-[#E9E9EB]" />
            <div className="flex items-center gap-2.5">
              <img src={user?.avatar} alt="Admin Avatar" className="w-8 h-8 rounded-full border border-[#FF3F6C]" />
              <div className="text-left text-xs hidden sm:block">
                <div className="font-bold text-[#282C3F]">{user?.name}</div>
                <div className="text-[10px] text-[#696E79] uppercase font-bold">System Super Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content View Container */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
