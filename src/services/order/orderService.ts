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

export const apiCreateWalletOrder = async (orderData: any) => {
    try {
        const response = await api.post('/customers/orders/wallet/create', orderData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Wallet order failed' };
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

export const apiVerifyPhonePePayment = async (orderId: string) => {
    try {
        const response = await api.get(`/customers/orders/phonepe/verify/${orderId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'PhonePe verification failed' };
    }
};

export const apiCancelOrder = async (orderId: string, cancelReason: string) => {
    try {
        const response = await api.patch(`/customers/orders/${orderId}/cancel`, { cancelReason });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to cancel order' };
    }
};

export const apiTrackGuestOrder = async (orderId: string, email: string) => {
    try {
        const response = await api.post('/customers/orders/track-guest', { orderId, email });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Guest tracking failed' };
    }
};

// Profile APIs (TC-UP-001, TC-UP-002, TC-UP-006, TC-UP-010)
export const apiGetCustomerProfile = async () => {
    try {
        const response = await api.get('/customers/profile');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to fetch profile' };
    }
};

export const apiUpdateCustomerProfile = async (profileData: { name?: string; phone?: string; profilePicture?: string }) => {
    try {
        const response = await api.put('/customers/profile', profileData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to update profile' };
    }
};

export const apiChangeCustomerPassword = async (passwords: { currentPassword?: string; newPassword?: string }) => {
    try {
        const response = await api.post('/customers/change-password', passwords);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to change password' };
    }
};

export const apiDeleteCustomerAccount = async (password: string) => {
    try {
        const response = await api.delete('/customers/delete-account', { data: { password } });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to delete account' };
    }
};

// Wishlist APIs (TC-UP-005)
export const apiGetWishlist = async (customerId: string) => {
    try {
        const response = await api.get(`/customers/wishlist/get-wishlist?customerId=${customerId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to fetch wishlist' };
    }
};

export const apiToggleWishlist = async (customerId: string, productId: string) => {
    try {
        const response = await api.post('/customers/wishlist/add-wishlist', { customerId, productId });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to toggle wishlist' };
    }
};

export const apiRemoveProductFromWishlist = async (customerId: string, productId: string) => {
    try {
        const response = await api.delete('/customers/wishlist/remove-product', { data: { customerId, productId } });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to remove from wishlist' };
    }
};

export const apiClearWishlist = async (customerId: string) => {
    try {
        const response = await api.delete('/customers/wishlist/clear', { data: { customerId } });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed to clear wishlist' };
    }
};

