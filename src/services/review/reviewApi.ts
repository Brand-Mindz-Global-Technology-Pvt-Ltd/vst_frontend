import api from '../api';

export interface Review {
    _id: string;
    customerId: string;
    productId: string;
    rating: number;
    title: string;
    comment: string;
    images: string[];
    customerName: string;
    customerAvatar: string;
    createdAt: string;
}

export interface CanReviewResponse {
    success: boolean;
    canReview: boolean;
    reason: 'purchase_required' | 'already_reviewed' | null;
    message: string;
}

// Get all reviews for a product (public)
export const getProductReviews = async (productId: string): Promise<Review[]> => {
    const res = await api.get(`/customers/reviews/product/${productId}`);
    return res.data.data;
};

// Check if a customer can review a specific product
export const checkCanReview = async (
    customerId: string,
    productId: string
): Promise<CanReviewResponse> => {
    const res = await api.get(`/customers/reviews/can-review/${customerId}/${productId}`);
    return res.data;
};

// Submit a new review (with optional image files)
export const createReview = async (formData: FormData): Promise<Review> => {
    const res = await api.post('/customers/reviews', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
};

// Update an existing review
export const updateReview = async (reviewId: string, formData: FormData): Promise<Review> => {
    const res = await api.put(`/customers/reviews/${reviewId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
};

// Delete a review
export const deleteReview = async (reviewId: string, customerId: string): Promise<void> => {
    await api.delete(`/customers/reviews/${reviewId}`, {
        data: { customerId },
    });
};
