import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order || {
    id: 'ORD-98214',
    total: 845,
    date: new Date().toISOString(),
    paymentStatus: 'Paid (UPI)',
    deliveryAddress: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru'
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 bg-[#E0F2F1] text-[#00897B] rounded-full flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-[#00897B] uppercase tracking-wider bg-[#E0F2F1] px-3 py-1 rounded-full">
          ORDER CONFIRMED
        </span>
        <h1 className="text-3xl font-black text-[#282C3F]">Thank You for Your Order!</h1>
        <p className="text-xs text-[#696E79]">
          Your order <b>#{order.id}</b> has been placed successfully and sent to our supermarket fulfilment hub.
        </p>
      </div>

      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 text-left space-y-3 shadow-xs text-xs">
        <div className="flex justify-between border-b border-[#E9E9EB] pb-2">
          <span className="text-[#696E79] font-medium">Order Number:</span>
          <span className="font-bold text-[#282C3F]">{order.id}</span>
        </div>
        <div className="flex justify-between border-b border-[#E9E9EB] pb-2">
          <span className="text-[#696E79] font-medium">Date:</span>
          <span className="font-bold text-[#282C3F]">{formatDate(order.date)}</span>
        </div>
        <div className="flex justify-between border-b border-[#E9E9EB] pb-2">
          <span className="text-[#696E79] font-medium">Estimated Delivery:</span>
          <span className="font-bold text-[#00897B] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Today within 4 hours</span>
          </span>
        </div>
        <div className="flex justify-between font-extrabold text-sm text-[#282C3F] pt-1">
          <span>Amount Paid:</span>
          <span className="text-[#FF3F6C]">{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to={`/orders/${order.id}`}
          className="bg-[#282C3F] text-white text-xs font-bold py-3 px-5 rounded-xl hover:bg-black"
        >
          Track Order Details
        </Link>
        <Link
          to="/products"
          className="bg-[#FF3F6C] text-white text-xs font-bold py-3 px-5 rounded-xl hover:bg-[#D81B4E]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
