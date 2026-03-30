import api from '../api';

export const apiRegister = async (userData: any) => {
    try {
        const response = await api.post('/customers/create', userData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Registration failed' };
    }
};

export const apiLogin = async (credentials: any) => {
    try {
        const response = await api.post('/customers/login', credentials);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Login failed' };
    }
};

export const apiGetProfile = async () => {
    try {
        const response = await api.get('/customers/profile');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to fetch profile' };
    }
};
