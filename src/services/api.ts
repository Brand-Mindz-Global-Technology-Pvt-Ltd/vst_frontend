import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the JWT token to every request
api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('vst_user');
        if (storedUser) {
            try {
                const { token } = JSON.parse(storedUser);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error("Error parsing stored user for token:", error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Prevent multiple simultaneous 401s from triggering multiple redirects
let isRedirecting = false;

// Add a response interceptor to handle common errors (like 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const message = error.response.data?.message || '';
            // Auto-logout only once — guard against concurrent 401 responses
            if (!isRedirecting && (message.includes('expired') || message.includes('No token'))) {
                isRedirecting = true;
                localStorage.removeItem('vst_user');
                const currentPath = window.location.pathname + window.location.search;
                window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}&reason=session_expired`;
                // Flag stays true for the remainder of this page lifecycle (until redirect completes)
            }
        }
        return Promise.reject(error);
    }
);

export default api;
