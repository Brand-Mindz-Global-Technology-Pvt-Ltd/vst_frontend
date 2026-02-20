import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useHighlight } from '../../../context/HighlightContext';
import FloatingHighlight from '../framer/FloatingHighlight';
import { motion } from 'framer-motion';

interface ShopHeroProps {
    titleStart?: string;
    titleEnd?: string;
    bannerImage?: string;
    productImage?: string;
    trustCount?: string;
    onOrderClick?: () => void;
}

const ShopHeroTemplate: React.FC<ShopHeroProps> = ({
    titleStart = "Explore Our",
    titleEnd = "Products",
    bannerImage = "/assets/Images/shop_banner.png",
    productImage = "/assets/home/aqu-banner.png",
    trustCount = "15K",
    onOrderClick = () => console.log("Order Now clicked"),
}) => {
    const { setActiveId } = useHighlight();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setActiveId('shop-hero-heading');
        }, 600);
        return () => clearTimeout(timer);
    }, [setActiveId]);

    return (
        <section className="w-full bg-[#EFEFEF] py-8 md:py-6 px-4 md:px-8 font-outfit">
            {/* Heading Layer */}
            <motion.div onViewportEnter={() => setActiveId('shop-hero-heading')} className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                <h2 className="text-3xl md:text-6xl font-imperator tracking-tight text-dark">
                    {titleStart}
                </h2>

                <div className="relative">
                    <img
                        src="/assets/home/water-droplet.webp"
                        alt="Water Droplet" className="w-8 h-8 md:w-16 md:h-16" />
                    <div className="absolute inset-0 blur-2xl bg-[#00a8e8]/20 rounded-full"></div>
                </div>

                <FloatingHighlight
                    id="shop-hero-heading"
                    className="text-3xl md:text-6xl text-white font-imperator tracking-tight px-6 md:px-8 py-1 md:py-2 "
                >
                    {titleEnd}
                </FloatingHighlight>
            </motion.div>

            {/* Main Banner Container */}
            <div className="max-w-[1500px] mx-auto relative px-4 md:px-0">
                <div className="flex flex-col md:flex-row bg-[#f1f1f1] h-[500px] sm:h-[600px] md:h-[650px] rounded-br-[60px] md:rounded-br-[15px] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] relative overflow-hidden">

                    {/* Background Banner Image */}
                    <div className="absolute inset-0 z-0">
                        <img src={bannerImage} alt="Shop Banner" className="w-full h-full object-cover" />
                        {/* Right-to-Left Blue Overlay (#00A7FF) added back per user request */}
                        <div className="absolute inset-0 bg-linear-to-l from-[#00A7FF] via-[#00A7FF]/40 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-black/5"></div>
                    </div>

                    {/* 1. Left Side: Product Showcase (Moved to left per user request) */}
                    <div className="w-full md:w-[35%] relative z-20 flex flex-col items-center justify-center py-12 md:py-20 px-6 md:px-8 mt-auto md:mt-0">
                        <div className="relative mb-12 sm:mb-20 md:mb-32 flex flex-col items-center w-full group">
                            <img
                                src={productImage}
                                alt="Product"
                                className="w-[140px] sm:w-[180px] md:w-[220px] z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-[1.03]"
                            />
                            <div className="relative -mt-8 sm:-mt-10 md:-mt-22 w-fit">
                                <div className="w-[140px] sm:w-[180px] md:w-[340px] h-[35px] sm:h-[50px] md:h-[100px] bg-white rounded-[100%] border-b-4 sm:border-b-8 border-gray-300 shadow-2xl z-10 relative"></div>
                                <div className="w-[140px] sm:w-[180px] md:w-[340px] h-[45px] sm:h-[65px] md:h-[110px] bg-linear-to-b from-white via-gray-100 to-gray-400 -mt-[20px] sm:-mt-[25px] md:-mt-[50px] rounded-b-[40px] sm:rounded-b-[50px] md:rounded-b-[80px] shadow-inner border-x border-gray-100"></div>
                            </div>
                        </div>

                        {/* Top-Left Tab (Trust badge) positioned relative to the container but visually aligned */}
                        <div className="absolute top-0 left-0 z-30">
                            <div className="relative bg-[#EFEFEF] pt-2 pb-2 md:pt-4 md:pb-4 pl-4 md:pl-6 pr-6 md:pr-10 rounded-br-[30px] md:rounded-br-[50px] rounded-tl-[50px] md:rounded-tl-[10px] flex items-center shadow-sm">
                                <div className="flex items-center -space-x-2 md:-space-x-4">
                                    {[11, 12, 13, 50].map((img, i) => (
                                        <div key={i} className={`w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-2 border-[#222] overflow-hidden z-[${i + 1}]`}>
                                            <img src={`https://i.pravatar.cc/100?img=${img}`} alt={`User ${i}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-2 border-[#222] bg-[#0066b2] flex items-center justify-center text-white text-[10px] md:text-xs lg:text-sm font-bold z-5">
                                        {trustCount}
                                    </div>
                                </div>
                                {/* Scoops */}
                                <div className="absolute top-0 left-full w-8 h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>
                                <div className="absolute top-full left-0 w-8 h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Right Side: Just a Placeholder to allow the background through (Original Left side was 65%) */}
                    <div className="w-full md:w-[65%] relative z-10 h-full">
                        {/* Bottom-Right Tab (Order Now) */}
                        <div className="absolute bottom-0 right-0 z-30">
                            <div className="relative bg-[#EFEFEF] pt-2 pb-1 sm:pt-4 sm:pb-1.5 pl-4 sm:pl-6 md:pl-5 pr-3 sm:pr-4 md:pr-4 rounded-tl-[25px] sm:rounded-tl-[35px] md:rounded-tl-[45px] flex items-center shadow-md">
                                <div className="absolute bottom-0 right-full w-8 h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>
                                <div className="absolute right-0 bottom-full w-8 h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>

                                <button
                                    onClick={onOrderClick}
                                    className="bg-black text-white py-1.5 md:py-3 pl-4 sm:pl-8 pr-1.5 md:pr-2 rounded-full flex items-center gap-3 md:gap-5 text-[10px] sm:text-sm md:text-2xl font-medium tracking-tight transition-all hover:bg-neutral-800 shadow-sm active:scale-95 group"
                                >
                                    Order Now
                                    <div className="bg-white text-black rounded-full p-1 sm:p-1.5 md:p-4 transition-all duration-300 group-hover:bg-[#00a8e8] group-hover:text-white">
                                        <ArrowRight size={12} className="sm:w-3 sm:h-3 md:w-5 md:h-5 -rotate-45" strokeWidth={3} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ShopHeroTemplate;
