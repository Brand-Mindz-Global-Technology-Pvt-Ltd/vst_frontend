import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { apiVerifyEmail } from '../../services/auth/authService';

const VerifyEmail: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email address...');

    const hasCalledVerify = React.useRef(false);

    useEffect(() => {
        const verify = async () => {
            if (!token || hasCalledVerify.current) return;
            hasCalledVerify.current = true;

            try {
                const response = await apiVerifyEmail(token);
                if (response.success) {
                    setStatus('success');
                    setMessage(response.message || 'Email verified successfully!');
                } else {
                    setStatus('error');
                    setMessage(response.message || 'Verification failed.');
                }
            } catch (error: any) {
                setStatus('error');
                setMessage(error.message || 'Verification link is invalid or has expired.');
            }
        };

        verify();
    }, [token]);

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
                    <div className="mb-10">
                        <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg mb-6 ${
                                status === 'loading' ? 'bg-blue-50 text-[#007ebb]' : 
                                status === 'success' ? 'bg-green-50 text-green-600' : 
                                'bg-red-50 text-red-600'
                            }`}
                        >
                            {status === 'loading' ? <Loader2 className="animate-spin" size={32} /> : 
                             status === 'success' ? <CheckCircle2 size={32} /> : 
                             <ShieldAlert size={32} />}
                        </motion.div>
                        
                        <h1 className="text-2xl font-bold text-dark mb-4 tracking-tight uppercase">
                            {status === 'loading' ? 'Verifying Email' : 
                             status === 'success' ? 'Verification Success' : 
                             'Verification Failed'}
                        </h1>
                        <p className={`text-gray-500 text-sm leading-relaxed ${status === 'error' ? 'text-red-500' : ''}`}>
                            {message}
                        </p>
                    </div>

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link 
                                to="/login"
                                className="w-full bg-[#007ebb] hover:bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 h-[64px]"
                            >
                                Sign In Now <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-4">
                            <Link 
                                to="/register"
                                className="w-full bg-[#007ebb] hover:bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 h-[64px]"
                            >
                                Try Registering Again <ArrowRight size={20} />
                            </Link>
                            <p className="text-xs text-gray-400">
                                Need help? <Link to="/contact" className="text-[#007ebb] hover:underline">Contact Support</Link>
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
