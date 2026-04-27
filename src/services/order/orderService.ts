import api from '../api';

export const apiCreateAddress = async (customerId: string, addressData: any) => {
    try {
        const response = await api.post('/customers/address/create-address', { ...addressData, customerId });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to save address' };
    }
};

export const apiGetAddresses = async (customerId: string) => {
    try {
        const response = await api.get(`/customers/address/${customerId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to fetch addresses' };
    }
};

export const apiUpdateAddress = async (customerId: string, id: string, addressData: any) => {
    try {
        const response = await api.put(`/customers/address/${customerId}/${id}`, addressData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to update address' };
    }
};

export const apiDeleteAddress = async (customerId: string, id: string) => {
    try {
        const response = await api.delete(`/customers/address/${customerId}/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to delete address' };
    }
};

export const apiCreateOrder = async (orderData: any) => {
    try {
        const response = await api.post('/customers/orders/cod/create', orderData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Order placement failed' };
    }
};

export const apiGetMyOrders = async () => {
    try {
        const response = await api.get('/customers/orders/my-orders');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to fetch orders' };
    }
};

export const apiInitiatePhonePePayment = async (orderData: any) => {
    try {
        const response = await api.post('/customers/orders/phonepe/initiate', orderData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'PhonePe initiation failed' };
    }
};
