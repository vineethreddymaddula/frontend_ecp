'use client';

import { useAppStore } from '@/store';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useAppStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle Empty Cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/" className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Your Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-b-0">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.images[0] || '/placeholder.png'} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-md" 
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-primary">{item.name}</h2>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center border rounded-md">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold hover:bg-secondary transition-colors">-</button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold hover:bg-secondary transition-colors">+</button>
                    </div>
                    <p className="w-20 text-center font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}