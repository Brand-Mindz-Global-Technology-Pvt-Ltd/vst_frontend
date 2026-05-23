import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ArrowRight, Package, Clock, Truck, CheckCircle2, MapPin, CreditCard, X } from 'lucide-react';
import { apiTrackGuestOrder } from '../../services/order/orderService';
import { getImageUrl } from '../../config/apiConfig';
import toast from 'react-hot-toast';

const TrackOrder: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim() || !email.trim()) {
            toast.error("Please enter both Order ID and Email");
            return;
        }

        setLoading(true);
        setOrder(null);
        try {
            const response = await apiTrackGuestOrder(orderId.trim(), email.trim());
            if (response.success && response.data) {
                const o = response.data;
                // Map the schema fields to our UI fields
                const mappedOrder = {
                    id: o.orderId,
                    date: new Date(o.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }),
                    total: o.totalAmount,
                    subtotal: o.subtotal || 0,
                    shipping: o.shipping || 0,
                    status: o.orderStatus,
                    paymentMethod: o.payment?.method || 'cod',
                    address: {
                        fullName: o.shippingAddress?.fullName || 'Guest Customer',
                        phone: o.shippingAddress?.phone || 'N/A',
                        addressLine1: o.shippingAddress?.addressLine1 || '',
                        city: o.shippingAddress?.city || '',
                        state: o.shippingAddress?.state || '',
                        pincode: o.shippingAddress?.pincode || ''
                    },
                    items: o.items.map((item: any) => ({
                        id: item.productId?._id || item.productId,
                        name: item.name || item.productId?.name || "Product",
                        price: item.price,
                        image: getImageUrl(item.image || item.productId?.images?.[0]),
                        quantity: item.qty || item.quantity
                    }))
                };
                setOrder(mappedOrder);
                toast.success("Order retrieved successfully!");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to retrieve order. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] bg-gradient-to-br from-gray-50 via-white to-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 font-josefin">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold font-imperator text-dark tracking-tighter uppercase mb-3">Track Your Order</h1>
                    <p className="text-sm text-gray-500 font-medium">Enter your details below to check the real-time status of your order.</p>
                </div>

                {/* Track Order Input Form */}
                <div className="bg-white rounded-[32px] p-8 shadow-[0_24px_72px_-16px_rgba(0,126,187,0.08)] border border-blue-50/50 mb-10">
                    <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Order ID</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs uppercase">ORD-</span>
                                <input
                                    type="text"
                                    placeholder="Enter remaining details (e.g. 20260518-XXXX)"
                                    value={orderId.startsWith("ORD-") ? orderId.substring(4) : orderId}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setOrderId(val.startsWith("ORD-") ? val : `ORD-${val}`);
                                    }}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl font-bold font-jost text-dark focus:outline-none focus:border-[#007ebb] focus:bg-white transition-all uppercase"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Registered Email Address</label>
                            <input
                                type="email"
                                placeholder="e.g. user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl font-bold text-dark focus:outline-none focus:border-[#007ebb] focus:bg-white transition-all"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-4 bg-dark text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#007ebb] disabled:opacity-50 transition-all shadow-lg active:scale-[0.99]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Retrieving Order...
                                    </>
                                ) : (
                                    <>
                                        <Search size={16} /> Track Live Order Status <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Animated Search Results */}
                <AnimatePresence mode="wait">
                    {order && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8"
                        >
                            {/* Live Tracking Timeline */}
                            <div className="bg-white rounded-[32px] p-8 shadow-[0_24px_72px_-16px_rgba(0,126,187,0.08)] border border-blue-50/50">
                                <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                                        <h2 className="text-xl font-bold font-imperator text-[#007ebb] tracking-tighter">{order.id}</h2>
                                    </div>
                                    <div className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                                        order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                                        order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                                        'bg-blue-50 text-[#007ebb]'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                            order.status === 'delivered' ? 'bg-green-600' :
                                            order.status === 'cancelled' ? 'bg-red-600' :
                                            'bg-[#007ebb]'
                                        }`} />
                                        {order.status}
                                    </div>
                                </div>

                                {order.status === 'cancelled' ? (
                                    <div className="bg-red-50 border border-red-100 p-6 rounded-[24px] flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                            <X size={20} className="text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-red-800 uppercase tracking-wide text-xs">Order Cancelled</h4>
                                            <p className="text-xs text-red-600 font-medium mt-0.5">This order has been cancelled and cannot be tracked further.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative flex justify-between items-center w-full max-w-[600px] mx-auto py-4">
                                        {/* Progress Line */}
                                        <div className="absolute top-9 left-4 right-4 h-1 bg-gray-200 -z-10 rounded-full" />
                                        <div 
                                            className="absolute top-9 left-4 h-1 bg-[#007ebb] -z-10 rounded-full transition-all duration-500"
                                            style={{
                                                width: 
                                                    order.status === 'delivered' ? '100%' :
                                                    order.status === 'shipped' ? '70%' :
                                                    order.status === 'confirmed' ? '35%' : '0%'
                                            }}
                                        />

                                        {/* Timeline steps */}
                                        {[
                                            { label: 'Ordered', status: 'pending', icon: <Package size={16} /> },
                                            { label: 'Packed', status: 'confirmed', icon: <Clock size={16} /> },
                                            { label: 'Shipped', status: 'shipped', icon: <Truck size={16} /> },
                                            { label: 'Delivered', status: 'delivered', icon: <CheckCircle2 size={16} /> }
                                        ].map((step, idx) => {
                                            const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
                                            const currentIdx = statuses.indexOf(order.status);
                                            const stepIdx = statuses.indexOf(step.status);
                                            
                                            const isCompleted = currentIdx >= stepIdx;
                                            const isActive = currentIdx === stepIdx;

                                            return (
                                                <div key={idx} className="flex flex-col items-center gap-2.5">
                                                    <div 
                                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                                                            isCompleted 
                                                                ? 'bg-[#007ebb] border-blue-100 text-white shadow-lg shadow-blue-500/20' 
                                                                : isActive 
                                                                    ? 'bg-white border-[#007ebb] text-[#007ebb] scale-110' 
                                                                    : 'bg-white border-gray-200 text-gray-400'
                                                        }`}
                                                    >
                                                        {step.icon}
                                                    </div>
                                                    <span 
                                                        className={`text-[9px] font-bold uppercase tracking-wider text-center ${
                                                            isCompleted || isActive ? 'text-dark' : 'text-gray-400'
                                                        }`}
                                                    >
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Shipping details */}
                                <div className="bg-white rounded-[32px] p-8 shadow-[0_24px_72px_-16px_rgba(0,126,187,0.08)] border border-blue-50/50">
                                    <h3 className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2 mb-6">
                                        <MapPin size={16} className="text-[#007ebb]" /> Shipping Address
                                    </h3>
                                    <div className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100 space-y-1">
                                        <p className="font-bold text-dark uppercase tracking-tighter">{order.address.fullName}</p>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                            {order.address.addressLine1}<br />
                                            {order.address.city}, {order.address.state} - {order.address.pincode}
                                        </p>
                                        <p className="text-xs text-[#007ebb] font-bold pt-2">{order.address.phone}</p>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="bg-white rounded-[32px] p-8 shadow-[0_24px_72px_-16px_rgba(0,126,187,0.08)] border border-blue-50/50">
                                    <h3 className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2 mb-6">
                                        <CreditCard size={16} className="text-[#007ebb]" /> Payment Details
                                    </h3>
                                    <div className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Method</p>
                                        <p className="text-sm text-[#007ebb] font-bold uppercase tracking-widest mb-4">{order.paymentMethod}</p>
                                        <div className="space-y-2 border-t border-gray-200/50 pt-4">
                                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                <span>Subtotal</span>
                                                <span className="text-dark">₹{order.subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                <span>Delivery</span>
                                                <span className="text-dark">₹{order.shipping.toLocaleString()}</span>
                                            </div>
                                            <div className="h-px bg-gray-200 mt-2" />
                                            <div className="flex justify-between text-sm font-bold text-dark uppercase tracking-tighter pt-2">
                                                <span>Total Amount</span>
                                                <span className="text-base text-[#007ebb]">₹{order.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Items list */}
                            <div className="bg-white rounded-[32px] p-8 shadow-[0_24px_72px_-16px_rgba(0,126,187,0.08)] border border-blue-50/50">
                                <h3 className="text-xs font-bold text-dark uppercase tracking-widest mb-6">Items in this Order</h3>
                                <div className="space-y-4">
                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="flex gap-6 items-center p-4 bg-white border border-gray-100 rounded-[28px]">
                                            <div className="w-20 h-20 bg-gray-50 rounded-[18px] p-2 flex items-center justify-center shrink-0 border border-gray-50">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                                                    }}
                                                />
                                            </div>
                                            <div className="grow">
                                                <h4 className="font-bold text-dark line-clamp-1 uppercase tracking-tighter text-sm">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-jost">₹{item.price.toLocaleString()} × {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-[#007ebb] font-jost">₹{(item.price * item.quantity).toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrackOrder;
