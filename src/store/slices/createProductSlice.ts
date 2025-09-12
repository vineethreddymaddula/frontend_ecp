import { StateCreator } from 'zustand';
import { IProduct } from '@/interfaces/product.interface';
import api from '@/lib/axios';

// --- TYPE DEFINITIONS ---
// For creating a new product
type CreateProductData = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>;
// For updating a product (all fields are optional)
type UpdateProductData = Partial<CreateProductData>;

// --- INTERFACE ---
// Defines the complete shape of the slice for TypeScript
export interface ProductSlice {
  products: IProduct[];
  selectedProduct: IProduct | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (productData: CreateProductData) => Promise<boolean>;
  updateProduct: (productId: string, productData: UpdateProductData) => Promise<boolean>;
  deleteProduct: (productId: string) => Promise<boolean>;
}

// --- SLICE IMPLEMENTATION ---
export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  // --- STATE ---
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,

  // --- ACTIONS ---
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<IProduct[]>('/products');
      set({ products: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  fetchProductById: async (id: string) => {
    set({ loading: true, error: null, selectedProduct: null });
    try {
      const response = await api.get<IProduct>(`/products/${id}`);
      set({ selectedProduct: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      await api.post('/products', productData);
      set({ loading: false });
      await get().fetchProducts(); // Refresh list after creation
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to create product';
      set({ error: errorMsg, loading: false });
      return false;
    }
  },
  
  updateProduct: async (productId, productData) => {
    set({ loading: true, error: null });
    try {
      const { data: updatedProduct } = await api.put<IProduct>(`/products/${productId}`, productData);
      // Update the product in the list instantly for a better UX
      set((state) => ({
        products: state.products.map((p) => (p._id === productId ? updatedProduct : p)),
        loading: false,
      }));
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update product';
      set({ error: errorMsg, loading: false });
      return false;
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/products/${productId}`);
      // Remove the product from the list instantly
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        loading: false,
      }));
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to delete product';
      set({ error: errorMsg, loading: false });
      return false;
    }
  },
});