import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { apiLogin, apiRegister } from '../../../services/auth/authService';
import { useCart } from '../../../context/CartContext';

const AuthModal: React.FC = () => {
    const { isAuthModalOpen, toggleAuthModal, login } = useAuth();
    const { isCheckoutOpen, toggleCheckout } = useCart();
    
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSwitch = () => {
        setIsLogin(!isLogin);
        setStatus('idle');
        setMessage('');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            let response;
            if (isLogin) {
                response = await apiLogin({
                    email: formData.email,
                    password: formData.password
                });
            } else {
                response = await apiRegister({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                });
            }
            
            if (response.success) {
                setStatus('success');
                setMessage(isLogin ? 'Login successful!' : 'Account created!');
                
                const userData = {
                    id: response.data.id,
                    customerId: response.data.customerId,
                    name: response.data.name,
                    email: response.data.email,
                    token: response.data.token
                };
                
                login(userData);
                
                // After successful login/register, close this modal
                setTimeout(() => {
                    toggleAuthModal();
                    if (!isCheckoutOpen) {
                        toggleCheckout();
                    }
                    // Reset modal state for next time
                    setStatus('idle');
                    setMessage('');
                }, 1500);
            } else {
                setStatus('error');
                setMessage(response.message || (isLogin ? 'Login failed' : 'Registration failed'));
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'An error occurred. Please try again.');
        }
    };

    if (!isAuthModalOpen) return null;

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleAuthModal}
                        className="fixed inset-0 bg-black/60 z-10000 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-10001 flex items-center justify-center p-4 pointer-events-none font-josefin">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-[500px] bg-white rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,126,187,0.2)] flex flex-col overflow-hidden pointer-events-auto border border-blue-50 relative"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={toggleAuthModal}
                                className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-all z-10"
                            >
                                <X size={24} className="text-gray-400" />
                            </button>

                            <div className="p-8 sm:p-12">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <motion.div 
                                        key={isLogin ? 'login-icon' : 'reg-icon'}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="inline-flex items-center justify-center w-16 h-16 bg-[#007ebb] rounded-2xl shadow-lg shadow-blue-500/20 mb-6"
                                    >
                                        {isLogin ? <Lock className="text-white" size={28} /> : <User className="text-white" size={28} />}
                                    </motion.div>
                                    <h1 className="text-3xl font-bold text-dark mb-2 tracking-tight uppercase">
                                        {isLogin ? 'Welcome Back' : 'Join VST Family'}
                                    </h1>
                                    <p className="text-gray-500">
                                        {isLogin ? 'Secure access to your account' : 'Experience pure excellence'}
                                    </p>
                                </div>

                                {/* Status Message */}
                                <AnimatePresence mode="wait">
                                    {message && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-left ${status === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}
                                        >
                                            {status === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                                            <span className="text-sm font-medium">{message}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {!isLogin && (
                                        <div className="space-y-1.5 text-left">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                                <input 
                                                    type="text" required
                                                    placeholder="John Doe"
                                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-1.5 text-left">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                            <input 
                                                type="email" required
                                                placeholder="your@email.com"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 text-left">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                            <input 
                                                type={showPassword ? "text" : "password"} required
                                                placeholder="••••••••"
                                                className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#007ebb] transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    {!isLogin && (
                                        <div className="space-y-1.5 text-left">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                                <input 
                                                    type={showPassword ? "text" : "password"} required
                                                    placeholder="••••••••"
                                                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button 
                                        type="submit" 
                                        disabled={status === 'loading'}
                                        className="w-full bg-[#007ebb] hover:bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-3 h-[60px] mt-4"
                                    >
                                        {status === 'loading' ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} /></>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                                    <p className="text-gray-500">
                                        {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
                                        <button 
                                            onClick={handleSwitch}
                                            className="text-[#007ebb] font-bold hover:underline underline-offset-4"
                                        >
                                            {isLogin ? 'Create Account' : 'Sign In'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
