'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
const { products, loading, error, fetchProducts } = useAppStore();

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-900 mobile-container">
      <LoadingSpinner size="lg" variant="primary" text="Loading products..." />
    </div>
  );
}

if (error) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-900 mobile-container">
      <div className="bg-white dark:bg-primary-800 shadow-elegant app-card text-center max-w-sm">
        <h2 className="text-app-base font-bold text-error mb-3">Something went wrong</h2>
        <p className="text-app-sm text-primary-700 dark:text-primary-300 mb-4">{error}</p>
        <button
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors btn-touch text-app-sm font-medium"
          onClick={fetchProducts}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
    {/* Hero Section */}
    <HeroSection />

    {/* Products Section */}
    <main className="mobile-container py-4" id="products">
      <div className="mb-4 animate-fade-in">
        <h2 className="text-app-lg font-bold text-primary-900 dark:text-primary-100 mb-2">
          Featured Products
        </h2>
        <p className="text-app-sm text-primary-600 dark:text-primary-400">
          Discover premium products curated for you
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-400 dark:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-app-base font-semibold text-primary-700 dark:text-primary-300 mb-1">No Products Available</h3>
          <p className="text-app-sm text-primary-500 dark:text-primary-400">Check back later for new arrivals</p>
        </div>
      ) : (
        <div className="app-grid animate-fade-in">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  </div>
);
}