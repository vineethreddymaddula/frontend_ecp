'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

export default function OrderConfirmationPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="bg-white p-10 rounded-lg shadow-subtle max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <CheckIcon />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-3">Thank You For Your Order!</h1>
        <p className="text-gray-600 mb-6">Your order has been placed successfully. A confirmation email has been sent.</p>
        <div className="bg-secondary p-4 rounded-md">
          <p className="text-gray-700">Your Order ID is: <span className="font-bold text-primary">{id}</span></p>
        </div>
        <div className="mt-8">
          <Link href="/profile/orders" className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors">
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}