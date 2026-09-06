import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserProfile, UserAddress, Order } from '../types';

interface AuthState {
  user: UserProfile | null;
  orders: Order[];
  isAuthenticated: boolean;

  // Actions
  login: (name: string, email: string) => void;
  logout: () => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  addOrder: (order: Order) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        id: 'usr-101',
        name: 'Aarav Sharma',
        email: 'aarav@example.com',
        phone: '+91 98765 43210',
        addresses: [
          {
            id: 'addr-1',
            street: '42 Organic Green Meadows, Farm Road',
            city: 'New Delhi',
            state: 'Delhi',
            zipCode: '110001',
            country: 'India',
            isDefault: true,
          },
        ],
      },
      orders: [
        {
          id: 'ord-8901',
          orderNumber: 'TC-2026-8901',
          date: '2026-08-28',
          items: [
            {
              id: 'item-1',
              productId: 'p-1',
              productName: 'Whole Wheat Fresh Atta',
              productImage: '/images/hero-bg.jpg',
              variantName: '5kg Bag',
              unitPrice: 380,
              quantity: 1,
            },
          ],
          subtotal: 380,
          shippingFee: 0,
          totalAmount: 380,
          status: 'DELIVERED',
          shippingAddress: {
            id: 'addr-1',
            street: '42 Organic Green Meadows, Farm Road',
            city: 'New Delhi',
            state: 'Delhi',
            zipCode: '110001',
            country: 'India',
            isDefault: true,
          },
          paymentMethod: 'UPI',
        },
      ],
      isAuthenticated: true,

      login: (name: string, email: string) => {
        set({
          user: {
            id: `usr-${Date.now()}`,
            name,
            email,
            addresses: [],
          },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      addAddress: (addressData) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const newAddress: UserAddress = {
          ...addressData,
          id: `addr-${Date.now()}`,
        };

        set({
          user: {
            ...currentUser,
            addresses: [...currentUser.addresses, newAddress],
          },
        });
      },

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
    }),
    {
      name: 'true-chakki-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
