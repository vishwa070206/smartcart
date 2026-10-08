import { apiClient, USE_MOCK_API } from './api';
import { MOCK_ADMIN_ANALYTICS, MOCK_PRODUCTS } from './mock/mockData';

export const adminApi = {
  getAnalytics: async () => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 200));
      return { data: MOCK_ADMIN_ANALYTICS };
    }
    return apiClient.get('/admin/analytics');
  },

  importProducts: async (file, columnMapping) => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 1000));
      return {
        data: {
          created: 420,
          updated: 83,
          skipped: 17,
          failed: 6,
          errors: [
            { row: 14, sku: 'SKU-9021', message: 'Missing product price' },
            { row: 32, sku: 'SKU-8812', message: 'Invalid category slug' }
          ]
        }
      };
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapping', JSON.stringify(columnMapping));
    return apiClient.post('/admin/products/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};
