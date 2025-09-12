'use client';

import { useState } from 'react';
import Link from 'next/link';


interface AuthFormProps {
  formType: 'login' | 'register';
  onSubmit: (formData: any) => void;
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
  const title = isLogin ? 'Welcome Back!' : 'Create Your Account';
  const subtitle = isLogin ? 'Sign in to continue to your store.' : 'Join us to start shopping.';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
            <p className="text-gray-600 mb-8">{subtitle}</p>



    
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                 <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" placeholder="Full Name" />
                </div>
              )}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </div>
                <input id="email-address" name="email" type="email" required value={formData.email} onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" placeholder="Email address" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} // <-- Type changes based on state
                  required 
                  value={formData.password} 
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" // <-- Added pr-10 for spacing
                  placeholder="Password" 
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                    {showPassword ? (
                      // Eye Slash Icon (Password Visible)
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074L3.707 2.293zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        <path d="M10 17a7 7 0 01-7-7c0-1.554.442-3.003 1.21-4.223l.707.707a5.003 5.003 0 00-2.07 9.588A5.003 5.003 0 0010 15a5.003 5.003 0 002.553-.744l.707.707A6.974 6.974 0 0110 17z" />
                      </svg>
                    ) : (
                      // Eye Icon (Password Hidden)
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              <button type="submit" disabled={isLoading}
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-hover transition-all duration-300 disabled:bg-gray-400"
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>
            <div className="text-sm text-center mt-6">
              {isLogin ? (
                <p className="text-gray-600">Don't have an account? <Link href="/register" className="font-semibold text-accent hover:underline">Register</Link></p>
              ) : (
                <p className="text-gray-600">Already have an account? <Link href="/login" className="font-semibold text-accent hover:underline">Sign In</Link></p>
              )}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
           
        </div>

      </div>
    </div>
  );
}

