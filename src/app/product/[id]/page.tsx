'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/store';
import Toast from '@/components/Toast';

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
    return <div className="text-center text-xl mt-10">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-10">Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div className="text-center text-xl mt-10">Product not found.</div>;
  }

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            {/* --- CHANGE IS HERE --- */}
            <img
              src={selectedProduct.images[0] || '/placeholder.png'}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{selectedProduct.category}</p>
            <h1 className="text-4xl font-bold text-primary mb-4">{selectedProduct.name}</h1>
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
              className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
      
      <Toast message="Item added to cart!" show={showToast} />
    </>
  );
}