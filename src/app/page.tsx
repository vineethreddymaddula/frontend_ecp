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
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
      <LoadingSpinner size="xl" variant="primary" text="Loading products..." />
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
          onClick={fetchProducts}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-primary-50">
    {/* Hero Section */}
    <HeroSection />

    {/* Products Section */}
    <main className="container mx-auto px-6 py-16" id="products">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl font-bold text-primary-900 mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-primary-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium products, carefully curated for quality and style.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-accent to-purple-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-primary-700 mb-2">No Products Available</h3>
          <p className="text-primary-500">Please check back later for new arrivals.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  </div>
);
}