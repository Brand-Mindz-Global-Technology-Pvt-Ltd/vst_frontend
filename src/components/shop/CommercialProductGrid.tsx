import React, { useEffect, useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/shop/productService';
import { getImageUrl } from '../../config/apiConfig';
import type { Product } from '../../types/product';
import type { ProductFilters } from './FilterSidebar';
import { openEnquiryForm } from '../contactus/ContactForm';

interface ProductData {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: string;
    currentPrice: number;
    originalPrice: number;
    isLimitedTime?: boolean;
    discount?: string;
}

const toCommercialProduct = (product: Product): ProductData => {
    const calculatedDiscount = product.oldPrice && product.oldPrice > product.price
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;
    const discount = Number(product.discount) || calculatedDiscount;

    return {
        id: product._id,
        name: product.name,
        image: getImageUrl(product.images?.[0]),
        rating: product.rating || 0,
        reviews: String(product.reviewsCount || 0),
        currentPrice: product.price || 0,
        originalPrice: product.oldPrice || 0,
        isLimitedTime: product.isLimitedTime,
        discount: discount > 0 ? `${discount}% OFF` : undefined
    };
};

const CommercialProductCard: React.FC<ProductData> = ({
    id,
    name,
    image,
    rating,
    reviews,
    currentPrice,
    originalPrice,
    isLimitedTime,
    discount
}) => {
    const navigate = useNavigate();
    const handleNavigation = () => navigate(`/shop/${id}`);

    return (
        <div
            onClick={handleNavigation}
            className="group bg-white rounded-lg p-3 md:p-4 flex flex-col md:flex-row gap-4 md:gap-6 transition-all duration-300 hover:bg-[#F1FAFF] cursor-pointer border border-transparent hover:border-[#00A7FF]/10 shadow-sm hover:shadow-lg h-fit max-w-[1100px]"
        >
            {/* Left Section: Image and Discount */}
            <div className="w-full md:w-[210px] flex items-center justify-center bg-[#F0FAFF] group-hover:bg-white rounded-md p-4 relative  h-[250px] md:h-[280px] shrink-0 transition-colors duration-300">
                {discount && (
                    <div className="absolute top-4 left-0 z-10">
                        <span className="bg-[#1DAC00] text-white text-[10px] md:text-[11px] font-medium px-2 py-1 rounded-tl-0 rounded-bl-0 rounded-tr-md rounded-br-md shadow-sm font-josefin">
                            {discount}
                        </span>
                    </div>
                )}

                <div className="absolute bottom-3 w-[60%] h-3 bg-gray-500/40 rounded-[100%] z-0"></div>

                <img
                    src={image}
                    alt={name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out  z-10 relative"
                />
            </div>

            {/* Right Section: Details */}
            <div className="flex-1 flex flex-col justify-start py-1 md:pl-3">
                <div>
                    {isLimitedTime && (
                        <div className="mb-2">
                            <span className="bg-[#B70000] text-white text-[10px] md:text-[13px] font-normal px-2.5 py-1 block w-fit font-josefin ">
                                Limited time deal
                            </span>
                        </div>
                    )}

                    <h3 className="text-black font-josefin text-sm md:text-xl py-2 md:py-4 font-semibold leading-tight mb-1  md:line-clamp-3 group-hover:text-[#007EBB] transition-colors ">
                        {name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={15}
                                    className={i < Math.floor(rating) ? "fill-[#FFB400] text-[#FFB400]" : "text-gray-200"}
                                />
                            ))}
                        </div>
                        <span className="text-[12px] md:text-[15px] text-black font-josefin font-medium ml-1 pt-0.5">
                            {rating} ({reviews} Reviews)
                        </span>
                    </div>

                </div>

                {/* Bottom Row: Price and Action */}
                <div className="flex items-center justify-between mt-3 md:mt-2">
                    <div className="flex items-center gap-3">
                        <span className="text-xl md:text-4xl text-black font-josefin font-semibold leading-tight">₹{currentPrice.toLocaleString()}</span>
                        {originalPrice > 0 && (
                            <span className="text-[12px] md:text-[18px] text-[#646464ee] line-through decoration-[#FF0000] font-josefin font-semibold mt-1 md:mt-0 px-1">₹{originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            openEnquiryForm();
                        }}
                        className="bg-black text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full flex items-center gap-2.5 transition-all shadow-sm hover:bg-dark transform active:scale-95 group/btn"
                    >
                        <span className="text-xs md:text-base font-josefin font-medium whitespace-nowrap">Enquiry Now</span>
                        <div className="bg-white text-black rounded-full p-1 group-hover/btn:bg-[#00A7FF] group-hover/btn:text-white transition-colors">
                            <ArrowUpRight size={12} className="md:w-3.5 md:h-3.5 font-bold" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

interface CommercialProductGridProps {
    filters: ProductFilters;
}

const CommercialProductGrid: React.FC<CommercialProductGridProps> = ({ filters }) => {
    const [commercialProducts, setCommercialProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCommercialProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const products = await productService.getAllProductsByCategory('commercial', {
                    subCategory: filters.subCategory,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    rating: filters.rating
                });
                if (isMounted) {
                    setCommercialProducts(products.map(toCommercialProduct));
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load products');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCommercialProducts();

        return () => {
            isMounted = false;
        };
    }, [filters]);

    return (
        <div className="flex flex-col grow bg-[#EFEFEF] p-4 md:px-0">
            {/* Heading */}
            <div className="max-w-[1100px]">
                <h2 className="text-xl md:text-2xl font-josefin font-semibold text-black mb-6">
                    Products
                </h2>
            </div>

            {/* Grid - Horizontal Layout */}
            <div className="flex flex-col gap-4 md:gap-5 md:pr-7">
                {loading && (
                    <p className="py-10 text-center text-gray-500 font-josefin">Loading products...</p>
                )}
                {!loading && error && (
                    <p className="py-10 text-center text-red-500 font-josefin">{error}</p>
                )}
                {!loading && !error && commercialProducts.length === 0 && (
                    <p className="py-10 text-center text-gray-500 font-josefin">No commercial products found.</p>
                )}
                {!loading && !error && commercialProducts.map((product) => (
                    <div key={product.id} className="w-full">
                        <CommercialProductCard {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommercialProductGrid;
