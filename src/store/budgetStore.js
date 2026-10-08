import { create } from 'zustand';

export const useBudgetStore = create((set) => ({
  budgetLimit: 2000,
  isBudgetModeEnabled: true,

  setBudgetLimit: (limit) => set({ budgetLimit: limit }),
  toggleBudgetMode: () => set((state) => ({ isBudgetModeEnabled: !state.isBudgetModeEnabled })),
}));
