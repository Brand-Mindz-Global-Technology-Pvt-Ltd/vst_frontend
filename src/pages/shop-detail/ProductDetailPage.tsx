import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/ui/footer/Footer';
import ProductImageSection from '../../components/shop-detail/ProductImageSection';
import ProductInfoSection from '../../components/shop-detail/ProductInfoSection';
import ProductFeaturesBar from '../../components/shop-detail/ProductFeaturesBar';
import AboutProductSection from '../../components/shop-detail/AboutProductSection';
import CustomerReviewsSection from '../../components/shop-detail/CustomerReviewsSection';
import RelatedProductsSection from '../../components/shop-detail/RelatedProductsSection';
import { useProduct } from '../../hooks/useProduct';

const ProductDetailPage: React.FC = () => {
    const { pathname } = useLocation();
    const { id } = useParams<{ id: string }>();
    const { product, loading, error } = useProduct(id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#EFEFEF]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DAC00]"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#EFEFEF]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Error</h2>
                    <p className="text-gray-600 mt-2">{error || 'Product not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#EFEFEF]">
            <main className="grow">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-20 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-start">
                        {/* Left Sticky Section */}
                        <div className="w-full lg:sticky lg:top-[100px]">
                            <ProductImageSection product={product} />
                        </div>

                        {/* Right Scrollable Section */}
                        <div className="w-full">
                            <ProductInfoSection product={product} />
                        </div>
                    </div>
                </div>

                {/* Features Bar Section */}
                <ProductFeaturesBar />

                {/* About Product Section */}
                <AboutProductSection product={product} />

                {/* Customer Reviews Section */}
                <CustomerReviewsSection product={product} />

                {/* Related Products Section */}
                <RelatedProductsSection category={product.category} excludeId={product._id} />
            </main>
        </div>
    );
};

export default ProductDetailPage;
