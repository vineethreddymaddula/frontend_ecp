'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAppStore } from '@/store';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
const { products, loading, error, fetchProducts } = useAppStore();
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [priceRange, setPriceRange] = useState('all');
const [sortBy, setSortBy] = useState('name');
const [showFilters, setShowFilters] = useState(false);

// Get unique categories
const categories = useMemo(() => {
  const cats = products.map(p => p.category);
  return ['all', ...new Set(cats)];
}, [products]);

// Filter and sort products
const filteredProducts = useMemo(() => {
  let filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'under-1000') matchesPrice = product.price < 1000;
    else if (priceRange === '1000-5000') matchesPrice = product.price >= 1000 && product.price <= 5000;
    else if (priceRange === 'over-5000') matchesPrice = product.price > 5000;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });
  
  return filtered;
}, [products, searchTerm, selectedCategory, priceRange, sortBy]);

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
    <main className="app-container app-padding py-4" id="products">
      <div className="mb-4 animate-fade-in">
        <h2 className="text-app-lg font-bold text-primary-900 dark:text-primary-100 mb-2">
          Products
        </h2>
        <p className="text-app-sm text-primary-600 dark:text-primary-400">
          Discover premium products curated for you
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 pr-4 border border-primary-200 dark:border-primary-600 rounded-xl bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-600 transition-colors text-app-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            Filters
          </button>
          
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-600 rounded-lg text-primary-900 dark:text-primary-100 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="app-card space-y-4 animate-fade-in">
            {/* Category Filter */}
            <div>
              <label className="block text-app-xs font-medium text-primary-700 dark:text-primary-300 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-app-xs font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent text-white'
                        : 'bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-600'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-app-xs font-medium text-primary-700 dark:text-primary-300 mb-2">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'under-1000', label: 'Under ₹1,000' },
                  { value: '1000-5000', label: '₹1,000 - ₹5,000' },
                  { value: 'over-5000', label: 'Over ₹5,000' }
                ].map(range => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`px-3 py-2 rounded-lg text-app-xs font-medium transition-colors ${
                      priceRange === range.value
                        ? 'bg-accent text-white'
                        : 'bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-600'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
                setSortBy('name');
              }}
              className="w-full py-2 px-4 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-app-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-400 dark:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-app-base font-semibold text-primary-700 dark:text-primary-300 mb-1">
            {products.length === 0 ? 'No Products Available' : 'No Products Found'}
          </h3>
          <p className="text-app-sm text-primary-500 dark:text-primary-400">
            {products.length === 0 ? 'Check back later for new arrivals' : 'Try adjusting your search or filters'}
          </p>
        </div>
      ) : (
        <div className="app-grid animate-fade-in">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  </div>
);
}