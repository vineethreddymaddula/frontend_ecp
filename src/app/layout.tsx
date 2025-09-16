'use client'; // <-- Convert to a Client Component

import { usePathname } from 'next/navigation'; // <-- Import hook
import './globals.css';
import Header from '@/components/Header';
import AuthInitializer from '@/components/AuthInitializer';
import StoreHydration from '@/components/StoreHydration';
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const pathname = usePathname(); // <-- Get the current path

  // Define which paths should not have the header
  const noHeaderPaths = ['/login', '/register'];
  const showHeader = !noHeaderPaths.includes(pathname);

  return (
    <html lang="en">
       <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <body className="bg-secondary min-h-screen">
        <StoreHydration>
          <AuthInitializer />
          {showHeader && <Header />} {/* <-- Conditionally render the Header */}
          <main className={showHeader ? "container mx-auto px-6 py-8" : ""}>
            {children}
          </main>
        </StoreHydration>
      </body>
    </html>
  );
}