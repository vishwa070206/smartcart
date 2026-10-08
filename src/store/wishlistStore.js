import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  wishlist: ['p-105', 'p-108'],

  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlist.includes(productId);
      if (exists) {
        return { wishlist: state.wishlist.filter((id) => id !== productId) };
      } else {
        return { wishlist: [...state.wishlist, productId] };
      }
    });
  },

  isInWishlist: (productId) => {
    return get().wishlist.includes(productId);
  },

  clearWishlist: () => set({ wishlist: [] })
}));
