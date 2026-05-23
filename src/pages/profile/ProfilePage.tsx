import React, { useState, useEffect, useRef } from 'react';
import { User, MapPin, ShoppingBag, Heart, LogOut, CheckCircle2, X, Loader2, CreditCard, ChevronRight, Clock, RefreshCw, AlertCircle, Truck, Package, Calendar, Download, Lock, Trash2, Plus, Edit3, Eye, EyeOff } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { 
    apiGetMyOrders, 
    apiCancelOrder,
    apiGetCustomerProfile,
    apiUpdateCustomerProfile,
    apiChangeCustomerPassword,
    apiGetAddresses,
    apiCreateAddress,
    apiUpdateAddress,
    apiDeleteAddress,
    apiGetWishlist,
    apiRemoveProductFromWishlist
} from '../../services/order/orderService';
import { getImageUrl } from '../../config/apiConfig';
import toast from 'react-hot-toast';

// Types for better structure and future API integration
interface OrderItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
}

interface Order {
    id: string;
    date: string;
    status: string;
    total: number;
    subtotal: number;
    shipping: number;
    paymentMethod: string;
    paymentStatus: string;
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
    const { user, logout, updateUser } = useAuth();
    const { addToCart, toggleCart } = useCart();
    const { removeFromWishlist } = useWishlist();
    
    const [activeTab, setActiveTab] = useState('Personal Info');
    const [showSuccess, setShowSuccess] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const hasFetched = useRef(false);

