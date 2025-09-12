'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { products, loading, error, fetchProducts } = useAppStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    // We'll create a better loader in the next step
    return <div className="text-center text-xl">Loading...</div>;
  }
  // ... (error handling)
  
  return (
    // No wrapper needed here anymore
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}