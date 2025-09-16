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
    <div className="bg-white p-6 rounded-lg shadow-subtle flex flex-col gap-4">
      <div className="border-b pb-4 mb-2">
        <h2 className="font-bold text-lg text-primary">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
      <nav className="space-y-2">
        {navLinks.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive 
                  ? 'bg-accent text-white' 
                  : 'text-gray-700 hover:bg-secondary hover:text-primary'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
        {user?.role === 'admin' && (
          <Link href="/admin"
            className="flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-secondary hover:text-primary transition-colors"
          >
            <AdminIcon />
            <span>Admin Dashboard</span>
          </Link>
        )}
      </nav>
      <button onClick={logoutUser} className="w-full mt-4 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
        Logout
      </button>
    </div>
  );
}