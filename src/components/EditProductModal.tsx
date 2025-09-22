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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-primary mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" value={formData.name || ''} onChange={handleChange} placeholder="Product Name" required className="w-full p-3 border rounded-md" />
          <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Product Description" required className="w-full p-3 border rounded-md h-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="price" type="number" step="0.01" value={formData.price || ''} onChange={handleChange} placeholder="Price" required className="w-full p-3 border rounded-md" />
            <input name="category" type="text" value={formData.category || ''} onChange={handleChange} placeholder="Category" required className="w-full p-3 border rounded-md" />
          </div>
          <input name="stock" type="number" value={formData.stock || ''} onChange={handleChange} placeholder="Stock Quantity" required className="w-full p-3 border rounded-md" />
          <textarea name="images" value={formData.images || ''} onChange={handleChange} placeholder="Image URLs (comma-separated)" className="w-full p-3 border rounded-md h-24" />
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors disabled:bg-gray-400">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}