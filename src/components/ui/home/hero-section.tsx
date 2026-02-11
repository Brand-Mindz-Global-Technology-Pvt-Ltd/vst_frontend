import React from 'react';
import { ArrowRight, Droplets } from 'lucide-react';

interface HeroProps {
    titleStart?: string;
    titleEnd?: string;
    familyImage?: string;
    productImage?: string;
    trustCount?: string;
    onOrderClick?: () => void;
}

const HeroSectionTemplate: React.FC<HeroProps> = ({
    titleStart = "Pure Water",
    titleEnd = "Pure Life",
    familyImage = "https://images.unsplash.com/photo-1556911220-e150213ff16a?q=80&w=2070&auto=format&fit=crop",
    productImage = "https://images.unsplash.com/photo-1517646281694-3e93d81ca73c?q=80&w=2070&auto=format&fit=crop",
    trustCount = "15K",
    onOrderClick = () => console.log("Order Now clicked"),
}) => {
    return (
        <section className="w-full bg-[#EFEFEF] py-8 md:py-12 px-4 md:px-8 font-outfit">
            {/* Heading Layer */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                <h2 className="text-4xl md:text-7xl font-serif tracking-tight text-dark">
                    {titleStart}
                </h2>
                <div className="relative">
                    <Droplets className="w-8 h-8 md:w-16 md:h-16 text-[#00a8e8] fill-[#00a8e8]" />
                    <div className="absolute inset-0 blur-2xl bg-[#00a8e8]/20 rounded-full"></div>
                </div>
                <div className="bg-[#0066b2] px-6 md:px-12 py-1 md:py-2 rounded-tl-[20px] md:rounded-tl-[40px] rounded-bl-[20px] md:rounded-bl-[40px]">
                    <h2 className="text-4xl md:text-7xl font-serif italic tracking-tight text-white leading-tight">
                        {titleEnd}
                    </h2>
                </div>
            </div>

            {/* Main Banner Container */}
            <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                <div className="flex flex-col md:flex-row bg-[#f1f1f1] rounded-tl-[60px] md:rounded-tl-[100px] rounded-br-[60px] md:rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px] overflow-hidden shadow-xl min-h-[500px] md:min-h-[600px]">

                    {/* Left Side: Family & Trust */}
                    <div className="w-full md:w-[65%] relative overflow-hidden">
                        <img
                            src={familyImage}
                            alt="Happy Family"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Trust Badge - Top Left Floating */}
                        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/10 backdrop-blur-md rounded-full p-1 md:p-1.5 flex items-center gap-2 md:gap-3 border border-white/20 shadow-lg">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white/80 overflow-hidden bg-gray-200">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="user" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white/80 bg-[#0066b2] flex items-center justify-center text-white text-[9px] md:text-xs font-bold shadow-inner">
                                    {trustCount}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Product & Order */}
                    <div className="w-full md:w-[35%] relative bg-linear-to-br from-[#00d2ff] to-[#0066b2] flex flex-col items-center justify-center py-16 px-8">
                        {/* Pedestal Shadow/Effect */}
                        <div className="absolute bottom-12 md:bottom-20 w-[80%] h-32 bg-white/20 backdrop-blur-3xl rounded-[50%] blur-3xl transform -rotate-6 scale-125"></div>

                        {/* Product Image */}
                        <div className="relative z-10 w-full flex justify-center">
                            <img
                                src={productImage}
                                alt="Water Purifier"
                                className="w-full max-w-[260px] md:max-w-[300px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                            />
                        </div>

                        {/* Order Now Button - Floating Bottom Right */}
                        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
                            <button
                                onClick={onOrderClick}
                                className="bg-black text-white px-8 md:px-12 py-4 md:py-6 rounded-full flex items-center gap-6 text-lg md:text-2xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-2xl group"
                            >
                                Order Now
                                <div className="bg-white text-black rounded-full p-2 group-hover:translate-x-1 transition-transform shadow-inner">
                                    <ArrowRight size={24} strokeWidth={3} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Center Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 md:w-60 h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner border border-white/10">
                    <div className="w-1/2 h-full bg-[#00d2ff] rounded-full"></div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      ` }} />
        </section>
    );
};

export default HeroSectionTemplate;
