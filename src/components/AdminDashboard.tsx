"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import EditProductModal from "@/components/EditProductModal";
import ConfirmModal from "@/components/ConfirmModal";
import Toast from "@/components/Toast";
import FormInput from "@/components/FormInput";
import { IProduct } from "@/interfaces/product.interface";

// Self-contained Icon components for a cleaner UI
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;

export default function AdminDashboard() {
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct, loading, error } = useAppStore();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const images = (formData.get("images") as string).split(",").map((url) => url.trim()).filter(Boolean);

    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string, 10),
      images,
    };

    const success = await createProduct(productData);
    setToastMessage(success ? "Product created successfully!" : error || "Failed to create product.");
    setShowToast(true);
    if (success) form.reset();
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveChanges = async (formData: any) => {
    if (!selectedProduct) return;
    const images = (formData.images as string).split(",").map((url) => url.trim()).filter(Boolean);
    const productData = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock, 10), images };

    const success = await updateProduct(selectedProduct._id, productData);
    setToastMessage(success ? "Product updated successfully!" : error || "Failed to update product.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    if (success) setIsEditModalOpen(false);
  };

  const handleOpenEditModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    const success = await deleteProduct(selectedProduct._id);
    setToastMessage(success ? 'Product deleted successfully!' : (error || 'Failed to delete product.'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Product Management</h1>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-subtle mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-6">Add New Product</h2>
        <form onSubmit={handleCreateProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormInput label="Product Name" id="name" name="name" type="text" placeholder="e.g., Artisan Keycap Set" required />
            </div>
            <div className="md:col-span-2">
              <FormInput as="textarea" label="Description" id="description" name="description" placeholder="Describe the product..." required />
            </div>
            <FormInput label="Price" id="price" name="price" type="number" step="0.01" placeholder="e.g., 59.99" required />
            <FormInput label="Category" id="category" name="category" type="text" placeholder="e.g., Keycaps" required />
            <FormInput label="Stock Quantity" id="stock" name="stock" type="number" placeholder="e.g., 150" required />
            <div className="md:col-span-2">
              <FormInput as="textarea" label="Image URLs (comma-separated)" id="images" name="images" placeholder="Enter URLs separated by commas" />
            </div>
          </div>
          <div className="mt-8 border-t pt-6">
            <button type="submit" disabled={loading} className="flex items-center justify-center w-full md:w-auto md:float-right bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors disabled:bg-gray-400">
              <PlusIcon />
              {loading ? 'Creating...' : 'Add New Product'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-subtle">
        <h2 className="text-2xl font-semibold text-primary mb-6">Existing Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <img src={product.images[0] || '/placeholder.png'} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-primary">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lg font-semibold text-accent">₹{product.price.toFixed(2)}</span>
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{product.stock} in stock</span>
                </div>
                <div className="mt-4 pt-4 border-t flex-grow flex items-end justify-end gap-2">
                  <button onClick={() => handleOpenEditModal(product)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold p-2 rounded-md hover:bg-blue-50 transition-colors"><EditIcon /> Edit</button>
                  <button onClick={() => handleOpenDeleteModal(product)} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-semibold p-2 rounded-md hover:bg-red-50 transition-colors"><DeleteIcon /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toast message={toastMessage} show={showToast} />
      <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveChanges} product={selectedProduct} isLoading={loading} />
      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Confirm Deletion" message={`Are you sure you want to permanently delete "${selectedProduct?.name}"? This action cannot be undone.`} />
    </div>
  );
}