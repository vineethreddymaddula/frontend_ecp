"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppStore } from "@/store";
import EditProductModal from "@/components/EditProductModal";
import ConfirmModal from "@/components/ConfirmModal";
import Toast from "@/components/Toast";
import FormInput from "@/components/FormInput";
import { IProduct } from "@/interfaces/product.interface";

// Compact icons for mobile
const PlusIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const EditIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DeleteIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const StatsIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

export default function AdminDashboard() {
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct, loading, error } = useAppStore();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add'>('overview');

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
    if (success) {
      form.reset();
      setActiveTab('products');
    }
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveChanges = async (formData: { name: string; description: string; price: string; category: string; stock: string; images: string }) => {
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

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockProducts = products.filter(product => product.stock < 10).length;

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="app-container app-padding py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-app-xl font-bold text-primary-900 dark:text-primary-100">Admin Dashboard</h1>
          <p className="text-app-sm text-primary-600 dark:text-primary-400 mt-1">Manage your store</p>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex bg-white dark:bg-primary-800 rounded-xl p-1 mb-4 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-app-xs font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-accent text-white' 
                : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100'
            }`}
          >
            <StatsIcon />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-app-xs font-medium transition-colors ${
              activeTab === 'products' 
                ? 'bg-accent text-white' 
                : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-app-xs font-medium transition-colors ${
              activeTab === 'add' 
                ? 'bg-accent text-white' 
                : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100'
            }`}
          >
            <PlusIcon />
            Add
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="app-card text-center">
                <div className="text-app-lg font-bold text-accent">{totalProducts}</div>
                <div className="text-app-xs text-primary-600 dark:text-primary-400">Total Products</div>
              </div>
              <div className="app-card text-center">
                <div className="text-app-lg font-bold text-green-600 dark:text-green-400">₹{totalValue.toFixed(0)}</div>
                <div className="text-app-xs text-primary-600 dark:text-primary-400">Inventory Value</div>
              </div>
            </div>
            
            <div className="app-card">
              <div className="text-app-sm font-semibold text-primary-900 dark:text-primary-100 mb-3">Quick Stats</div>
              <div className="space-y-2">
                <div className="flex justify-between text-app-xs">
                  <span className="text-primary-600 dark:text-primary-400">Low Stock Items</span>
                  <span className={`font-medium ${lowStockProducts > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {lowStockProducts}
                  </span>
                </div>
                <div className="flex justify-between text-app-xs">
                  <span className="text-primary-600 dark:text-primary-400">Categories</span>
                  <span className="font-medium text-primary-900 dark:text-primary-100">
                    {new Set(products.map(p => p.category)).size}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Products */}
            <div className="app-card">
              <div className="text-app-sm font-semibold text-primary-900 dark:text-primary-100 mb-3">Recent Products</div>
              <div className="space-y-2">
                {products.slice(0, 3).map(product => (
                  <div key={product._id} className="flex items-center gap-3 p-2 bg-primary-50 dark:bg-primary-700 rounded-lg">
                    <div className="w-10 h-10 bg-primary-200 dark:bg-primary-600 rounded-lg flex-shrink-0 overflow-hidden">
                      {product.images[0] && (
                        <Image src={product.images[0]} alt={product.name} width={40} height={40} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-app-xs font-medium text-primary-900 dark:text-primary-100 truncate">{product.name}</p>
                      <p className="text-app-xs text-primary-600 dark:text-primary-400">₹{product.price} • {product.stock} left</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-app-lg font-semibold text-primary-900 dark:text-primary-100">All Products</h2>
              <span className="text-app-xs text-primary-600 dark:text-primary-400">{products.length} items</span>
            </div>
            
            <div className="app-grid gap-3">
              {products.map(product => (
                <div key={product._id} className="app-card p-3">
                  <div className="aspect-square bg-primary-100 dark:bg-primary-700 rounded-lg mb-3 overflow-hidden">
                    {product.images[0] ? (
                      <Image src={product.images[0]} alt={product.name} width={120} height={120} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary-400 dark:text-primary-500">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-app-sm font-semibold text-primary-900 dark:text-primary-100 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-app-xs text-primary-600 dark:text-primary-400 mb-2">{product.category}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-app-sm font-bold text-accent">₹{product.price}</span>
                    <span className={`text-app-xs px-2 py-1 rounded-full ${
                      product.stock > 10 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {product.stock} left
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenEditModal(product)} 
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-app-xs font-medium"
                    >
                      <EditIcon />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleOpenDeleteModal(product)} 
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-app-xs font-medium"
                    >
                      <DeleteIcon />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add' && (
          <div className="app-card">
            <h2 className="text-app-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">Add New Product</h2>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <FormInput label="Product Name" id="name" name="name" type="text" placeholder="Enter product name" required />
              <FormInput as="textarea" label="Description" id="description" name="description" placeholder="Describe the product..." required />
              
              <div className="grid grid-cols-2 gap-3">
                <FormInput label="Price (₹)" id="price" name="price" type="number" step="0.01" placeholder="0.00" required />
                <FormInput label="Stock" id="stock" name="stock" type="number" placeholder="0" required />
              </div>
              
              <FormInput label="Category" id="category" name="category" type="text" placeholder="e.g., Electronics" required />
              <FormInput as="textarea" label="Image URLs" id="images" name="images" placeholder="Enter URLs separated by commas" />
              
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full flex items-center justify-center gap-2 bg-accent text-white font-semibold py-3 px-4 rounded-xl hover:bg-accent-hover transition-colors disabled:bg-primary-400 dark:disabled:bg-primary-600 text-app-sm"
              >
                <PlusIcon />
                {loading ? 'Creating...' : 'Add Product'}
              </button>
            </form>
          </div>
        )}
      </div>

      <Toast message={toastMessage} show={showToast} />
      <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveChanges} product={selectedProduct} isLoading={loading} />
      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Delete Product" message={`Delete "${selectedProduct?.name}"? This cannot be undone.`} />
    </div>
  );
}