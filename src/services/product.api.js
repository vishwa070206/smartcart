import { apiClient, USE_MOCK_API } from './api';
import { MOCK_PRODUCTS } from './mock/mockData';

export const productApi = {
  getProducts: async (params = {}) => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 200));
      let filtered = [...MOCK_PRODUCTS];

      if (params.category) {
        filtered = filtered.filter(p => p.categorySlug === params.category || p.category === params.category);
      }
      if (params.brand) {
        filtered = filtered.filter(p => p.brand.toLowerCase() === params.brand.toLowerCase());
      }
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }
      if (params.sort) {
        if (params.sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
        if (params.sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
        if (params.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
        if (params.sort === 'smart_score') filtered.sort((a, b) => b.smartScore - a.smartScore);
      }
      return { data: filtered, total: filtered.length };
    }
    return apiClient.get('/products', { params });
  },

  getProductById: async (id) => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 200));
      const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
      return { data: product };
    }
    return apiClient.get(`/products/${id}`);
  },

  getTrendingProducts: async () => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 200));
      return { data: MOCK_PRODUCTS.filter(p => p.isTrending) };
    }
    return apiClient.get('/products/trending');
  },

  getBestOffers: async () => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 200));
      return { data: MOCK_PRODUCTS.filter(p => p.isBestOffer) };
    }
    return apiClient.get('/products/best-offers');
  }
};
