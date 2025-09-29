'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-900 mobile-container">
        <LoadingSpinner size="xl" variant="primary" text="Loading product..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-900 mobile-container">
        <div className="bg-white dark:bg-primary-800 shadow-elegant rounded-2xl mobile-padding text-center max-w-md mx-4">
          <h2 className="text-xl sm:text-2xl font-bold text-error mb-4">Oops! Something went wrong.</h2>
          <p className="text-primary-700 dark:text-primary-300 mb-4 text-sm sm:text-base">{error}</p>
          <button
            className="bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 btn-touch"
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-900 mobile-container">
        <div className="bg-white dark:bg-primary-800 shadow-elegant rounded-2xl mobile-padding text-center max-w-md mx-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">Product Not Found</h2>
          <p className="text-primary-700 dark:text-primary-300 text-sm sm:text-base">We couldn&apos;t find the product you&apos;re looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="app-container app-padding py-4">
        {/* Product Image */}
        <div className="relative mb-4">
          <div className="aspect-square bg-primary-100 dark:bg-primary-700 rounded-xl overflow-hidden">
            <Image
              src={selectedProduct.images[0] || '/placeholder.png'}
              alt={selectedProduct.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          {selectedProduct.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {selectedProduct.images.map((_, index) => (
                <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="app-card mb-4">
          <div className="mb-3">
            <span className="inline-block bg-accent/10 dark:bg-accent/20 text-accent px-2 py-1 rounded-full text-app-xs font-medium mb-2">
              {selectedProduct.category}
            </span>
            <h1 className="text-app-xl font-bold text-primary-900 dark:text-primary-100 mb-2 leading-tight">
              {selectedProduct.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-primary-200 dark:text-primary-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-primary-600 dark:text-primary-400 text-app-xs">4.0 (127 reviews)</span>
          </div>

          <p className="text-primary-600 dark:text-primary-400 text-app-sm mb-4 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-app-xl font-bold text-primary-900 dark:text-primary-100">
              ₹{selectedProduct.price.toFixed(0)}
            </span>
            <span className="text-app-sm text-primary-400 dark:text-primary-500 line-through">
              ₹{(selectedProduct.price * 1.2).toFixed(0)}
            </span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-app-xs font-medium">
              20% OFF
            </span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${selectedProduct.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-app-xs font-medium ${selectedProduct.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Quantity & Actions */}
        {selectedProduct.stock > 0 && (
          <div className="app-card mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-app-sm font-medium text-primary-900 dark:text-primary-100">Quantity</span>
              <div className="flex items-center bg-primary-100 dark:bg-primary-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-600 rounded-l-lg transition-colors btn-touch"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-2 font-semibold text-primary-900 dark:text-primary-100 min-w-[3rem] text-center text-app-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="p-2 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-600 rounded-r-lg transition-colors btn-touch"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 text-app-sm"
              >
                <HiShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button className="p-3 border-2 border-accent text-accent dark:text-accent rounded-xl hover:bg-accent hover:text-white dark:hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {selectedProduct.stock === 0 && (
          <div className="app-card mb-4">
            <button 
              disabled
              className="w-full bg-primary-300 dark:bg-primary-600 text-primary-600 dark:text-primary-400 font-semibold py-3 px-4 rounded-xl cursor-not-allowed text-app-sm"
            >
              Out of Stock
            </button>
          </div>
        )}

        {/* Features */}
        <div className="app-card">
          <h3 className="text-app-sm font-semibold text-primary-900 dark:text-primary-100 mb-3">What's Included</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-app-xs text-primary-600 dark:text-primary-400">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="text-app-xs text-primary-600 dark:text-primary-400">Easy Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-app-xs text-primary-600 dark:text-primary-400">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-app-xs text-primary-600 dark:text-primary-400">24/7 Support</span>
            </div>
          </div>
        </div>
        
        <Toast message={`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`} show={showToast} type="success" />
      </div>
    </div>
  );
}