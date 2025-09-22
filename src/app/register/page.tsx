'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, user, authLoading, authError } = useAppStore();

  const handleRegister = async (formData: { name: string; email: string; password: string }) => {
    await registerUser(formData.name, formData.email, formData.password);
  };
  
  // Redirect if user is already logged in after registration
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-secondary">
      <AuthForm
        formType="register"
        onSubmit={handleRegister}
        isLoading={authLoading}
        error={authError}
      />
    </div>
  );
}
