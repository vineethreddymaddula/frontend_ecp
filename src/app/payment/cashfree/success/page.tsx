'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/store';
import api from '@/lib/axios';

export default function CashfreeSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useAppStore();

  useEffect(() => {
    const handleSuccess = async () => {
      const orderId = searchParams.get('order_id');
      if (orderId) {
        try {
          // Verify payment with backend
          await api.post('/payments/cashfree/verify-payment', { order_id: orderId });
          clearCart();
          router.push(`/order-confirmation/${orderId}`);
        } catch (error) {
          console.error('Payment verification failed:', error);
          router.push('/checkout?error=verification_failed');
        }
      } else {
        router.push('/checkout?error=missing_order_id');
      }
    };

    handleSuccess();
  }, [searchParams, clearCart, router]);

  return <div>Processing payment...</div>;
}
