import api from '../api';

export const apiCreateAddress = async (addressData: any) => {
    try {
        const response = await api.post('/customers/address/create-address', addressData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to save address' };
    }
};

export const apiGetAddresses = async () => {
    try {
        const response = await api.get('/customers/address');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to fetch addresses' };
    }
};

export const apiUpdateAddress = async (id: string, addressData: any) => {
    try {
        const response = await api.put(`/customers/address/${id}`, addressData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to update address' };
    }
};

export const apiDeleteAddress = async (id: string) => {
    try {
        const response = await api.delete(`/customers/address/${id}`);
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
