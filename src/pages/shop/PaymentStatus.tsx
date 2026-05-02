import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ChevronRight, Home, ShoppingBag, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiVerifyPhonePePayment } from '../../services/order/orderService';

const PaymentStatus: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get('orderId');

    const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your payment...');
    const [orderDetails, setOrderDetails] = useState<any>(null);

    useEffect(() => {
        if (!orderId) {
            setStatus('error');
            setMessage('Invalid Request: Order ID missing.');
            return;
        }

        const verifyPayment = async () => {
            try {
                // Wait a bit to ensure PhonePe has updated the status on their end
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                const response = await apiVerifyPhonePePayment(orderId);
                
                if (response.success) {
                    setStatus('success');
                    setMessage(response.message || 'Your payment was successful!');
                    setOrderDetails(response.data);
                } else {
                    setStatus('failed');
                    setMessage(response.message || 'Payment failed or was cancelled.');
                }
            } catch (err: any) {
                console.error('Verification Error:', err);
                setStatus('failed');
                setMessage(err.message || 'Verification failed. Please contact support if money was deducted.');
            }
        };

        verifyPayment();
    }, [orderId]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 bg-gray-50/30 font-josefin">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl bg-white rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,126,187,0.1)] border border-blue-50 overflow-hidden"
            >
                <div className="p-8 sm:p-12 flex flex-col items-center text-center">
                    
                    <AnimatePresence mode="wait">
                        {status === 'loading' && (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
                                    <Loader2 size={48} className="text-[#007ebb] animate-spin" />
                                    <div className="absolute inset-0 rounded-full border-4 border-[#007ebb]/10 border-t-[#007ebb] animate-spin" />
                                </div>
                                <h1 className="text-3xl font-alata text-dark mb-4 uppercase tracking-wider">Verifying Payment</h1>
                                <p className="text-gray-500 max-w-xs leading-relaxed font-medium">Please wait while we confirm your payment with PhonePe...</p>
                            </motion.div>
                        )}

                        {status === 'success' && (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                    <CheckCircle2 size={56} className="text-green-500" />
                                </div>
                                <h1 className="text-4xl font-alata text-dark mb-4 uppercase tracking-wider">Order Confirmed</h1>
                                <p className="text-lg text-green-600 font-bold mb-8 uppercase tracking-widest">{message}</p>
                                
                                {orderDetails && (
                                    <div className="w-full bg-gray-50 rounded-3xl p-6 mb-10 text-left space-y-3">
                                        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <span>Order ID</span>
                                            <span className="text-dark">#{orderDetails.orderId}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <span>Status</span>
                                            <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase">Captured</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <button 
                                        onClick={() => navigate('/profile?tab=orders')}
                                        className="flex-1 bg-[#007ebb] hover:bg-black text-white px-8 py-5 rounded-[22px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
                                    >
                                        <ShoppingBag size={20} />
                                        View My Orders
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {(status === 'failed' || status === 'error') && (
                            <motion.div 
                                key="failed"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
                                    {status === 'failed' ? <XCircle size={56} className="text-red-500" /> : <AlertCircle size={56} className="text-amber-500" />}
                                </div>
                                <h1 className="text-3xl font-alata text-dark mb-4 uppercase tracking-wider">
                                    {status === 'failed' ? 'Payment Unsuccessful' : 'Something Went Wrong'}
                                </h1>
                                <p className="text-gray-500 mb-10 max-w-md leading-relaxed font-medium">{message}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <button 
                                        onClick={() => navigate('/shop')}
                                        className="bg-white border-2 border-gray-100 hover:border-dark text-dark px-8 py-5 rounded-[22px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                                    >
                                        <Home size={20} />
                                        Back to Shop
                                    </button>
                                    <button 
                                        onClick={() => navigate('/shop')} // Usually users want to go back to shop/cart to try again
                                        className="bg-[#007ebb] hover:bg-black text-white px-8 py-5 rounded-[22px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
                                    >
                                        Try Again
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
                
                {/* Footer Link */}
                <div className="bg-gray-50/50 py-6 px-12 border-t border-gray-100 flex justify-center">
                    <Link to="/contact" className="text-xs font-bold text-gray-400 hover:text-[#007ebb] uppercase tracking-widest transition-colors flex items-center gap-2">
                        Need help with your payment? Contact Support
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentStatus;
