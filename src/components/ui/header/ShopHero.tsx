import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ShopHeroProps {
    bannerImage?: string;
    trustCount?: string;
    onOrderClick?: () => void;
}

const ShopHero: React.FC<ShopHeroProps> = ({
    bannerImage = "/assets/Images/shop_banner.png",
    trustCount = "15K",
    onOrderClick = () => console.log("Order Now clicked"),
}) => {
    return (
        <section className="w-full bg-[#EFEFEF] py-6 md:py-12 px-4 md:px-8 font-outfit">
            <div className="max-w-[1500px] mx-auto">
                {/* Main Outer Container */}
                <div className="relative rounded-[50px] md:rounded-[80px] overflow-hidden shadow-2xl aspect-video md:aspect-21/9 lg:aspect-[2.4/1] bg-white">

                    {/* Background Banner Image */}
                    <img
                        src={bannerImage}
                        alt="Shop Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Gradient Overlays */}
                    {/* Subtle left darkening */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-transparent pointer-events-none"></div>
                    {/* Right side blue gradient as per screenshot */}
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-[#00d2ff]/80 via-[#00d2ff]/20 to-transparent pointer-events-none"></div>

                    {/* TOP-LEFT CUTOUT (Trust Badge) */}
                    <div className="absolute top-0 left-0 z-20">
                        {/* The White Notch Background */}
                        <div className="bg-[#EFEFEF] pr-8 pb-8 md:pr-14 md:pb-14 rounded-br-[50px] md:rounded-br-[80px] relative">
                            {/* Inverted Corner Curves for Top-Left Notch */}
                            <div className="absolute top-0 -right-[40px] md:-right-[80px] w-[40px] md:w-[80px] h-[40px] md:h-[80px] bg-[#EFEFEF]"
                                style={{ clipPath: 'path("M 100 0 A 100 100 0 0 0 0 100 L 0 0 Z")' }}>
                            </div>
                            <div className="absolute -bottom-[40px] md:-bottom-[80px] left-0 w-[40px] md:w-[80px] h-[40px] md:h-[80px] bg-[#EFEFEF]"
                                style={{ clipPath: 'path("M 0 100 A 100 100 0 0 0 100 0 L 0 0 Z")' }}>
                            </div>

                            {/* Trust Badge Pill */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-full p-1.5 flex items-center gap-2 border border-white/20 shadow-lg ml-2 mt-2">
                                <div className="flex -space-x-2 md:-space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 25}`} alt="user" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white bg-[#0066b2] flex items-center justify-center text-white text-[9px] md:text-sm font-bold shadow-inner">
                                        {trustCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

  
{/* BOTTOM-RIGHT CUTOUT (Match Reference Exactly) */}
<div className="absolute bottom-0 right-0 z-30">

  <div className="bg-[#EFEFEF] rounded-tl-[60px] pl-5 pt-5 pr-3 pb-3">

    <button
      onClick={onOrderClick}
      className="bg-black text-white pl-8 pr-4 py-3 rounded-full flex items-center gap-6 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
    >
      <span className="text-lg md:text-2xl font-light tracking-wide">
        Order Now
      </span>

      <div className="bg-white text-black rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
        <ArrowUpRight size={22} strokeWidth={2.5} />
      </div>
    </button>

  </div>
</div>

            </div>
            </div>
        </section>
    );
};

export default ShopHero;
