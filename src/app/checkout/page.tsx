'use client';

import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FormInput from '@/components/FormInput';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, items } = useAppStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  // Client-side route protection
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, router]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! (Mock Action)');
  };
  
  if (!user) {
    return <div className="text-center py-20">Redirecting to login...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary tracking-tight">Complete Your Order</h1>
        <p className="mt-2 text-lg text-gray-600">You're just a few steps away from your new items.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-x-12">
        
        {/* Shipping & Payment Forms */}
        <div className="lg:col-span-7 bg-white p-8 rounded-lg shadow-subtle space-y-10">
          {/* ... Shipping Information and Payment Method sections remain the same ... */}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-subtle p-6 sticky top-28">
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      {/* --- CHANGE IS HERE --- */}
                      <img 
                        src={item.images[0] || '/placeholder.png'} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-primary font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t mt-6 pt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-primary border-t pt-3 mt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Place Order Securely
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}