import { IProduct } from '@/interfaces/product.interface';
import { useState, useEffect } from 'react';

interface EditProductModalProps {
  product: IProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: { name: string; description: string; price: string; category: string; stock: string; images: string }) => void;
  isLoading: boolean;
}

export default function EditProductModal({ product, isOpen, onClose, onSave, isLoading }: EditProductModalProps) {
  const [formData, setFormData] = useState<{ name: string; description: string; price: string; category: string; stock: string; images: string }>({ name: '', description: '', price: '', category: '', stock: '', images: '' });

  useEffect(() => {
    // Pre-fill form when a product is selected
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        images: product.images.join(', '), // Convert array to comma-separated string for the textarea
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-app-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            name="name" 
            type="text" 
            value={formData.name || ''} 
            onChange={handleChange} 
            placeholder="Product Name" 
            required 
            className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent" 
          />
          <textarea 
            name="description" 
            value={formData.description || ''} 
            onChange={handleChange} 
            placeholder="Product Description" 
            required 
            className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 text-app-sm h-20 resize-none focus:ring-2 focus:ring-accent focus:border-transparent" 
          />
          <div className="grid grid-cols-2 gap-3">
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              value={formData.price || ''} 
              onChange={handleChange} 
              placeholder="Price" 
              required 
              className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent" 
            />
            <input 
              name="stock" 
              type="number" 
              value={formData.stock || ''} 
              onChange={handleChange} 
              placeholder="Stock" 
              required 
              className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent" 
            />
          </div>
          <input 
            name="category" 
            type="text" 
            value={formData.category || ''} 
            onChange={handleChange} 
            placeholder="Category" 
            required 
            className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent" 
          />
          <textarea 
            name="images" 
            value={formData.images || ''} 
            onChange={handleChange} 
            placeholder="Image URLs (comma-separated)" 
            className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 text-app-sm h-16 resize-none focus:ring-2 focus:ring-accent focus:border-transparent" 
          />
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-app-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading} 
              className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors disabled:bg-primary-400 dark:disabled:bg-primary-600 text-app-sm"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}