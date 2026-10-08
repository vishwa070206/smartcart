import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, CheckCircle2, MapPin, Clock, ArrowLeft, Download } from 'lucide-react';
import { MOCK_ORDERS } from '../../services/mock/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function OrderDetailPage() {
  const { id } = useParams();
  const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex items-center justify-between border-b border-[#E9E9EB] pb-4">
        <Link to="/orders" className="flex items-center gap-1.5 text-xs font-bold text-[#FF3F6C] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
        <button
          onClick={() => alert(`Downloading Invoice PDF for ${order.id}...`)}
          className="flex items-center gap-1.5 text-xs font-bold border border-[#E9E9EB] px-3 py-1.5 rounded-lg text-[#282C3F] hover:bg-gray-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Status Timeline & Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Header */}
          <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-black text-[#282C3F]">Order #{order.id}</h1>
                <div className="text-xs text-[#696E79]">Placed on {formatDate(order.date)}</div>
              </div>
              <span className="bg-[#E0F2F1] text-[#00897B] font-extrabold text-xs px-3 py-1 rounded-full">
                {order.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="pt-4 border-t border-[#E9E9EB] space-y-3">
              <h3 className="font-extrabold text-xs text-[#282C3F] uppercase tracking-wider">Status Timeline</h3>
              <div className="space-y-3">
                {order.timeline.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <CheckCircle2 className={`w-4 h-4 ${t.done ? 'text-[#00897B]' : 'text-gray-300'}`} />
                    <span className={`font-bold ${t.done ? 'text-[#282C3F]' : 'text-gray-400'}`}>{t.status}</span>
                    <span className="text-[10px] text-gray-400 ml-auto">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Items Snapshots */}
          <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-base text-[#282C3F] border-b border-[#E9E9EB] pb-2">
              Ordered Products
            </h3>
            <div className="divide-y divide-[#E9E9EB]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#282C3F]">{item.name}</h4>
                    <div className="text-[10px] text-[#696E79]">Variant: {item.variant} · Qty: {item.qty}</div>
                  </div>
                  <div className="font-extrabold text-[#282C3F]">
                    {formatCurrency(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Address & Payment Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-3 text-xs">
            <h3 className="font-extrabold text-sm text-[#282C3F] border-b border-[#E9E9EB] pb-2">
              Delivery Address
            </h3>
            <p className="text-[#696E79] font-medium leading-relaxed">{order.deliveryAddress}</p>
          </div>

          <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-3 text-xs">
            <h3 className="font-extrabold text-sm text-[#282C3F] border-b border-[#E9E9EB] pb-2">
              Payment Details
            </h3>
            <div className="flex justify-between">
              <span className="text-[#696E79]">Payment Status:</span>
              <span className="font-bold text-[#00897B]">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-[#282C3F] pt-2 border-t border-[#E9E9EB]">
              <span>Total Paid:</span>
              <span className="text-[#FF3F6C]">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
