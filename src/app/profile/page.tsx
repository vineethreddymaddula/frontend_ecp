'use client';
import { useAppStore } from "@/store";

export default function ProfileDetailsPage() {
  const { user } = useAppStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6 border-b pb-4">My Details</h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Full Name</label>
          <p className="text-lg text-primary">{user?.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Email Address</label>
          <p className="text-lg text-primary">{user?.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Role</label>
          <p className="text-lg text-primary capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}