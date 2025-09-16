'use client';

import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import Spinner from '@/components/spinner';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, items, createOrder, orderLoading, orderError } = useAppStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 0; // Or calculate dynamically
  const total = subtotal + shippingCost;
  const taxCost = total * 0.08; // Example: 8% tax
  const finalTotal = total + taxCost;

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const orderData = {
      orderItems: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.images[0] || '/placeholder.png',
        price: item.price,
        product: item._id,
      })),
      shippingAddress: {
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        postalCode: formData.get('postal_code') as string,
      },
      paymentMethod: 'MockPayment', // We will replace this with Stripe later
      itemsPrice: subtotal,
      taxPrice: taxCost,
      shippingPrice: shippingCost,
      totalPrice: finalTotal,
    };
    
    const newOrder = await createOrder(orderData);
    
    if (newOrder) {
      router.push(`/order-confirmation/${newOrder._id}`);
    }
    // If it fails, the orderError state will be set and we can display it.
  };
  
  // The middleware handles redirecting if there's no user. 
  // This check is for showing a loading state while the user object is hydrated.
  if (!user) {
    return <Spinner />;
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
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <FormInput label="Full Name" id="name" type="text" defaultValue={user.name} required />
              </div>
              <div className="sm:col-span-2">
                <FormInput label="Email Address" id="email" type="email" defaultValue={user.email} required />
              </div>
              <div className="sm:col-span-2">
                <FormInput label="Address" id="address" name="address" type="text" placeholder="123 Main St" required />
              </div>
              <FormInput label="City" id="city" name="city" type="text" placeholder="New York" required />
              <FormInput label="Postal Code" id="postal_code" name="postal_code" type="text" placeholder="10001" required />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-subtle p-6 sticky top-28">
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${taxCost.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-xl text-primary border-t pt-3 mt-3"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
            </div>
            
            {orderError && <p className="text-sm text-red-600 text-center mt-4">{orderError}</p>}
            
            <button type="submit" disabled={orderLoading || items.length === 0} className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400">
              {orderLoading ? 'Processing...' : 'Place Order Securely'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
