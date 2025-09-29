'use client';

import { useAppStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';
import { HiShoppingCart } from 'react-icons/hi';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useAppStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handle Empty Cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
        <div className="mobile-container py-12 sm:py-20">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <HiShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-primary-400 dark:text-primary-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 dark:text-primary-100 mb-4">Your Cart is Empty</h1>
            <p className="text-primary-600 dark:text-primary-400 mb-6 sm:mb-8 text-base sm:text-lg px-4">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link href="/" className="bg-gradient-to-r from-accent to-purple-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:shadow-premium transform hover:scale-105 transition-all duration-300 btn-touch">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="mobile-container py-6 sm:py-12">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 dark:text-primary-100 mb-2">Shopping Cart</h1>
          <p className="text-primary-600 dark:text-primary-400 text-sm sm:text-base">Review your items and proceed to checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4 animate-slide-in-left">
            {items.map((item) => (
              <div key={item._id} className="bg-white dark:bg-primary-800 rounded-2xl shadow-subtle p-4 sm:p-6 hover:shadow-elegant transition-shadow duration-300">
                <div className="flex flex-col xs:flex-row items-center gap-4 sm:gap-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                    <Image 
                      src={item.images[0] || '/placeholder.png'} 
                      alt={item.name} 
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-xl" 
                    />
                  </div>
                  
                  <div className="flex-grow text-center xs:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-primary-900 dark:text-primary-100 mb-1">{item.name}</h3>
                    <p className="text-primary-500 dark:text-primary-400 text-sm mb-2">{item.category}</p>
                    <p className="text-xl sm:text-2xl font-bold text-accent">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-6 flex-shrink-0 w-full xs:w-auto">
                    <div className="flex items-center border-2 border-primary-200 dark:border-primary-600 rounded-xl">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                        className="px-3 sm:px-4 py-2 text-lg font-bold text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors rounded-l-xl btn-touch"
                      >
                        -
                      </button>
                      <span className="px-3 sm:px-4 py-2 font-semibold min-w-[2.5rem] sm:min-w-[3rem] text-center text-primary-900 dark:text-primary-100">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                        className="px-3 sm:px-4 py-2 text-lg font-bold text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors rounded-r-xl btn-touch"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-center xs:text-right">
                      <p className="text-lg sm:text-xl font-bold text-primary-900 dark:text-primary-100">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="text-error hover:text-red-700 dark:hover:text-red-400 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl btn-touch"
                      title="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="bg-white dark:bg-primary-800 rounded-2xl shadow-elegant p-4 sm:p-6 lg:p-8 lg:sticky lg:top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-primary-600 dark:text-primary-400 text-sm sm:text-base">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-600 dark:text-primary-400 text-sm sm:text-base">
                  <span>Shipping</span>
                  <span className="font-semibold text-success">Free</span>
                </div>
                <div className="flex justify-between text-primary-600 dark:text-primary-400 text-sm sm:text-base">
                  <span>Tax</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-primary-200 dark:border-primary-600 pt-3 sm:pt-4">
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-primary-900 dark:text-primary-100">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-gradient-to-r from-accent to-purple-600 text-white font-bold py-3 sm:py-4 rounded-xl hover:shadow-premium transform hover:scale-105 transition-all duration-300 mb-3 sm:mb-4 btn-touch">
            Proceed to Checkout
                </button>
          </Link>

              <Link href="/">
                <button className="w-full border-2 border-accent text-accent dark:text-accent font-bold py-3 sm:py-4 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 btn-touch">
                  Continue Shopping
                </button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-primary-200 dark:border-primary-600">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-primary-600 dark:text-primary-400">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}