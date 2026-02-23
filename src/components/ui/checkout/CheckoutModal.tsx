import React, { useState } from 'react';
import { X, User, Phone, MapPin, Building2, Landmark, CheckCircle2, Circle, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

const CheckoutModal: React.FC = () => {
    const { isCheckoutOpen, toggleCheckout, cartItems, cartTotal } = useCart();

    // Form and Selection state
    const [selectedPayment, setSelectedPayment] = useState<'cod' | 'online'>('cod');
    const [deliveryAddress, setDeliveryAddress] = useState({
        name: 'Maheswari',
        contact: '7339523241.',
        address: 'Sri Vignesh cooler No,1 shopping complex Sivan Kovil eastcar street, Perumal Kovil back side,',
        cityState: 'Thirunelveli, Tamil Nadu, 626203,'
    });

    const handleInputChange = (field: keyof typeof deliveryAddress, value: string) => {
        setDeliveryAddress(prev => ({ ...prev, [field]: value }));
    };

    const deliveryFee = 500;
    const finalTotal = cartTotal + deliveryFee;

    if (!isCheckoutOpen) return null;

    return (
        <AnimatePresence>
            {isCheckoutOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCheckout}
                        className="fixed inset-0 bg-black/60 z-600 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-601 flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-none font-jost">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                            className="w-full max-w-[1100px] h-[95vh] sm:h-auto max-h-[95vh] bg-white rounded-[32px] shadow-[0_32px_128px_-16px_rgba(0,126,187,0.2)] flex flex-col overflow-hidden pointer-events-auto border border-blue-50"
                        >
                            {/* Header */}
                            <div className="p-6 md:px-10 md:py-8 flex justify-between items-center shrink-0 border-b border-gray-100">
                                <h2 className="text-2xl md:text-3xl font-alata font-medium tracking-tight text-[#007ebb]">Checkout Process</h2>
                                <button
                                    onClick={toggleCheckout}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-all group active:scale-90">
                                    <X size={24} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                </button>
                            </div>

                            {/* Content Area - Scrollable */}
                            <div className="grow overflow-y-auto px-4 sm:px-6 md:px-10 py-6 md:py-8 bg-gray-50/20">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

                                    {/* LEFT COLUMN: Forms and Summary */}
                                    <div className="lg:col-span-7 space-y-10">

                                        {/* 1. Product Summary (Mini Card) */}
                                        <section className="space-y-4">
                                            <h3 className="text-lg font-alata font-medium text-dark flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-[#007ebb] rounded-full" />
                                                Product Details Summary
                                            </h3>
                                            <div className="space-y-3">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="bg-white rounded-[24px] p-4 sm:p-5 border border-gray-100 shadow-sm flex gap-4 sm:gap-6 items-center">
                                                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                        </div>
                                                        <div className="grow space-y-1">
                                                            <h4 className="text-sm sm:text-base font-bold font-josefin text-dark leading-snug line-clamp-1">{item.name}</h4>
                                                            <div className="flex items-center text-[10px] sm:text-xs text-secondary font-josefin font-medium bg-secondary/5 w-fit px-2 py-0.5 rounded-full">
                                                                Quantity : {item.quantity} <span className="mx-2 opacity-30 text-dark">|</span> <span className="font-imperator font-bold">₹{item.price.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* 2. Delivery Address Form */}
                                        <section className="space-y-6">
                                            <h3 className="text-lg font-alata font-medium text-dark flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-[#007ebb] rounded-full" />
                                                Delivery Address
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-josefin">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 font-jost">Name</label>
                                                    <div className="relative group">
                                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] z-10" />
                                                        <input
                                                            type="text"
                                                            placeholder="Full Name"
                                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-josefin font-medium placeholder:text-gray-300 shadow-xs"
                                                            value={deliveryAddress.name}
                                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 font-jost">Contact Number</label>
                                                    <div className="relative group">
                                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] z-10" />
                                                        <input
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-josefin font-medium placeholder:text-gray-300 shadow-xs"
                                                            value={deliveryAddress.contact}
                                                            onChange={(e) => handleInputChange('contact', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 font-jost">Street / Area / Colony</label>
                                                    <div className="relative group">
                                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] z-10" />
                                                        <input
                                                            type="text"
                                                            placeholder="Road name or landmark"
                                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-josefin font-medium placeholder:text-gray-300 shadow-xs"
                                                            value={deliveryAddress.address}
                                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 font-jost">City / State / Pincode</label>
                                                    <div className="relative group">
                                                        <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] z-10" />
                                                        <input
                                                            type="text"
                                                            placeholder="City, State, Zip"
                                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-josefin font-medium placeholder:text-gray-300 shadow-xs"
                                                            value={deliveryAddress.cityState}
                                                            onChange={(e) => handleInputChange('cityState', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="bg-[#007ebb] hover:bg-black text-white px-10 py-3.5 rounded-2xl font-medium text-lg transition-all active:scale-95 shadow-xl shadow-blue-900/10 w-full sm:w-fit font-jost uppercase tracking-widest mt-2">
                                                Save Information
                                            </button>
                                        </section>

                                        {/* 3. Payment Method Selection */}
                                        <section className="space-y-6">
                                            <h3 className="text-lg font-josefin font-medium text-dark flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-[#007ebb] rounded-full" />
                                                Select Payment Method
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-josefin">
                                                <button
                                                    onClick={() => setSelectedPayment('cod')}
                                                    className={`p-6 rounded-[24px] border-2 flex flex-col items-start gap-4 transition-all text-left relative group overflow-hidden ${selectedPayment === 'cod' ? 'border-[#007ebb] bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                                >
                                                    <div className={`p-3 rounded-2xl ${selectedPayment === 'cod' ? 'bg-[#007ebb] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                        <Landmark size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold font-josefin text-dark text-lg">Cash on Delivery</div>
                                                        <div className="text-sm font-josefin text-gray-500 font-medium">Pay when you receive your order</div>
                                                    </div>
                                                    <div className="absolute top-6 right-6">
                                                        {selectedPayment === 'cod' ? <CheckCircle2 className="text-[#007ebb]" size={24} /> : <Circle className="text-gray-200" size={24} />}
                                                    </div>
                                                </button>

                                                <button
                                                    onClick={() => setSelectedPayment('online')}
                                                    className={`p-6 rounded-[24px] border-2 flex flex-col items-start gap-4 transition-all text-left relative group overflow-hidden ${selectedPayment === 'online' ? 'border-[#007ebb] bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                                >
                                                    <div className={`p-3 rounded-2xl ${selectedPayment === 'online' ? 'bg-[#007ebb] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                        <CreditCard size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold font-josefin text-dark text-lg">Online Payment</div>
                                                        <div className="text-sm font-josefin text-gray-500 font-medium">UPI, Cards, Net Banking</div>
                                                    </div>
                                                    <div className="absolute top-6 right-6">
                                                        {selectedPayment === 'online' ? <CheckCircle2 className="text-[#007ebb]" size={24} /> : <Circle className="text-gray-200" size={24} />}
                                                    </div>
                                                </button>
                                            </div>
                                        </section>
                                    </div>

                                    {/* RIGHT COLUMN: Sidebar Summary */}
                                    <div className="lg:col-span-5 space-y-8">
                                        <div className="lg:sticky lg:top-0 space-y-6">

                                            {/* Delivery Address Preview */}
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-alata font-medium text-dark flex items-center gap-2">
                                                    Delivery Address
                                                </h3>
                                                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm space-y-4 relative group">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                                            <MapPin size={20} className="text-[#007ebb]" />
                                                        </div>
                                                        <div className="font-josefin space-y-1">
                                                            <div className="font-bold text-[#007ebb] text-base font-jost">{deliveryAddress.name}</div>
                                                            <div className="text-sm text-dark/70 font-josefin font-medium leading-relaxed max-w-[300px]">
                                                                {deliveryAddress.address}
                                                                <br />
                                                                {deliveryAddress.cityState}
                                                                <br />
                                                                {deliveryAddress.contact}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="text-xs font-semibold text-secondary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all ml-14">
                                                        Change Address <ChevronRight size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Payment Method Preview */}
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-alata font-medium text-dark flex items-center gap-2">
                                                    Payment Method
                                                </h3>
                                                <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-gray-100 shadow-sm flex items-center justify-between group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-secondary/5 rounded-full flex items-center justify-center">
                                                            {selectedPayment === 'cod' ? <Landmark size={20} className="text-secondary" /> : <CreditCard size={20} className="text-secondary" />}
                                                        </div>
                                                        <div className="font-josefin font-bold text-dark">{selectedPayment === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</div>
                                                    </div>
                                                    <button className="text-[10px] font-semibold text-secondary bg-secondary/5 px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Order Final Summary */}
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-alata font-medium text-dark">
                                                    Product Details ({cartItems.length} Items)
                                                </h3>
                                                <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-xl shadow-blue-900/5 font-josefin space-y-6">
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center text-dark/60 font-josefin font-medium">
                                                            <span>Total Product Price</span>
                                                            <span className="text-dark font-jost font-bold">₹{cartTotal.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-dark/60 font-josefin font-medium">
                                                            <span>Delivery Charges</span>
                                                            <span className="text-dark font-jost font-bold">₹{deliveryFee.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="h-px bg-gray-100" />
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-2xl font-josefin font-medium text-dark">Order Price</span>
                                                        <span className="text-3xl font-josefin font-semibold text-[#007ebb]">₹{finalTotal.toLocaleString()}</span>
                                                    </div>
                                                    <button className="w-full bg-[#007ebb] hover:bg-black text-white py-5 rounded-[20px] font-alata font-semibold text-xl uppercase tracking-[0.2em] transition-all transform active:scale-[0.98] shadow-2xl shadow-blue-500/20 mt-4">
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
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

export default CheckoutModal;
