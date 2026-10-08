import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Eye,
  AlertCircle,
  Calendar,
  X
} from 'lucide-react';
import { MOCK_ORDERS } from '../../services/mock/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const EXTENDED_ORDERS = [
  ...MOCK_ORDERS,
  {
    id: 'ORD-98450',
    date: '2026-10-08T10:15:00Z',
    status: 'Processing',
    paymentStatus: 'Paid (UPI)',
    total: 1420,
    itemsCount: 6,
    deliveryAddress: 'Apt 204, Prestige Palms, Sector 3, HSR Layout, Bengaluru',
    items: [
      { id: 'p-101', name: 'Amul Taaza Toned Milk (Pouch)', variant: '1 L', price: 54, qty: 3 },
      { id: 'p-103', name: 'Fortune Sunlite Refined Sunflower Oil', variant: '1 L Pouch', price: 132, qty: 2 },
      { id: 'p-105', name: 'Aashirvaad Shuddh Chakki Whole Wheat Atta', variant: '5 kg', price: 245, qty: 1 }
    ],
    timeline: [
      { status: 'Order Placed', time: 'Today, 10:15 AM', done: true },
      { status: 'Packed by Supermarket', time: 'Pending', done: false },
      { status: 'Out for Delivery', time: 'Pending', done: false }
    ]
  },
  {
    id: 'ORD-98448',
    date: '2026-10-08T09:30:00Z',
    status: 'Out for Delivery',
    paymentStatus: 'Paid (NetBanking)',
    total: 2150,
    itemsCount: 8,
    deliveryAddress: 'Villa 12, Sobha Morzaria Grandeur, Bannerghatta Rd, Bengaluru',
    items: [
      { id: 'p-105', name: 'Aashirvaad Shuddh Chakki Whole Wheat Atta', variant: '5 kg', price: 245, qty: 2 },
      { id: 'p-109', name: 'Surf Excel Easy Wash Liquid Detergent', variant: '1 L Bottle', price: 215, qty: 3 },
      { id: 'p-110', name: 'Tata Sampann Unpolished Arhar Dal', variant: '1 kg', price: 168, qty: 2 }
    ],
    timeline: [
      { status: 'Order Placed', time: 'Today, 09:30 AM', done: true },
      { status: 'Packed by Supermarket', time: 'Today, 10:00 AM', done: true },
      { status: 'Out for Delivery', time: 'Today, 10:45 AM', done: true }
    ]
  }
];

export function AdminOrdersPage() {
  const [orders, setOrders] = useState(EXTENDED_ORDERS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['All', 'Processing', 'Out for Delivery', 'Delivered'];

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.deliveryAddress.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FF3F6C] uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Fulfillment Center</span>
          </div>
          <h1 className="text-2xl font-black text-[#282C3F]">Customer Orders & Dispatch</h1>
          <p className="text-xs text-[#696E79]">Process incoming supermarket express orders and track store dispatches</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#696E79]">Branch Dispatch:</span>
          <span className="bg-[#FFF0F4] text-[#FF3F6C] font-extrabold text-xs px-3 py-1 rounded-full">
            HSR Superstore
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orders.length, color: 'text-[#282C3F]', bg: 'bg-white' },
          { label: 'Processing', value: orders.filter((o) => o.status === 'Processing').length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Out for Delivery', value: orders.filter((o) => o.status === 'Out for Delivery').length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Delivered', value: orders.filter((o) => o.status === 'Delivered').length, color: 'text-[#00897B]', bg: 'bg-[#E0F2F1]' }
        ].map((kpi, idx) => (
          <div key={idx} className={`${kpi.bg} border border-[#E9E9EB] rounded-2xl p-4 shadow-2xs`}>
            <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs font-bold text-[#696E79] mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Main Table and Filter Card */}
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                  statusFilter === status
                    ? 'bg-[#FF3F6C] text-white shadow-xs'
                    : 'bg-[#FFFBFC] border border-[#E9E9EB] text-[#696E79] hover:text-[#282C3F]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID or Address..."
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#282C3F] focus:outline-none focus:border-[#FF3F6C]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">ORDER ID</th>
                <th className="p-3">PLACED DATE</th>
                <th className="p-3">DELIVERY DESTINATION</th>
                <th className="p-3">ITEMS</th>
                <th className="p-3">TOTAL</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB] font-medium text-[#282C3F]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400 font-semibold">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-extrabold text-[#FF3F6C]">{o.id}</td>
                    <td className="p-3 text-[#696E79]">{formatDate(o.date)}</td>
                    <td className="p-3 max-w-xs truncate font-semibold" title={o.deliveryAddress}>
                      {o.deliveryAddress}
                    </td>
                    <td className="p-3 font-bold">{o.itemsCount} items</td>
                    <td className="p-3 font-black text-[#282C3F]">{formatCurrency(o.total)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${
                          o.status === 'Delivered'
                            ? 'bg-[#E0F2F1] text-[#00897B]'
                            : o.status === 'Out for Delivery'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {o.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                        {o.status === 'Out for Delivery' && <Truck className="w-3 h-3" />}
                        {o.status === 'Processing' && <Clock className="w-3 h-3" />}
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="bg-white border border-[#E9E9EB] hover:border-[#FF3F6C] text-[#282C3F] font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="border border-[#E9E9EB] rounded-lg text-[11px] font-bold px-2 py-1 bg-white cursor-pointer hover:border-[#FF3F6C]"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-black text-[#FF3F6C]">ORDER INVOICE DETAILS</span>
                <h3 className="font-extrabold text-lg text-[#282C3F]">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#FFFBFC] p-4 rounded-xl border border-[#E9E9EB]">
                <div>
                  <span className="text-gray-500 font-semibold block">Order Date</span>
                  <span className="font-bold text-[#282C3F]">{formatDate(selectedOrder.date)}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-semibold block">Payment Mode</span>
                  <span className="font-bold text-[#00897B]">{selectedOrder.paymentStatus}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 font-semibold block">Delivery Address</span>
                  <span className="font-bold text-[#282C3F]">{selectedOrder.deliveryAddress}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-[#282C3F]">Order Items ({selectedOrder.items?.length || 0})</h4>
                <div className="border border-[#E9E9EB] rounded-xl divide-y divide-[#E9E9EB]">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#282C3F]">{item.name}</div>
                        <div className="text-[11px] text-gray-500">
                          {item.variant} × {item.qty} units
                        </div>
                      </div>
                      <div className="font-extrabold text-[#282C3F]">
                        {formatCurrency(item.price * item.qty)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl font-bold">
                <span className="text-gray-600">Total Billed Amount:</span>
                <span className="text-base font-black text-[#FF3F6C]">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'Processing')}
                  className="flex-1 bg-amber-50 text-amber-800 border border-amber-200 py-2 rounded-xl font-bold hover:bg-amber-100"
                >
                  Mark Processing
                </button>
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'Out for Delivery')}
                  className="flex-1 bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded-xl font-bold hover:bg-blue-100"
                >
                  Out for Delivery
                </button>
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'Delivered')}
                  className="flex-1 bg-[#E0F2F1] text-[#00897B] border border-teal-200 py-2 rounded-xl font-bold hover:bg-teal-100"
                >
                  Mark Delivered
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
