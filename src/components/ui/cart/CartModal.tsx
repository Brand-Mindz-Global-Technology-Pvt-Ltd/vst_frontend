import React from 'react';
import { X, Trash2, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

const CartModal: React.FC = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal, toggleCheckout } = useCart();

    const handleCheckout = () => {
        toggleCart();
        toggleCheckout();
    };

    // Delivery fee mock
    const deliveryFee = 500;
    const finalTotal = cartTotal + deliveryFee;

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-10000 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-10001 flex items-center justify-center p-4 md:p-6 pointer-events-none font-jost">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-[800px] max-h-[85vh] bg-white rounded-[28px] shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="bg-[#007ebb] text-white p-5 md:p-6 flex justify-between items-center shrink-0">
                                <h2 className="text-2xl md:text-3xl font-josefin font-medium tracking-tight">Shopping Cart</h2>
                                <button onClick={toggleCart} className="hover:scale-110 transition-transform">
                                    <X size={28} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="grow overflow-y-auto p-4 md:p-6 bg-gray-50/30">
                                <p className="text-base md:text-lg font-alata font-medium mb-4 text-dark tracking-tight">
                                    You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                                </p>

                                <div className="space-y-4 font-alata">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 flex gap-4 md:gap-6 relative group overflow-hidden">
                                            {/* Product Image */}
                                            <div className="w-20 h-20 md:w-32 md:h-32 shrink-0 bg-gray-50 rounded-lg overflow-hidden relative flex items-center justify-center">
                                                {item.discount && (
                                                    <div className="absolute top-1.5 left-1.5 bg-[#00a651] text-white text-[9px] md:text-[11px] px-1.5 py-0.5 rounded-sm font-bold z-10 uppercase">
                                                        {item.discount}
                                                    </div>
                                                )}
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="grow flex flex-col justify-between py-0.5">
                                                <div>
                                                    <h3 className="text-xs md:text-sm font-alata font-medium text-dark leading-snug mb-1.5 line-clamp-2">
                                                        {item.name}
                                                    </h3>

                                                    {/* Status / Rating */}
                                                    <div className="flex items-center gap-1.5 mb-2">
                                                        <div className="flex items-center gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={12}
                                                                    className={i < Math.floor(item.rating) ? "fill-[#ffc107] text-[#ffc107]" : "text-gray-300"}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] md:text-xs text-gray-500 font-alata font-medium">
                                                            {item.rating} ({item.reviewsCount})
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Pricing and Controls */}
                                                <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl md:text-2xl font-bold font-alata text-dark">₹{item.price.toLocaleString()}</span>
                                                        {item.originalPrice && (
                                                            <span className="text-sm md:text-base text-gray-400 font-imperator line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        {/* Quantity Selector */}
                                                        <div className="relative inline-block">
                                                            <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1 md:px-3 md:py-1.5 bg-white text-xs md:text-sm font-alata font-medium text-dark">
                                                                <span>Quantity : </span>
                                                                <select
                                                                    value={item.quantity}
                                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                                    className="appearance-none bg-transparent pr-5 focus:outline-none cursor-pointer font-alata"
                                                                >
                                                                    {[1, 2, 3, 4, 5].map(nu => (
                                                                        <option key={nu} value={nu}>{nu}</option>
                                                                    ))}
                                                                </select>
                                                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                                                            </div>
                                                        </div>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-600 transition-colors p-1.5"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary Footer */}
                            <div className="p-4 md:p-4 shrink-0">
                                <div className="bg-[#007ebb] rounded-[24px] p-6 md:p-4 text-white shadow-xl relative overflow-hidden">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                                        {/* Left Side: Heading and Info */}
                                        <div className="space-y-3">
                                            <h3 className="text-2xl md:text-2xl font-alata font-medium tracking-tight">Order Summary</h3>
                                            <p className="text-[11px] md:text-sm text-white/80 leading-relaxed font-jost font-light max-w-[400px]">
                                                Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi.
                                            </p>
                                        </div>

                                        {/* Right Side: Prices and Button */}
                                        <div className="flex flex-col items-end gap-6 text-sm md:text-md">
                                            <div className="w-full max-w-[300px] space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-alata font-light">Order</span>
                                                    <span className="font-imperator font-medium">₹{cartTotal.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-md md:text-md">
                                                    <span className="font-alata font-light">Delivery</span>
                                                    <span className="font-imperator font-medium">₹{deliveryFee.toLocaleString()}</span>
                                                </div>
                                                <div className="h-px bg-white/20 w-full my-2"></div>
                                                <div className="flex justify-between items-center text-lg md:text-lg">
                                                    <span className="font-light font-alata">Total</span>
                                                    <span className="font-bold font-imperator tracking-tight">₹{finalTotal.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleCheckout}
                                                className="bg-white text-[#007ebb] px-12 py-3 rounded-[15px] font-bold text-lg hover:bg-black hover:text-white transition-all transform active:scale-95 shadow-lg w-full md:w-auto min-w-[300px] font-alata">
                                                Check Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartModal;
