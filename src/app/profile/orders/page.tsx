'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store';
import LoadingSpinner from '@/components/LoadingSpinner';
import OrderCard from '@/components/OrderCard'; // <-- Import the new component
import Link from 'next/link';

// Icon for the "Empty State" message
const EmptyBoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-primary-300 dark:text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 4.5 8-4.5M12 11.5V15" /></svg>;

export default function MyOrdersPage() {
  const { myOrders, orderLoading, orderError, fetchMyOrders } = useAppStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const renderContent = () => {
    if (orderLoading) {
      return (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" variant="primary" text="Loading orders..." />
        </div>
      );
    }
    if (orderError) {
      return <p className="text-red-500 dark:text-red-400 text-center py-8 text-sm sm:text-base">{orderError}</p>;
    }
    if (myOrders.length === 0) {
      return (
        <div className="text-center py-12 sm:py-16">
          <EmptyBoxIcon />
          <h2 className="text-xl sm:text-2xl font-semibold text-primary-900 dark:text-primary-100 mt-4">No Orders Yet</h2>
          <p className="text-primary-600 dark:text-primary-400 mt-2 mb-6 text-sm sm:text-base px-4">You haven&apos;t placed any orders. Let&apos;s change that!</p>
          <Link href="/" className="bg-accent text-white font-bold py-3 px-6 rounded-xl hover:bg-accent-hover transition-colors btn-touch">
            Start Shopping
          </Link>
        </div>
      );
    }
    return (
      <div className="space-y-4 sm:space-y-6">
        {myOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6 border-b border-primary-200 dark:border-primary-600 pb-4">My Orders</h1>
      {renderContent()}
    </div>
  );
}