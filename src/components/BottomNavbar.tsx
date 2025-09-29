'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store';
import { 
  MdHome, 
  MdOutlineHome, 
  MdOutlineShoppingCart, 
  MdShoppingCart,
  MdOutlineReceiptLong, 
  MdReceiptLong, 
  MdOutlinePerson, 
  MdPerson,
  MdOutlineAdminPanelSettings,
  MdAdminPanelSettings
} from 'react-icons/md';

export default function BottomNavbar() {
  const pathname = usePathname();
  const { user, items } = useAppStore();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { href: '/', label: 'Home', icon: { active: MdHome, inactive: MdOutlineHome } },
    { href: '/cart', label: 'Cart', icon: { active: MdShoppingCart, inactive: MdOutlineShoppingCart } },
    { href: '/profile/orders', label: 'Orders', icon: { active: MdReceiptLong, inactive: MdOutlineReceiptLong } },
    { href: '/profile', label: 'Profile', icon: { active: MdPerson, inactive: MdOutlinePerson } }
  ];

  if (user?.role === 'admin') {
    navItems.push({
      href: '/admin',
      label: 'Admin',
      icon: { active: MdAdminPanelSettings, inactive: MdOutlineAdminPanelSettings }
    });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-primary-800/80 backdrop-blur-md border-t border-primary-200 dark:border-primary-700 z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          // --- THE FIX IS HERE ---
          // We now use an exact match for the path, which correctly differentiates
          // between /profile and /profile/orders.
          const isActive = pathname === item.href;
          
          const Icon = isActive ? item.icon.active : item.icon.inactive;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-2 px-3 w-full h-16 text-center transition-colors duration-200 relative btn-touch"
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition-colors ${
                  isActive 
                    ? 'text-accent' 
                    : 'text-primary-600 dark:text-primary-400'
                }`} />
                {item.label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 transition-colors ${
                isActive 
                  ? 'text-accent font-semibold' 
                  : 'text-primary-600 dark:text-primary-400'
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <div className="absolute top-1 h-1 w-8 bg-accent rounded-full transition-all duration-300" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}