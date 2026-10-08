import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    id: 'usr-901',
    name: 'Vishwanathan G',
    email: 'vishwa@smartmart.com',
    role: 'admin', // 'customer' or 'admin'
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    addresses: [
      {
        id: 'addr-1',
        title: 'Home',
        name: 'Vishwanathan G',
        line1: 'Flat 402, Green Glen Layout',
        line2: 'Bellandur, Outer Ring Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560103',
        isDefault: true
      }
    ]
  },
  isAuthenticated: true,
  token: 'mock-jwt-token-123456789',

  login: (email, password) => {
    const isAdmin = email.includes('admin');
    const newUser = {
      id: isAdmin ? 'adm-001' : 'usr-901',
      name: isAdmin ? 'SmartMart Admin' : 'Vishwanathan G',
      email: email,
      role: isAdmin ? 'admin' : 'customer',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
    };
    set({ user: newUser, isAuthenticated: true, token: 'mock-token-xyz' });
    return newUser;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, token: null });
  },

  updateProfile: (updatedData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedData } : null
    }));
  }
}));
