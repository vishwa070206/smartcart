import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Wifi, BatteryCharging, AlertCircle } from 'lucide-react';
import { useSmartCartStore } from '../store/smartCartStore';

export function SmartCartLayout() {
  const { session, isConnected } = useSmartCartStore();

  return (
    <div className="min-h-screen bg-[#282C3F] text-white font-sans flex flex-col justify-between selection:bg-[#FF3F6C]">
      {/* Touch Kiosk Header */}
      <header className="bg-[#1F2332] border-b border-gray-800 p-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF3F6C] text-white flex items-center justify-center font-black text-2xl shadow-md">
            S
          </div>
          <div>
            <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
              <span>SMARTMART SMART CART</span>
              <span className="text-xs bg-[#FF3F6C] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                {session?.cartId}
              </span>
            </div>
            <div className="text-xs text-gray-400 font-semibold">{session?.storeName}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700 text-xs font-bold">
            <Wifi className={`w-4 h-4 ${isConnected ? 'text-[#00897B]' : 'text-[#D32F2F]'}`} />
            <span>{isConnected ? 'ONLINE SOCKET' : 'RECONNECTING'}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700 text-xs font-bold">
            <BatteryCharging className="w-4 h-4 text-[#00897B]" />
            <span>{session?.batteryLevel}% BATTERY</span>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Kiosk</span>
          </Link>
        </div>
      </header>

      {/* Main Touch Interface */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Touch Footer Status */}
      <footer className="bg-[#1F2332] border-t border-gray-800 py-3 px-6 text-center text-xs text-gray-400 font-semibold flex items-center justify-between">
        <span>Smart Cart Hardware System v2.4 · Auto-weight scale calibrated</span>
        <span>Tap barcode scanner or scan button to add items</span>
      </footer>
    </div>
  );
}
