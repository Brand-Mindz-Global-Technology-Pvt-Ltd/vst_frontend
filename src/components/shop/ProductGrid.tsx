import React from 'react';
import ShopProductCard from './ShopProductCard';

const products = [
    {
        id: 1,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "3K",
        currentPrice: "4,000",
        originalPrice: "16,000",
        isLimitedTime: true
    },
    {
        id: 2,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "3K",
        currentPrice: "4,000",
        originalPrice: "16,000"
    },
    {
        id: 3,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "3K",
        currentPrice: "4,000",
        originalPrice: "16,000"
    },
    {
        id: 4,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "3K",
        currentPrice: "4,000",
        originalPrice: "16,000"
    },
    {
        id: 5,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "1K",
        currentPrice: "4,000",
        originalPrice: "16,000",
        isLimitedTime: true
    },
    {
        id: 6,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "3K",
        currentPrice: "4,000",
        originalPrice: "16,000"
    },
    {
        id: 7,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "3K",
        currentPrice: "4,000",
        originalPrice: "16,000"
    },
    {
        id: 8,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "2K",
        currentPrice: "4,000",
        originalPrice: "16,000"
    },
    {
        id: 9,
        name: "Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000",
        image: "/assets/home/aqu-banner.png",
        rating: 4.5,
        reviews: "3K",
        currentPrice: "4,000",
        originalPrice: "16,000",
        isLimitedTime: true
    },
];

const ProductGrid: React.FC = () => {
    return (
        <div className="flex flex-col grow" >

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ShopProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
