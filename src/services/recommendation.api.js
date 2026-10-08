import { apiClient, USE_MOCK_API } from './api';
import { MOCK_PRODUCTS } from './mock/mockData';

export const recommendationApi = {
  getPersonalizedRecommendations: async () => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 200));
      return {
        data: MOCK_PRODUCTS.map(p => ({
          product: p,
          explainabilityReason: p.recommendationReason || 'Recommended based on your recent activity'
        }))
      };
    }
    return apiClient.get('/recommendations/personalized');
  },

  getSimilarProducts: async (productId) => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 150));
      const current = MOCK_PRODUCTS.find(p => p.id === productId);
      const categorySlug = current ? current.categorySlug : 'pantry-staples';
      const similars = MOCK_PRODUCTS.filter(p => p.categorySlug === categorySlug && p.id !== productId);
      return { data: similars.length > 0 ? similars : MOCK_PRODUCTS.slice(0, 4) };
    }
    return apiClient.get(`/recommendations/similar/${productId}`);
  }
};
