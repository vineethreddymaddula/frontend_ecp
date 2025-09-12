import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';
import { getCookie } from '@/utils/cookies';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 50000,
});

// Request Interceptor to add the auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get the token from cookies
    const authToken = getCookie("auth_token");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    
    // You can add other default headers here if needed
    // config.headers['Accept-Language'] = getCookie("lang") ?? 'en';

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor (optional, for handling global errors)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // You can handle global errors here, e.g., redirect on 401
    return Promise.reject(error);
  }
);

export default axiosInstance;
