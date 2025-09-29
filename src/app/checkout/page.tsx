'use client';

import React from 'react';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import Spinner from '@/components/spinner';
import LoadingSpinner from '@/components/LoadingSpinner';
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
  const [paymentProcessing, setPaymentProcessing] = React.useState(false);
  const [paymentInitializing, setPaymentInitializing] = React.useState(false);

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

    setPaymentInitializing(true);

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
            setPaymentInitializing(false);
            setPaymentProcessing(true);
            try {
              const verificationRes = await api.post('/payments/razorpay/verify-payment', { ...response, orderId: preliminaryOrder._id });
              if (verificationRes.data.status === 'success') {
                clearCart();
                router.push(`/order-confirmation/${preliminaryOrder._id}`);
              } else {
                setPaymentProcessing(false);
                alert('Payment verification failed.');
              }
            } catch (error) {
              setPaymentProcessing(false);
              console.error('Payment verification error:', error);
              alert('Payment verification failed. Please try again.');
            }
          },
          prefill: { name: user?.name || '', email: user?.email || '', contact: '9999999999' },
          theme: { color: "#0070f3" },
        };

        const paymentObject = new window.Razorpay(options);
        
        // Hide initializing loader and open Razorpay
        setPaymentInitializing(false);
        paymentObject.open();
        
        paymentObject.on('payment.failed', (response: { error: { description: string } }) => {
          setPaymentProcessing(false);
          alert(response.error.description);
        });

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
      setPaymentInitializing(false);
      console.error(`${paymentMethodName} Payment failed`, error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-900">
        <LoadingSpinner size="xl" variant="primary" text="Loading checkout..." />
      </div>
    );
  }

  // Show payment initializing loader
  if (paymentInitializing) {
    return (
      <LoadingSpinner 
        size="xl" 
        variant="primary" 
        text="Initializing payment gateway..." 
        fullScreen={true} 
      />
    );
  }

  // Show payment processing loader
  if (paymentProcessing) {
    return (
      <LoadingSpinner 
        size="xl" 
        variant="primary" 
        text="Processing your payment..." 
        fullScreen={true} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="mobile-container py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 dark:text-primary-100 tracking-tight">Complete Your Order</h1>
          <p className="mt-2 text-base sm:text-lg text-primary-600 dark:text-primary-400">You&apos;re just a few steps away from your new items.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-7 bg-white dark:bg-primary-800 mobile-padding sm:p-6 lg:p-8 rounded-2xl shadow-subtle space-y-6 sm:space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6 border-b border-primary-200 dark:border-primary-600 pb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="sm:col-span-2"><FormInput label="Full Name" id="name" type="text" defaultValue={user.name} required readOnly /></div>
                <div className="sm:col-span-2"><FormInput label="Email Address" id="email" type="email" defaultValue={user.email} required readOnly /></div>
                <div className="sm:col-span-2"><FormInput label="Address" id="address" name="address" type="text" placeholder="123 Main St" required onChange={handleAddressChange} value={shippingAddress.address} /></div>
                <FormInput label="City" id="city" name="city" type="text" placeholder="New York" required onChange={handleAddressChange} value={shippingAddress.city} />
                <FormInput label="Postal Code" id="postalCode" name="postalCode" type="text" placeholder="10001" required onChange={handleAddressChange} value={shippingAddress.postalCode} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-primary-800 rounded-2xl shadow-subtle mobile-padding sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6 border-b border-primary-200 dark:border-primary-600 pb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-primary-600 dark:text-primary-400 text-sm sm:text-base"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-primary-600 dark:text-primary-400 text-sm sm:text-base"><span>Shipping</span><span>Free</span></div>
                <div className="flex justify-between text-primary-600 dark:text-primary-400 text-sm sm:text-base"><span>Tax (8%)</span><span>₹{taxCost.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg sm:text-xl text-primary-900 dark:text-primary-100 border-t border-primary-200 dark:border-primary-600 pt-3 mt-3"><span>Total</span><span>₹{finalTotal.toFixed(2)}</span></div>
              </div>
              {orderError && <p className="text-sm text-red-600 dark:text-red-400 text-center mt-4">{orderError}</p>}
              <div className="mt-6 border-t border-primary-200 dark:border-primary-600 pt-6 space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-center text-primary-900 dark:text-primary-100">Choose a Payment Method</h3>
                {availablePaymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePayment(method.id as 'razorpay' /* | 'cashfree' */)}
                    type="button"
                    disabled={orderLoading || items.length === 0 || paymentInitializing}
                    className={`w-full font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 disabled:bg-primary-400 dark:disabled:bg-primary-600 disabled:cursor-not-allowed btn-touch text-sm sm:text-base ${
                      method.id === 'razorpay' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {orderLoading ? 'Processing...' : `Continue with ${method.name}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
