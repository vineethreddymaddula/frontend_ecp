'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import Spinner from '@/components/spinner';
import AccessDenied from '@/components/AccessDenied';
import AdminDashboard from '@/components/AdminDashboard'; // Assuming you have moved the UI here

export default function AdminPage() {
  const { user, authLoading } = useAppStore();
  
  // --- THE FIX ---
  // This state ensures we don't check for a user until the component is mounted on the client.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setIsClient(true);
  }, []);

  // 1. While the component is mounting on the client, or while the auth state is loading, show a spinner.
  if (!isClient || authLoading) {
    return <Spinner />;
  }

  // 2. Once mounted and auth is checked, if there's no user or they aren't an admin, deny access.
  if (!user || user.role !== 'admin') {
    return <AccessDenied />;
  }

  // 3. If all checks pass, show the dashboard.
  return <AdminDashboard />;
}
