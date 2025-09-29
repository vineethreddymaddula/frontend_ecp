'use client';

import { useState } from 'react';
import { IProduct } from '@/interfaces/product.interface';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store';
import { HiShoppingCart } from 'react-icons/hi';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useAppStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group bg-white dark:bg-primary-800 rounded-2xl shadow-subtle hover:shadow-premium transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden animate-scale-in">
      <Link href={`/product/${product._id}`}>
        <div className="relative w-full h-48 sm:h-64 bg-primary-50 dark:bg-primary-700 overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 dark:from-primary-700 dark:via-primary-600 dark:to-primary-700"></div>
          )}
          
          <Image
            src={product.images[0] || 'https://images.pexels.com/photos/6604246/pexels-photo-6604246.jpeg'}
            alt={product.name}
            width={400}
            height={256}
            className={`w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay with quick actions - Hidden on mobile for better touch experience */}
          <div className="absolute inset-0 bg-black/0 sm:group-hover:bg-black/20 transition-all duration-300 hidden sm:flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 space-x-2">
              <button
                onClick={handleQuickAdd}
                className="bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-200 transform hover:scale-110 btn-touch"
                title="Quick Add to Cart"
              >
                <HiShoppingCart className="w-5 h-5" />
              </button>
              <button
                className="bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200 transform hover:scale-110 btn-touch"
                title="Add to Wishlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile quick add button */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden absolute bottom-3 right-3 bg-accent text-white p-4 rounded-full shadow-lg btn-touch"
            title="Add to Cart"
          >
            <HiShoppingCart className="w-4 h-4" />
          </button>

          {/* Stock badge */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-warning text-white text-xs font-bold px-2 py-1 rounded-full">
              Only {product.stock} left
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium text-accent bg-accent-light dark:bg-accent/20 dark:text-accent px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < 4 ? 'text-yellow-400' : 'text-primary-200 dark:text-primary-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs sm:text-sm text-primary-500 dark:text-primary-400 ml-1">(4.0)</span>
          </div>
        </div>
        
        <h3 className="text-base sm:text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
          {product.name}
        </h3>
        
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-2xl font-bold text-primary-900 dark:text-primary-100">₹{product.price.toFixed(2)}</span>
            <span className="text-xs sm:text-sm text-primary-400 dark:text-primary-500 line-through">₹{(product.price * 1.2).toFixed(2)}</span>
          </div>
          <span className="text-xs sm:text-sm text-success font-medium">Free Shipping</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;