import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [
    {
      product: {
        id: 'p-101',
        name: 'Amul Taaza Toned Milk (Pouch)',
        brand: 'Amul',
        variant: '1 L',
        price: 54,
        mrp: 58,
        discount: '7% OFF',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80',
        inStock: true
      },
      quantity: 2
    },
    {
      product: {
        id: 'p-103',
        name: 'Fortune Sunlite Refined Sunflower Oil',
        brand: 'Fortune',
        variant: '1 L Pouch',
        price: 132,
        mrp: 165,
        discount: '20% OFF',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
        inStock: true
      },
      quantity: 1
    }
  ],
  isCartDrawerOpen: false,

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.cart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += quantity;
        return { cart: updatedCart, isCartDrawerOpen: true };
      } else {
        return { cart: [...state.cart, { product, quantity }], isCartDrawerOpen: true };
      }
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    }));
  },

  clearCart: () => set({ cart: [] }),

  // Computed helper helpers
  getCartTotal: () => {
    const cart = get().cart;
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  getCartMrpTotal: () => {
    const cart = get().cart;
    return cart.reduce((total, item) => total + item.product.mrp * item.quantity, 0);
  },

  getCartDiscount: () => {
    return get().getCartMrpTotal() - get().getCartTotal();
  },

  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));
