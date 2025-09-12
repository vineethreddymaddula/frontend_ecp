'use client';

import { useAppStore } from '@/store';
import { useEffect } from 'react';

// This component's only job is to run the initializeAuth action once.
export default function AuthInitializer() {
  const initializeAuth = useAppStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return null; // This component renders nothing.
}
