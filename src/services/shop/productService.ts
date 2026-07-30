import { API_BASE_URL } from '../../config/apiConfig';
import type { Product, ProductListResponse } from '../../types/product';

export const productService = {
    /**
     * Fetch products for the shop page
     */
    getPublicProducts: async (page = 1, limit = 8, category = '', subCategory = '', search = '', minPrice = '', maxPrice = '', rating = '', sort = 'newest') => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                category: category || '',
                subCategory: subCategory || '',
                search: search || '',
                minPrice: minPrice?.toString() || '',
                maxPrice: maxPrice?.toString() || '',
                rating: rating?.toString() || '',
                sort: sort || 'newest'
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
     * Fetch every product in a category by following the API pagination.
     */
    getAllProductsByCategory: async (
        category: string,
        filters: { subCategory?: string; minPrice?: string; maxPrice?: string; rating?: string } = {}
    ): Promise<Product[]> => {
        const pageSize = 100;
        const firstPage = await productService.getPublicProducts(
            1,
            pageSize,
            category,
            filters.subCategory || '',
            '',
            filters.minPrice || '',
            filters.maxPrice || '',
            filters.rating || ''
        ) as ProductListResponse;

        if (!firstPage.success) {
            throw new Error(`Failed to load ${category} products`);
        }

        const totalPages = firstPage.pagination?.totalPages ?? 1;
        if (totalPages <= 1) return firstPage.data;

        const remainingPages = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, index) =>
                productService.getPublicProducts(
                    index + 2,
                    pageSize,
                    category,
                    filters.subCategory || '',
                    '',
                    filters.minPrice || '',
                    filters.maxPrice || '',
                    filters.rating || ''
                ) as Promise<ProductListResponse>
            )
        );

        return [
            ...firstPage.data,
            ...remainingPages.flatMap((response) => {
                if (!response.success) {
                    throw new Error(`Failed to load ${category} products`);
                }
                return response.data;
            })
        ];
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
    },

    /**
     * Search products (for autocomplete)
     */
    searchProducts: async (query: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/customers/products/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Search failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Search Service Error:', error);
            throw error;
        }
    }
};
