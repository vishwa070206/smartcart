import { apiClient, USE_MOCK_API } from './api';
import { MOCK_ORDERS } from './mock/mockData';

export const orderApi = {
  getOrders: async () => {
    if (USE_MOCK_API) {
      return { data: MOCK_ORDERS };
    }
    return apiClient.get('/orders');
  },

  getOrderById: async (id) => {
    if (USE_MOCK_API) {
      const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];
      return { data: order };
    }
    return apiClient.get(`/orders/${id}`);
  },

  createOrder: async (orderPayload) => {
    if (USE_MOCK_API) {
      const newOrder = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString(),
        status: 'Order Placed',
        paymentStatus: 'Paid (UPI)',
        total: orderPayload.total || 850,
        itemsCount: orderPayload.items ? orderPayload.items.length : 3,
        deliveryAddress: orderPayload.deliveryAddress || 'Flat 402, Green Glen Layout, Bellandur, Bengaluru',
        items: orderPayload.items || [],
        timeline: [
          { status: 'Order Placed', time: 'Just now', done: true },
          { status: 'Packing at Store', time: 'In progress', done: false }
        ]
      };
      MOCK_ORDERS.unshift(newOrder);
      return { data: newOrder };
    }
    return apiClient.post('/orders', orderPayload);
  }
};
