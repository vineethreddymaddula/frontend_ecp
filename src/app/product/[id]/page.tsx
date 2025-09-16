'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/store';
import Toast from '@/components/Toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { HiShoppingCart } from 'react-icons/hi';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [showToast, setShowToast] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { selectedProduct, loading, error, fetchProductById, addToCart } = useAppStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      for (let i = 0; i < quantity; i++) {
        addToCart(selectedProduct);
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
        <LoadingSpinner size="xl" variant="primary" text="Loading product..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
        <div className="bg-white shadow-elegant rounded-2xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-error mb-4">Oops! Something went wrong.</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            className="bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
        <div className="bg-white shadow-elegant rounded-2xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Product Not Found</h2>
          <p className="text-gray-700">We couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-premium max-w-6xl mx-auto overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-square bg-primary-50 overflow-hidden">
                <img
                  src={selectedProduct.images[0] || '/placeholder.png'}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedProduct.images.map((_, index) => (
                  <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block bg-accent-light text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {selectedProduct.category}
                </span>
                <h1 className="text-4xl font-bold text-primary-900 mb-4 leading-tight">
                  {selectedProduct.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-primary-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-primary-600">(4.0) • 127 reviews</span>
              </div>

              <p className="text-primary-600 text-lg mb-8 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-primary-900">
                  ₹{selectedProduct.price.toFixed(2)}
                </span>
                <span className="text-xl text-primary-400 line-through">
                  ₹{(selectedProduct.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save 20%
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-8">
                <div className={`w-3 h-3 rounded-full ${selectedProduct.stock > 0 ? 'bg-success' : 'bg-error'}`}></div>
                <span className={`font-medium ${selectedProduct.stock > 0 ? 'text-success' : 'text-error'}`}>
                  {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              {selectedProduct.stock > 0 && (
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-primary-700 font-medium">Quantity:</span>
                  <div className="flex items-center border-2 border-primary-200 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-primary-700 hover:bg-primary-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                      className="px-4 py-2 text-primary-700 hover:bg-primary-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock === 0}
                  className="flex-1 bg-gradient-to-r from-accent to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-premium transform hover:scale-105 transition-all duration-300 disabled:bg-primary-300 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  <HiShoppingCart className="w-5 h-5" />
                  <span>{selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button className="border-2 border-accent text-accent font-bold py-4 px-8 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Wishlist</span>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-primary-600">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-600">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-600">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-600">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toast message={`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`} show={showToast} type="success" />
      </main>
    </div>
  );
}