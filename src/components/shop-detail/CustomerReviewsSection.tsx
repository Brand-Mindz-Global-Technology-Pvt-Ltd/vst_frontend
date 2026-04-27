import React, { useState, useEffect, useCallback } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';
import ReviewModal from './ReviewModal';
import type { Product } from '../../types/product';
import { useAuth } from '../../context/AuthContext';
import {
    getProductReviews,
    checkCanReview,
    deleteReview,
    type Review,
    type CanReviewResponse,
} from '../../services/review/reviewApi';
import { getImageUrl } from '../../config/apiConfig';

interface CustomerReviewsSectionProps {
    product: Product;
}

const StarRow: React.FC<{ count: number; size?: number }> = ({ count, size = 18 }) => (
    <div className="flex text-yellow-400 gap-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={size}
                fill={i < Math.floor(count) ? 'currentColor' : 'none'}
                stroke={i < Math.floor(count) ? 'none' : 'currentColor'}
            />
        ))}
    </div>
);

const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ product }) => {
    const { isAuthenticated, user } = useAuth();

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [canReviewData, setCanReviewData] = useState<CanReviewResponse | null>(null);
    const [eligibilityLoading, setEligibilityLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingReview, setEditingReview] = useState<Review | null>(null);

    // Fetch reviews from API
    const fetchReviews = useCallback(async () => {
        if (!product._id) return;
        try {
            setReviewsLoading(true);
            const data = await getProductReviews(product._id);
            setReviews(data);
        } catch {
            // silently fail — reviews just won't show
        } finally {
            setReviewsLoading(false);
        }
    }, [product._id]);

    // Check can-review eligibility (only if authenticated)
    const fetchCanReview = useCallback(async () => {
        if (!isAuthenticated || !user?.customerId || !product._id) {
            setCanReviewData(null);
            return;
        }
        try {
            setEligibilityLoading(true);
            const data = await checkCanReview(user.id, product._id);
            setCanReviewData(data);
        } catch (err) {
            console.error("Eligibility check failed:", err);
            setCanReviewData(null);
        } finally {
            setEligibilityLoading(false);
        }
    }, [isAuthenticated, user?.customerId, product._id]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    useEffect(() => {
        fetchCanReview();
    }, [fetchCanReview]);

    // Called after a successful review submission to refresh everything
    const handleReviewSubmitted = async () => {
        await fetchReviews();
        await fetchCanReview();
    };

    const handleWriteReviewClick = async () => {
        // 1. Not logged in
        if (!isAuthenticated) {
            toast.error('Please login to write a review', { icon: '🔒' });
            return;
        }

        // 2. Logged in but can-review not yet loaded — wait or fetch
        if (!canReviewData) {
            if (eligibilityLoading) {
                toast('Checking eligibility...', { icon: '⏳' });
                return;
            }
            // Try fetching again if data is missing and not loading
            toast('Verifying purchase status...', { icon: '⏳' });
            await fetchCanReview();
            return; // Exit and let user click again once loaded, or continue below if await finishes
        }

        // 3. Not purchased
        if (!canReviewData.canReview && canReviewData.reason === 'purchase_required') {
            toast.error('You can only review products you have purchased', { icon: '🛒' });
            return;
        }

        // 4. Already reviewed
        if (!canReviewData.canReview && canReviewData.reason === 'already_reviewed') {
            toast.error('You have already reviewed this product', { icon: '✅' });
            return;
        }

        // 5. Eligible — open modal
        setEditingReview(null);
        setIsReviewModalOpen(true);
    };

    const handleEditClick = (review: Review) => {
        setEditingReview(review);
        setIsReviewModalOpen(true);
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (!user?.id) return;
        try {
            setDeletingId(reviewId);
            await deleteReview(reviewId, user.id);
            toast.success('Review deleted');
            await handleReviewSubmitted();
        } catch {
            toast.error('Failed to delete review');
        } finally {
            setDeletingId(null);
        }
    };

    // Build rating distribution from real reviews
    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => Math.floor(r.rating) === star).length;
        const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
        return { stars: star, percentage };
    });

    const avgRating =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

    return (
        <section className="bg-white py-20 px-4 sm:px-10 md:px-20 font-josefin border-t border-gray-100">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">

                    {/* Left Sticky Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-[120px]">
                        <h2 className="text-2xl md:text-3xl font-josefin text-dark mb-6">Customer Reviews</h2>

                        <div className="flex flex-col gap-4 mb-8">
                            <StarRow count={avgRating} size={25} />
                            <span className="text-sm md:text-md text-black font-semibold">
                                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 mb-10">
                            {ratingDistribution.map((rate) => (
                                <div key={rate.stars} className="flex items-center gap-4">
                                    <span className="text-md font-medium text-black w-12">{rate.stars} Star</span>
                                    <div className="flex-1 h-4 border border-gray-300 bg-gray-100 overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 transition-all duration-500"
                                            style={{ width: `${rate.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm md:text-md font-medium text-black w-8">{rate.percentage}%</span>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-black w-full mb-8" />

                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-3xl font-josefin text-dark">Review this product</h3>
                            <p className="text-black text-sm">Share your thoughts with other customers</p>
                            <button
                                onClick={handleWriteReviewClick}
                                className="w-full py-2 px-6 border border-black rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all tracking-wider"
                            >
                                Write a product review
                            </button>
                        </div>
                    </div>

                    {/* Review Modal */}
                    <ReviewModal
                        isOpen={isReviewModalOpen}
                        onClose={() => {
                            setIsReviewModalOpen(false);
                            setEditingReview(null);
                        }}
                        productId={product._id}
                        customerId={user?.id || ''}
                        customerName={user?.name || 'Customer'}
                        initialData={editingReview || undefined}
                        onReviewSubmitted={handleReviewSubmitted}
                    />

                    {/* Right Scrollable Content */}
                    <div className="lg:col-span-8">
                        <h2 className="text-2xl md:text-3xl font-josefin text-black mb-10">Recent Reviews</h2>

                        {reviewsLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black" />
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                                <Star size={48} className="text-gray-200" />
                                <p className="text-gray-400 text-lg font-josefin">No reviews yet. Be the first to review this product!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-12">
                                {reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="flex flex-col gap-4 pb-12 border-b border-gray-100 border-dashed last:border-0"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                                                    {review.customerAvatar ? (
                                                        <img
                                                            src={review.customerAvatar}
                                                            alt={review.customerName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xl font-bold">
                                                            {review.customerName?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-2xl font-josefin text-dark leading-none">
                                                    {review.customerName}
                                                </span>
                                            </div>

                                            {/* Action buttons — only for own reviews */}
                                            {isAuthenticated && user?.id === review.customerId && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(review)}
                                                        className="text-xs text-blue-500 hover:text-blue-700 transition-colors border border-blue-200 hover:border-blue-400 px-3 py-1 rounded-full"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteReview(review._id)}
                                                        disabled={deletingId === review._id}
                                                        className="text-xs text-red-400 hover:text-red-600 transition-colors border border-red-200 hover:border-red-400 px-3 py-1 rounded-full"
                                                    >
                                                        {deletingId === review._id ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <StarRow count={review.rating} size={18} />

                                        {review.title && (
                                            <h4 className="text-2xl font-josefin text-black -mt-1">{review.title}</h4>
                                        )}

                                        {review.comment && (
                                            <p className="text-black text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                                                {review.comment}
                                            </p>
                                        )}

                                        {review.images && review.images.length > 0 && (
                                            <div className="flex gap-3 flex-wrap mt-2">
                                                {review.images.map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200"
                                                    >
                                                        <img
                                                            src={getImageUrl(img)}
                                                            alt={`Review image ${idx + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <span className="text-xs text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviewsSection;
