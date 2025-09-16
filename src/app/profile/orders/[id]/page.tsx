'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/store';
import Spinner from '@/components/spinner';

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { selectedOrder, orderLoading, orderError, fetchOrderById } = useAppStore();

  useEffect(() => {
    if (id) {
      fetchOrderById(id);
    }
  }, [id, fetchOrderById]);

  // Show a spinner while the order is loading or hasn't been fetched yet
  if (orderLoading || !selectedOrder) {
    return <Spinner />;
  }

  // Show an error message if the fetch fails
  if (orderError) {
    return <p className="text-red-500 text-center">{orderError}</p>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b pb-4">
        <div>
            <h1 className="text-2xl font-bold text-primary">Order Details</h1>
            <p className="text-sm text-gray-500 mt-1">Order ID: {selectedOrder._id}</p>
        </div>
        <div className={`mt-4 sm:mt-0 px-3 py-1.5 rounded-full text-sm font-semibold text-center ${
            selectedOrder.isPaid 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
          {selectedOrder.isPaid 
            ? `Paid on ${new Date(selectedOrder.paidAt!).toLocaleDateString()}` 
            : 'Payment Pending'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order Items Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-primary">Items in this Order</h2>
            <div className="space-y-4">
              {selectedOrder.orderItems.map((item) => (
                <div key={item.product} className="flex items-center gap-4 border-b py-4 last:border-b-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-md object-cover flex-shrink-0" 
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold text-primary">₹{(item.quantity * item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-primary">Shipping Address</h2>
            <div className="text-gray-700">
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-primary">Order Summary</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between"><span>Items Price:</span><span>₹{selectedOrder.itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span>₹{selectedOrder.shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax:</span><span>₹{selectedOrder.taxPrice.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg text-primary border-t pt-2 mt-2">
                <span>Total:</span>
                <span>₹{selectedOrder.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}