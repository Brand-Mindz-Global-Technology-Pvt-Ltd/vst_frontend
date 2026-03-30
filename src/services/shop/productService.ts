import { API_BASE_URL } from '../../config/apiConfig';

export const productService = {
    /**
     * Fetch products for the shop page
     */
    getPublicProducts: async (page = 1, limit = 8, category = '', subCategory = '', search = '') => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                category,
                subCategory,
                search
            });

            const response = await fetch(`${API_BASE_URL}/customers/products?${queryParams}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch products');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Product Service Error:', error);
            throw error;
        }
    }
};
