import React, { useState } from 'react';
import { ShoppingCart, BatteryCharging, Wifi, Eye, RefreshCw } from 'lucide-react';
import { MOCK_ADMIN_ANALYTICS, MOCK_SMART_CART_SESSION } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

export function AdminSmartCartsPage() {
  const { smartCartMonitoring } = MOCK_ADMIN_ANALYTICS;
  const [selectedCart, setSelectedCart] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E9E9EB] p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Smart Cart Live Fleet Monitoring</h1>
          <p className="text-xs text-[#696E79]">Real-time Socket.IO telemetry for physical Smart Cart hardware tablets in supermarket branches</p>
        </div>

        <button
          onClick={() => alert('Refreshing live telemetry feeds from HSR Layout & Indiranagar hubs...')}
          className="bg-[#FF3F6C] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">CART ID</th>
                <th className="p-3">SUPERMARKET BRANCH</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">BATTERY TELEMETRY</th>
                <th className="p-3">CUSTOMER SESSION</th>
                <th className="p-3">ITEMS</th>
                <th className="p-3">TOTAL</th>
                <th className="p-3">LAST SEEN</th>
                <th className="p-3 text-right">INSPECT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB] font-medium text-[#282C3F]">
              {smartCartMonitoring.map((cart) => (
                <tr key={cart.cartId} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-[#FF3F6C]">{cart.cartId}</td>
                  <td className="p-3 font-semibold">{cart.store}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      cart.status === 'Active' ? 'bg-[#E0F2F1] text-[#00897B]' :
                      cart.status === 'Checkout' ? 'bg-[#FFF0F4] text-[#FF3F6C]' :
                      cart.status === 'Idle' ? 'bg-amber-100 text-amber-800' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {cart.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <BatteryCharging className={`w-4 h-4 ${cart.battery < 20 ? 'text-[#D32F2F]' : 'text-[#00897B]'}`} />
                      <span className="font-extrabold">{cart.battery}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold">{cart.customer}</td>
                  <td className="p-3 font-semibold">{cart.itemQty} Items</td>
                  <td className="p-3 font-extrabold text-[#282C3F]">{formatCurrency(cart.total)}</td>
                  <td className="p-3 text-gray-500">{cart.lastSeen}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedCart(cart)}
                      className="bg-[#FFF0F4] hover:bg-[#FF3F6C] text-[#FF3F6C] hover:text-white p-1.5 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cart Session Inspector Modal */}
      {selectedCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-extrabold text-base text-[#282C3F]">Live Telemetry Inspector: {selectedCart.cartId}</h3>
              <button onClick={() => setSelectedCart(null)} className="text-gray-400 hover:text-black">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b pb-1"><span>Customer:</span><span className="font-bold">{selectedCart.customer}</span></div>
              <div className="flex justify-between border-b pb-1"><span>Branch:</span><span className="font-bold">{selectedCart.store}</span></div>
              <div className="flex justify-between border-b pb-1"><span>Cart Status:</span><span className="font-bold text-[#00897B]">{selectedCart.status}</span></div>
              <div className="flex justify-between border-b pb-1"><span>Battery Level:</span><span className="font-bold">{selectedCart.battery}%</span></div>
              <div className="flex justify-between font-extrabold text-sm pt-2"><span>Current Total:</span><span className="text-[#FF3F6C]">{formatCurrency(selectedCart.total)}</span></div>
            </div>

            <button onClick={() => setSelectedCart(null)} className="w-full bg-[#282C3F] text-white py-2.5 rounded-xl font-bold text-xs">
              Close Telemetry Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
