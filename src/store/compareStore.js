import { create } from 'zustand';

export const useCompareStore = create((set, get) => ({
  compareList: ['p-101', 'p-102'], // product IDs

  addToCompare: (productId) => {
    set((state) => {
      if (state.compareList.includes(productId)) return state;
      if (state.compareList.length >= 4) {
        // Replace oldest or cap at 4
        return { compareList: [...state.compareList.slice(1), productId] };
      }
      return { compareList: [...state.compareList, productId] };
    });
  },

  removeFromCompare: (productId) => {
    set((state) => ({
      compareList: state.compareList.filter((id) => id !== productId)
    }));
  },

  toggleCompare: (productId) => {
    if (get().isInCompare(productId)) {
      get().removeFromCompare(productId);
    } else {
      get().addToCompare(productId);
    }
  },

  isInCompare: (productId) => {
    return get().compareList.includes(productId);
  },

  clearCompare: () => set({ compareList: [] })
}));
