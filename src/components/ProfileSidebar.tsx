'use client';

import { useAppStore } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Self-contained Icon components for UI clarity
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const BoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>;

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { user, logoutUser } = useAppStore();

  const navLinks = [
    { href: "/profile", label: "My Details", icon: <UserIcon /> },
    { href: "/profile/orders", label: "My Orders", icon: <BoxIcon /> },
  ];

  return (
    <div className="app-card flex flex-col gap-4">
      <div className="text-center border-b border-primary-200 dark:border-primary-600 pb-4 mb-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-2">
      <img src="https://avatars.githubusercontent.com/u/83410299?s=400&u=40af658436b94777e8ebcb94275907b43a2de4f8&v=4" alt="pic"  />
        </div>
        <h2 className="font-bold text-app-sm text-primary-900 dark:text-primary-100">{user?.name}</h2>
        <p className="text-app-xs text-primary-500 dark:text-primary-400 truncate">{user?.email}</p>
      </div>
      <nav className="space-y-2">
        {navLinks.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors btn-touch text-app-xs ${
                isActive 
                  ? 'bg-accent text-white' 
                  : 'text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
        {user?.role === 'admin' && (
          <Link href="/admin"
            className="flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors btn-touch text-app-xs"
          >
            <AdminIcon />
            <span>Admin Dashboard</span>
          </Link>
        )}
      </nav>
      <button onClick={logoutUser} className="w-full mt-4 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-xl hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors btn-touch text-app-xs">
        Logout
      </button>
    </div>
  );
}