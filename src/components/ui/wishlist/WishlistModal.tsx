import React, { useState } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../../../context/WishlistContext';

const WishlistModal: React.FC = () => {
    const {
        isWishlistOpen,
        toggleWishlist,
        wishlistItems,
        selectedItems,
        toggleItemSelection
    } = useWishlist();

    const [activeFilter, setActiveFilter] = useState<'in' | 'out'>('in');

    const filteredItems = wishlistItems.filter(item =>
        activeFilter === 'in' ? item.inStock : !item.inStock
    );

    return (
        <AnimatePresence>
            {isWishlistOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleWishlist}
                        className="fixed inset-0 bg-black/50 z-500 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-501 flex items-center justify-center p-4 md:p-6 pointer-events-none font-jost">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-[1000px] max-h-[90vh] bg-white rounded-[28px] shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="bg-[#007ebb] text-white p-4 md:p-5 flex justify-between items-center shrink-0">
                                <h2 className="text-xl md:text-3xl font-josefin font-medium tracking-tight">Wishlist</h2>
                                <button onClick={toggleWishlist} className="hover:scale-110 transition-transform">
                                    <X size={24} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="p-4 md:p-6 flex gap-3 shrink-0 overflow-x-auto no-scrollbar bg-gray-50/30">
                                <button
                                    onClick={() => setActiveFilter('in')}
                                    className={`px-6 py-1.5 rounded-lg font-josefin font-medium text-base transition-all shadow-sm ${activeFilter === 'in'
                                        ? 'bg-[#007ebb] text-white shadow-md'
                                        : 'bg-white text-[#007ebb] border border-[#007ebb]/20'
                                        }`}
                                >
                                    In Stock
                                </button>
                                <button
                                    onClick={() => setActiveFilter('out')}
                                    className={`px-6 py-1.5 rounded-lg font-josefin font-medium text-base transition-all shadow-sm ${activeFilter === 'out'
                                        ? 'bg-[#007ebb] text-white shadow-md'
                                        : 'bg-white text-[#007ebb] border border-[#007ebb]/20'
                                        }`}
                                >
                                    Out of Stock
                                </button>
                            </div>

                            {/* Product Grid */}
                            <div className="grow overflow-y-auto p-4 md:p-6 pt-0 no-scrollbar">
                                <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
                                    {filteredItems.map((item) => (
                                        <div key={item.id} className="relative group p-2">
                                            {/* Checkbox - Positioned outside the card */}
                                            <div className="absolute top-0 left-0 z-30">
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="hidden peer"
                                                        checked={selectedItems.has(item.id)}
                                                        onChange={() => toggleItemSelection(item.id)}
                                                    />
                                                    <div className="w-6 h-6 rounded-md border-2 border-gray-300 bg-white peer-checked:bg-[#007ebb] peer-checked:border-[#007ebb] flex items-center justify-center transition-all shadow-md overflow-hidden">
                                                        <motion.div
                                                            initial={false}
                                                            animate={selectedItems.has(item.id) ? { scale: 1 } : { scale: 0 }}
                                                            className="text-white text-xs font-bold"
                                                        >
                                                            ✓
                                                        </motion.div>
                                                    </div>
                                                </label>
                                            </div>

                                            {/* Card Content */}
                                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col h-full overflow-hidden">
                                                {/* Discount Badge - Squared in top-left */}
                                                {item.discount && (
                                                    <div className="absolute top-0 left-0 z-20 bg-red-700 text-white text-[9px] px-2 py-1 font-medium leading-none">
                                                        {item.discount}
                                                    </div>
                                                )}

                                                {/* Wishlist Heart Icon */}
                                                <button className="absolute top-3 right-3 z-20 text-red-500 hover:scale-110 transition-transform">
                                                    <Heart size={18} className="fill-current" />
                                                </button>

                                                {/* Image */}
                                                <div className="w-full aspect-square bg-gray-50/50 flex items-center justify-center overflow-hidden p-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col grow font-josefin p-3 pt-0">
                                                    <h3 className="text-[11px] md:text-xs font-josefin font-medium text-dark line-clamp-2 mb-1.5 leading-snug min-h-[2.2rem]">
                                                        {item.name}
                                                    </h3>

                                                    {/* Rating */}
                                                    <div className="flex items-center gap-1 mb-3">
                                                        <div className="flex items-center gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={10}
                                                                    className={i < Math.floor(item.rating) ? "fill-[#ffc107] text-[#ffc107]" : "text-gray-300"}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-[9px] text-gray-400 font-medium">
                                                            {item.rating}
                                                        </span>
                                                    </div>

                                                    {/* Price and CTA */}
                                                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm md:text-base font-bold font-imperator text-dark">₹{item.price.toLocaleString()}</span>
                                                            {item.originalPrice && (
                                                                <span className="text-[10px] text-gray-400 font-imperator line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                            )}
                                                        </div>
                                                        <button className="bg-[#24ac11] text-white px-3 py-1 rounded-md text-[10px] font-alata font-bold hover:bg-black transition-colors whitespace-nowrap">
                                                            Buy Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0 font-alata">
                                <button className="w-full bg-[#007ebb] text-white py-3 rounded-xl font-bold text-lg hover:bg-black transition-all transform active:scale-95 shadow-md">
                                    Buy now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WishlistModal;
