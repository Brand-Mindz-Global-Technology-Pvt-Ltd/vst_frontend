import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister } from '../../services/auth/authService';
import { useAuth } from '../../context/AuthContext';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const response = await apiRegister({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });
            
            if (response.success) {
                setStatus('success');
                setMessage('Account created! Redirecting...');
                
                // Auto-login using the token and user data from response
                if (response.data && response.data.token) {
                    const userData = {
                        id: response.data.id,
                        customerId: response.data.customerId,
                        name: response.data.name,
                        email: response.data.email,
                        token: response.data.token
                    };
                    login(userData);
                    setTimeout(() => navigate('/'), 1500);
                } else {
                    setTimeout(() => navigate('/login'), 2000);
                }
            } else {
                setStatus('error');
                setMessage(response.message || 'Registration failed');
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
                className="w-full max-w-[520px] z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,126,187,0.1)] border border-white p-10 md:p-12 relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-[#007ebb] rounded-2xl shadow-lg shadow-blue-500/20 mb-6"
                        >
                            <User className="text-white" size={28} />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-dark mb-2 tracking-tight uppercase">Join VST Family</h1>
                        <p className="text-gray-500">Experience pure excellence in every drop</p>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${status === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}
                        >
                            {status === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                            <span className="text-sm font-medium">{message}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    placeholder="john@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        required
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
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007ebb] transition-transform group-focus-within:scale-110" size={18} />
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#007ebb] focus:ring-4 focus:ring-blue-50 transition-all text-dark font-medium placeholder:text-gray-300 shadow-sm"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#007ebb] transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className="w-full bg-[#007ebb] hover:bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-3 h-[60px] mt-4"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>Create Account <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-xs text-gray-400 leading-relaxed">
                        By signing up, you agree to our <Link to="/terms" className="text-[#007ebb] underline">Terms</Link> and <Link to="/privacy" className="text-[#007ebb] underline">Privacy Policy</Link>
                    </div>

                    <div className="mt-8 text-center border-t border-gray-50 pt-8">
                        <p className="text-gray-500 font-josefin">
                            Already have an account? {' '}
                            <Link to="/login" className="text-[#007ebb] font-bold hover:underline underline-offset-4">Sign In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
