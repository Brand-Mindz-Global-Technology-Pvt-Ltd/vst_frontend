import React, { useState } from 'react';
import { Star } from 'lucide-react';
import ReviewModal from './ReviewModal';
import type { Product } from '../../types/product';

interface CustomerReviewsSectionProps {
    product: Product;
}

const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ product }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const ratings = [
        { stars: 5, percentage: 95 },
        { stars: 4, percentage: 80 },
        { stars: 3, percentage: 10 },
        { stars: 2, percentage: 0 },
        { stars: 1, percentage: 0 },
    ];

    const reviews = [
        {
            id: 1,
            name: "Santhosh",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            stars: 5,
            title: "Good Service",
            text: "Excellent product! Easy installation, good water taste and perfect TDS level around Great value for money for home use.",
            image: "/assets/home/aqu-banner.png"
        },
        {
            id: 2,
            name: "Jothi",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            stars: 5,
            title: "Good Service",
            text: "Excellent product! Easy installation, good water taste and perfect TDS level around Great value for money for home use.",
            image: "/assets/home/aqu-banner.png"
        }
    ];

    return (
        <section className="bg-white py-20 px-4 sm:px-10 md:px-20 font-josefin border-t border-gray-100">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">

                    {/* Left Sticky Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-[120px]">
                        <h2 className="text-2xl md:text-3xl font-josefin text-dark mb-6">Customer Reviews</h2>

                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex text-yellow-400 gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={25} 
                                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                                        stroke={i < Math.floor(product.rating) ? "none" : "currentColor"} 
                                    />
                                ))}
                            </div>
                            <span className="text-sm md:text-md text-black font-semibold">
                                Based on {product.reviewsCount || 0} reviews
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 mb-10">
                            {ratings.map((rate) => (
                                <div key={rate.stars} className="flex items-center gap-4">
                                    <span className="text-md font-medium text-black w-12">{rate.stars} Star</span>
                                    <div className="flex-1 h-4 border border-gray-300  bg-gray-100  overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 transition-all duration-500"
                                            style={{ width: `${rate.percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm md:text-md font-medium text-black w-8">{rate.percentage}%</span>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-black w-full mb-8"></div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-3xl font-josefin text-dark">Reviews this product</h3>
                            <p className="text-black text-sm">Share your thoughts with other customers</p>
                            <button
                                onClick={() => setIsReviewModalOpen(true)}
                                className="w-full  py-2 px-6 border border-black rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all tracking-wider"
                            >
                                Write a product review
                            </button>
                        </div>
                    </div>

                    {/* Review Modal */}
                    <ReviewModal
                        isOpen={isReviewModalOpen}
                        onClose={() => setIsReviewModalOpen(false)}
                    />

                    {/* Right Scrollable Content */}
                    <div className="lg:col-span-8">
                        <h2 className="text-2xl md:text-3xl font-josefin text-black mb-10">Recent Reviews</h2>

                        <div className="flex flex-col gap-12">
                            {reviews.map((review) => (
                                <div key={review.id} className="flex flex-col gap-4 pb-12 border-b border-gray-50 border-dashed last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                                            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-2xl font-josefin text-dark leading-none">{review.name}</span>
                                    </div>

                                    <div className="flex text-yellow-400 gap-1 mt-0">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={18} 
                                                fill={i < review.stars ? "currentColor" : "none"} 
                                                stroke={i < review.stars ? "none" : "currentColor"} 
                                            />
                                        ))}
                                    </div>

                                    <h4 className="text-2xl font-josefin text-black -mt-1">{review.title}</h4>

                                    <p className="text-black text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                                        {review.text}
                                    </p>

                                    <div className="mt-4 bg-[#F2F2F2] rounded-xl w-[120px] aspect-square flex items-center justify-center p-2 relative group overflow-hidden">
                                        <img
                                            src={review.image}
                                            alt="Review product"
                                            className="w-full h-full object-contain relative z-10"
                                        />
                                        <img
                                            src="/assets/home/podium.webp"
                                            alt="podium"
                                            className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[110%] opacity-40 z-0"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviewsSection;
