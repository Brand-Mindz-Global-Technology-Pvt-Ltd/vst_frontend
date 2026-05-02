import React, { useState } from 'react';
import { Heart, Share2, Star, ChevronDown } from 'lucide-react';
import { useCart, type CartItem } from '../../context/CartContext';
import { getImageUrl } from '../../config/apiConfig';
import toast from 'react-hot-toast';
import type { Product } from '../../types/product';

interface ProductInfoSectionProps {
    product: Product;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, toggleCart, toggleCheckout } = useCart();

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: product._id,
            name: product.name,
            description: product.category,
            price: product.price,
            originalPrice: product.oldPrice,
            image: getImageUrl(product.images[0]),
            quantity: quantity,
            rating: product.rating,
            reviewsCount: `${product.reviewsCount || 0} Reviews`,
            discount: product.oldPrice ? `${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF` : undefined
        };

        addToCart(cartItem);
        toast.success(`${product.name} added to cart!`, {
            icon: '🛒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
        toggleCart(); // Open cart immediately
    };

    const handleBuyNow = () => {
        const cartItem: CartItem = {
            id: product._id,
            name: product.name,
            description: product.category,
            price: product.price,
            originalPrice: product.oldPrice,
            image: getImageUrl(product.images[0]),
            quantity: quantity,
            rating: product.rating,
            reviewsCount: `${product.reviewsCount || 0} Reviews`,
            discount: product.oldPrice ? `${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF` : undefined
        };

        toggleCheckout(false, cartItem);
    };

    return (
        <div className="flex flex-col gap-6 font-josefin md:pt-12">

            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="bg-[#EFEFEF] border border-gray-500 text-[11px] text-gray-500 px-2 py-0.5 rounded-lg w-fit font-semibold tracking-wider uppercase">
                            {product.brand || 'VST'}
                        </span>
                        <h1 className="text-3xl md:text-5xl py-2 pt-3 font-imperator font-medium text-[#3E3E3E]">
                            {product.name}
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all">
                            <Heart size={25} className="text-black" />
                        </button>
                        <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all">
                            <Share2 size={25} className="text-black" />
                        </button>
                    </div>
                </div>
                <div className="text-[#646464] text-lg md:text-xl font-medium">
                    {product.category}
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400 gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                size={14} 
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                                stroke={i < Math.floor(product.rating) ? "none" : "currentColor"} 
                            />
                        ))}
                    </div>
                    <span className="text-xs text-[#646464] mt-0.5 font-medium">
                        {product.rating} ({product.reviewsCount || 0} Reviews)
                    </span>
                </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 md:-mt-2">
                <span className="text-3xl sm:text-4xl font-semibold text-black leading-none">
                    ₹{product.price?.toLocaleString()}
                </span>
                {product.oldPrice && (
                    <span className="text-lg sm:text-xl text-[#3f3f3f] line-through decoration-red-500 opacity-60">
                        ₹{product.oldPrice?.toLocaleString()}
                    </span>
                )}
            </div>

            {/* Short Description */}
            <div 
                className="text-black text-md md:text-lg text-justify md:-mt-1 font-light"
                dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-[140px]">
                        <div className="relative group">
                            <select 
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full appearance-none flex items-center md:text-[19px] justify-between px-4 py-3 bg-[#EFEFEF] border border-black rounded-xl text-black font-semibold cursor-pointer outline-none"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                    <option key={n} value={n}>Quantity : {n}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown size={18} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-2 w-full sm:w-auto">
                        <button 
                            onClick={handleAddToCart}
                            className="relative group overflow-hidden w-full px-12 py-3 bg-[#EFEFEF] md:text-[19px] border border-black rounded-xl text-black font-semibold transition-all duration-300"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Add to cart</span>
                            <div className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-500 group-hover:h-full z-0"></div>
                        </button>
                    </div>
                </div>
                <button 
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-[#0077B6] text-white rounded-lg font-normal md:text-xl hover:bg-[#006ca1] transition-all shadow-lg"
                >
                    Buy Now
                </button>
            </div>

            {/* Specs Grid (Dynamic if possible, otherwise subset of features) */}
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-10 gap-y-2 sm:gap-y-1.5 mt-4 text-[14px] sm:text-[17px]">
                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Brand</span>
                    <span className="text-black font-medium">{product.brand || 'VST'}</span>
                </div>

                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Availability</span>
                    <span className={`font-medium text-right sm:text-left ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                    </span>
                </div>

                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Category</span>
                    <span className="text-black font-medium text-right sm:text-left capitalize">{product.category}</span>
                </div>
                
                {product.subCategory && (
                    <div className="flex justify-between sm:contents">
                        <span className="font-bold text-black">Sub Category</span>
                        <span className="text-black font-medium text-right sm:text-left capitalize">{product.subCategory}</span>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-4">
                <div className="h-px bg-black w-[80%] opacity-80"></div>
            </div>

            {/* Feature Icons Grid (Keep static or map from features if added later) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg">
                        <img
                            src="/assets/shopdetail/icons/material.png"
                            alt="Material"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-black text-md md:text-lg leading-tight">Fast Delivery</span>
                        <span className="text-[#646464] font-medium">Free shipping on orders</span>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-black text-white">
                        <img
                            src="/assets/shopdetail/icons/capacity.png"
                            alt="Capacity"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain invert"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-black text-lg leading-tight">Genuine Parts</span>
                        <span className="text-[#646464] font-medium">100% Original Products</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfoSection;
