import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopPickCardProps {
    id: number;
    name: string;
    image: string;
    discount?: string;
    categories?: string[];
    description?: string;
    currentPrice?: string;
    originalPrice?: string;
    isDetailed: boolean;
    onToggle: () => void;
}

const TopPickCard: React.FC<TopPickCardProps> = ({
    id,
    name,
    image,
    discount,
    categories = [],
    description,
    currentPrice,
    originalPrice,
    isDetailed,
    onToggle
}) => {
    const navigate = useNavigate();
    if (isDetailed) {
        return (
            <div className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] rounded-[15px] overflow-hidden group shadow-xl bg-white flex flex-col border border-gray-100">
                {/* Image Section - Maintaining Existing Blue Background */}
                <div className="relative h-[50%] bg-[#C8E1EC] overflow-hidden">

                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain p-4 z-10 relative transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Shadow Overlay / Smoke Effect strictly as per design */}
                    <div className="absolute inset-0 z-0 bg-black/50"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent z-0"></div>

                    {/* Discount Badge - Top Left */}
                    <div className="absolute top-4 left-0 z-20">
                        <div className="bg-[#00cc00] text-white text-[12px] font-bold px-4 py-1.5 rounded-r-[5px] shadow-sm uppercase">
                            {discount || "40% OFF"}
                        </div>
                    </div>

                    {/* Wishlist Icon - Top Right */}
                    <button
                        className="absolute top-4 right-4 w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all z-20"
                    >
                        <Heart size={20} className="hover:scale-110 transition-transform" />
                    </button>

                    {/* Podium Layer - Behind Product */}
                    <img
                        src="/assets/home/podium.webp"
                        alt="podium"
                        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[110%] object-contain opacity-40 z-0 pointer-events-none" />
                </div>

                {/* Content Section - Detailed Info */}
                {/* Content Section - Detailed Info */}
                <div className="flex-1 p-4 sm:p-6 px-4 md:pr-8 flex flex-col bg-white rounded-t-[25px] -mt-10 relative z-30">

                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <h3 className="text-xl sm:text-2xl font-semibold text-black font-josefin leading-tight max-w-[85%]">
                            {name}
                        </h3>
                        <button className="text-black hover:text-[#007ebb] transition-transform hover:scale-110 active:scale-90 pr-1">
                            <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Category Tags */}
                    <div className="flex gap-2 mb-4 sm:mb-6">
                        {categories.map((cat, idx) => (
                            <span
                                key={idx}
                                className="bg-[#00A7FF] text-white text-[10px] sm:text-[11px] md:text-[13px] px-2 py-0.5 sm:px-3 sm:py-1 rounded-md font-medium font-josefin"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-black text-[12.5px] sm:text-[13.5px] md:text-[16px] md:pr-2 text-justify leading-relaxed mb-4 sm:mb-6 line-clamp-3 font-josefin">
                        {description}
                    </p>

                    {/* Price Section */}
                    <div className="mt-auto flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] sm:text-[12px] text-gray-500 font-bold uppercase tracking-widest mb-1 font-josefin">PRICE</span>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-xl sm:text-[28px] font-semibold text-black font-josefin leading-none">₹{currentPrice}</span>
                                <span className="text-[13px] sm:text-[15px] text-[#646464] line-through decoration-[#FF0000] font-josefin leading-none opacity-80 pt-0.5 sm:pt-1">₹{originalPrice}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate(`/shop/${id}`)}
                            className="bg-[#007EBB] hover:bg-[#006ca1] text-white px-5 sm:px-8 py-1.5 sm:py-2 rounded-xl font-semibold transition-all transform active:scale-95 shadow-md font-josefin text-xs sm:text-sm"
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] rounded-[15px] overflow-hidden group transition-all duration-500 shadow-lg hover:shadow-2xl">
            {/* Background Layer with Gradient */}
            <div className="absolute inset-0 z-0 bg-[#C8E1EC]"></div>

            {/* Product Name - Top Center */}
            <div className="absolute top-6 md:top-8 left-0 right-0 text-center z-20">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-imperator text-white/50 uppercase px-6">
                    {name}
                </h3>
            </div>

            {/* Discount Badge - Top Left */}
            <div className="absolute top-16 md:top-18 left-0 z-40">
                <div className="bg-[#00cc00] text-white text-[12px] sm:text-[14px] md:text-sm font-semibold px-4 py-1.5 rounded-r-[5px] shadow-lg uppercase tracking-wider">
                    {discount || "40% OFF"}
                </div>
            </div>

            {/* Product Image Container - Center */}
            <div className="absolute inset-0 flex items-center justify-center pt-12 sm:pt-16 pb-8 px-4 sm:px-6 md:px-8 z-10 w-full h-full">
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Podium Layer - Behind Product */}
                    <img
                        src="/assets/home/podium.webp"
                        alt="podium"
                        className="absolute bottom-[-30px] md:bottom-[-120px] lg:bottom-[-40px] w-[110%] md:w-[110%] lg:w-[120%] max-w-none object-contain select-none pointer-events-none opacity-75 z-0" />

                    {/* Product Image - With Enhanced Shadow */}
                    <img
                        src={image}
                        alt={name}
                        className="relative bottom-0 sm:bottom-0 md:bottom-8 lg:bottom-4 z-10 w-[280px] h-[280px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[350px] object-contain group-hover:scale-105 transition-all duration-700 ease-out"
                        style={{
                            filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.25)) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15))'
                        }} />
                </div>
            </div>

            {/* White Gradient Overlay - From Bottom to Top */}
            <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#EAF8FF] via-[#EAF8FF]/80 to-transparent z-30 pointer-events-none rounded-b-[15px]"></div>

            {/* See Details Button - Bottom Center */}
            <div className="absolute bottom-6 md:bottom-4 left-0 right-0 flex justify-center z-40 px-6">
                <button
                    onClick={onToggle}
                    className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] bg-[#007ebb] text-white py-2.5 md:py-3 rounded-full font-bold shadow-xl hover:bg-[#005c8a] transition-all transform hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base flex items-center justify-center gap-2"
                >
                    See Details
                </button>
            </div>
        </div>
    );
};

export default TopPickCard;
