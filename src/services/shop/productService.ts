import { API_BASE_URL } from '../../config/apiConfig';

export const productService = {
    /**
     * Fetch products for the shop page
     */
    getPublicProducts: async (page = 1, limit = 8, category = '', subCategory = '', search = '', minPrice = '', maxPrice = '', rating = '') => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                category: category || '',
                subCategory: subCategory || '',
                search: search || '',
                minPrice: minPrice?.toString() || '',
                maxPrice: maxPrice?.toString() || '',
                rating: rating?.toString() || ''
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
    },

    /**
     * Fetch all categories
     */
    getCategories: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/customers/categories`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch categories');
            }
            return await response.json();
        } catch (error) {
            console.error('Category Service Error:', error);
            throw error;
        }
    },

    /**
     * Fetch a single product by ID
     */
    getProductById: async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/customers/products/${id}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch product');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Product Service Error:', error);
            throw error;
        }
    }
};
