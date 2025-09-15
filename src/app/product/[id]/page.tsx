'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/store';
import Toast from '@/components/Toast';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [showToast, setShowToast] = useState(false);
  const { selectedProduct, loading, error, fetchProductById, addToCart } = useAppStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <LoadingSpinner size="xl" variant="primary" text="Loading product..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-hover transition-colors"
            onClick={() => fetchProductById(id)}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Product Not Found</h2>
          <p className="text-gray-700">We couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <main className="container mx-auto px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image Gallery */}
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
              <img
                src={selectedProduct.images[0] || '/placeholder.png'}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <p className="text-sm text-gray-500 mb-2">{selectedProduct.category}</p>
              <h1 className="text-4xl font-extrabold text-primary mb-4 leading-tight tracking-tight">{selectedProduct.name}</h1>
              <p className="text-gray-700 text-base mb-6">{selectedProduct.description}</p>
              <div className="flex items-center justify-between mb-6">
                <p className="text-3xl font-bold text-accent">${selectedProduct.price.toFixed(2)}</p>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${selectedProduct.stock > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                  {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of Stock'}
                </span>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={selectedProduct.stock === 0}
                className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              >
                {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
        <Toast message="Item added to cart!" show={showToast} />
      </main>
    </div>
  );
}