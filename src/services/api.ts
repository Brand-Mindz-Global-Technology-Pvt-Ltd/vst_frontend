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

// Add a response interceptor to handle common errors (like 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: Handle unauthorized globally (e.g., redirect to login)
            console.warn("Unauthorized request detected.");
        }
        return Promise.reject(error);
    }
);

export default api;
