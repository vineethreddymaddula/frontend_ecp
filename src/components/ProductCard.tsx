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
    <Link
      href={`/product/${product._id}`}>
      <div className="group bg-white dark:bg-primary-800 app-card hover:shadow-elegant transition-all duration-300 overflow-hidden">

        <div className="relative w-full h-32 bg-primary-50 dark:bg-primary-700 overflow-hidden rounded-lg mb-3">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 dark:from-primary-700 dark:via-primary-600 dark:to-primary-700"></div>
          )}

          <Image
            src={product.images[0] || 'https://images.pexels.com/photos/6604246/pexels-photo-6604246.jpeg'}
            alt={product.name}
            width={200}
            height={128}
            className={`w-full h-full object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImageLoaded(true)}
          />

          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 right-2 bg-accent text-white p-4 rounded-full shadow-lg btn-touch"
            title="Add to Cart"
          >
            <HiShoppingCart className="w-3 h-3" />
          </button>

          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-warning text-white text-xs font-bold px-1.5 py-0.5 rounded">
              {product.stock} left
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-error text-white text-xs font-bold px-1.5 py-0.5 rounded">
              Out of Stock
            </div>
          )}
        </div>


        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-accent bg-accent-light dark:bg-accent/20 px-1.5 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-2.5 h-2.5 ${i < 4 ? 'text-yellow-400' : 'text-primary-200 dark:text-primary-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <h3 className="text-app-sm font-semibold text-primary-900 dark:text-primary-100 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-app-base font-bold text-primary-900 dark:text-primary-100">₹{product.price.toFixed(0)}</span>
              <span className="text-xs text-primary-400 dark:text-primary-500 line-through">₹{(product.price * 1.2).toFixed(0)}</span>
            </div>
            <span className="text-xs text-success font-medium">Free</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;