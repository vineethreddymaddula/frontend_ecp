"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import EditProductModal from "@/components/EditProductModal";
import Toast from "@/components/Toast";
import Image from "next/image";
import { IProduct } from "@/interfaces/product.interface";

export default function AdminDashboard() {
  // State from the Zustand store
  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
  } = useAppStore();

  // Local state for UI management
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handler to create a new product
  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // <-- Capture the form here
    const formData = new FormData(form);
    const images = (formData.get("images") as string)
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string, 10),
      images,
    };

    const success = await createProduct(productData);
    setToastMessage(
      success
        ? "Product created successfully!"
        : error || "Failed to create product."
    );
    setShowToast(true);

    if (success) {
      form.reset(); // <-- Use the captured form reference
    }

    setTimeout(() => setShowToast(false), 3000);
  };

  // Handler to delete a product with confirmation
  const handleDeleteProduct = async (productId: string) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this product?"
      )
    ) {
      const success = await deleteProduct(productId);
      setToastMessage(
        success
          ? "Product deleted successfully!"
          : error || "Failed to delete product."
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Handlers to manage the edit modal
  const handleOpenEditModal = (product: IProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  // Handler to save changes from the edit modal
  const handleSaveChanges = async (formData: any) => {
    if (!editingProduct) return;
    const images = (formData.images as string)
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      images,
    };

    const success = await updateProduct(editingProduct._id, productData);
    setToastMessage(
      success
        ? "Product updated successfully!"
        : error || "Failed to update product."
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    if (success) handleCloseEditModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>

      {/* Create Product Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Create New Product
        </h2>
        <form onSubmit={handleCreateProduct} className="space-y-6">
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            required
            className="w-full p-3 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            required
            className="w-full p-3 border rounded-md h-32"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              name="category"
              type="text"
              placeholder="Category"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
          <input
            name="stock"
            type="number"
            placeholder="Stock Quantity"
            required
            className="w-full p-3 border rounded-md"
          />
          <textarea
            name="images"
            placeholder="Image URLs (comma-separated)"
            className="w-full p-3 border rounded-md h-24"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>

      {/* Manage Products List */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Manage Existing Products
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Product</th>
                <th className="text-left py-3 px-4 font-semibold">Category</th>
                <th className="text-left py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Stock</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-4 flex items-center gap-4">
                    <img
                      src={product.images[0] || "/placeholder.png"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <span className="font-medium">{product.name}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{product.stock}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="text-blue-600 hover:underline font-semibold mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast and Modal Components */}
      <Toast message={toastMessage} show={showToast} />
      <EditProductModal
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveChanges}
        product={editingProduct}
        isLoading={loading}
      />
    </div>
  );
}
