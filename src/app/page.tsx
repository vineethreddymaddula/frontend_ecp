'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
  const { products, loading, error, fetchProducts } = useAppStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <LoadingSpinner size="xl" variant="primary" text="Loading products..." />
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
            onClick={fetchProducts}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-primary tracking-tight">
            Discover Our Exclusive Collection
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked for quality and style. Find your next favorite item with us.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">No Products Available</h2>
            <p className="text-gray-500 mt-2">Please check back later for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
