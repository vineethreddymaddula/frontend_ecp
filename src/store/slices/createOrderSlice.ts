import { StateCreator } from 'zustand';
import api from '@/lib/axios';
import { IOrder } from '@/interfaces/order.interface';
import { CartSlice } from './createCartSlice'; // Import CartSlice type

export interface OrderSlice {
  myOrders: IOrder[];
  selectedOrder: IOrder | null;
  orderLoading: boolean;
  orderError: string | null;
  fetchMyOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  createOrder: (orderData: Omit<IOrder, '_id' | 'user' | 'createdAt' | 'updatedAt' | 'isDelivered' | 'deliveredAt'>) => Promise<IOrder | null>;
}

// --- THE FIX IS HERE ---
// We now correctly accept 'get' as the second parameter.
export const createOrderSlice: StateCreator<OrderSlice & CartSlice, [], [], OrderSlice> = (set, get) => ({
  myOrders: [],
  selectedOrder: null,
  orderLoading: false,
  orderError: null,
  
  fetchMyOrders: async () => {
    set({ orderLoading: true, orderError: null });
    try {
      const { data } = await api.get<IOrder[]>('/orders/myorders');
      set({ myOrders: data, orderLoading: false });
    } catch (err: unknown) {
      set({ orderError: (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch orders', orderLoading: false });
    }
  },

  fetchOrderById: async (id: string) => {
    set({ orderLoading: true, orderError: null });
    try {
      const { data } = await api.get<IOrder>(`/orders/${id}`);
      set({ selectedOrder: data, orderLoading: false });
    } catch (err: unknown) {
      set({ orderError: (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch order', orderLoading: false });
    }
  },
  
  createOrder: async (orderData) => {
    set({ orderLoading: true, orderError: null });
    try {
      const { data: newOrder } = await api.post<IOrder>('/orders', orderData);
      set({ orderLoading: false });
      
      // Now that 'get' is defined, this works correctly.
      get().clearCart(); 
      
      return newOrder;
    } catch (err: unknown) {
      set({ orderError: (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to create order', orderLoading: false });
      return null;
    }
  },
});