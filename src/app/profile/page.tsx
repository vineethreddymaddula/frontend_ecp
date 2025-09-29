'use client';

import { useAppStore } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { 
  MdShoppingBag, 
  MdFavorite, 
  MdStar, 
  MdEmojiEvents,
  MdLock,
  MdLocationOn,
  MdPayment,
  MdNotifications,
  MdLogout,
  MdAdminPanelSettings,
  MdPerson
} from 'react-icons/md';

export default function ProfileDetailsPage() {
  const { user, logoutUser } = useAppStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [addresses, setAddresses] = useState([{ id: 1, type: 'Home', address: '123 Main St, City, 12345', isDefault: true }]);
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

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
    const newAddress = { id: Date.now(), type: 'New Address', address: 'Enter address...', isDefault: false };
    setAddresses([...addresses, newAddress]);
    showToastMessage('Address added successfully');
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    showToastMessage('Address deleted successfully');
  };

  const handleNotificationSave = () => {
    showToastMessage('Notification preferences saved');
    setActiveModal(null);
  };

  const stats = [
    { label: "Orders", value: "12", icon: MdShoppingBag, color: "text-blue-500" },
    { label: "Wishlist", value: "8", icon: MdFavorite, color: "text-red-500" },
    { label: "Reviews", value: "5", icon: MdStar, color: "text-yellow-500" },
    { label: "Points", value: "240", icon: MdEmojiEvents, color: "text-green-500" }
  ];

  const recentActivity = [
    { action: "Order placed", item: "Wireless Headphones", time: "2 hours ago", status: "success" },
    { action: "Review posted", item: "Gaming Mouse", time: "1 day ago", status: "info" },
    { action: "Wishlist added", item: "Mechanical Keyboard", time: "3 days ago", status: "warning" }
  ];

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="app-card text-center">
              <IconComponent className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-app-lg font-bold text-primary-900 dark:text-primary-100">{stat.value}</div>
              <div className="text-app-xs text-primary-600 dark:text-primary-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Account Details */}
      <div className="app-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-app-base font-semibold text-primary-900 dark:text-primary-100">Account Details</h2>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-accent hover:text-accent-hover text-app-sm font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-app-xs font-medium text-primary-500 dark:text-primary-400 mb-1">Full Name</label>
            {isEditing ? (
              <input 
                type="text" 
                defaultValue={user?.name} 
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            ) : (
              <p className="text-app-sm text-primary-900 dark:text-primary-100 p-3 bg-primary-50 dark:bg-primary-700 rounded-lg">{user?.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-app-xs font-medium text-primary-500 dark:text-primary-400 mb-1">Email Address</label>
            {isEditing ? (
              <input 
                type="email" 
                defaultValue={user?.email} 
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            ) : (
              <p className="text-app-sm text-primary-900 dark:text-primary-100 p-3 bg-primary-50 dark:bg-primary-700 rounded-lg">{user?.email}</p>
            )}
          </div>

          <div>
            <label className="block text-app-xs font-medium text-primary-500 dark:text-primary-400 mb-1">Phone Number</label>
            {isEditing ? (
              <input 
                type="tel" 
                placeholder="Add phone number" 
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            ) : (
              <p className="text-app-sm text-primary-600 dark:text-primary-400 p-3 bg-primary-50 dark:bg-primary-700 rounded-lg">Not added yet</p>
            )}
          </div>

          <div>
            <label className="block text-app-xs font-medium text-primary-500 dark:text-primary-400 mb-1">Role</label>
            <div className="flex items-center gap-2 p-3 bg-primary-50 dark:bg-primary-700 rounded-lg">
              {user?.role === 'admin' ? (
                <div className="flex items-center gap-2">
                  <MdAdminPanelSettings className="w-4 h-4 text-purple-500" />
                  <span className="inline-block px-2 py-1 rounded-full text-app-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                    Admin
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MdPerson className="w-4 h-4 text-blue-500" />
                  <span className="inline-block px-2 py-1 rounded-full text-app-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    Customer
                  </span>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => { showToastMessage('Profile updated successfully'); setIsEditing(false); }}
                className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors text-app-sm"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-app-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="app-card">
        <h2 className="text-app-base font-semibold text-primary-900 dark:text-primary-100 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-700 rounded-lg">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-app-xs font-medium text-primary-900 dark:text-primary-100">
                  {activity.action}
                </p>
                <p className="text-app-xs text-primary-600 dark:text-primary-400 truncate">
                  {activity.item}
                </p>
              </div>
              <span className="text-app-xs text-primary-500 dark:text-primary-400 flex-shrink-0">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="app-card">
        <h2 className="text-app-base font-semibold text-primary-900 dark:text-primary-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveModal('password')}
            className="flex flex-col items-center gap-2 p-4 bg-primary-50 dark:bg-primary-700 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors"
          >
            <MdLock className="w-6 h-6 text-orange-500" />
            <span className="text-app-xs font-medium text-primary-900 dark:text-primary-100">Change Password</span>
          </button>
          <button 
            onClick={() => setActiveModal('addresses')}
            className="flex flex-col items-center gap-2 p-4 bg-primary-50 dark:bg-primary-700 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors"
          >
            <MdLocationOn className="w-6 h-6 text-blue-500" />
            <span className="text-app-xs font-medium text-primary-900 dark:text-primary-100">Manage Addresses</span>
          </button>
          <button 
            onClick={() => showToastMessage('Payment methods feature coming soon!')}
            className="flex flex-col items-center gap-2 p-4 bg-primary-50 dark:bg-primary-700 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors"
          >
            <MdPayment className="w-6 h-6 text-green-500" />
            <span className="text-app-xs font-medium text-primary-900 dark:text-primary-100">Payment Methods</span>
          </button>
          <button 
            onClick={() => setActiveModal('notifications')}
            className="flex flex-col items-center gap-2 p-4 bg-primary-50 dark:bg-primary-700 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors"
          >
            <MdNotifications className="w-6 h-6 text-purple-500" />
            <span className="text-app-xs font-medium text-primary-900 dark:text-primary-100">Notifications</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="app-card">
        <button 
          onClick={() => { logoutUser(); router.push('/'); }}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
        >
          <MdLogout className="w-5 h-5" />
          <span className="text-app-sm">Logout</span>
        </button>
      </div>

      {/* Change Password Modal */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-app-base font-semibold text-primary-900 dark:text-primary-100 mb-4">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                className="w-full p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 text-app-sm focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setActiveModal(null)} className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-app-sm">Cancel</button>
              <button onClick={handlePasswordChange} className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors text-app-sm">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Addresses Modal */}
      {activeModal === 'addresses' && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-app-base font-semibold text-primary-900 dark:text-primary-100 mb-4">Manage Addresses</h3>
            <div className="space-y-3 mb-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-3 bg-primary-50 dark:bg-primary-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-app-xs font-medium text-primary-900 dark:text-primary-100">{addr.type}</span>
                    <div className="flex gap-2">
                      {addr.isDefault && <span className="text-app-xs bg-accent text-white px-2 py-1 rounded">Default</span>}
                      <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-600 dark:text-red-400 text-app-xs">Delete</button>
                    </div>
                  </div>
                  <p className="text-app-xs text-primary-600 dark:text-primary-400">{addr.address}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setActiveModal(null)} className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-app-sm">Close</button>
              <button onClick={handleAddAddress} className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors text-app-sm">Add New</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {activeModal === 'notifications' && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-app-base font-semibold text-primary-900 dark:text-primary-100 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-app-sm text-primary-900 dark:text-primary-100">Email Notifications</span>
                <button
                  onClick={() => setNotifications({...notifications, email: !notifications.email})}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-accent' : 'bg-primary-300 dark:bg-primary-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-app-sm text-primary-900 dark:text-primary-100">SMS Notifications</span>
                <button
                  onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications.sms ? 'bg-accent' : 'bg-primary-300 dark:bg-primary-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-app-sm text-primary-900 dark:text-primary-100">Push Notifications</span>
                <button
                  onClick={() => setNotifications({...notifications, push: !notifications.push})}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-accent' : 'bg-primary-300 dark:bg-primary-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setActiveModal(null)} className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-app-sm">Cancel</button>
              <button onClick={handleNotificationSave} className="flex-1 bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent-hover transition-colors text-app-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}