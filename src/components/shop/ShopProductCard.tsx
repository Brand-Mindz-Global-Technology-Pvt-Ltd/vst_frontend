import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, type CartItem } from '../../context/CartContext';
import { useWishlist, type WishlistItem } from '../../context/WishlistContext';
import toast from 'react-hot-toast';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface ShopProductCardProps {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: string;
    currentPrice: number; // Changed to number
    originalPrice: number; // Changed to number
    isLimitedTime?: boolean;
    category?: string;
}

const ShopProductCard: React.FC<ShopProductCardProps> = ({
    id,
    name,
    image,
    rating,
    reviews,
    currentPrice,
    originalPrice,
    isLimitedTime,
    category = 'Product'
}) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
    
    const isInWishlist = wishlistItems.some(item => item.id === id);
    
    const handleNavigation = () => navigate(`/shop/${id}`);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        const cartItem: CartItem = {
            id,
            name,
            description: category,
            price: currentPrice,
            originalPrice: originalPrice,
            image: image,
            quantity: 1,
            rating: rating,
            reviewsCount: `${reviews} Reviews`
        };

        addToCart(cartItem);
        toast.success('Added to cart!', {
            icon: '🛒',
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
        });
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInWishlist) {
            removeFromWishlist(id);
            toast.error('Removed from wishlist', {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
        } else {
            const wishlistItem: WishlistItem = {
                id,
                name,
                price: currentPrice,
                originalPrice: originalPrice,
                image: image,
                rating: rating,
                reviewsCount: parseInt(reviews) || 0,
                inStock: true,
                discount: isLimitedTime ? 'Limited time deal' : undefined
            };
            addToWishlist(wishlistItem);
            toast.success('Added to wishlist!', {
                icon: '❤️',
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
        }
    };

    return (
        <div className="bg-white rounded-[15px] p-3 sm:p-5 flex flex-col relative group transition-all duration-300 hover:shadow-2xl border border-transparent hover:border-gray-100 h-full">
            {/* Product Image area with Overlay Actions/Badges */}
            <div className="h-48 sm:h-72 flex items-center justify-center mb-4 relative pt-10 sm:pt-12">
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
                    <button 
                        onClick={handleToggleWishlist}
                        className="text-black hover:text-red-500 transition-colors p-1 group/wishlist"
                    >
                        <Heart 
                            size={24} 
                            className={`transition-all duration-300 ${isInWishlist ? "fill-red-500 text-red-500 scale-110" : "group-hover/wishlist:scale-110"}`} 
                        />
                    </button>
                    <button 
                        onClick={handleAddToCart}
                        className="text-black hover:text-[#007EBB] transition-colors p-1 group/cart"
                    >
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
                <div className="mt-auto pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-gray-50">
                    <div className="flex items-baseline gap-2 min-w-max">
                        <span className="text-xl sm:text-2xl text-black font-semibold leading-none">₹{currentPrice.toLocaleString()}</span>
                        <span className="text-[11px] sm:text-[13px] text-[#646464] line-through decoration-[#FF0000] font-semibold leading-none">₹{originalPrice.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={handleNavigation}
                        className="bg-[#1DAC00] hover:bg-[#259300] text-white text-[12px] sm:text-[13px] font-normal px-4 py-2 sm:py-1 rounded-[3px] shadow-md hover:shadow-lg transition-all transform active:scale-95 whitespace-nowrap text-center"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopProductCard;
