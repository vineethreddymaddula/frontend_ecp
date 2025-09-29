import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ProductSlice, createProductSlice } from './slices/createProductSlice';
import { AuthSlice, createAuthSlice } from './slices/createAuthSlice';
import { CartSlice, createCartSlice } from './slices/createCartSlice';
import { OrderSlice, createOrderSlice } from './slices/createOrderSlice';
import { AddressSlice, createAddressSlice } from './slices/createAddressSlice';

// Combine all slice types
type AppState = ProductSlice & AuthSlice & CartSlice & OrderSlice & AddressSlice;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...a) => ({
        ...createProductSlice(...a),
        ...createAuthSlice(...a),
        ...createCartSlice(...a),
        ...createOrderSlice(...a),
        ...createAddressSlice(...a),
      }),
      {
        name: 'ecp-store',
        partialize: (state) => ({
          user: state.user,
          items: state.items,
          addresses: state.addresses,
        }),
      }
    )
  )
);