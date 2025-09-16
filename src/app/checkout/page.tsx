"use client";

import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Spinner from "@/components/spinner";
import api from "@/lib/axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, items, createOrder, orderLoading, orderError, clearCart } = useAppStore();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 0;
  const taxCost = subtotal * 0.08;
  const finalTotal = subtotal + shippingCost + taxCost;

  const handleRazorpayPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { data: razorpayOrder } = await api.post(
        "/payments/razorpay/create-order",
        {
          amount: finalTotal,
        }
      );

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "E-Store",
        description: "E-Commerce Transaction",
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          const verificationRes = await api.post(
            "/payments/razorpay/verify-payment",
            response
          );

          if (verificationRes.data.status === "success") {
            const shippingAddress = {
              address: formData.get("address") as string,
              city: formData.get("city") as string,
              postalCode: formData.get("postal_code") as string,
            };

            // --- THE FIX IS HERE ---
            // We now correctly map each CartItem to the IOrderItem shape.
            const orderItemsForDB = items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              image: item.images[0] || "/placeholder.png", // <-- Use the first image
              price: item.price,
              product: item._id,
            }));

            const newOrder = await createOrder({
              orderItems: orderItemsForDB, // <-- Pass the correctly shaped array
              shippingAddress,
              paymentMethod: "Razorpay",
              paymentResult: {
                id: response.razorpay_payment_id,
                status: "Completed",
                update_time: new Date().toISOString(),
                email_address: user!.email,
              },
              itemsPrice: subtotal,
              taxPrice: taxCost,
              shippingPrice: shippingCost,
              totalPrice: finalTotal,
              isPaid: true,
              paidAt: new Date().toISOString(),
            });

            if (newOrder) {
              clearCart();
              router.push(`/order-confirmation/${newOrder._id}`);
            }
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#0070f3" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
    } catch (error) {
      console.error("Payment failed", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!user) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (The rest of your JSX for the form and order summary remains the same) ... */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary tracking-tight">
          Complete Your Order
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          You're just a few steps away from your new items.
        </p>
      </div>

      <form
        onSubmit={handleRazorpayPayment}
        className="grid grid-cols-1 lg:grid-cols-12 gap-x-12"
      >
        <div className="lg:col-span-7 bg-white p-8 rounded-lg shadow-subtle space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-4">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <FormInput
                  label="Full Name"
                  id="name"
                  type="text"
                  defaultValue={user.name}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <FormInput
                  label="Email Address"
                  id="email"
                  type="email"
                  defaultValue={user.email}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <FormInput
                  label="Address"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <FormInput
                label="City"
                id="city"
                name="city"
                type="text"
                placeholder="New York"
                required
              />
              <FormInput
                label="Postal Code"
                id="postal_code"
                name="postal_code"
                type="text"
                placeholder="10001"
                required
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-subtle p-6 sticky top-28">
            <h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>₹{taxCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-primary border-t pt-3 mt-3">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
            {orderError && (
              <p className="text-sm text-red-600 text-center mt-4">
                {orderError}
              </p>
            )}
            <div className="mt-6 space-y-4">
              <button
                type="submit"
                disabled={orderLoading || items.length === 0}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
              >
                {orderLoading ? "Processing..." : "Continue with Razorpay"}
              </button>
              <button
                type="button"
                disabled
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:bg-gray-400"
              >
                Continue with Cashfree
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
