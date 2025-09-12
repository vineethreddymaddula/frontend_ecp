import { StateCreator } from 'zustand';
import Cookies from 'js-cookie';
import api from '@/lib/axios';
import { IUser } from '@/interfaces/user.interface';

/**
 * Defines the shape of the authentication slice, including its state and actions.
 */
export interface AuthSlice {
user: IUser | null;
authLoading: boolean;
authError: string | null;
loginUser: (email: string, password: string) => Promise<void>;
registerUser: (name: string, email: string, password: string) => Promise<void>;
logoutUser: () => void;
initializeAuth: () => void;
}

/**
 * Creates the authentication slice for the Zustand store.
 */
export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
// --- STATE ---
user: null,
authLoading: true, // FIX: Default to true to prevent pages from rendering before the auth check is complete.
authError: null,

// --- ACTIONS ---

/**
 * Checks for user info in localStorage and a token in cookies on initial app load to persist the session.
 */
initializeAuth: () => {
try {
    const storedUser = localStorage.getItem('userInfo');
    const token = Cookies.get('auth_token');
    if (storedUser && token) {
    set({ user: JSON.parse(storedUser) });
    }
} catch (error) {
    console.error("Failed to initialize auth session:", error);
    set({ user: null }); // Clear user state if there's an error
} finally {
    // FIX: This ensures authLoading is set to false only after the try/catch block has finished.
    set({ authLoading: false });
}
},

/**
 * Logs in a user, stores user data and token, and updates the state.
 */
loginUser: async (email, password) => {
set({ authLoading: true, authError: null });
try {
    const { data } = await api.post('/auth/login', { email, password });
    set({ user: data, authLoading: false });
    localStorage.setItem('userInfo', JSON.stringify(data));
    Cookies.set('auth_token', data.token, { expires: 30 });
} catch (err: any) {
    const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
    set({ authError: errorMsg, authLoading: false, user: null });
}
},

/**
 * Registers a new user, stores their data and token, and updates the state.
 */
registerUser: async (name, email, password) => {
set({ authLoading: true, authError: null });
try {
    const { data } = await api.post('/auth/register', { name, email, password });
    set({ user: data, authLoading: false });
    localStorage.setItem('userInfo', JSON.stringify(data));
    Cookies.set('auth_token', data.token, { expires: 30 });
} catch (err: any) {
    const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
    set({ authError: errorMsg, authLoading: false, user: null });
}
},

/**
 * Logs out the user by clearing the state and removing stored data and token.
 */
logoutUser: () => {
set({ user: null, authError: null });
localStorage.removeItem('userInfo');
Cookies.remove('auth_token');
},
});

