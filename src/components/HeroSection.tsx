'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products } = useAppStore();
  
  const featuredProducts = products.slice(0, 3);
  
  useEffect(() => {
    if (featuredProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [featuredProducts.length]);
  
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-light dark:from-primary-900 dark:via-primary-800 dark:to-primary-700 overflow-hidden">
      <div className="mobile-container py-6 relative">
        <div className="text-center animate-fade-in">
          <h1 className="text-app-xl font-bold text-primary-900 dark:text-primary-100 leading-tight mb-3">
            Discover Your
            <span className="gradient-text block">Perfect Style</span>
          </h1>
          <p className="text-app-sm text-primary-600 dark:text-primary-400 mb-4 leading-relaxed">
            Premium products curated for quality and style
          </p>
          
          {/* Product Carousel */}
          {featuredProducts.length > 0 && (
            <div className="relative w-full max-w-md mx-auto mb-6">
              <div className="overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredProducts.map((product, index) => (
                    <div key={product._id} className="w-full flex-shrink-0 relative">
                      <Link href={`/product/${product._id}`} className="block">
                        <img 
                          src={product.images[0] || 'https://images.pexels.com/photos/6604246/pexels-photo-6604246.jpeg'} 
                          alt={product.name}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs">₹{product.price}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-3 space-x-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-accent' : 'bg-primary-300 dark:bg-primary-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-3 mb-6 justify-center">
            <Link href="#products" className="bg-accent text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-accent-hover transition-colors btn-touch text-app-sm">
              Shop Now
            </Link>
            <Link href="/about" className="border border-accent text-accent font-semibold py-2.5 px-5 rounded-lg hover:bg-accent hover:text-white transition-colors btn-touch text-app-sm">
              Learn More
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            <div className="text-center">
              <div className="text-app-lg font-bold text-primary-900 dark:text-primary-100">10K+</div>
              <div className="text-primary-600 dark:text-primary-400 text-xs">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-app-lg font-bold text-primary-900 dark:text-primary-100">500+</div>
              <div className="text-primary-600 dark:text-primary-400 text-xs">Products</div>
            </div>
            <div className="text-center">
              <div className="text-app-lg font-bold text-primary-900 dark:text-primary-100">24/7</div>
              <div className="text-primary-600 dark:text-primary-400 text-xs">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-100 dark:border-primary-700 bg-white/50 dark:bg-primary-800/50 backdrop-blur-sm">
        <div className="mobile-container py-3">
          <div className="grid grid-cols-2 gap-3 opacity-60 dark:opacity-80">
            <div className="flex items-center space-x-1.5 justify-center">
              <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-xs text-primary-700 dark:text-primary-300">Secure</span>
            </div>
            <div className="flex items-center space-x-1.5 justify-center">
              <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="font-medium text-xs text-primary-700 dark:text-primary-300">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-1.5 justify-center">
              <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-xs text-primary-700 dark:text-primary-300">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-1.5 justify-center">
              <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-xs text-primary-700 dark:text-primary-300">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;