import React from 'react';
import { X, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

const CartModal: React.FC = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal, toggleCheckout } = useCart();

    const handleCheckout = () => {
        toggleCart();
        toggleCheckout();
    };

    // Delivery fee is now free as per best practice
    const deliveryFee = 0;
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
                        className="fixed inset-0 bg-black/60 z-10000 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-10001 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 pointer-events-none font-josefin">
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-[850px] h-[95vh] sm:h-auto sm:max-h-[90vh] bg-white rounded-t-[32px] sm:rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,126,187,0.2)] flex flex-col overflow-hidden pointer-events-auto border border-blue-50"
                        >
                            {/* Header */}
                            <div className="p-6 sm:p-10 flex justify-between items-center shrink-0 border-b border-gray-100 uppercase tracking-tighter">
                                <h2 className="text-xl sm:text-3xl font-alata font-medium tracking-tight text-[#007ebb]">Shopping Bag</h2>
                                <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-all group active:scale-90">
                                    <X size={24} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="grow overflow-y-auto px-4 sm:px-10 py-8 bg-gray-50/20 no-scrollbar">
                                <div className="flex items-center justify-between mb-8">
                                    <p className="text-lg font-alata font-medium text-dark uppercase tracking-tighter">
                                        Your Selections ({cartItems.length})
                                    </p>
                                    <button onClick={() => toggleCart()} className="text-xs font-bold text-[#007ebb] uppercase tracking-widest underline underline-offset-4">Continue Shopping</button>
                                </div>

                                {cartItems.length === 0 ? (
                                    <div className="py-20 text-center space-y-6">
                                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                                            <Star size={32} className="text-[#007ebb] opacity-20" />
                                        </div>
                                        <p className="text-xl text-gray-400 font-alata uppercase tracking-widest">Your bag is empty</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50 flex gap-6 relative group transition-all hover:shadow-xl hover:shadow-blue-500/5">
                                                {/* Product Image */}
                                                <div className="w-24 h-24 sm:w-36 sm:h-36 shrink-0 bg-gray-50 rounded-[24px] overflow-hidden relative flex items-center justify-center p-4">
                                                    {item.discount && (
                                                        <div className="absolute top-3 left-3 bg-[#00a651] text-white text-[10px] px-2 py-1 rounded-full font-bold z-10 uppercase tracking-wider">
                                                            {item.discount}
                                                        </div>
                                                    )}
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="grow flex flex-col justify-between py-2">
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <h3 className="text-sm sm:text-base font-alata font-medium text-dark leading-tight line-clamp-2 uppercase tracking-tighter">
                                                                {item.name}
                                                            </h3>
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                                                            >
                                                                <X size={20} />
                                                            </button>
                                                        </div>

                                                        {/* Status / Rating */}
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center gap-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        size={12}
                                                                        className={i < Math.floor(item.rating) ? "fill-[#ffc107] text-[#ffc107]" : "text-gray-200"}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                                {item.rating} ({item.reviewsCount})
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Pricing and Controls */}
                                                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                                        <div className="flex items-baseline gap-3">
                                                            <span className="text-xl sm:text-2xl font-bold font-alata text-dark">₹{item.price.toLocaleString()}</span>
                                                            {item.originalPrice && (
                                                                <span className="text-sm text-gray-300 font-imperator line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            {/* Quantity Selector */}
                                                            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2 border border-transparent hover:border-blue-100 transition-all">
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qty</span>
                                                                <div className="relative flex items-center">
                                                                    <select
                                                                        value={item.quantity}
                                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                                        className="appearance-none bg-transparent pr-6 focus:outline-none cursor-pointer font-bold text-dark text-sm z-10"
                                                                    >
                                                                        {[1, 2, 3, 4, 5].map(nu => (
                                                                            <option key={nu} value={nu}>{nu}</option>
                                                                        ))}
                                                                    </select>
                                                                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#007ebb]" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Order Summary Footer */}
                            <div className="p-6 sm:p-10 bg-white border-t border-gray-50 shrink-0">
                                <div className="max-w-[500px] ml-auto space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                                            <span>Subtotal</span>
                                            <span className="text-dark">₹{cartTotal.toLocaleString()}</span>
                                        </div>
                                        {deliveryFee > 0 && (
                                            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                                                <span>Delivery</span>
                                                <span className="text-dark">₹{deliveryFee.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="h-px bg-gray-100" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold font-alata uppercase tracking-tighter">Total Amount</span>
                                            <span className="text-3xl font-bold font-imperator text-[#007ebb] tracking-tighter">₹{finalTotal.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={cartItems.length === 0}
                                        className="w-full bg-[#007ebb] hover:bg-black text-white py-5 rounded-[22px] font-bold text-lg uppercase tracking-[0.2em] transition-all transform active:scale-[0.98] shadow-2xl shadow-blue-500/20 disabled:opacity-50 disabled:grayscale">
                                        Proceed to Checkout
                                    </button>
                                    
                                    <p className="text-[10px] text-gray-400 text-center font-medium uppercase tracking-widest">Secure checkout powered by PhonePe</p>
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
