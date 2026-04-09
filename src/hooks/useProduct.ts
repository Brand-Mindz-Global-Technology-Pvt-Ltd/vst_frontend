import { useState, useEffect } from 'react';
import { productService } from '../services/shop/productService';
import type { Product } from '../types/product';

export const useProduct = (id: string | undefined) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await productService.getProductById(id);
                if (response.success) {
                    setProduct(response.data);
                } else {
                    setError('Failed to load product');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};
