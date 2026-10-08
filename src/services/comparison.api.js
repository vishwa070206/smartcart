import { apiClient, USE_MOCK_API } from './api';
import { MOCK_COMPARISON_MATRIX, MOCK_PRODUCTS } from './mock/mockData';

export const comparisonApi = {
  compareProducts: async (productIds = []) => {
    if (USE_MOCK_API) {
      await new Promise((r) => setTimeout(r, 200));
      const products = MOCK_PRODUCTS.filter(p => productIds.includes(p.id));
      
      // Determine winner based on smart score
      let winner = products.length > 0 ? products.reduce((prev, current) => (prev.smartScore > current.smartScore) ? prev : current) : null;
      let cheapest = products.length > 0 ? products.reduce((prev, current) => (prev.price < current.price) ? prev : current) : null;

      return {
        data: {
          products,
          winner,
          cheapest,
          scoreBreakdown: products.map(p => ({
            id: p.id,
            name: p.name,
            score: p.smartScore,
            breakdown: p.comparisonScoreBreakdown
          })),
          insights: winner ? winner.insights : [],
          winnerReason: winner ? `Product '${winner.name}' scored highest overall (${winner.smartScore}/100) due to lower unit price, high user ratings (${winner.rating}★), and customer satisfaction.` : ''
        }
      };
    }
    return apiClient.post('/comparison', { productIds });
  }
};
