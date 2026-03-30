import { API_BASE_URL } from '../../config/apiConfig';

export const homeService = {
  getShowcaseCategories: async () => {
    try {
      // Keep this as is for now since the user focused on product fetch
      const response = await fetch(`${API_BASE_URL}/customers/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getShowcaseProducts: async (category: string) => {
    try {
      // Switch back to public endpoint which doesn't require authentication
      const response = await fetch(`${API_BASE_URL}/customers/products?page=1&limit=8&category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
};
