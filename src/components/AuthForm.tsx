'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AuthFormProps {
  formType: 'login' | 'register';
  onSubmit: (formData: { name: string; email: string; password: string }) => void;
  isLoading: boolean;
  error: string | null;
}

export default function AuthForm({ formType, onSubmit, isLoading, error }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLogin = formType === 'login';
  const title = isLogin ? 'Welcome Back!' : 'Join EliteStore';
  const subtitle = isLogin ? 'Sign in to continue your shopping journey.' : 'Create your account and start shopping.';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-light dark:from-primary-900 dark:via-primary-800 dark:to-primary-700 mobile-container py-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white dark:bg-primary-800 rounded-2xl sm:rounded-3xl shadow-premium overflow-hidden animate-scale-in">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 mobile-padding sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold gradient-text">E-Store</span>
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 dark:text-primary-100 mb-2 sm:mb-3 tracking-tight">{title}</h2>
              <p className="text-primary-600 dark:text-primary-400 text-base sm:text-lg">{subtitle}</p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-primary-200 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent text-base sm:text-lg transition-all duration-200 bg-primary-50/50 btn-touch" 
                    placeholder="Full Name" 
                  />
                </div>
              )}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input 
                  id="email-address" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-primary-200 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent text-base sm:text-lg transition-all duration-200 bg-primary-50/50 btn-touch" 
                  placeholder="Email address" 
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? 'text' : 'password'}
                  required 
                  value={formData.password} 
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-primary-200 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent text-base sm:text-lg transition-all duration-200 bg-primary-50/50 btn-touch" 
                  placeholder="Password" 
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="text-primary-400 dark:text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors btn-touch"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074L3.707 2.293zM7.317 4.317A7.956 7.956 0 0110 4c3.632 0 6.673 2.301 7.834 5.52a9.016 9.016 0 01-1.666 2.228l-1.485-1.485a5.5 5.5 0 00-7.08-7.08L7.317 4.317zM4.454 5.868l1.485 1.485A5.5 5.5 0 009.5 14.5l1.485 1.485A7.956 7.956 0 0110 16c-3.632 0-6.673-2.301-7.834-5.52a9.016 9.016 0 011.288-4.612z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 sm:p-4">
                  <p className="text-red-600 dark:text-red-400 text-center font-medium text-sm sm:text-base">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent to-purple-600 text-white font-bold py-3 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent hover:shadow-premium transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg btn-touch"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="text-center mt-6 sm:mt-8">
              {isLogin ? (
                <p className="text-primary-600 dark:text-primary-400 text-sm sm:text-base">
                  Don&apos;t have an account? 
                  <Link href="/register" className="font-semibold text-accent hover:text-purple-600 ml-1 transition-colors">
                    Sign up here
                  </Link>
                </p>
              ) : (
                <p className="text-primary-600 dark:text-primary-400 text-sm sm:text-base">
                  Already have an account? 
                  <Link href="/login" className="font-semibold text-accent hover:text-purple-600 ml-1 transition-colors">
                    Sign in here
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/90 to-purple-600/90"></div>
          <Image 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" 
            alt="Shopping Experience" 
            width={1000}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white">
              <h3 className="text-4xl font-bold mb-4">
                {isLogin ? 'Welcome Back!' : 'Join Our Community'}
              </h3>
              <p className="text-xl opacity-90 mb-8">
                {isLogin 
                  ? 'Continue your shopping journey with exclusive deals and personalized recommendations.' 
                  : 'Discover amazing products, exclusive deals, and enjoy a premium shopping experience.'
                }
              </p>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}