import { useState, useEffect } from 'react';
import { productService } from '../services/shop/productService';
import type { Product, ProductListResponse } from '../types/product';

export const useProducts = (page = 1, limit = 8, category = '', subCategory = '', search = '') => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<ProductListResponse['pagination'] | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data: ProductListResponse = await productService.getPublicProducts(page, limit, category, subCategory, search);
                if (data.success) {
                    setProducts(data.data);
                    setPagination(data.pagination);
                } else {
                    setError('Failed to load products');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit, category, subCategory, search]);

    return { products, loading, error, pagination };
};
