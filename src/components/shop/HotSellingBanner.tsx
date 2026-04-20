import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, getImageUrl } from '../../config/apiConfig';
import type { Product } from '../../types/product';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HotSellingBanner: React.FC = () => {
    const [hotProducts, setHotProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotSelling = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/products/product-list?isHotSelling=true`);
                if (response.data.success && response.data.data.length > 0) {
                    setHotProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching hot selling product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotSelling();
    }, []);

    // Auto-cycle logic
    useEffect(() => {
        if (hotProducts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % hotProducts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [hotProducts.length]);

    const activeProduct = hotProducts[currentIndex];

    if (loading) {
        return (
            <div className="w-full py-12 pb-20 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-[20px]"></div>
            </div>
        );
    }

    if (!activeProduct) {
        return (
            <div className="w-full py-12 pb-20">
                <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-blue-900 to-black p-8 text-white">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ShoppingCart size={120} />
                    </div>
                    <div className="relative z-10 max-w-md">
                        <div className="bg-[#B70000] text-white text-[11px] font-bold px-3 py-1 inline-block uppercase tracking-widest mb-4 rounded-sm">
                            Coming Soon
                        </div>
                        <h3 className="text-2xl font-josefin font-bold mb-3">Next Season's Hot Deal</h3>
                        <p className="text-white/70 text-sm font-josefin mb-6">
                            We're preparing something truly special for our next Hot Selling showcase. 
                            Our team is currently testing the latest in water purification technology.
                        </p>
                        <button 
                            onClick={() => navigate('/shop')}
                            className="border border-white/30 hover:bg-white/10 px-6 py-2 rounded-lg text-xs font-bold transition-all"
                        >
                            Explore Existing Collection
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-12 pb-20">
            <div className="relative">
                {/* Hot Selling Badge */}
                <div className="bg-[#B70000] text-white text-[13px] font-medium px-5 py-2 inline-block font-josefin mb-6 shadow-md rounded-tr-[4px] rounded-br-[4px]">
                    Hot Selling Product
                </div>

                {/* Product Card */}
                <div
                    className="bg-black bg-cover bg-center rounded-[20px] w-full overflow-hidden shadow-2xl relative min-h-[220px]"
                    style={{ backgroundImage: "url('/assets/shop/hotselling-banner.png')" }}
                >
                    {/* Overlay for readability if image is bright */}
                    <div className="absolute inset-0 bg-black/20 z-0"></div>

                    {/* Main Content Container */}
                    <div className="flex p-5 gap-4 items-center relative z-10">
                        {/* Image Side */}
                        <div className="w-1/2">
                            <img
                                src={getImageUrl(activeProduct.images?.[0])}
                                alt={activeProduct.name}
                                className="w-full h-[180px] md:h-[240px] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Text Side */}
                        <div className="w-1/2 flex flex-col pt-4 pr-2">
                            <h4 className="text-[14px] md:text-[16px] font-medium text-white/90 leading-tight mb-2 font-josefin line-clamp-2">
                                {activeProduct.name}
                            </h4>
                            <div className="flex items-center gap-1 mb-3">
                                <div className="flex gap-0.5 text-[#fbbf24] text-[12px]">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < Math.floor(activeProduct.rating || 1) ? "text-[#fbbf24]" : "text-gray-400"}>★</span>
                                    ))}
                                </div>
                                <span className="text-white/70 text-[11px] font-bold">{activeProduct.rating || '5.0'}</span>
                            </div>
                            <p className="font-semibold text-white text-2xl md:text-3xl mb-4 font-josefin tracking-tight">₹{activeProduct.price}</p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => navigate(`/shop/${activeProduct._id}`)}
                                    className="bg-[#2EB800] hover:bg-[#259300] text-white text-[12px] font-bold px-6 py-2 rounded-md shadow-lg transition-all font-josefin transform active:scale-95"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Dynamic Carousel Indicators */}
            {hotProducts.length > 1 && (
                <div className="flex justify-center gap-2 pt-6">
                    {hotProducts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentIndex === index 
                                    ? "w-12 bg-black border border-gray-500/30" 
                                    : "w-8 bg-gray-500/50 hover:bg-gray-500/70"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotSellingBanner;
