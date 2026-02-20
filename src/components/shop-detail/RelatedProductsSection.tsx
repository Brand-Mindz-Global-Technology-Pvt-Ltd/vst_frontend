import React from 'react';
import RelatedProductCard from '../ui/shop/RelatedProductCard';

const relatedProducts = [
    {
        id: 1,
        name: "Fiji Aqua Pro",
        image: "/assets/home/aqu-banner.png",
        discount: "40% OFF"
    },
    {
        id: 2,
        name: "Fiji Aqua Pro",
        image: "/assets/home/aqu-banner.png",
        discount: "40% OFF"
    },
    {
        id: 3,
        name: "Fiji Aqua Pro",
        image: "/assets/home/aqu-banner.png",
        discount: "40% OFF"
    },
    {
        id: 4,
        name: "Fiji Aqua Pro",
        image: "/assets/home/aqu-banner.png",
        discount: "40% OFF"
    }
];

const RelatedProductsSection: React.FC = () => {
    return (
        <section className="bg-[#EFEFEF] py-16 px-4 sm:px-10 md:px-20 font-josefin">
            <div className="max-w-[1440px] mx-auto">
                <h2 className="text-2xl md:text-3xl font-josefin font-medium text-black mb-10">
                    Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {relatedProducts.map((product, idx) => (
                        <RelatedProductCard
                            key={idx}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            discount={product.discount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedProductsSection;
