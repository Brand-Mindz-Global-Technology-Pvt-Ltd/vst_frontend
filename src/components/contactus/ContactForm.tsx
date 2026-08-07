import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { apiSubmitContact } from '../../services/contact/contactService';

const OPEN_ENQUIRY_FORM_EVENT = 'vst:open-enquiry-form';

export const openEnquiryForm = () => {
    window.dispatchEvent(new Event(OPEN_ENQUIRY_FORM_EVENT));
};

export const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await apiSubmitContact(formData);
            setStatus({ type: 'success', message: 'Message sent successfully! Our team will contact you soon.' });
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[500px] mx-auto w-full">
            <h3 className="text-3xl md:text-4xl font-serif text-center text-dark mb-3">Contact us</h3>
            <p className="text-gray-500 mb-8 font-medium text-center">Our friendly team would love to hear from you</p>

            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status.type === 'success'
                            ? 'bg-green-50 border border-green-100 text-green-800'
                            : 'bg-red-50 border border-red-100 text-red-800'}`}
                    >
                        {status.type === 'success'
                            ? <CheckCircle2 className="shrink-0 w-5 h-5 text-green-600" />
                            : <AlertCircle className="shrink-0 w-5 h-5 text-red-600" />}
                        <p className="text-sm font-medium">{status.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-dark md:text-lg font-medium mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder="Enter your name" required disabled={loading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-dark md:text-lg font-medium mb-2">Gmail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="Enter your gmail" required disabled={loading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-dark md:text-lg font-medium mb-2">Phone number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="Enter your phone no" required disabled={loading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-dark md:text-lg font-medium mb-2">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                        placeholder="Leave us a message..." rows={4} required disabled={loading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all resize-none" />
                </div>
                <button type="submit" disabled={loading}
                    className="w-full bg-[#007ebb] text-white py-3 rounded-3xl font-bold text-lg hover:bg-[#006699] transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? <><Loader2 className="animate-spin w-5 h-5" />Sending...</> : 'Send message'}
                </button>
            </form>
        </div>
    );
};

export const EnquiryFormModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const show = () => setOpen(true);
        window.addEventListener(OPEN_ENQUIRY_FORM_EVENT, show);
        return () => window.removeEventListener(OPEN_ENQUIRY_FORM_EVENT, show);
    }, []);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', closeOnEscape);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.button aria-label="Close enquiry form" onClick={() => setOpen(false)}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md" />
                    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-3 sm:p-6 pointer-events-none font-outfit">
                        <motion.div role="dialog" aria-modal="true" aria-label="Contact us"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative pointer-events-auto w-full max-w-[620px] max-h-[94vh] overflow-y-auto rounded-[15px] bg-white p-6 sm:p-8 md:p-10 shadow-2xl">
                            <button type="button" aria-label="Close" onClick={() => setOpen(false)}
                                className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-black">
                                <X size={20} />
                            </button>
                            <ContactForm />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
