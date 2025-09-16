'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store';
import Spinner from '@/components/spinner';
import OrderCard from '@/components/OrderCard'; // <-- Import the new component
import Link from 'next/link';

// Icon for the "Empty State" message
const EmptyBoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 4.5 8-4.5M12 11.5V15" /></svg>;

export default function MyOrdersPage() {
  const { myOrders, orderLoading, orderError, fetchMyOrders } = useAppStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const renderContent = () => {
    if (orderLoading) {
      return <Spinner />;
    }
    if (orderError) {
      return <p className="text-red-500 text-center">{orderError}</p>;
    }
    if (myOrders.length === 0) {
      return (
        <div className="text-center py-16">
          <EmptyBoxIcon />
          <h2 className="text-2xl font-semibold text-primary mt-4">No Orders Yet</h2>
          <p className="text-gray-600 mt-2 mb-6">You haven't placed any orders. Let's change that!</p>
          <Link href="/" className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors">
            Start Shopping
          </Link>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {myOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6 border-b pb-4">My Orders</h1>
      {renderContent()}
    </div>
  );
}