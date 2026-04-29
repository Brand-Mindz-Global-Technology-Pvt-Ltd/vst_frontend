import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Building2, Landmark, CheckCircle2, Circle, CreditCard, ChevronRight, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { 
    apiCreateAddress, 
    apiGetAddresses, 
    apiDeleteAddress, 
    apiCreateOrder, 
    apiUpdateAddress,
    apiInitiatePhonePePayment 
} from '../../../services/order/orderService';

const CheckoutModal: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isCheckoutOpen, toggleCheckout, selectedProduct, cartItems, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    
    // UI State
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isPendingCheckout, setIsPendingCheckout] = useState(false);

    // Address State
    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(true);
    
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: '',
        addressLine1: '',
        cityState: '',
        type: 'Home' as 'Home' | 'Work' | 'Other'
    });

    const [selectedPayment, setSelectedPayment] = useState<'cod' | 'online'>('cod');

    const deliveryFee = 0;
    const staticHeroProduct = {
        id: 'hero-prod',
        name: "ATLANTIS Frosty Plus Hot, Normal & Cold Water Dispenser",
        price: 7500,
        image: "/assets/home/aqu-banner.png",
        quantity: 1
    };

    const displayItems = selectedProduct ? [selectedProduct] : (cartItems.length > 0 ? cartItems : [staticHeroProduct]);
    const displayTotal = selectedProduct ? selectedProduct.price : (cartItems.length > 0 ? cartTotal : staticHeroProduct.price);
    const finalTotal = displayTotal + deliveryFee;

    // Fetch addresses on mount
    useEffect(() => {
        if (isCheckoutOpen && isAuthenticated) {
            fetchAddresses();
        }
    }, [isCheckoutOpen, isAuthenticated]);

    // Check for pending checkout on mount
    useEffect(() => {
        const isPending = localStorage.getItem('vst_pending_checkout');
        if (isPending === 'true' && isAuthenticated) {
            localStorage.removeItem('vst_pending_checkout');
            const savedAddress = localStorage.getItem('vst_pending_address');
            if (savedAddress) {
                setFormData(JSON.parse(savedAddress));
                localStorage.removeItem('vst_pending_address');
            }
            if (!isCheckoutOpen) {
                toggleCheckout();
            }
            setIsPendingCheckout(true);
        }
    }, [isAuthenticated]);

    // Handle post-auth resume
    useEffect(() => {
        if (isAuthenticated && isPendingCheckout) {
            setIsPendingCheckout(false);
            const resumeProcess = async () => {
                setIsLoading(true);
                try {
                    // 1. Save the guest-entered address to backend
                    const cityParts = formData.cityState.split(',');
                    const payload = {
                        fullName: formData.fullName,
                        phone: formData.phone,
                        addressLine1: formData.addressLine1,
                        city: cityParts[0]?.trim() || '',
                        state: cityParts[1]?.trim() || '',
                        pincode: cityParts[2]?.trim() || '',
                        type: formData.type
                    };

                    const response = await apiCreateAddress(user!.id, payload);
                    if (response.success) {
                        setAddresses([response.data]);
                        setSelectedAddressId(response.data._id);
                        setShowAddressForm(false);
                        
                        // 2. Proceed with checkout
                        // We need to call the actual logic here directly to ensure we have the new ID
                        const items = displayItems.map(item => ({
                            productId: item.id === 'hero-prod' ? '67ba9e3f9479e0a0ce9e8c37' : item.id,
                            name: item.name,
                            qty: item.quantity || 1,
                            price: item.price
                        }));

                        const finalPayload = {
                            shippingAddressId: response.data._id,
                            items,
                            subtotal: displayTotal,
                            shipping: deliveryFee,
                            totalAmount: finalTotal,
                            paymentMethod: selectedPayment === 'cod' ? 'COD' : 'ONLINE'
                        };

                        if (selectedPayment === 'cod') {
                            const orderRes = await apiCreateOrder(finalPayload);
                            if (orderRes.success) {
                                setIsSuccess(true);
                                clearCart();
                                setTimeout(() => {
                                    handleClose();
                                    navigate('/profile?tab=orders');
                                }, 3000);
                            }
                        } else {
                            const phonePeRes = await apiInitiatePhonePePayment({
                                customerId: user!.id,
                                ...finalPayload
                            });
                            if (phonePeRes.success && phonePeRes.data?.paymentUrl) {
                                window.location.href = phonePeRes.data.paymentUrl;
                            }
                        }
                    }
                } catch (err: any) {
                    setError(err.message || "Failed to complete order after login");
                } finally {
                    setIsLoading(false);
                }
            };
            resumeProcess();
        }
    }, [isAuthenticated, isPendingCheckout]);

    const fetchAddresses = async () => {
        if (!user?.id) return;
        try {
            const response = await apiGetAddresses(user.id);
            if (response.success && response.data.length > 0) {
                setAddresses(response.data);
                if (!selectedAddressId) {
                    setSelectedAddressId(response.data[0]._id);
                    updateFormFromAddress(response.data[0]);
                    setShowAddressForm(false);
                }
            } else {
                setShowAddressForm(true);
            }
        } catch (err: any) {
            console.error("Failed to fetch addresses:", err);
            setShowAddressForm(true);
        }
    };

    const updateFormFromAddress = (addr: any) => {
        setFormData({
            fullName: addr.fullName,
            phone: addr.phone,
            addressLine1: addr.addressLine1,
            cityState: `${addr.city}, ${addr.state}, ${addr.pincode}`,
            type: addr.type
        });
    };

    const handleSaveAddress = async () => {
        if (!isAuthenticated) {
            // Validate form
            if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.cityState) {
                setError('Please fill in all address details');
                return;
            }
            setSelectedAddressId('guest-pending');
            setShowAddressForm(false);
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const cityParts = formData.cityState.split(',');
            const payload = {
                fullName: formData.fullName,
                phone: formData.phone,
                addressLine1: formData.addressLine1,
                city: cityParts[0]?.trim() || '',
                state: cityParts[1]?.trim() || '',
                pincode: cityParts[2]?.trim() || '',
                type: formData.type
            };

            let response;
            if (selectedAddressId) {
                response = await apiUpdateAddress(user!.id, selectedAddressId, payload);
            } else {
                response = await apiCreateAddress(user!.id, payload);
            }

            if (response.success) {
                await fetchAddresses();
                setSelectedAddressId(response.data._id);
                setShowAddressForm(false);
            }
        } catch (err: any) {
            if (err.message?.includes("No token provided") || err.status === 401) {
                setError("Unauthorized: Your session has expired. Please logout and login again.");
            } else {
                setError(err.message || "Failed to save address");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAddress = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Delete this address?")) return;
        try {
            await apiDeleteAddress(user!.id, id);
            if (selectedAddressId === id) {
                setSelectedAddressId(null);
                setShowAddressForm(true);
            }
            fetchAddresses();
        } catch (err: any) {
            setError("Failed to delete address");
        }
    };

    const handleCheckoutAction = async () => {
    if (!isAuthenticated) {
        if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.cityState) {
            setError('Please fill in and save delivery address');
            return;
        }
        setIsPendingCheckout(true);
        // Save state for resumption after redirect
        localStorage.setItem('vst_pending_checkout', 'true');
        localStorage.setItem('vst_pending_address', JSON.stringify(formData));
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        return;
    }

    if (!selectedAddressId) {
        setError('Please save or select a delivery address');
        return;
    }

    if (!user?.id) {
        setError('User details not found. Please login again.');
        return;
    }

    setIsLoading(true);
    setError('');

    try {
        const items = displayItems.map(item => ({
            productId: item.id === 'hero-prod' ? '67ba9e3f9479e0a0ce9e8c37' : item.id,
            name: item.name,
            qty: item.quantity || 1,
            price: item.price
        }));

        if (selectedPayment === 'cod') {
            const orderResponse = await apiCreateOrder({
                shippingAddressId: selectedAddressId,
                items,
                subtotal: displayTotal,
                shipping: deliveryFee,
                totalAmount: finalTotal,
                paymentMethod: 'COD'
            });

            if (orderResponse.success) {
                setIsSuccess(true);
                clearCart();

                setTimeout(() => {
                    handleClose();
                    navigate('/profile?tab=orders');
                }, 3000);
            } else {
                setError(orderResponse.message || 'Order failed');
            }

            return;
        }

        const phonePeResponse = await apiInitiatePhonePePayment({
            customerId: user.id,
            shippingAddressId: selectedAddressId,
            items,
            subtotal: displayTotal,
            shipping: deliveryFee,
            totalAmount: finalTotal
        });

        if (phonePeResponse.success && phonePeResponse.data?.paymentUrl) {
            window.location.href = phonePeResponse.data.paymentUrl;
            return;
        }

        setError(phonePeResponse.message || 'PhonePe payment initiation failed');

    } catch (err: any) {
        console.error(err);

        if (err.message?.includes("No token provided") || err.status === 401) {
            setError("Unauthorized: Your session has expired. Please logout and login again.");
        } else {
            setError(err.message || 'An unexpected error occurred');
        }
    } finally {
        setIsLoading(false);
    }
};

    const handleClose = () => {
        toggleCheckout(false);
        setTimeout(() => {
            setIsSuccess(false);
            setError('');
        }, 500);
    };

    if (!isCheckoutOpen) return null;

    return (
        <AnimatePresence>
            {isCheckoutOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleClose()}
                        className="fixed inset-0 bg-black/60 z-10000 backdrop-blur-md"
                    />

                    <div className="fixed inset-0 z-10001 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 pointer-events-none font-josefin">
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-[1100px] h-[95vh] sm:h-[92vh] bg-white rounded-t-[32px] sm:rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,126,187,0.2)] flex flex-col overflow-hidden pointer-events-auto border border-blue-50"
                        >
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success-screen"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center justify-center py-24 px-6 text-center grow"
                                    >
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 size={48} className="text-green-600" />
                                        </div>
                                        <h2 className="text-4xl font-alata text-dark mb-4 uppercase tracking-wider">Checkout Success</h2>
                                        <p className="text-xl text-gray-500 mb-10 max-w-md">Thank you for your order! Redirecting to your orders...</p>
                                        <button onClick={() => { handleClose(); navigate('/profile?tab=orders'); }} className="bg-[#007ebb] text-white px-12 py-4 rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20">View My Orders</button>
                                    </motion.div>
                                ) : (
                                    <div key="checkout-form" className="flex flex-col h-full">
                                        {/* Header */}
                                        <div className="p-4 sm:p-6 md:p-10 flex justify-between items-center shrink-0 border-b border-gray-100 uppercase tracking-tighter">
                                            <h2 className="text-lg sm:text-2xl md:text-3xl font-alata font-medium tracking-tight text-[#007ebb]">Checkout Process</h2>
                                            <button onClick={handleClose} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-all group active:scale-90">
                                                <X size={24} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                            </button>
                                        </div>

                                        {/* Error Alert */}
                                        {error && (
                                            <div className="mx-4 sm:mx-12 mt-4 sm:mt-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center justify-between gap-3 border border-red-100 font-bold text-sm">
                                                <div className="flex items-center gap-3">
                                                    <AlertCircle size={20} />
                                                    <span>{error}</span>
                                                </div>
                                                {error.includes("Unauthorized") && (
                                                    <button onClick={() => { logout(); handleClose(); navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`); }} className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-black transition-all">Logout & Login</button>
                                                )}
                                            </div>
                                        )}

                                        {/* Body Content */}
                                        <div className="grow overflow-y-auto px-4 sm:px-8 md:px-12 py-6 md:py-10 bg-gray-50/20 no-scrollbar">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-[1000px] mx-auto">
                                                
                                                {/* Left Column */}
                                                <div className="lg:col-span-7 space-y-12">
                                                    
                                                    {/* 2. Delivery Address */}
                                                    <section className="space-y-4 sm:space-y-8">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-lg sm:text-xl font-alata font-medium text-dark flex items-center gap-3 uppercase tracking-tighter">
                                                                <div className="w-1.5 h-6 sm:h-7 bg-[#007ebb] rounded-full" /> Delivery Address
                                                            </h3>
                                                            {addresses.length > 0 && (
                                                                <button 
                                                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                                                    className="text-xs font-bold text-[#007ebb] uppercase tracking-widest underline underline-offset-4"
                                                                >
                                                                    {showAddressForm ? "Select Saved Address" : "Add New Address"}
                                                                </button>
                                                            )}
                                                            {!isAuthenticated && !showAddressForm && selectedAddressId === 'guest-pending' && (
                                                                <button 
                                                                    onClick={() => setShowAddressForm(true)}
                                                                    className="text-xs font-bold text-[#007ebb] uppercase tracking-widest underline underline-offset-4"
                                                                >
                                                                    Edit Address
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* Guest Pending Address Display */}
                                                        {!showAddressForm && selectedAddressId === 'guest-pending' && !isAuthenticated && (
                                                            <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] border-2 border-[#007ebb] bg-blue-50/20 animate-in fade-in slide-in-from-top-2">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <span className="font-bold text-dark">{formData.fullName}</span>
                                                                            <span className="text-[10px] bg-blue-100 text-[#007ebb] px-2 py-0.5 rounded-full font-bold uppercase">Ready for Checkout</span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-500 font-medium">
                                                                            {formData.addressLine1}, {formData.cityState}
                                                                            <br /> {formData.phone}
                                                                        </p>
                                                                    </div>
                                                                    <CheckCircle2 className="text-[#007ebb]" size={22} />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Address Selection List */}
                                                        {!showAddressForm && addresses.length > 0 && (
                                                            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2">
                                                                {addresses.map(addr => (
                                                                    <div 
                                                                        key={addr._id}
                                                                        onClick={() => {
                                                                            setSelectedAddressId(addr._id);
                                                                            updateFormFromAddress(addr);
                                                                        }}
                                                                        className={`p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] border-2 transition-all cursor-pointer relative group ${selectedAddressId === addr._id ? 'border-[#007ebb] bg-blue-50/20' : 'border-gray-100 bg-white hover:border-blue-100'}`}
                                                                    >
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <div className="flex items-center gap-2 mb-1">
                                                                                    <span className="font-bold text-dark">{addr.fullName}</span>
                                                                                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-bold uppercase">{addr.type}</span>
                                                                                </div>
                                                                                <p className="text-sm text-gray-500 font-medium">
                                                                                    {addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}
                                                                                    <br /> {addr.phone}
                                                                                </p>
                                                                            </div>
                                                                            <div className="flex flex-col items-end gap-3">
                                                                                {selectedAddressId === addr._id ? <CheckCircle2 className="text-[#007ebb]" size={22} /> : <Circle className="text-gray-200" size={22} />}
                                                                                <button 
                                                                                    onClick={(e) => handleDeleteAddress(addr._id, e)}
                                                                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                                                                >
                                                                                    <Trash2 size={18} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Address Form */}
                                                        {showAddressForm && (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 animate-in fade-in slide-in-from-top-2">
                                                                <div className="space-y-3">
                                                                    <label className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Name</label>
                                                                    <div className="relative group">
                                                                        <User size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#007ebb] group-focus-within:scale-110 transition-all" />
                                                                        <input 
                                                                            type="text" required placeholder="Full Name"
                                                                            className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all font-bold text-dark shadow-sm uppercase"
                                                                            value={formData.fullName} onChange={e=>setFormData({...formData, fullName: e.target.value})}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-3">
                                                                    <label className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Contact Number</label>
                                                                    <div className="relative group">
                                                                        <Phone size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#007ebb] group-focus-within:scale-110 transition-all" />
                                                                        <input 
                                                                            type="text" required placeholder="Phone Number"
                                                                            className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all font-bold text-dark shadow-sm"
                                                                            value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-3 col-span-2">
                                                                    <label className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Street / Area / Colony</label>
                                                                    <div className="relative group">
                                                                        <MapPin size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#007ebb] group-focus-within:scale-110 transition-all" />
                                                                        <input 
                                                                            type="text" required placeholder="Road name or landmark"
                                                                            className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all font-bold text-dark shadow-sm uppercase"
                                                                            value={formData.addressLine1} onChange={e=>setFormData({...formData, addressLine1: e.target.value})}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-3 col-span-2">
                                                                    <label className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">City / State / Pincode</label>
                                                                    <div className="relative group">
                                                                        <Building2 size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#007ebb] group-focus-within:scale-110 transition-all" />
                                                                        <input 
                                                                            type="text" required placeholder="City, State, Zip"
                                                                            className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all font-bold text-dark shadow-sm uppercase"
                                                                            value={formData.cityState} onChange={e=>setFormData({...formData, cityState: e.target.value})}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-2 pt-2">
                                                                    <button 
                                                                        onClick={handleSaveAddress}
                                                                        disabled={isLoading}
                                                                        className="w-full sm:w-fit bg-[#007ebb] hover:bg-black text-white px-6 sm:px-10 py-4 sm:py-5 rounded-[18px] sm:rounded-[22px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/10 flex items-center justify-center gap-3"
                                                                    >
                                                                        {isLoading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={22} /> SAVE ADDRESS INFORMATION</>}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </section>

                                                    {/* 3. Payment Method */}
                                                    <section className="space-y-6 sm:space-y-8">
                                                        <h3 className="text-lg sm:text-xl font-alata font-medium text-dark flex items-center gap-3 uppercase tracking-tighter">
                                                            <div className="w-1.5 h-6 sm:h-7 bg-[#007ebb] rounded-full" /> SELECT PAYMENT METHOD
                                                        </h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                            <button 
                                                                onClick={() => setSelectedPayment('cod')}
                                                                className={`p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] border-2 flex flex-col items-start gap-4 transition-all relative group ${selectedPayment === 'cod' ? 'border-[#007ebb] bg-blue-50/20' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                                                            >
                                                                <div className={`p-4 rounded-2xl ${selectedPayment === 'cod' ? 'bg-[#007ebb] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                    <Landmark size={28} />
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-dark text-lg sm:text-xl uppercase tracking-tighter">Cash on Delivery</div>
                                                                    <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">Pay at doorstep</div>
                                                                </div>
                                                                <div className="absolute top-8 right-8">
                                                                    {selectedPayment === 'cod' ? <CheckCircle2 className="text-[#007ebb]" size={26} /> : <Circle className="text-gray-100" size={26} />}
                                                                </div>
                                                            </button>

                                                            <button 
                                                                onClick={() => setSelectedPayment('online')}
                                                                className={`p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] border-2 flex flex-col items-start gap-4 transition-all relative group ${selectedPayment === 'online' ? 'border-[#007ebb] bg-blue-50/20' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                                                            >
                                                                <div className={`p-4 rounded-2xl ${selectedPayment === 'online' ? 'bg-[#007ebb] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                    <CreditCard size={28} />
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-dark text-lg sm:text-xl uppercase tracking-tighter">Online Payment</div>
                                                                    <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">UPI, Cards, Banking</div>
                                                                </div>
                                                                <div className="absolute top-8 right-8">
                                                                    {selectedPayment === 'online' ? <CheckCircle2 className="text-[#007ebb]" size={26} /> : <Circle className="text-gray-100" size={26} />}
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </section>
                                                </div>

                                                {/* Right Column / Sidebar */}
                                                <div className="lg:col-span-5 relative">
                                                    <div className="lg:sticky lg:top-0 space-y-8">
                                                        
                                                        {/* Summary Card */}
                                                        <div className="bg-white rounded-[32px] sm:rounded-[40px] p-5 sm:p-10 border border-gray-100 shadow-2xl shadow-blue-900/10 space-y-6 sm:space-y-10">
                                                            <div className="space-y-6">
                                                                <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                                                                    <span>SUBTOTAL</span>
                                                                    <span className="text-dark">₹{displayTotal.toLocaleString()}</span>
                                                                </div>
                                                                {deliveryFee > 0 && (
                                                                    <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                                                                        <span>DELIVERY</span>
                                                                        <span className="text-dark">₹{deliveryFee.toLocaleString()}</span>
                                                                    </div>
                                                                )}
                                                                <div className="h-px bg-gray-100" />
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xl font-bold font-alata uppercase tracking-tighter">TOTAL AMOUNT</span>
                                                                    <span className="text-3xl sm:text-4xl font-bold text-[#007ebb] font-imperator tracking-tighter">₹{finalTotal.toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <button 
                                                                onClick={handleCheckoutAction}
                                                                disabled={isLoading}
                                                                className="w-full bg-[#007ebb] hover:bg-black text-white py-4 sm:py-6 rounded-[20px] sm:rounded-[24px] font-bold transition-all active:scale-[0.98] shadow-2xl shadow-blue-500/20 disabled:opacity-50 flex items-center justify-between px-6 sm:px-10 group"
                                                            >
                                                                {isLoading ? (
                                                                    <div className="w-full flex justify-center"><Loader2 className="animate-spin" /></div>
                                                                ) : (
                                                                    <>
                                                                        <div className="flex flex-col items-start leading-none uppercase tracking-[0.2em] text-base sm:text-lg">
                                                                            <span>COMPLETE</span>
                                                                            <span className="mt-1">ORDER</span>
                                                                        </div>
                                                                        <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;
