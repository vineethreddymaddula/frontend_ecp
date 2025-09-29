'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import Header from '@/components/Header';
import BottomNavbar from '@/components/BottomNavbar';
import AuthInitializer from '@/components/AuthInitializer';
import StoreHydration from '@/components/StoreHydration';
import Script from 'next/script';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const pathname = usePathname(); // <-- Get the current path

  // Define which paths should not have the header/navbar
  const noHeaderPaths = ['/login', '/register'];
  const showHeader = !noHeaderPaths.includes(pathname);
  const showBottomNav = !noHeaderPaths.includes(pathname);

  useEffect(() => {
    // Disable zoom on mobile devices
    const preventDefault = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Script
        id="cashfree-js"
        src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"
      />
      <body className="bg-secondary dark:bg-primary-900 min-h-screen" style={{touchAction: 'manipulation', overflow: 'hidden', position: 'fixed', width: '100%', height: '100%'}}>
        <StoreHydration>
          <AuthInitializer />
          {showHeader && <Header />} {/* <-- Conditionally render the Header */}
          <main className={showBottomNav ? "pb-20 overflow-auto" : "overflow-auto"} style={{height: 'calc(100vh - 80px)'}}>
            {children}
          </main>
          {showBottomNav && <BottomNavbar />} {/* <-- Conditionally render the Bottom Navbar */}
        </StoreHydration>
      </body>
    </html>
  );
}