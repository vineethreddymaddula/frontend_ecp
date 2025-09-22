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
export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
// --- STATE ---
user: null,
authLoading: true, // FIX: Default to true to prevent pages from rendering before the auth check is complete.
authError: null,

// --- ACTIONS ---

/**
 * Initializes auth by checking for valid token in cookies
 */
initializeAuth: () => {
try {
    const token = Cookies.get('auth_token');
    const currentUser = get().user;
    
    if (!token && currentUser) {
        // Token expired but user still in store, clear user
        set({ user: null });
    } else if (token && !currentUser) {
        // Token exists but no user in store, this shouldn't happen with persistence
        // but we'll clear the invalid token
        Cookies.remove('auth_token');
    }
} catch (error) {
    console.error("Failed to initialize auth session:", error);
    set({ user: null });
    Cookies.remove('auth_token');
} finally {
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
Cookies.remove('auth_token');
},
});

