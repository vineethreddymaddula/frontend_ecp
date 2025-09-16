"use client";

import { useEffect, useState } from 'react';
import { useAppStore } from '@/store';

export default function StoreHydration({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const initializeAuth = useAppStore((state) => state.initializeAuth);

  useEffect(() => {
    // Wait for Zustand to rehydrate from localStorage
    const unsubscribe = useAppStore.persist.onFinishHydration(() => {
      initializeAuth();
      setIsHydrated(true);
    });

    // If already hydrated, initialize immediately
    if (useAppStore.persist.hasHydrated()) {
      initializeAuth();
      setIsHydrated(true);
    }

    return unsubscribe;
  }, [initializeAuth]);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}