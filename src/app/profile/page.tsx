'use client';

import { useAppStore } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { ProfilePageSkeleton } from '@/components/skeletons';
import { 
  MdLock,
  MdLocationOn,
  MdPayment,
  MdNotifications,
  MdLogout,
  MdAdminPanelSettings,
  MdPerson,
  MdSettings,
  MdExpandMore
} from 'react-icons/md';

export default function ProfileDetailsPage() {
  const { user, logoutUser, authLoading } = useAppStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const { addresses, addAddress, deleteAddress } = useAppStore();
  const [newAddress, setNewAddress] = useState({ type: '', address: '', city: '', postalCode: '', isDefault: false });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (authLoading) {
    return <ProfilePageSkeleton />;
  }

  if (!user) {
    return null;
  }

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      showToastMessage('Passwords do not match');
      return;
    }
    showToastMessage('Password changed successfully');
    setActiveModal(null);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleAddAddress = () => {
    if (!newAddress.type.trim() || !newAddress.address.trim() || !newAddress.city.trim() || !newAddress.postalCode.trim()) {
      showToastMessage('Please fill in all address fields');
      return;
    }
    addAddress(newAddress);
    setNewAddress({ type: '', address: '', city: '', postalCode: '', isDefault: false });
    showToastMessage('Address added successfully');
  };

  const handleDeleteAddress = (id: number) => {
    deleteAddress(id);
    showToastMessage('Address deleted successfully');
  };

  const handleNotificationSave = () => {
    showToastMessage('Notification preferences saved');
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      {/* Profile Header */}
      <div className="bg-white dark:bg-primary-800 border-b border-primary-200 dark:border-primary-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20  rounded-full flex items-center justify-center">
              {/* <MdPerson className="w-10 h-10 text-white" /> */}
              <img src="https://avatars.githubusercontent.com/u/83410299?s=400&u=40af658436b94777e8ebcb94275907b43a2de4f8&v=4" alt="" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">{user?.name}</h1>
              <p className="text-primary-600 dark:text-primary-400 text-sm mt-1">{user?.email}</p>
              {user?.role === 'admin' && (
                <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full text-xs font-medium mt-2">
                  <MdAdminPanelSettings className="w-3 h-3" />
                  Admin
                </span>
              )}
            </div>
            {/* <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-primary-100 dark:bg-primary-700 text-primary-900 dark:text-primary-100 px-4 py-2 rounded-lg font-medium hover:bg-primary-200 dark:hover:bg-primary-600 transition-colors"
            >
              Edit Profile
            </button> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Account Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Details */}
            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700">
              <div className="p-6 border-b border-primary-200 dark:border-primary-700">
                <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">Account Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-primary-900 dark:text-primary-100">Full Name</p>
                    <p className="text-sm text-primary-600 dark:text-primary-400">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-primary-100 dark:border-primary-700">
                  <div>
                    <p className="font-medium text-primary-900 dark:text-primary-100">Email Address</p>
                    <p className="text-sm text-primary-600 dark:text-primary-400">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-primary-100 dark:border-primary-700">
                  <div>
                    <p className="font-medium text-primary-900 dark:text-primary-100">Phone Number</p>
                    <p className="text-sm text-primary-600 dark:text-primary-400">Not added</p>
                  </div>
                  <button className="text-accent hover:text-accent-hover text-sm font-medium">Add</button>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700">
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-700 rounded-full flex items-center justify-center">
                    <MdSettings className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-lg font-semibold text-primary-900 dark:text-primary-100">Settings & Privacy</span>
                </div>
                <MdExpandMore className={`w-5 h-5 text-primary-600 dark:text-primary-400 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSettingsOpen && (
                <div className="border-t border-primary-200 dark:border-primary-700 divide-y divide-primary-100 dark:divide-primary-700">
                  <button 
                    onClick={() => setActiveModal('password')}
                    className="w-full flex items-center gap-4 p-4 hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <MdLock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-primary-900 dark:text-primary-100">Change Password</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">Update your account password</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveModal('addresses')}
                    className="w-full flex items-center gap-4 p-4 hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <MdLocationOn className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-primary-900 dark:text-primary-100">Manage Addresses</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">Add or edit delivery addresses</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => showToastMessage('Payment methods feature coming soon!')}
                    className="w-full flex items-center gap-4 p-4 hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <MdPayment className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-primary-900 dark:text-primary-100">Payment Methods</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">Manage cards and payment options</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveModal('notifications')}
                    className="w-full flex items-center gap-4 p-4 hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <MdNotifications className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-primary-900 dark:text-primary-100">Notifications</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">Control your notification preferences</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700 p-6">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-400">Orders</span>
                  <span className="font-semibold text-primary-900 dark:text-primary-100">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-400">Wishlist</span>
                  <span className="font-semibold text-primary-900 dark:text-primary-100">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-400">Reviews</span>
                  <span className="font-semibold text-primary-900 dark:text-primary-100">5</span>
                </div>
              </div>
            </div>
            
            {/* Logout */}
            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700">
              <button 
                onClick={() => { logoutUser(); router.push('/'); }}
                className="w-full flex items-center gap-3 p-4 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors rounded-xl"
              >
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <MdLogout className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Logout</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 text-sm placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 text-sm placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 text-sm placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setActiveModal(null)} className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-sm">Cancel</button>
              <button onClick={handlePasswordChange} className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors text-sm">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Addresses Modal */}
      {activeModal === 'addresses' && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">Manage Addresses</h3>
            
            {/* Existing Addresses */}
            <div className="space-y-3 mb-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-4 bg-primary-50 dark:bg-primary-700 rounded-lg border border-primary-200 dark:border-primary-600">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-primary-900 dark:text-primary-100">{addr.type}</span>
                    <div className="flex gap-2">
                      {addr.isDefault && <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">Default</span>}
                      <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-600 dark:text-red-400 text-sm font-medium hover:underline">Delete</button>
                    </div>
                  </div>
                  <p className="text-sm text-primary-600 dark:text-primary-400">{addr.address}</p>
                </div>
              ))}
            </div>
            
            {/* Add New Address Form */}
            <div className="border-t border-primary-200 dark:border-primary-700 pt-4">
              <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-3">Add New Address</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">Address Type</label>
                  <input
                    type="text"
                    placeholder="e.g., Home, Office"
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                    className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 text-sm placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                    className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 text-sm placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 text-sm placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">Postal Code</label>
                    <input
                      type="text"
                      placeholder="12345"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                      className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100 text-sm placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                    className="w-4 h-4 text-accent bg-white dark:bg-primary-800 border-primary-300 dark:border-primary-600 rounded focus:ring-accent"
                  />
                  <span className="text-sm text-primary-900 dark:text-primary-100">Set as default address</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button onClick={() => setActiveModal(null)} className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors">Close</button>
              <button onClick={handleAddAddress} className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors">Add Address</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {activeModal === 'notifications' && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-primary-900 dark:text-primary-100 font-medium">Email Notifications</span>
                <button
                  onClick={() => setNotifications({...notifications, email: !notifications.email})}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-accent' : 'bg-primary-300 dark:bg-primary-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-900 dark:text-primary-100 font-medium">SMS Notifications</span>
                <button
                  onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications.sms ? 'bg-accent' : 'bg-primary-300 dark:bg-primary-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-900 dark:text-primary-100 font-medium">Push Notifications</span>
                <button
                  onClick={() => setNotifications({...notifications, push: !notifications.push})}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-accent' : 'bg-primary-300 dark:bg-primary-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setActiveModal(null)} className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-sm">Cancel</button>
              <button onClick={handleNotificationSave} className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors text-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}