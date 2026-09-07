import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserProfile, UserAddress, Order } from '../types';
import { api } from '../services/api';

interface AuthState {
  user: UserProfile | null;
  orders: Order[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (name: string, email: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => Promise<void>;
  addOrder: (order: Order) => void;
  fetchUserOrders: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (name: string, email: string, phone?: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.login(name, email, phone);
          set({
            user: res.user,
            isAuthenticated: true,
            isLoading: false,
          });
          // Fetch orders for this user from DB
          get().fetchUserOrders();
          return true;
        } catch (err: any) {
          console.error('Login error:', err);
          // Fallback local login if offline
          const fallbackUser: UserProfile = {
            id: `usr-${Date.now()}`,
            name,
            email,
            phone,
            role: email.toLowerCase() === 'admin@truechakki.com' ? 'ADMIN' : 'CUSTOMER',
            addresses: [],
          };
          set({
            user: fallbackUser,
            isAuthenticated: true,
            isLoading: false,
            error: err.message || 'Server offline, logged in locally',
          });
          return true;
        }
      },

      logout: () => {
        set({ user: null, orders: [], isAuthenticated: false, error: null });
      },

      addAddress: async (addressData) => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          const newAddr = await api.addAddress({
            userId: currentUser.id,
            ...addressData,
          });
          set({
            user: {
              ...currentUser,
              addresses: [...currentUser.addresses, newAddr],
            },
          });
        } catch (err: any) {
          console.error('Failed to add address to DB:', err);
          // Local fallback
          const localAddr: UserAddress = {
            ...addressData,
            id: `addr-${Date.now()}`,
          };
          set({
            user: {
              ...currentUser,
              addresses: [...currentUser.addresses, localAddr],
            },
          });
        }
      },

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      fetchUserOrders: async () => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          const dbOrders = await api.getOrders(currentUser.id);
          if (dbOrders && Array.isArray(dbOrders)) {
            set({ orders: dbOrders });
          }
        } catch (err: any) {
          console.error('Failed to fetch user orders from DB:', err);
        }
      },
    }),
    {
      name: 'true-chakki-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

