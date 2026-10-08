import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Package, Clock } from 'lucide-react';
import { MOCK_ORDERS } from '../../services/mock/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-[#E9E9EB] pb-6">
        <h1 className="text-2xl font-black text-[#282C3F]">My Supermarket Orders</h1>
        <p className="text-xs text-[#696E79]">Track past orders, invoices, and active delivery status</p>
      </div>

      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-[#E9E9EB] rounded-2xl p-5 hover:border-[#FF3F6C]/40 transition-all space-y-4 shadow-2xs"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E9E9EB] pb-3 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#282C3F]">{order.id}</span>
                  <span className="bg-[#E0F2F1] text-[#00897B] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#696E79] mt-0.5">Placed on {formatDate(order.date)}</div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-[#FF3F6C]">{formatCurrency(order.total)}</div>
                <div className="text-[10px] text-[#696E79]">{order.paymentStatus}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#696E79]">
                <Package className="w-4 h-4 text-[#FF3F6C]" />
                <span>{order.itemsCount} Items in this order</span>
              </div>
              <Link
                to={`/orders/${order.id}`}
                className="text-xs font-bold text-[#FF3F6C] hover:underline flex items-center gap-1"
              >
                <span>View Order Details &amp; Timeline</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
