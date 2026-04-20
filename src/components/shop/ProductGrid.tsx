import React from 'react';
import ShopProductCard from './ShopProductCard';
import { useProducts } from '../../hooks/useProducts';
import { getImageUrl } from '../../config/apiConfig';

interface ProductGridProps {
    filters: {
        category: string;
        minPrice: string;
        maxPrice: string;
        rating: string;
    };
}

const ProductGrid: React.FC<ProductGridProps> = ({ filters }) => {
    const { products, loading, error } = useProducts(
        1, 
        12, 
        filters.category, 
        '', 
        '', 
        filters.minPrice, 
        filters.maxPrice, 
        filters.rating
    );

    if (loading) {
        return (
            <div className="flex flex-col grow min-h-[400px] items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DAC00]"></div>
                <p className="mt-4 text-gray-500 font-josefin">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col grow min-h-[400px] items-center justify-center">
                <p className="text-red-500 font-josefin">Error: {error}</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col grow min-h-[400px] items-center justify-center">
                <p className="text-gray-500 font-josefin text-xl">No products found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col grow" >
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    const productImage = getImageUrl(product.images?.[0]);

                    return (
                        <ShopProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            image={productImage}
                            rating={product.rating || 0}
                            reviews={product.reviewsCount?.toString() || "0"}
                            currentPrice={product.price?.toLocaleString() || "NA"}
                            originalPrice={product.oldPrice?.toLocaleString() || "NA"}
                            isLimitedTime={product.isLimitedTime}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductGrid;
