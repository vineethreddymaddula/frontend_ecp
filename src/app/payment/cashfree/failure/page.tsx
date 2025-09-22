'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CashfreeFailure() {
  const router = useRouter();

  useEffect(() => {
    // Redirect back to checkout with error message
    router.push('/checkout?error=payment_failed');
  }, [router]);

  return <div>Payment failed. Redirecting...</div>;
}
