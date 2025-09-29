'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store';
import DarkModeToggle from './DarkModeToggle';

// Self-contained Icon components for a cleaner UI
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

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
    <header className="bg-white/90 dark:bg-primary-900/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-primary-100 dark:border-primary-800">
      <nav className="mobile-container py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-primary-900 dark:text-primary-100 hover:text-accent dark:hover:text-accent transition-colors">
          E-Store
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
          
          {/* Cart Icon with Item Count Badge */}
          <Link href="/cart" className="relative text-primary-700 dark:text-primary-300 hover:text-accent dark:hover:text-accent transition-colors btn-touch p-2" title="Cart">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            // Profile Dropdown for Logged-in Users
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-primary-700 dark:text-primary-300 hover:text-accent dark:hover:text-accent transition-colors btn-touch p-2">
                <UserIcon />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-primary-800 rounded-xl shadow-lg border border-primary-200 dark:border-primary-700 py-1 z-50 animate-fade-in-up">
                  <div className="px-4 py-3 border-b border-primary-100 dark:border-primary-700">
                    <p className="text-xs text-primary-500 dark:text-primary-400">Signed in as</p>
                    <p className="font-semibold text-primary-900 dark:text-primary-100 truncate text-sm">{user.name}</p>
                  </div>
                  <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700">My Profile</Link>
                  <Link href="/profile/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700">My Orders</Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-sm text-accent font-semibold hover:bg-primary-50 dark:hover:bg-primary-700">Admin Dashboard</Link>
                  )}
                  <div className="border-t border-primary-100 dark:border-primary-700 my-1"></div>
                  <button onClick={() => { logoutUser(); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-3 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Login/Register for Guests
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login" className="text-primary-700 dark:text-primary-300 hover:text-accent dark:hover:text-accent transition-colors font-medium text-sm sm:text-base btn-touch px-2 py-1">Login</Link>
              <Link href="/register" className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-colors duration-300 text-sm sm:text-base btn-touch">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
