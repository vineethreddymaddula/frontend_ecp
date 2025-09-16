import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ProductSlice, createProductSlice } from './slices/createProductSlice';
import { AuthSlice, createAuthSlice } from './slices/createAuthSlice';
import { CartSlice, createCartSlice } from './slices/createCartSlice'; // <-- Import CartSlice
import { OrderSlice, createOrderSlice } from './slices/createOrderSlice';

// Combine all slice types
type AppState = ProductSlice & AuthSlice & CartSlice&OrderSlice;

export const useAppStore = create<AppState>()(
  devtools((...a) => ({
    ...createProductSlice(...a),
    ...createAuthSlice(...a),
    ...createCartSlice(...a), // <-- Add the CartSlice here
       ...createOrderSlice(...a),
  }))
);