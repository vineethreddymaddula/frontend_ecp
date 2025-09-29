'use client'; // <-- Convert to a Client Component

import { usePathname } from 'next/navigation'; // <-- Import hook
import './globals.css';
import Header from '@/components/Header';
import BottomNavbar from '@/components/BottomNavbar';
import AuthInitializer from '@/components/AuthInitializer';
import StoreHydration from '@/components/StoreHydration';
import Script from 'next/script'

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

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Script
        id="cashfree-js"
        src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"
      />
      <body className="bg-secondary dark:bg-primary-900 min-h-screen" style={{touchAction: 'manipulation'}}>
        <StoreHydration>
          <AuthInitializer />
          {showHeader && <Header />} {/* <-- Conditionally render the Header */}
          <main className={showBottomNav ? "pb-20" : ""}>
            {children}
          </main>
          {showBottomNav && <BottomNavbar />} {/* <-- Conditionally render the Bottom Navbar */}
        </StoreHydration>
      </body>
    </html>
  );
}