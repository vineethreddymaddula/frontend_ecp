'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, user, authLoading, authError } = useAppStore();

  const handleLogin = async (formData: any) => {
    await loginUser(formData.email, formData.password);
  };
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-secondary">
      <AuthForm
        formType="login"
        onSubmit={handleLogin}
        isLoading={authLoading}
        error={authError}
      />
    </div>
  );
}
