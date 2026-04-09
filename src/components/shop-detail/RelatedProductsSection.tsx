import React from 'react';
import RelatedProductCard from '../ui/shop/RelatedProductCard';
import { useProducts } from '../../hooks/useProducts';
import { getImageUrl } from '../../config/apiConfig';

interface RelatedProductsSectionProps {
    category: string;
    excludeId: string;
}

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({ category, excludeId }) => {
    const { products, loading } = useProducts(1, 5, category);

    const relatedProducts = products.filter(p => p._id !== excludeId).slice(0, 4);

    if (loading) {
        return (
            <section className="bg-[#EFEFEF] py-16 px-4 sm:px-10 md:px-20 font-josefin">
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                </div>
            </section>
        );
    }

    if (relatedProducts.length === 0) return null;

    return (
        <section className="bg-[#EFEFEF] py-16 px-4 sm:px-10 md:px-20 font-josefin">
            <div className="max-w-[1440px] mx-auto">
                <h2 className="text-2xl md:text-3xl font-josefin font-medium text-black mb-10">
                    Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {relatedProducts.map((product) => (
                        <RelatedProductCard
                            key={product._id}
                            id={product._id as any}
                            name={product.name}
                            image={getImageUrl(product.images?.[0])}
                            discount={product.discount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedProductsSection;
