import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ShopProductCardProps {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: string;
    currentPrice: string;
    originalPrice: string;
    isLimitedTime?: boolean;
}

const ShopProductCard: React.FC<ShopProductCardProps> = ({
    id,
    name,
    image,
    rating,
    reviews,
    currentPrice,
    originalPrice,
    isLimitedTime
}) => {
    const navigate = useNavigate();
    const handleNavigation = () => navigate(`/shop/${id}`);
    return (
        <div className="bg-white rounded-[15px] p-5 px-3 flex flex-col relative group transition-all duration-300 hover:shadow-2xl border border-transparent hover:border-gray-100 h-full">
            {/* Product Image area with Overlay Actions/Badges */}
            <div className="h-72 flex items-center justify-center mb-4 relative pt-12">
                {/* Ash Shade Ellipse (Podium) */}
                <div className="absolute bottom-4 w-[65%] h-5 bg-gray-300/50  rounded-[100%] z-0"></div>

                {/* Overlay Badges */}
                {isLimitedTime && (
                    <div className="absolute top-1 -left-3 z-20">
                        <span className="bg-[#B70000] text-white text-[10px] md:text-[13px]  font-normal px-3 py-1.5 shadow-sm block font-josefin">
                            Limited time deal
                        </span>
                    </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute top-1 right-0 z-20 flex flex-col gap-7">
                    <button className="text-black hover:text-red-500 transition-colors p-1 group/wishlist">
                        <Heart size={24} className="group-hover/wishlist:scale-110 transition-transform" />
                    </button>
                    <button className="text-black hover:text-[#007EBB] transition-colors p-1 group/cart">
                        <ShoppingCart size={24} className="group-hover/cart:scale-110 transition-transform" />
                    </button>
                </div>

                <img
                    src={image}
                    alt={name}
                    onClick={handleNavigation}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out z-10 relative bottom-1 cursor-pointer"
                />
            </div>

            {/* Product Details */}
            <div className="flex flex-col grow">
                <h3
                    onClick={handleNavigation}
                    className="text-[14px] md:text-[17px] md:pr-4 text-justify font-josefin font-medium text-black leading-[1.2] mb-2 line-clamp-3 cursor-pointer hover:text-[#007EBB] transition-colors"
                >
                    {name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 min-h-[20px] mb-1">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(rating) ? "fill-[#FFB400] text-[#FFB400]" : "text-gray-200"}
                            />
                        ))}
                    </div>
                    <span className="text-[12px] text-black font-josefin font-medium ml-1">
                        {rating} ({reviews} Reviews)
                    </span>
                </div>

                {/* Price and Action */}
                <div className="mt-auto pt-2 md:pr-5 flex items-center justify-between gap-4 border-t border-gray-50">
                    <div className="flex items-baseline gap-2 min-w-max">
                        <span className="text-2xl text-black font-semibold leading-none">₹{currentPrice}</span>
                        <span className="text-[13px] text-[#646464] line-through decoration-[#FF0000] font-semibold leading-none">₹{originalPrice}</span>
                    </div>
                    <button
                        onClick={handleNavigation}
                        className="bg-[#1DAC00] hover:bg-[#259300] text-white text-[13px] font-normal px-4 py-1  rounded-[3px] shadow-md hover:shadow-lg transition-all transform active:scale-95 whitespace-nowrap"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopProductCard;
