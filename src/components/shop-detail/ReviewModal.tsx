import React, { useState, useEffect } from 'react';
import { X, Star, Trash2, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { createReview, updateReview, type Review } from '../../services/review/reviewApi';
import { getImageUrl } from '../../config/apiConfig';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    customerId: string;
    customerName: string;
    initialData?: Review; // Pass this when editing
    onReviewSubmitted: () => Promise<void>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen,
    onClose,
    productId,
    customerId,
    customerName,
    initialData,
    onReviewSubmitted,
}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);

    // Populate form if editing
    useEffect(() => {
        if (initialData && isOpen) {
            setRating(initialData.rating);
            setTitle(initialData.title || '');
            setComment(initialData.comment || '');
            setExistingImages(initialData.images || []);
            setNewImages([]);
        } else if (!initialData && isOpen) {
            resetForm();
        }
    }, [initialData, isOpen]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const totalImages = existingImages.length + newImages.length + filesArray.length;
            if (totalImages > 3) {
                toast.error('Max 3 images allowed');
                return;
            }
            setNewImages(prev => [...prev, ...filesArray]);
        }
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setRating(0);
        setHover(0);
        setTitle('');
        setComment('');
        setNewImages([]);
        setExistingImages([]);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append('customerId', customerId);
            formData.append('productId', productId);
            formData.append('rating', String(rating));
            formData.append('title', title.trim());
            formData.append('comment', comment.trim());
            formData.append('customerName', customerName);
            
            // Append new files
            newImages.forEach(file => formData.append('images', file));

            if (initialData) {
                // Update mode
                await updateReview(initialData._id, formData);
                toast.success('Review updated! ✨');
            } else {
                // Create mode
                await createReview(formData);
                toast.success('Review submitted! 🎉');
            }

            resetForm();
            onClose();
            await onReviewSubmitted();
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Something went wrong';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 z-[10000] backdrop-blur-md"
                    />

                    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                            className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-josefin font-bold text-dark">
                                        {initialData ? 'Edit Review' : 'Write a Review'}
                                    </h2>
                                    <p className="text-gray-500 text-sm font-josefin">Share your experience with others</p>
                                </div>
                                <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                                    <X size={24} className="text-gray-400 hover:text-red-500" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
                                {/* Star Rating */}
                                <div className="space-y-4 text-center">
                                    <label className="text-lg font-josefin font-semibold text-dark block">Overall Rating</label>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                                onClick={() => setRating(star)}
                                                className="transition-transform active:scale-90"
                                            >
                                                <Star
                                                    size={40}
                                                    className={`transition-colors ${
                                                        (hover || rating) >= star
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-gray-200'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-sm font-josefin text-blue-500 font-medium">
                                        {rating > 0 ? ['Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating - 1] : 'Select a rating'}
                                    </p>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-josefin font-bold text-dark ml-1">Review Title</label>
                                        <input
                                            type="text"
                                            placeholder="Example: Great product, easy to use"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-josefin"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-josefin font-bold text-dark ml-1">Your Review</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Write your comments here..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-josefin resize-none"
                                        />
                                    </div>

                                    {/* Image Management */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-josefin font-bold text-dark ml-1 block">
                                            Photos (Max 3)
                                        </label>
                                        <div className="flex flex-wrap gap-4">
                                            {/* Existing Images */}
                                            {existingImages.map((img, idx) => (
                                                <div key={`exist-${idx}`} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 group">
                                                    <img src={getImageUrl(img)} alt="existing" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => removeExistingImage(idx)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            {/* New Images */}
                                            {newImages.map((file, idx) => (
                                                <div key={`new-${idx}`} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-blue-100 group">
                                                    <img src={URL.createObjectURL(file)} alt="new" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => removeNewImage(idx)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            {/* Add Button */}
                                            {existingImages.length + newImages.length < 3 && (
                                                <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                                    <Camera size={24} className="text-gray-400 group-hover:text-blue-500" />
                                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500">ADD PHOTO</span>
                                                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} multiple />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0">
                                <button
                                    disabled={submitting}
                                    onClick={handleSubmit}
                                    className="w-full bg-black text-white py-4 rounded-2xl font-josefin font-bold text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98] disabled:opacity-60"
                                >
                                    {submitting ? 'Processing...' : (initialData ? 'Update Review' : 'Submit Review')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ReviewModal;
