import { apiClient, USE_MOCK_API } from './api';
import { MOCK_CATEGORIES, MOCK_BRANDS, MOCK_OFFERS } from './mock/mockData';

export const categoryApi = {
  getCategories: async () => {
    if (USE_MOCK_API) {
      return { data: MOCK_CATEGORIES };
    }
    return apiClient.get('/categories');
  },
  getBrands: async () => {
    if (USE_MOCK_API) {
      return { data: MOCK_BRANDS };
    }
    return apiClient.get('/brands');
  },
  getOffers: async () => {
    if (USE_MOCK_API) {
      return { data: MOCK_OFFERS };
    }
    return apiClient.get('/offers');
  }
};
