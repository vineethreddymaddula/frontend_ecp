'use client';
import { useAppStore } from "@/store";

export default function ProfileDetailsPage() {
  const { user } = useAppStore();

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6 border-b border-primary-200 dark:border-primary-600 pb-4">My Details</h1>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="text-sm font-medium text-primary-500 dark:text-primary-400">Full Name</label>
          <p className="text-base sm:text-lg text-primary-900 dark:text-primary-100 mt-1">{user?.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-primary-500 dark:text-primary-400">Email Address</label>
          <p className="text-base sm:text-lg text-primary-900 dark:text-primary-100 mt-1">{user?.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-primary-500 dark:text-primary-400">Role</label>
          <p className="text-base sm:text-lg text-primary-900 dark:text-primary-100 capitalize mt-1">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}