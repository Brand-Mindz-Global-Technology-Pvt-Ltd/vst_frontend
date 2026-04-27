import React, { useRef, useState, useEffect } from 'react';
import { ChevronFirst, ChevronLast, Sparkles } from 'lucide-react';
import TopPickCard from '../ui/shop/TopPickCard';
import axios from 'axios';
import { API_BASE_URL, getImageUrl } from '../../config/apiConfig';
import type { Product } from '../../types/product';

const TopPicks: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopPicks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/products/product-list?isTopPick=true`);
                if (response.data.success) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching top picks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopPicks();
    }, []);

    // Click outside section to close detailed view
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveCard(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSectionClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setActiveCard(null);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const firstCard = container.firstElementChild as HTMLElement;

            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const gap = parseInt(window.getComputedStyle(container).gap) || 24;
                const scrollAmount = cardWidth + gap;

                const { scrollLeft } = container;
                const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

                container.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            ref={containerRef}
            onClick={handleSectionClick}
            className="w-full bg-[#EAF8FF] py-8 md:mt-7 sm:py-12 md:py-2 overflow-hidden min-h-[400px]"
        >
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8 md:mb-16 w-full">
                <div className="bg-[#3d3d3d] rounded-r-full py-4 md:py-6 pl-4 sm:pl-10 md:pl-20 pr-12 md:pr-24 shadow-xl self-start">
                    <h2 className="text-white text-xl md:text-3xl font-josefin font-medium tracking-wide">
                        This Month's Top Pick
                    </h2>
                </div>

                {!loading && products.length > 0 && (
                    <div className="flex gap-4 pr-6 md:pr-12">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-white text-dark w-10 h-10 md:w-14 md:h-14 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100 flex items-center justify-center group"
                        >
                            <ChevronFirst size={24} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-white text-dark w-10 h-10 md:w-14 md:h-14 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100 flex items-center justify-center group"
                        >
                            <ChevronLast size={24} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-[#007ebb] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : products.length > 0 ? (
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 pb-8 pl-4 sm:pl-10 md:pl-20 pr-6 md:pr-12 scroll-smooth"
                >
                    {products.map((product) => (
                        <div key={product._id} className="w-[280px] sm:w-[340px] md:w-[400px] shrink-0 h-full">
                            <TopPickCard
                                id={product._id}
                                name={product.name}
                                image={getImageUrl(product.images?.[0])}
                                discount={product.discount ? `${product.discount}% OFF` : undefined}
                                categories={[product.category, product.subCategory].filter(Boolean)}
                                description={product.description}
                                currentPrice={product.price}
                                originalPrice={product.oldPrice}
                                isDetailed={activeCard === product._id}
                                onToggle={() => setActiveCard(activeCard === product._id ? null : product._id)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-white max-w-lg">
                        <Sparkles className="w-12 h-12 text-[#007ebb] mb-4 mx-auto animate-pulse" />
                        <h3 className="text-xl md:text-2xl font-josefin font-semibold text-gray-800 mb-3">
                            Curating New Picks
                        </h3>
                        <p className="text-gray-600 font-josefin">
                            We're hand-selecting this month's premium water purifiers for you. 
                            Stay tuned as our experts finalize the ultimate selection for your home.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TopPicks;
