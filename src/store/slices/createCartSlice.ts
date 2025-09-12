import { StateCreator } from 'zustand';
import { CartItem } from '@/interfaces/cart.interface';
import { IProduct } from '@/interfaces/product.interface';

export interface CartSlice {
  items: CartItem[];
  addToCart: (product: IProduct) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  items: [],
  addToCart: (product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item._id === product._id);

    if (existingItem) {
      const updatedItems = currentItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...currentItems, { ...product, quantity: 1 }] });
    }
  },
  
  // --- New Action: Update Quantity ---
  updateQuantity: (productId, quantity) => {
    // Ensure quantity is at least 1, otherwise remove the item
    if (quantity < 1) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  // --- New Action: Remove From Cart ---
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item._id !== productId),
    }));
  },
});
