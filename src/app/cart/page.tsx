'use client';

import { useAppStore } from '@/store';
import Link from 'next/link';
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
      <div className="min-h-screen bg-primary-50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center animate-fade-in">
            <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <HiShoppingCart className="w-16 h-16 text-primary-400" />
            </div>
            <h1 className="text-4xl font-bold text-primary-900 mb-4">Your Cart is Empty</h1>
            <p className="text-primary-600 mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/" className="bg-gradient-to-r from-accent to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-premium transform hover:scale-105 transition-all duration-300">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-900 mb-2">Shopping Cart</h1>
          <p className="text-primary-600">Review your items and proceed to checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4 animate-slide-in-left">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-subtle p-6 hover:shadow-elegant transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.images[0] || '/placeholder.png'} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-xl" 
                    />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-primary-900 mb-1">{item.name}</h3>
                    <p className="text-primary-500 text-sm mb-2">{item.category}</p>
                    <p className="text-2xl font-bold text-accent">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="flex items-center border-2 border-primary-200 rounded-xl">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                        className="px-4 py-2 text-lg font-bold text-primary-700 hover:bg-primary-50 transition-colors rounded-l-xl"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                        className="px-4 py-2 text-lg font-bold text-primary-700 hover:bg-primary-50 transition-colors rounded-r-xl"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="text-error hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-xl"
                      title="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="bg-white rounded-2xl shadow-elegant p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-primary-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-success">Free</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Tax</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-primary-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-primary-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-gradient-to-r from-accent to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-premium transform hover:scale-105 transition-all duration-300 mb-4">
            Proceed to Checkout
                </button>
          </Link>

              <Link href="/">
                <button className="w-full border-2 border-accent text-accent font-bold py-4 rounded-xl hover:bg-accent hover:text-white transition-all duration-300">
                  Continue Shopping
                </button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-primary-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-primary-600">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
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