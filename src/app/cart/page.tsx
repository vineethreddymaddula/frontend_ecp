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
        <div className="mobile-container py-12">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiShoppingCart className="w-8 h-8 text-primary-400 dark:text-primary-500" />
            </div>
            <h1 className="text-app-lg font-bold text-primary-900 dark:text-primary-100 mb-2">Your Cart is Empty</h1>
            <p className="text-primary-600 dark:text-primary-400 mb-6 text-app-sm">Add some products to get started</p>
            <Link href="/" className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors btn-touch text-app-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="mobile-container py-4">
        <div className="mb-4 animate-fade-in">
          <h1 className="text-app-lg font-bold text-primary-900 dark:text-primary-100 mb-1">Shopping Cart</h1>
          <p className="text-primary-600 dark:text-primary-400 text-app-sm">Review items and checkout</p>
        </div>

        <div className="space-y-3 animate-slide-in-left mb-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white dark:bg-primary-800 app-card hover:shadow-elegant transition-shadow duration-300">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src={item.images[0] || '/placeholder.png'} 
                    alt={item.name} 
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
                
                <div className="flex-grow min-w-0">
                  <h3 className="text-app-sm font-semibold text-primary-900 dark:text-primary-100 truncate">{item.name}</h3>
                  <p className="text-primary-500 dark:text-primary-400 text-xs">{item.category}</p>
                  <p className="text-app-base font-bold text-accent">₹{item.price.toFixed(0)}</p>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center border border-primary-200 dark:border-primary-600 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                      className="px-2 py-1 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors btn-touch"
                    >
                      -
                    </button>
                    <span className="px-2 py-1 font-semibold text-primary-900 dark:text-primary-100 text-app-sm min-w-[2rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                      className="px-2 py-1 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors btn-touch"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="text-error hover:text-red-700 dark:hover:text-red-400 transition-colors p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg btn-touch"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-primary-800 app-card animate-slide-in-right">
          <h2 className="text-app-base font-bold text-primary-900 dark:text-primary-100 mb-3">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-primary-600 dark:text-primary-400 text-app-sm">
              <span>Subtotal ({items.length} items)</span>
              <span className="font-semibold">₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-primary-600 dark:text-primary-400 text-app-sm">
              <span>Shipping</span>
              <span className="font-semibold text-success">Free</span>
            </div>
            <div className="flex justify-between text-primary-600 dark:text-primary-400 text-app-sm">
              <span>Tax</span>
              <span className="font-semibold">₹{tax.toFixed(0)}</span>
            </div>
            <div className="border-t border-primary-200 dark:border-primary-600 pt-2">
              <div className="flex justify-between text-app-base font-bold text-primary-900 dark:text-primary-100">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>

          <Link href="/checkout">
            <button className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors mb-3 btn-touch text-app-sm">
              Proceed to Checkout
            </button>
          </Link>

          <Link href="/">
            <button className="w-full border border-accent text-accent font-bold py-3 rounded-lg hover:bg-accent hover:text-white transition-colors btn-touch text-app-sm">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}