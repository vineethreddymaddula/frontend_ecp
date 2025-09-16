'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store';

// Self-contained Icon components for a cleaner UI
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

export default function Header() {
  const { user, logoutUser, items } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          E-Store
        </Link>
        <div className="flex items-center space-x-5">
          {/* Cart Icon with Item Count Badge */}
          <Link href="/cart" className="relative text-primary hover:text-accent transition-colors" title="Cart">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            // Profile Dropdown for Logged-in Users
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-primary hover:text-accent transition-colors">
                <UserIcon />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in-up">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-semibold text-primary truncate">{user.name}</p>
                  </div>
                  <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary">My Profile</Link>
                  <Link href="/profile/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary">My Orders</Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-accent font-semibold hover:bg-secondary">Admin Dashboard</Link>
                  )}
                  <div className="border-t my-1"></div>
                  <button onClick={() => { logoutUser(); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Login/Register for Guests
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-primary hover:text-accent transition-colors font-medium">Login</Link>
              <Link href="/register" className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