    // E2E Order Tracking state
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [cancelReason, setCancelReason] = useState('');
    const [showCancelPrompt, setShowCancelPrompt] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // 👤 Profile Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [avatarInput, setAvatarInput] = useState('');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // 📍 Address Book state
    interface Address {
        _id: string;
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
        type?: 'Home' | 'Work' | 'Other';
    }
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [addressForm, setAddressForm] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
        type: 'Home' as 'Home' | 'Work' | 'Other'
    });

    // ❤️ Wishlist state
    interface WishlistItem {
        _id: string;
        name: string;
        price: number;
        images: string[];
        slug?: string;
    }
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loadingWishlist, setLoadingWishlist] = useState(false);

    // 🔒 Security (Password) state
    const [securityForm, setSecurityForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);



    const handleReorder = (order: Order) => {
        order.items.forEach(item => {
            addToCart({
                id: `${item.id}-${item.color || ''}-${item.size || ''}`,
                name: item.name,
                description: "domestic",
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                rating: 5,
                reviewsCount: "0 Reviews",
                color: item.color || undefined,
                size: item.size || undefined
            });
        });
        setSelectedOrder(null);
        toast.success("All items added to your cart!");
        toggleCart();
    };

    const handleCancelOrder = async (orderId: string) => {
        if (!cancelReason.trim()) {
            toast.error("Please enter a reason for cancellation");
            return;
        }
        setIsCancelling(true);
        try {
            const response = await apiCancelOrder(orderId, cancelReason);
            if (response.success) {
                toast.success("Order cancelled successfully!");
                // Update local order list
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
                // Update selected order in view modal
                if (selectedOrder && selectedOrder.id === orderId) {
                    setSelectedOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
                }
                setShowCancelPrompt(false);
                setCancelReason('');
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to cancel order");
        } finally {
            setIsCancelling(false);
        }
    };

    const handleDownloadInvoice = (order: Order) => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            toast.error("Popup blocker prevented invoice download");
            return;
        }

        const itemsHtml = order.items.map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-transform: uppercase; font-size: 12px; font-weight: bold;">${item.name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; font-size: 12px;">₹${item.price.toLocaleString()}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; font-size: 12px;">${item.quantity}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; font-size: 12px;">₹${(item.price * item.quantity).toLocaleString()}</td>
            </tr>
        `).join('');

        const subtotal = order.subtotal || (order.total - order.shipping);
        const gstRate = 0.18; // 18% GST standard
        const baseAmount = subtotal / (1 + gstRate);
        const totalGst = subtotal - baseAmount;
        const cgst = totalGst / 2;
        const sgst = totalGst / 2;

        const html = `
            <html>
            <head>
                <title>Invoice - ${order.id}</title>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; margin: 0; padding: 40px; }
                    .invoice-box { max-width: 800px; margin: auto; }
                    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #007ebb; padding-bottom: 20px; margin-bottom: 30px; }
                    .logo { font-size: 28px; font-weight: 900; color: #007ebb; letter-spacing: -1px; text-transform: uppercase; }
                    .title { font-size: 24px; font-weight: bold; color: #333; text-transform: uppercase; }
                    .meta-grid { display: flex; justify-content: space-between; margin-bottom: 40px; }
                    .meta-section { width: 45%; }
                    .meta-section h3 { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px; }
                    .meta-section p { font-size: 13px; font-weight: bold; line-height: 1.5; margin: 0; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                    th { background-color: #f9f9f9; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; color: #666; padding: 12px; border-bottom: 2px solid #ddd; text-align: left; }
                    .summary-box { float: right; width: 300px; }
                    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; }
                    .summary-row.total { border-top: 2px solid #007ebb; font-weight: bold; font-size: 16px; color: #007ebb; padding-top: 12px; margin-top: 8px; }
                    .gst-info { font-size: 10px; color: #999; margin-top: 80px; border-top: 1px dashed #ddd; padding-top: 10px; text-align: center; }
                </style>
            </head>
            <body>
                <div class="invoice-box">
                    <div class="header">
                        <div class="logo">VST</div>
                        <div class="title">Tax Invoice</div>
                    </div>
                    
                    <div class="meta-grid">
                        <div class="meta-section">
                            <h3>Billed To</h3>
                            <p>${order.address.fullName}</p>
                            <p style="font-weight: normal; color: #666;">
                                ${order.address.addressLine1}<br>
                                ${order.address.city}, ${order.address.state} - ${order.address.pincode}
                            </p>
                            <p style="font-size: 11px; margin-top: 5px;">Phone: ${order.address.phone}</p>
                        </div>
                        <div class="meta-section" style="text-align: right;">
                            <h3>Invoice Details</h3>
                            <p>Invoice No: ${order.id}</p>
                            <p>Date: ${order.date}</p>
                            <p>Payment: ${order.paymentMethod.toUpperCase()}</p>
                            <p style="font-size: 12px; font-weight: bold; color: ${
                                order.paymentStatus === 'captured' ? '#16a34a' :
                                order.paymentStatus === 'failed' ? '#dc2626' :
                                order.paymentStatus === 'refunded' ? '#9333ea' : '#d97706'
                            };">Status: ${order.paymentStatus.toUpperCase()}</p>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Item Description</th>
                                <th style="text-align: center;">Price</th>
                                <th style="text-align: center;">Qty</th>
                                <th style="text-align: right;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>

                    <div class="summary-box">
                        <div class="summary-row">
                            <span>Subtotal (incl. taxes)</span>
                            <span>₹${subtotal.toLocaleString()}</span>
                        </div>
                        <div class="summary-row" style="color: #666; font-size: 11px;">
                            <span>CGST (9%)</span>
                            <span>₹${cgst.toLocaleString()}</span>
                        </div>
                        <div class="summary-row" style="color: #666; font-size: 11px;">
                            <span>SGST (9%)</span>
                            <span>₹${sgst.toLocaleString()}</span>
                        </div>
                        <div class="summary-row">
                            <span>Delivery charges</span>
                            <span>₹${order.shipping.toLocaleString()}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Grand Total</span>
                            <span>₹${order.total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div style="clear: both;"></div>

                    <div class="gst-info">
                        <p>GSTIN: 27AAAAA1111A1Z1 • This is a computer-generated tax invoice and requires no signature.</p>
                        <p>Thank you for shopping with VST!</p>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() { window.close(); }, 500);
                    }
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    // Fetch Profile details from database to keep synced (TC-UP-001)
    const fetchProfile = async () => {
        try {
            const response = await apiGetCustomerProfile();
            if (response.success) {
                const customer = response.data;
                setNameInput(customer.name || '');
                setPhoneInput(customer.phone || '');
                setAvatarInput(customer.profilePicture || '');
                updateUser({
                    name: customer.name,
                    phone: customer.phone,
                    profilePicture: customer.profilePicture
                });
            }
        } catch (error) {
            console.error("Failed to fetch customer profile:", error);
        }
    };

    // Fetch Address Book items (TC-UP-004)
    const fetchAddressBook = async () => {
        if (!user) return;
        setLoadingAddresses(true);
        try {
            const response = await apiGetAddresses(user.id);
            if (response.success) {
                setAddresses(response.data || []);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to load addresses");
        } finally {
            setLoadingAddresses(false);
        }
    };

    // Fetch Wishlist items (TC-UP-005)
    const fetchWishlist = async () => {
        if (!user) return;
        setLoadingWishlist(true);
        try {
            const response = await apiGetWishlist(user.id);
            if (response.success) {
                setWishlistItems(response.data?.products || []);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to load wishlist");
        } finally {
            setLoadingWishlist(false);
        }
    };

    useEffect(() => {
        if (user) {
            setNameInput(user.name || '');
            setPhoneInput(user.phone || '');
            setAvatarInput(user.profilePicture || '');
            fetchProfile();
        }
    }, [user?.token]);

    useEffect(() => {
        if (activeTab === 'Personal Info') {
            fetchProfile();
        } else if (activeTab === 'Address Book') {
            fetchAddressBook();
        } else if (activeTab === 'Wishlist') {
            fetchWishlist();
        }
    }, [activeTab]);

    const handleSaveProfile = async () => {
        if (!nameInput.trim()) {
            toast.error("Name is required");
            return;
        }
        setIsSavingProfile(true);
        try {
            const response = await apiUpdateCustomerProfile({
                name: nameInput,
                phone: phoneInput,
                profilePicture: avatarInput
            });
            if (response.success) {
                updateUser({
                    name: response.data.name,
                    phone: response.data.phone,
                    profilePicture: response.data.profilePicture
                });
                setIsEditing(false);
                toast.success("Profile updated successfully!");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to save profile");
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!addressForm.fullName.trim() || !addressForm.phone.trim() || !addressForm.addressLine1.trim() || !addressForm.city.trim() || !addressForm.state.trim() || !addressForm.pincode.trim()) {
            toast.error("All address fields are required");
            return;
        }

        try {
            if (editingAddress) {
                // Update
                const response = await apiUpdateAddress(user.id, editingAddress._id, addressForm);
                if (response.success) {
                    toast.success("Address updated successfully!");
                    fetchAddressBook();
                    setShowAddressModal(false);
                    setEditingAddress(null);
                }
            } else {
                // Create
                const response = await apiCreateAddress(user.id, addressForm);
                if (response.success) {
                    toast.success("Address added successfully!");
                    fetchAddressBook();
                    setShowAddressModal(false);
                }
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to save address");
        }
    };

    const handleDeleteAddress = async (addressId: string) => {
        if (!user) return;
        if (!confirm("Are you sure you want to delete this address?")) return;
        try {
            const response = await apiDeleteAddress(user.id, addressId);
            if (response.success) {
                toast.success("Address deleted!");
                fetchAddressBook();
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to delete address");
        }
    };

    const handleRemoveFromWishlist = async (productId: string) => {
        if (!user) return;
        try {
            const response = await apiRemoveProductFromWishlist(user.id, productId);
            if (response.success) {
                toast.success("Item removed from wishlist");
                removeFromWishlist(productId);
                fetchWishlist();
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to remove item");
        }
    };

    const handleWishlistAddToCart = (item: WishlistItem) => {
        addToCart({
            id: `${item._id}---`,
            name: item.name,
            description: "domestic",
            price: item.price,
            image: getImageUrl(item.images?.[0] || ''),
            quantity: 1,
            rating: 5,
            reviewsCount: "0 Reviews"
        });
        toast.success("Added to cart!");
        toggleCart();
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!securityForm.currentPassword || !securityForm.newPassword || !securityForm.confirmPassword) {
            toast.error("All password fields are required");
            return;
        }
        if (securityForm.newPassword !== securityForm.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        setIsChangingPassword(true);
        try {
            const response = await apiChangeCustomerPassword({
                currentPassword: securityForm.currentPassword,
                newPassword: securityForm.newPassword
            });
            if (response.success) {
                toast.success("Password changed successfully!");
                setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to change password");
        } finally {
            setIsChangingPassword(false);
        }
    };


    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'orders') {
            setActiveTab('My Orders');
            setShowSuccess(searchParams.get('status') === 'success');
        }
    }, [searchParams]);

    useEffect(() => {
        if (activeTab === 'My Orders' && !hasFetched.current) {
            hasFetched.current = true;
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
                    paymentStatus: o.payment?.status || 'pending',
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
                        image: getImageUrl(item.image || item.productId?.images?.[0]),
                        quantity: item.qty || item.quantity,
                        color: item.color || undefined,
                        size: item.size || undefined
                    }))
                }));
                console.log("Mapped Orders:", mappedOrders);
                setOrders(mappedOrders);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    // const handleLogout = () => {
    //     logout();
    //     navigate('/login');
    // };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Personal Info', icon: <User size={20} /> },
        { name: 'Address Book', icon: <MapPin size={20} /> },
        { name: 'My Orders', icon: <ShoppingBag size={20} /> },
        { name: 'Wishlist', icon: <Heart size={20} /> },
        { name: 'Security', icon: <Lock size={20} /> },
        { name: 'Logout', icon: <LogOut size={20} />, activeColor: 'text-red-600' },
    ];

    return (
        <div className="min-h-screen bg-[#EFEFEF] py-10 px-4 sm:px-10 md:px-20 font-josefin">
            <div className="max-w-[1240px] mx-auto bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 lg:h-[750px] flex flex-col">
                <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-[600px]">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[320px] bg-white border-r border-gray-50 p-8 flex flex-col items-center lg:overflow-y-auto shrink-0">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full border-[3px] border-[#007ebb] p-1 overflow-hidden flex items-center justify-center bg-gray-50">
                                <User size={64} className="text-gray-300" />
                            </div>
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
                                            setShowLogoutConfirm(true);
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
                    <main className="flex-1 p-8 sm:p-12 relative lg:overflow-y-auto">
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
                                <div className="flex items-center justify-between mb-10">
                                    <h1 className="text-3xl font-bold font-imperator text-dark uppercase tracking-tighter">Personal Info</h1>
                                    {!isEditing ? (
                                        <button 
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-6 py-3 bg-[#007ebb] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all shadow-md"
                                        >
                                            <Edit3 size={14} /> Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={handleSaveProfile}
                                                disabled={isSavingProfile}
                                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-md disabled:opacity-50"
                                            >
                                                {isSavingProfile ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Save
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setNameInput(user?.name || '');
                                                    setPhoneInput(user?.phone || '');
                                                }}
                                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={isEditing ? nameInput : (user?.name || '')}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            readOnly={!isEditing}
                                            className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all text-dark font-bold ${
                                                !isEditing 
                                                    ? 'bg-[#F8F9FA] border-gray-100 cursor-not-allowed' 
                                                    : 'bg-white border-[#007ebb] shadow-sm'
                                            }`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            readOnly
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl focus:outline-none transition-all text-dark font-bold cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">Phone Number</label>
                                        <input
                                            type="text"
                                            value={isEditing ? phoneInput : (user?.phone || '')}
                                            onChange={(e) => setPhoneInput(e.target.value)}
                                            readOnly={!isEditing}
                                            placeholder="Enter phone number"
                                            className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all text-dark font-bold ${
                                                !isEditing 
                                                    ? 'bg-[#F8F9FA] border-gray-100 cursor-not-allowed' 
                                                    : 'bg-white border-[#007ebb] shadow-sm'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Address Book' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-3xl font-bold font-imperator text-dark uppercase tracking-tighter">Address Book</h1>
                                    <button 
                                        onClick={() => {
                                            setEditingAddress(null);
                                            setAddressForm({ fullName: '', phone: '', addressLine1: '', city: '', state: '', pincode: '', type: 'Home' });
                                            setShowAddressModal(true);
                                        }}
                                        className="flex items-center gap-2 px-6 py-3 bg-[#007ebb] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all shadow-md"
                                    >
                                        <Plus size={14} /> Add Address
                                    </button>
                                </div>

                                {loadingAddresses ? (
                                    <div className="flex justify-center items-center py-20">
                                        <Loader2 size={36} className="animate-spin text-[#007ebb]" />
                                    </div>
                                ) : addresses.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border border-gray-100 rounded-[32px]">
                                        <MapPin size={64} strokeWidth={1} className="mb-4 opacity-10 text-[#007ebb]" />
                                        <p className="font-bold text-lg uppercase tracking-tighter">No addresses saved yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {addresses.map((addr) => (
                                            <div key={addr._id} className="p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-xl transition-all relative flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-dark text-lg uppercase">{addr.fullName}</h3>
                                                        {addr.type && (
                                                            <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-[#007ebb] px-2.5 py-1 rounded-full border border-blue-100">
                                                                {addr.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 font-medium mb-1">{addr.addressLine1}</p>
                                                    <p className="text-sm text-gray-500 font-medium mb-4">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Phone: {addr.phone}</p>
                                                </div>
                                                <div className="flex gap-4 mt-6 border-t border-gray-50 pt-4">
                                                    <button 
                                                        onClick={() => {
                                                            setEditingAddress(addr);
                                                            setAddressForm({
                                                                fullName: addr.fullName,
                                                                phone: addr.phone,
                                                                addressLine1: addr.addressLine1,
                                                                city: addr.city,
                                                                state: addr.state,
                                                                pincode: addr.pincode,
                                                                type: addr.type || 'Home'
                                                            });
                                                            setShowAddressModal(true);
                                                        }}
                                                        className="text-xs font-bold text-[#007ebb] uppercase tracking-wider hover:underline flex items-center gap-1"
                                                    >
                                                        <Edit3 size={12} /> Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteAddress(addr._id)}
                                                        className="text-xs font-bold text-red-600 uppercase tracking-wider hover:underline flex items-center gap-1"
                                                    >
                                                        <Trash2 size={12} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'My Orders' && (() => {
                            const filteredOrders = orders.filter(o => statusFilter === 'all' || o.status === statusFilter);

                            return (
                                <div className="space-y-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                                        <h1 className="text-3xl font-bold font-imperator text-dark uppercase tracking-tighter">My Orders</h1>
                                        
                                        {/* Status Filter Pills (TC-OT-008) */}
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { label: 'All', value: 'all' },
                                                { label: 'Pending', value: 'pending' },
                                                { label: 'Confirmed', value: 'confirmed' },
                                                { label: 'Shipped', value: 'shipped' },
                                                { label: 'Delivered', value: 'delivered' },
                                                { label: 'Cancelled', value: 'cancelled' }
                                            ].map(filter => {
                                                const count = filter.value === 'all' 
                                                    ? orders.length 
                                                    : orders.filter(o => o.status === filter.value).length;
                                                
                                                return (
                                                    <button
                                                        key={filter.value}
                                                        onClick={() => setStatusFilter(filter.value)}
                                                        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                                                            statusFilter === filter.value
                                                                ? 'bg-[#007ebb] text-white shadow-md'
                                                                 : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {filter.label}
                                                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                                                            statusFilter === filter.value ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                                                        }`}>
                                                            {count}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {loading ? (
                                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                                <Loader2 className="animate-spin mb-4 text-[#007ebb]" size={48} />
                                                <p className="font-bold uppercase tracking-widest text-xs">Fetching your orders...</p>
                                            </div>
                                        ) : filteredOrders.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border border-gray-100 rounded-[32px]">
                                                <ShoppingBag size={64} strokeWidth={1} className="mb-4 opacity-10 text-[#007ebb]" />
                                                <p className="font-bold text-lg uppercase tracking-tighter">
                                                    {statusFilter === 'all' 
                                                        ? "You haven't placed any orders yet." 
                                                        : `No orders found in ${statusFilter} status.`}
                                                </p>
                                            </div>
                                        ) : (
                                            filteredOrders.map((order) => (
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
                                                                            target.onerror = null;
                                                                            target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZSw8L3RleHQ+PC9zdmc+';
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
                            );
                        })()}

                        {activeTab === 'Wishlist' && (
                            <div className="space-y-8">
                                <h1 className="text-3xl font-bold font-imperator text-dark uppercase tracking-tighter mb-6">My Wishlist</h1>

                                {loadingWishlist ? (
                                    <div className="flex justify-center items-center py-20">
                                        <Loader2 size={36} className="animate-spin text-[#007ebb]" />
                                    </div>
                                ) : wishlistItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border border-gray-100 rounded-[32px]">
                                        <Heart size={64} strokeWidth={1} className="mb-4 opacity-10 text-[#007ebb]" />
                                        <p className="font-bold text-lg uppercase tracking-tighter">Your wishlist is empty.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {wishlistItems.map((item) => (
                                            <div key={item._id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
                                                <div className="p-4 bg-gray-50/50 aspect-square flex items-center justify-center relative border-b border-gray-50">
                                                    <img 
                                                        src={getImageUrl(item.images?.[0])} 
                                                        alt={item.name} 
                                                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-300"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZSw8L3RleHQ+PC9zdmc+';
                                                        }}
                                                    />
                                                    <button 
                                                        onClick={() => handleRemoveFromWishlist(item._id)}
                                                        className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-md hover:shadow-lg transition-all"
                                                        title="Remove from wishlist"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-bold text-dark font-josefin text-lg uppercase tracking-tight line-clamp-1 mb-2">{item.name}</h3>
                                                    <p className="text-xl font-bold text-[#007ebb] mb-6 font-jost">₹{item.price.toLocaleString()}</p>
                                                    <button 
                                                        onClick={() => handleWishlistAddToCart(item)}
                                                        className="w-full py-3 bg-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'Security' && (
                            <div className="max-w-xl">
                                <h1 className="text-3xl font-bold font-imperator text-dark mb-10 uppercase tracking-tighter">Security</h1>
                                
                                <form onSubmit={handleChangePassword} className="space-y-6">
                                    <div className="flex flex-col gap-2 relative">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">Current Password</label>
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={securityForm.currentPassword}
                                            onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                                            className="w-full px-6 py-4 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-bold"
                                            placeholder="••••••••"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute top-10 right-6 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2 relative">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">New Password</label>
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={securityForm.newPassword}
                                            onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                                            className="w-full px-6 py-4 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-bold"
                                            placeholder="••••••••"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute top-10 right-6 text-gray-400 hover:text-gray-600"
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-[0.2em] ml-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={securityForm.confirmPassword}
                                            onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                                            className="w-full px-6 py-4 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-bold"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={isChangingPassword}
                                        className="w-full py-4 bg-dark text-white rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isChangingPassword ? <Loader2 size={16} className="animate-spin" /> : "Update Password"}
                                    </button>
                                </form>
                            </div>
                        )}
                    </main>

                    {/* Address Modal (Add/Edit) */}
                    <AnimatePresence>
                        {showAddressModal && (
                            <div className="fixed inset-0 bg-black/60 flex items-start sm:items-center justify-center p-4 z-[9999] overflow-y-auto backdrop-blur-sm">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-[32px] w-full max-w-lg p-6 sm:p-8 relative shadow-2xl my-auto"
                                >
                                    <button 
                                        onClick={() => setShowAddressModal(false)}
                                        className="absolute top-6 right-6 p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all z-10"
                                    >
                                        <X size={20} />
                                    </button>
                                    
                                    <h2 className="text-xl sm:text-2xl font-bold font-imperator text-dark uppercase tracking-tight mb-6">
                                        {editingAddress ? "Edit Shipping Address" : "Add Shipping Address"}
                                    </h2>

                                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                                <input 
                                                    type="text"
                                                    value={addressForm.fullName}
                                                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-medium"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                                                <input 
                                                    type="tel"
                                                    value={addressForm.phone}
                                                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-medium"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Street Address</label>
                                            <input 
                                                type="text"
                                                value={addressForm.addressLine1}
                                                onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-medium"
                                                placeholder="Street and house number"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">City</label>
                                                <input 
                                                    type="text"
                                                    value={addressForm.city}
                                                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-medium"
                                                    placeholder="City"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">State</label>
                                                <input 
                                                    type="text"
                                                    value={addressForm.state}
                                                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-medium"
                                                    placeholder="State"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Pincode</label>
                                            <input 
                                                type="text"
                                                value={addressForm.pincode}
                                                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-[#007ebb] transition-all text-dark font-medium"
                                                placeholder="Pincode"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] px-1">Address Type</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['Home', 'Work', 'Other'].map((t) => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setAddressForm({ ...addressForm, type: t as 'Home' | 'Work' | 'Other' })}
                                                        className={`py-3.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                                                            addressForm.type === t
                                                                ? 'bg-[#007ebb] text-white border-[#007ebb] shadow-md'
                                                                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                                                        }`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <button 
                                            type="submit"
                                            className="w-full py-4 bg-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md mt-4"
                                        >
                                            {editingAddress ? "Save Address" : "Add Address"}
                                        </button>
                                    </form>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
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
                            onClick={() => { setSelectedOrder(null); setShowCancelPrompt(false); setCancelReason(''); }}
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
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => handleDownloadInvoice(selectedOrder)}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all rounded-xl text-[10px] font-bold text-dark uppercase tracking-widest pointer-events-auto"
                                        >
                                            <Download size={14} className="text-[#007ebb]" /> Invoice
                                        </button>
                                        <button onClick={() => { setSelectedOrder(null); setShowCancelPrompt(false); setCancelReason(''); }} className="p-3 hover:bg-gray-100 rounded-full transition-all group active:scale-90 pointer-events-auto">
                                            <X size={24} className="text-gray-400 group-hover:text-red-500" />
                                        </button>
                                    </div>
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
                                                {/* Payment Status Badge */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Status:</span>
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                                        selectedOrder.paymentStatus === 'captured'
                                                            ? 'bg-green-100 text-green-700'
                                                            : selectedOrder.paymentStatus === 'failed'
                                                                ? 'bg-red-100 text-red-700'
                                                                : selectedOrder.paymentStatus === 'refunded'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {selectedOrder.paymentStatus}
                                                    </span>
                                                </div>
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

                                    {/* Live Tracking Timeline (TC-OT-003) */}
                                    {selectedOrder.status === 'cancelled' ? (
                                        <div className="bg-red-50 border border-red-100 p-6 rounded-[24px] flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                                <X size={20} className="text-red-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-800 uppercase tracking-wide text-xs">Order Cancelled</h4>
                                                <p className="text-xs text-red-600 font-medium mt-0.5">This order has been cancelled and cannot be tracked further.</p>
                                            </div>
                                        </div>
                                    ) : selectedOrder.status === 'pending' ? (
                                        <div className="bg-blue-50/60 border border-blue-100 p-6 rounded-[24px] flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#007ebb]/10 flex items-center justify-center shrink-0">
                                                <Package size={20} className="text-[#007ebb]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#007ebb] uppercase tracking-wide text-xs">Order Received</h4>
                                                <p className="text-xs text-blue-600 font-medium mt-0.5">Your order has been placed successfully. Live tracking will be available once it is confirmed by our team.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <section className="space-y-6">
                                            <h3 className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                                                <Clock size={16} className="text-[#007ebb]" /> Live Order Tracking
                                            </h3>
                                            <div className="bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
                                                <div className="relative flex justify-between items-center w-full max-w-[600px] mx-auto">
                                                    {/* Progress Line */}
                                                    <div className="absolute top-5 left-4 right-4 h-1 bg-gray-200 -z-10 rounded-full" />
                                                    <div 
                                                        className="absolute top-5 left-4 h-1 bg-[#007ebb] -z-10 rounded-full transition-all duration-500"
                                                        style={{
                                                            width: 
                                                                selectedOrder.status === 'delivered' ? '100%' :
                                                                selectedOrder.status === 'shipped' ? '70%' :
                                                                selectedOrder.status === 'confirmed' ? '35%' : '0%'
                                                        }}
                                                    />

                                                    {/* Timeline steps */}
                                                    {[
                                                        { label: 'Ordered', status: 'pending', icon: <Package size={16} /> },
                                                        { label: 'Packed', status: 'confirmed', icon: <Calendar size={16} /> },
                                                        { label: 'Shipped', status: 'shipped', icon: <Truck size={16} /> },
                                                        { label: 'Delivered', status: 'delivered', icon: <CheckCircle2 size={16} /> }
                                                    ].map((step, idx) => {
                                                        const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
                                                        const currentIdx = statuses.indexOf(selectedOrder.status);
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
                                            </div>
                                        </section>
                                    )}

                                    {/* Items List */}
                                    <section className="space-y-6">
                                        <h3 className="text-xs font-bold text-dark uppercase tracking-widest">Items in Order</h3>
                                        <div className="space-y-4">
                                            {selectedOrder.items.map((item) => (
                                                <div key={item.id} className="flex gap-6 items-center p-4 bg-white border border-gray-100 rounded-[28px]">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-[18px] p-2 flex items-center justify-center shrink-0 border border-gray-50">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name} 
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null; // prevent infinite loop
                                                                target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                                                            }}
                                                        />
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

                                    {/* Action Buttons (TC-OT-005, TC-OT-006, TC-OT-009) */}
                                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100 justify-end shrink-0">
                                        {/* Reorder Button */}
                                        {selectedOrder.status === 'delivered' && (
                                            <button 
                                                onClick={() => handleReorder(selectedOrder)}
                                                className="flex items-center gap-2 px-8 py-4 bg-[#007ebb] text-white rounded-[20px] text-xs font-bold hover:bg-[#00669c] active:scale-95 transition-all uppercase tracking-widest shadow-lg shadow-blue-500/20"
                                            >
                                                <RefreshCw size={16} /> Reorder Items
                                            </button>
                                        )}

                                        {/* Return Request Button */}
                                        {selectedOrder.status === 'delivered' && (
                                            <button 
                                                onClick={() => {
                                                    const reason = prompt("Enter reason for return:");
                                                    if (reason) {
                                                        toast.success("Return request submitted! An email confirmation will be sent shortly.");
                                                    }
                                                }}
                                                className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-dark rounded-[20px] text-xs font-bold hover:border-red-500 hover:text-red-500 active:scale-95 transition-all uppercase tracking-widest"
                                            >
                                                <AlertCircle size={16} /> Return Order
                                            </button>
                                        )}

                                        {/* Cancel Order Section */}
                                        {(selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed') && (
                                            <button 
                                                onClick={() => setShowCancelPrompt(true)}
                                                className="flex items-center gap-2 self-end px-8 py-4 bg-red-50 text-red-600 rounded-[20px] text-xs font-bold hover:bg-red-100 active:scale-95 transition-all uppercase tracking-widest"
                                            >
                                                <X size={16} /> Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Cancel Order Confirmation Dialog — rendered above order modal, always centered & fully visible */}
            <AnimatePresence>
                {showCancelPrompt && selectedOrder && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-[20000] backdrop-blur-sm"
                            onClick={() => { setShowCancelPrompt(false); setCancelReason(''); }}
                        />
                        {/* Dialog */}
                        <div className="fixed inset-0 z-[20001] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 16 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 16 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl pointer-events-auto border border-red-100"
                            >
                                {/* Dialog Header */}
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <AlertCircle size={22} className="text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark uppercase tracking-tight text-base font-imperator">Cancel Order?</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{selectedOrder.id}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 font-medium mb-5 leading-relaxed">
                                    This action cannot be undone. Please provide a reason so our team can improve your experience.
                                </p>

                                {/* Reason Textarea */}
                                <textarea
                                    placeholder="Please provide a reason for cancellation..."
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-300 font-medium resize-none mb-6 transition-all"
                                    rows={3}
                                    autoFocus
                                />

                                {/* Action Buttons */}
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => { setShowCancelPrompt(false); setCancelReason(''); }}
                                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                                    >
                                        No, Keep It
                                    </button>
                                    <button
                                        onClick={() => handleCancelOrder(selectedOrder.id)}
                                        disabled={isCancelling}
                                        className="px-6 py-3 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 disabled:opacity-50 transition-all flex items-center gap-2"
                                    >
                                        {isCancelling ? <Loader2 size={12} className="animate-spin" /> : null}
                                        Yes, Cancel Order
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLogoutConfirm(false)}
                            className="fixed inset-0 bg-black/60 z-[10000] backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.92, opacity: 0, y: 16 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.92, opacity: 0, y: 16 }}
                                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                                className="w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden pointer-events-auto"
                            >
                                {/* Red top accent bar */}
                                <div className="h-1.5 w-full bg-gradient-to-r from-red-400 via-red-500 to-rose-600" />

                                <div className="p-8 sm:p-10">
                                    {/* Icon */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
                                            <LogOut size={36} className="text-red-500" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-bold font-imperator text-dark uppercase tracking-tight text-center mb-2">
                                        Sign Out?
                                    </h2>

                                    {/* Subtitle with user context */}
                                    <p className="text-sm text-gray-500 text-center font-medium mb-1">
                                        You are signed in as
                                    </p>
                                    <p className="text-sm font-bold text-[#007ebb] text-center mb-8 truncate px-4">
                                        {user?.email}
                                    </p>

                                    <p className="text-xs text-gray-400 text-center uppercase tracking-widest font-bold mb-8">
                                        Are you sure you want to logout?
                                    </p>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setShowLogoutConfirm(false)}
                                            className="py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                                        >
                                            No, Stay
                                        </button>
                                        <button
                                            onClick={confirmLogout}
                                            className="py-4 px-6 bg-red-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                                        >
                                            <LogOut size={14} />
                                            Yes, Logout
                                        </button>
                                    </div>
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

