import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiLogin } from '../../services/auth/authService';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('redirect') || '/';
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const response = await apiLogin(formData);
            
            if (response.success) {
                const userData = {
                    id: response.data.id,
                    customerId: response.data.customerId,
                    name: response.data.name,
                    email: response.data.email,
                    token: response.data.token
                };
                login(userData);
                setStatus('success');
                setMessage('Login successful! Redirecting...');
                setTimeout(() => navigate(redirectPath), 1500);
            } else {
                setStatus('error');
                setMessage(response.message || 'Invalid credentials');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Server error. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8faff] flex items-center justify-center p-6 font-josefin overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px]" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[480px] z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,126,187,0.1)] border border-white p-10 md:p-12 relative overflow-hidden text-center">
                    {/* Header */}
                    <div className="mb-10">
                        <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-[#007ebb] rounded-2xl shadow-lg shadow-blue-500/20 mb-6"
                        >
                            <Lock className="text-white" size={28} />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-dark mb-2 tracking-tight uppercase">Welcome Back</h1>
                        <p className="text-gray-500">Secure access to your VST account</p>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-left ${status === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}
                        >
                            {status === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                            <span className="text-sm font-medium">{message}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
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

                        <div className="flex justify-end pr-1">
                            <Link to="/forgot-password" className="text-sm font-bold text-[#007ebb] hover:underline underline-offset-4">
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className="w-full bg-[#007ebb] hover:bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-3 h-[64px]"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>Sign In <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col gap-4">
                        <p className="text-gray-500">
                            Don't have an account? {' '}
                            <Link to={`/register?redirect=${encodeURIComponent(redirectPath)}`} className="text-[#007ebb] font-bold hover:underline underline-offset-4">Create Account</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
