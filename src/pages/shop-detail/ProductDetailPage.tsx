import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/ui/footer/Footer';
import ProductImageSection from '../../components/shop-detail/ProductImageSection';
import ProductInfoSection from '../../components/shop-detail/ProductInfoSection';
import ProductFeaturesBar from '../../components/shop-detail/ProductFeaturesBar';
import AboutProductSection from '../../components/shop-detail/AboutProductSection';
import CustomerReviewsSection from '../../components/shop-detail/CustomerReviewsSection';
import RelatedProductsSection from '../../components/shop-detail/RelatedProductsSection';

const ProductDetailPage: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-[#EFEFEF]">
            <main className="grow">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-20 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-start">
                        {/* Left Sticky Section */}
                        <div className="w-full lg:sticky lg:top-[100px]">
                            <ProductImageSection />
                        </div>

                        {/* Right Scrollable Section */}
                        <div className="w-full">
                            <ProductInfoSection />
                        </div>
                    </div>
                </div>

                {/* Features Bar Section */}
                <ProductFeaturesBar />

                {/* About Product Section */}
                <AboutProductSection />

                {/* Customer Reviews Section */}
                <CustomerReviewsSection />

                {/* Related Products Section */}
                <RelatedProductsSection />
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;
