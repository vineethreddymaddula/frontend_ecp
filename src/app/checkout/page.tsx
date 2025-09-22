'use client';

import React from 'react';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import Spinner from '@/components/spinner';
import api from '@/lib/axios';
import { getAvailablePaymentMethods } from '@/utils/paymentConfig';

// This tells TypeScript that the payment SDKs will be available on the window object
declare global {
  interface Window {
    Razorpay: {
      new (options: {
        key: string;
        amount: number;
        currency: string;
        name: string;
        order_id: string;
        handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void | Promise<void>;
        prefill: { name?: string; email?: string; contact?: string };
        theme: { color: string };
      }): {
        open(): void;
        on(event: string, callback: (response: { error: { description: string } }) => void): void;
      };
    };
    // cashfree: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, authLoading, items, createOrder, orderLoading, orderError, clearCart } = useAppStore();
  const availablePaymentMethods = getAvailablePaymentMethods();

  const [shippingAddress, setShippingAddress] = React.useState({
    address: '',
    city: '',
    postalCode: '',
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxCost = subtotal * 0.08;
  const finalTotal = subtotal + taxCost;

  const handlePayment = async (paymentMethodId: 'razorpay' /* | 'cashfree' */) => {
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      return alert("Please fill in all shipping details first.");
    }

    // Capitalize for storing in the database, e.g., 'razorpay' -> 'Razorpay'
    const paymentMethodName = paymentMethodId.charAt(0).toUpperCase() + paymentMethodId.slice(1);

    try {
      const preliminaryOrder = await createOrder({
        orderItems: items.map(item => ({ ...item, product: item._id, image: item.images[0] || '' })),
        shippingAddress,
        paymentMethod: paymentMethodName,
        itemsPrice: subtotal, taxPrice: taxCost, shippingPrice: 0, totalPrice: finalTotal,
        isPaid: false,
      });

      if (!preliminaryOrder) {
        throw new Error(orderError || "Could not create initial order.");
      }

      if (paymentMethodId === 'razorpay') {
        const { data: razorpayOrder } = await api.post('/payments/razorpay/create-order', { amount: finalTotal });

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
          amount: Number(razorpayOrder.amount),
          currency: "INR",
          name: "E-Store",
          order_id: String(razorpayOrder.id),
          handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
            // FIX: Corrected typo in API endpoint 'razoray' -> 'razorpay'
            const verificationRes = await api.post('/payments/razorpay/verify-payment', { ...response, orderId: preliminaryOrder._id });
            if (verificationRes.data.status === 'success') {
              clearCart();
              router.push(`/order-confirmation/${preliminaryOrder._id}`);
            } else {
              alert('Payment verification failed.');
            }
          },
          prefill: { name: user?.name || '', email: user?.email || '', contact: '9999999999' },
          theme: { color: "#0070f3" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', (response: { error: { description: string } }) => alert(response.error.description));

      } 
      // Cashfree payment method temporarily disabled
      /* else if (paymentMethodId === 'cashfree') {
        const { data: cashfreeOrder } = await api.post('/payments/cashfree/create-order', {
          amount: finalTotal,
          orderId: preliminaryOrder._id,
          return_url: `${window.location.origin}/order-confirmation?order_id={order_id}`
        });

        if (cashfreeOrder && cashfreeOrder.payment_link) {
          window.location.href = cashfreeOrder.payment_link;
        } else {
          // This addresses the error: log the response to see why payment_link is missing.
          console.error("Invalid response from Cashfree order creation:", cashfreeOrder);
          throw new Error('Could not retrieve Cashfree payment link. Check console for details.');
        }
      } */
    } catch (error) {
      console.error(`${paymentMethodName} Payment failed`, error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  if (authLoading || !user) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary tracking-tight">Complete Your Order</h1>
        <p className="mt-2 text-lg text-gray-600">You&apos;re just a few steps away from your new items.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12">
        <div className="lg:col-span-7 bg-white p-8 rounded-lg shadow-subtle space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2"><FormInput label="Full Name" id="name" type="text" defaultValue={user.name} required readOnly /></div>
              <div className="sm:col-span-2"><FormInput label="Email Address" id="email" type="email" defaultValue={user.email} required readOnly /></div>
              <div className="sm:col-span-2"><FormInput label="Address" id="address" name="address" type="text" placeholder="123 Main St" required onChange={handleAddressChange} value={shippingAddress.address} /></div>
              <FormInput label="City" id="city" name="city" type="text" placeholder="New York" required onChange={handleAddressChange} value={shippingAddress.city} />
              <FormInput label="Postal Code" id="postalCode" name="postalCode" type="text" placeholder="10001" required onChange={handleAddressChange} value={shippingAddress.postalCode} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-subtle p-6 sticky top-28">
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>$0.00</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${taxCost.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-xl text-primary border-t pt-3 mt-3"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
            </div>
            {orderError && <p className="text-sm text-red-600 text-center mt-4">{orderError}</p>}
            <div className="mt-6 border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-center text-primary">Choose a Payment Method</h3>
              {availablePaymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePayment(method.id as 'razorpay' /* | 'cashfree' */)}
                  type="button"
                  disabled={orderLoading || items.length === 0}
                  className={`w-full font-bold py-3 rounded-lg transition-all duration-300 disabled:bg-gray-400 ${method.id === 'razorpay' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  {orderLoading ? 'Processing...' : `Continue with ${method.name}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
