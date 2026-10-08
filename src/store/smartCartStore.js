import { create } from 'zustand';
import { MOCK_SMART_CART_SESSION } from '../services/mock/mockData';

export const useSmartCartStore = create((set, get) => ({
  session: MOCK_SMART_CART_SESSION,
  isConnected: true,
  isScanning: false,
  activeSuggestion: MOCK_SMART_CART_SESSION.activeSuggestion,

  setSession: (sessionData) => set({ session: sessionData }),
  setConnectedState: (status) => set({ isConnected: status }),
  
  // Simulate scanning a barcode / item in store
  scanProduct: (product) => {
    set({ isScanning: true });
    setTimeout(() => {
      const currentItems = get().session.items;
      const existing = currentItems.find((i) => i.id === product.id);
      let newItems;
      if (existing) {
        newItems = currentItems.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        newItems = [...currentItems, { id: product.id, name: product.name, price: product.price, qty: 1, weight: '1.0 kg' }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.qty, 0);

      // Trigger recommendation / alternative if scanned product has a cheaper twin
      let suggestion = null;
      if (product.id === 'p-104') {
        suggestion = {
          scannedProduct: { id: 'p-104', name: 'Saffola Gold Multisource Oil', price: 158, rating: 4.8 },
          betterAlternative: { id: 'p-103', name: 'Fortune Sunlite Sunflower Oil', price: 132, rating: 4.7, similarity: 94 },
          savingsAmount: 26,
          reason: 'Better Value & 20% discount offer active'
        };
      } else if (product.id === 'p-102') {
        suggestion = {
          scannedProduct: { id: 'p-102', name: 'Heritage Toned Milk', price: 56, rating: 4.5 },
          betterAlternative: { id: 'p-101', name: 'Amul Taaza Toned Milk', price: 54, rating: 4.8, similarity: 98 },
          savingsAmount: 2,
          reason: 'Higher customer rating & lower unit price'
        };
      }

      set({
        isScanning: false,
        activeSuggestion: suggestion,
        session: {
          ...get().session,
          items: newItems,
          currentTotal: newTotal
        }
      });
    }, 600);
  },

  acceptSuggestion: () => {
    const suggestion = get().activeSuggestion;
    if (!suggestion) return;

    const { scannedProduct, betterAlternative, savingsAmount } = suggestion;
    let items = get().session.items;
    // Remove scanned product if exists, add alternative
    items = items.filter((i) => i.id !== scannedProduct.id);
    const existingAlt = items.find((i) => i.id === betterAlternative.id);
    if (existingAlt) {
      items = items.map((i) => i.id === betterAlternative.id ? { ...i, qty: i.qty + 1 } : i);
    } else {
      items.push({ id: betterAlternative.id, name: betterAlternative.name, price: betterAlternative.price, qty: 1, weight: '1.0 kg' });
    }

    const newTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    set({
      activeSuggestion: null,
      session: {
        ...get().session,
        items,
        currentTotal: newTotal
      }
    });
  },

  dismissSuggestion: () => {
    set({ activeSuggestion: null });
  },

  updateItemQty: (id, delta) => {
    const items = get().session.items
      .map((item) => {
        if (item.id === id) {
          const qty = item.qty + delta;
          return qty > 0 ? { ...item, qty } : null;
        }
        return item;
      })
      .filter(Boolean);

    const newTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    set({
      session: {
        ...get().session,
        items,
        currentTotal: newTotal
      }
    });
  }
}));
