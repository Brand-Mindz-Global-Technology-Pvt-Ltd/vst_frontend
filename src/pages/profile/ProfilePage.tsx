import React, { useState, useEffect } from 'react';
import { User, MapPin, ShoppingBag, Heart, LogOut, Camera, CheckCircle2, X, Loader2, CreditCard, ChevronRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { apiGetMyOrders } from '../../services/order/orderService';

// Types for better structure and future API integration
interface OrderItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    status: string;
    total: number;
    subtotal: number;
    shipping: number;
    paymentMethod: string;
    address: {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
    };
    items: OrderItem[];
}

const ProfilePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    
    const [activeTab, setActiveTab] = useState('Personal Info');
    const [showSuccess, setShowSuccess] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'orders') {
            setActiveTab('My Orders');
            setShowSuccess(searchParams.get('status') === 'success');
        }
    }, [searchParams]);

    useEffect(() => {
        if (activeTab === 'My Orders') {
            fetchOrders();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await apiGetMyOrders();
            if (response.success) {
                const mappedOrders: Order[] = response.data.map((o: any) => ({
                    id: o.orderId,
                    date: new Date(o.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    status: o.orderStatus,
                    total: o.totalAmount,
                    subtotal: o.subtotal || 0,
                    shipping: o.shipping || 0,
                    paymentMethod: o.payment?.method || 'N/A',
                    address: {
                        fullName: o.shippingAddress?.fullName || 'N/A',
                        phone: o.shippingAddress?.phone || 'N/A',
                        addressLine1: o.shippingAddress?.addressLine1 || 'N/A',
                        city: o.shippingAddress?.city || '',
                        state: o.shippingAddress?.state || '',
                        pincode: o.shippingAddress?.pincode || '',
                    },
                    items: o.items.map((item: any) => ({
                        id: item.productId?._id || item.productId,
                        name: item.name || item.productId?.name || "Product",
                        price: item.price,
                        image: item.image || item.productId?.images?.[0] || "/assets/home/aqu-banner.png",
                        quantity: item.qty || item.quantity
                    }))
                }));
                setOrders(mappedOrders);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Personal Info', icon: <User size={20} /> },
        { name: 'Address Book', icon: <MapPin size={20} /> },
        { name: 'My Orders', icon: <ShoppingBag size={20} /> },
        { name: 'Wishlist', icon: <Heart size={20} /> },
        { name: 'Logout', icon: <LogOut size={20} />, activeColor: 'text-red-600' },
    ];

    return (
        <div className="min-h-screen bg-[#EFEFEF] py-10 px-4 sm:px-10 md:px-20 font-josefin">
            <div className="max-w-[1240px] mx-auto bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
                <div className="flex flex-col lg:flex-row min-h-[600px]">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[320px] bg-white border-r border-gray-50 p-8 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full border-[3px] border-[#007ebb] p-1 overflow-hidden flex items-center justify-center bg-gray-50">
                                <User size={64} className="text-gray-300" />
                            </div>
                            <button className="absolute bottom-1 right-1 bg-dark text-white p-2 rounded-full shadow-lg hover:bg-black transition-colors">
                                <Camera size={14} />
                            </button>
                        </div>

                        <div className="text-center mb-10 w-full px-4 overflow-hidden text-ellipsis whitespace-nowrap">
                            <h2 className="text-2xl font-bold font-imperator text-dark text-ellipsis whitespace-nowrap">{user?.name || "VST Member"}</h2>
                            <p className="text-sm text-gray-500 mt-1 text-ellipsis whitespace-nowrap">{user?.email}</p>
                        </div>

                        <nav className="w-full space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        if (item.name === 'Logout') {
                                            handleLogout();
                                        } else {
                                            setActiveTab(item.name);
                                        }
                                    }}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-all font-medium ${activeTab === item.name
                                            ? 'bg-dark text-white shadow-md'
                                            : `text-dark hover:bg-gray-50 ${item.activeColor || ''}`
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 p-8 sm:p-12 relative">
                        {showSuccess && (
                            <div className="absolute top-8 left-8 right-8 bg-green-50 border border-green-100 p-4 rounded-xl flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <CheckCircle2 size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-800">Order Placed Successfully!</h4>
                                        <p className="text-sm text-green-600">Your order has been received and is being processed.</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowSuccess(false)} className="text-green-400 hover:text-green-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        )}

                        {activeTab === 'Personal Info' && (
                            <div className="max-w-3xl">
                                <h1 className="text-3xl font-bold font-imperator text-dark mb-10 uppercase tracking-tighter">Personal Info</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={user?.name || ''}
                                            readOnly
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl focus:outline-none transition-all text-dark font-bold cursor-not-allowed uppercase"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            readOnly
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl focus:outline-none transition-all text-dark font-bold cursor-not-allowed uppercase"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'My Orders' && (
                            <div className="space-y-8">
                                <h1 className="text-3xl font-bold font-imperator text-dark mb-10 uppercase tracking-tighter">My Orders</h1>
                                <div className="space-y-6">
                                    {loading ? (
                                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                            <Loader2 className="animate-spin mb-4 text-[#007ebb]" size={48} />
                                            <p className="font-bold uppercase tracking-widest text-xs">Fetching your orders...</p>
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                            <ShoppingBag size={64} strokeWidth={1} className="mb-4 opacity-10" />
                                            <p className="font-bold text-lg uppercase tracking-tighter">You haven't placed any orders yet.</p>
                                        </div>
                                    ) : (
                                        orders.map((order) => (
                                            <div key={order.id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all group">
                                                <div className="bg-gray-50/50 p-6 sm:p-8 border-b border-gray-100 flex flex-wrap justify-between items-center gap-6">
                                                    <div className="flex gap-10">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                                                            <p className="text-sm font-bold text-dark font-jost">{order.id}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Placed</p>
                                                            <p className="text-sm font-bold text-dark font-jost">{order.date}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                                                            <p className="text-sm font-bold text-[#007ebb] font-jost">₹{order.total.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="px-5 py-2 rounded-full bg-blue-50 text-[#007ebb] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-[#007ebb] rounded-full animate-pulse" />
                                                        {order.status}
                                                    </div>
                                                </div>
                                                <div className="p-8">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex gap-8 items-center mb-6 last:mb-0">
                                                            <div className="w-24 h-24 bg-gray-50 rounded-[20px] p-3 flex items-center justify-center shrink-0 border border-gray-100">
                                                                <img 
                                                                    src={item.image} 
                                                                    alt={item.name} 
                                                                    className="w-full h-full object-contain"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.src = '/assets/home/aqu-banner.png';
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="grow">
                                                                <h3 className="text-xl font-bold font-josefin text-dark line-clamp-1 uppercase tracking-tighter">{item.name}</h3>
                                                                <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">QTY: {item.quantity}</p>
                                                            </div>
                                                            <button 
                                                                onClick={() => setSelectedOrder(order)}
                                                                className="hidden sm:flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-100 rounded-[18px] text-[10px] font-bold text-dark hover:border-[#007ebb] hover:text-[#007ebb] transition-all uppercase tracking-widest"
                                                            >
                                                                View Details <ChevronRight size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Wishlist' && (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-20">
                                <Heart size={64} strokeWidth={1} className="mb-4 opacity-10" />
                                <h2 className="text-2xl font-bold font-imperator text-dark/30 mb-2 uppercase tracking-widest">Wishlist section coming soon</h2>
                                <p className="text-sm font-medium">We're working on making this feature available for you.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-black/60 z-10000 backdrop-blur-md"
                        />
                        <div className="fixed inset-0 z-10001 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                className="w-full max-w-[800px] h-[85vh] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden pointer-events-auto border border-blue-50"
                            >
                                <div className="p-10 border-b border-gray-100 flex justify-between items-center shrink-0">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-bold font-imperator text-[#007ebb] uppercase tracking-tighter">Order Details</h2>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{selectedOrder.id}</p>
                                    </div>
                                    <button onClick={() => setSelectedOrder(null)} className="p-3 hover:bg-gray-100 rounded-full transition-all group active:scale-90">
                                        <X size={24} className="text-gray-400 group-hover:text-red-500" />
                                    </button>
                                </div>

                                <div className="grow overflow-y-auto p-10 space-y-12">
                                    {/* Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <section className="space-y-5">
                                            <h3 className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                                                <MapPin size={16} className="text-[#007ebb]" /> Shipping Address
                                            </h3>
                                            <div className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100 space-y-1">
                                                <p className="font-bold text-dark uppercase tracking-tighter">{selectedOrder.address.fullName}</p>
                                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                                    {selectedOrder.address.addressLine1}<br />
                                                    {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}
                                                </p>
                                                <p className="text-xs text-[#007ebb] font-bold pt-2">{selectedOrder.address.phone}</p>
                                            </div>
                                        </section>

                                        <section className="space-y-5">
                                            <h3 className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                                                <CreditCard size={16} className="text-[#007ebb]" /> Payment Info
                                            </h3>
                                            <div className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100 space-y-1">
                                                <p className="text-sm font-bold text-dark uppercase tracking-tighter">Method</p>
                                                <p className="text-sm text-[#007ebb] font-bold uppercase tracking-widest">{selectedOrder.paymentMethod}</p>
                                                <div className="pt-4 space-y-2">
                                                    <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                        <span>Subtotal</span>
                                                        <span className="text-dark">₹{selectedOrder.subtotal.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                        <span>Delivery</span>
                                                        <span className="text-dark">₹{selectedOrder.shipping.toLocaleString()}</span>
                                                    </div>
                                                    <div className="h-px bg-gray-200 mt-2" />
                                                    <div className="flex justify-between text-sm font-bold text-dark uppercase tracking-tighter pt-2">
                                                        <span>Order Total</span>
                                                        <span className="text-base text-[#007ebb]">₹{selectedOrder.total.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Items List */}
                                    <section className="space-y-6">
                                        <h3 className="text-xs font-bold text-dark uppercase tracking-widest">Items in Order</h3>
                                        <div className="space-y-4">
                                            {selectedOrder.items.map((item) => (
                                                <div key={item.id} className="flex gap-6 items-center p-4 bg-white border border-gray-100 rounded-[28px]">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-[18px] p-2 flex items-center justify-center shrink-0 border border-gray-50">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="grow">
                                                        <h4 className="font-bold text-dark line-clamp-1 uppercase tracking-tighter text-sm">{item.name}</h4>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">₹{item.price.toLocaleString()} × {item.quantity}</p>
                                                    </div>
                                                    <div className="font-bold text-[#007ebb]">₹{(item.price * item.quantity).toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;
