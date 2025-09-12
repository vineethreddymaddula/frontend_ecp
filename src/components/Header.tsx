'use client'; // <-- Must be a client component to use hooks

import Link from 'next/link';
import { useAppStore } from '@/store';

const Header = () => {
  const { user, logoutUser } = useAppStore();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          E-Store
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-primary hover:text-accent transition-colors">Cart</Link>
          {user ? (
            <>
              <span className="text-primary hidden sm:block">Welcome, {user.name}!</span>
              <button onClick={logoutUser} className="text-primary hover:text-accent transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-primary hover:text-accent transition-colors">Login</Link>
              <Link href="/register" className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
