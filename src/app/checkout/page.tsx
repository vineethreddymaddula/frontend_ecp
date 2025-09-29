'use client';

import React from 'react';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
// import Spinner from '@/components/spinner';
import { CheckoutPageSkeleton } from '@/components/skeletons';
import api from '@/lib/axios';
import { getAvailablePaymentMethods } from '@/utils/paymentConfig';
import Image from 'next/image';

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
    return <CheckoutPageSkeleton />;
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
      <div className="app-container app-padding py-4">
        <div className="text-center mb-6">
          <h1 className="text-app-xl font-bold text-primary-900 dark:text-primary-100">Complete Order</h1>
          <p className="mt-1 text-app-sm text-primary-600 dark:text-primary-400">Just a few steps away</p>
        </div>

        <div className="space-y-4">
          {/* Shipping Form */}
          <div className="app-card">
            <h2 className="text-app-lg font-semibold text-primary-900 dark:text-primary-100 mb-4 pb-3 border-b border-primary-200 dark:border-primary-600">Shipping Info</h2>
            <div className="space-y-4">
              <FormInput label="Full Name" id="name" type="text" defaultValue={user.name} required readOnly />
              <FormInput label="Email" id="email" type="email" defaultValue={user.email} required readOnly />
              <FormInput label="Address" id="address" name="address" type="text" placeholder="123 Main St" required onChange={handleAddressChange} value={shippingAddress.address} />
              <div className="grid grid-cols-2 gap-3">
                <FormInput label="City" id="city" name="city" type="text" placeholder="City" required onChange={handleAddressChange} value={shippingAddress.city} />
                <FormInput label="Postal Code" id="postalCode" name="postalCode" type="text" placeholder="10001" required onChange={handleAddressChange} value={shippingAddress.postalCode} />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="app-card">
            <h2 className="text-app-lg font-semibold text-primary-900 dark:text-primary-100 mb-4 pb-3 border-b border-primary-200 dark:border-primary-600">Order Summary</h2>
            
            {/* Cart Items Preview */}
            <div className="space-y-2 mb-4">
              {items.slice(0, 3).map((item) => (
                <div key={item._id} className="flex items-center gap-3 p-2 bg-primary-50 dark:bg-primary-700 rounded-lg">
                  <div className="w-10 h-10 bg-primary-200 dark:bg-primary-600 rounded-md flex-shrink-0">
                    <Image 
                                      src={item.images[0] || '/placeholder.png'} 
                                      alt={item.name} 
                                      width={64}
                                      height={64}
                                      className="w-full h-full object-cover rounded-lg" 
                                    /> </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-app-xs font-medium text-primary-900 dark:text-primary-100 truncate">{item.name}</p>
                    <p className="text-app-xs text-primary-600 dark:text-primary-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-app-xs font-semibold text-primary-900 dark:text-primary-100">₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-app-xs text-primary-500 dark:text-primary-400 text-center">+{items.length - 3} more items</p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-app-sm">
              <div className="flex justify-between text-primary-600 dark:text-primary-400">
                <span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-primary-600 dark:text-primary-400">
                <span>Shipping</span><span>Free</span>
              </div>
              <div className="flex justify-between text-primary-600 dark:text-primary-400">
                <span>Tax (8%)</span><span>₹{taxCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-app-base text-primary-900 dark:text-primary-100 border-t border-primary-200 dark:border-primary-600 pt-2">
                <span>Total</span><span>₹{finalTotal.toFixed(0)}</span>
              </div>
            </div>

            {orderError && <p className="text-app-xs text-red-600 dark:text-red-400 text-center mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">{orderError}</p>}
            
            {/* Payment Methods */}
            <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-600">
              <h3 className="text-app-sm font-semibold text-center text-primary-900 dark:text-primary-100 mb-3">Payment Method</h3>
              <div className="space-y-2">
                {availablePaymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePayment(method.id as 'razorpay')}
                    type="button"
                    disabled={orderLoading || items.length === 0 || paymentInitializing}
                    className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 disabled:bg-primary-400 dark:disabled:bg-primary-600 disabled:cursor-not-allowed btn-touch text-app-sm ${
                      method.id === 'razorpay' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600' 
                        : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
                    }`}
                  >
                    {orderLoading ? 'Processing...' : `Pay with ${method.name}`}
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
