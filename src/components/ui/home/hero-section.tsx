import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useHighlight } from '../../../context/HighlightContext';
import FloatingHighlight from '../framer/FloatingHighlight';
import { motion } from 'framer-motion';

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
    familyImage = "/home/hero.webp",
    productImage = "https://images.unsplash.com/photo-1517646281694-3e93d81ca73c?q=80&w=2070&auto=format&fit=crop",
    trustCount = "15K",
    onOrderClick = () => console.log("Order Now clicked"),
}) => {

    // 1. Get the control function from our global context
    const { setActiveId } = useHighlight();

    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true); 
            setActiveId('hero-heading'); 
        }, 1000);
        return () => clearTimeout(timer);
    }, [setActiveId]);




    return (
        <section className="w-full bg-[#EFEFEF] py-8 md:py-6 px-4 md:px-8 font-outfit">

            {/* Heading Layer */}
            <motion.div
             onViewportEnter={() => {
                if (isReady) {
                    setActiveId('hero-heading');
                }
            }} className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                <h2 className="text-3xl md:text-6xl font-imperator tracking-tight text-dark">
                    {titleStart}
                </h2>

                <div className="relative">
                    <img
                        src={('./assets/home/water-droplet.webp')}
                        alt="Water Droplet" className="w-8 h-8 md:w-16 md:h-16" />
                    <div className="absolute inset-0 blur-2xl bg-[#00a8e8]/20 rounded-full"></div>
                </div>

                {/* Using the Reusable Component */}
                <FloatingHighlight
                    id="hero-heading"
                    className="text-3xl md:text-6xl font-imperator tracking-tight px-6 md:px-8 py-1 md:py-2 "
                >
                    {titleEnd}
                </FloatingHighlight>
            </motion.div>

            {/* Main Banner Container */}
            {/* Main Banner Container */}
            <div className="max-w-[1500px] mx-auto relative px-4 md:px-0">
                <div className="flex flex-col md:flex-row bg-[#f1f1f1] h-[500px] sm:h-[600px] md:h-[650px] rounded-br-[60px] md:rounded-br-[15px] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] relative overflow-hidden">

                    {/* 1. Full Banner Image (Background) */}
                    <div className=""></div>        <div className="absolute inset-0 z-0">
                        <img src={familyImage} alt="Happy Family" className="w-full h-full object-cover" />
                        {/* Right-to-Left Blue Overlay (#00A7FF) */}
                        <div className="absolute inset-0 bg-gradient-to-l from-[#00A7FF] via-[#00A7FF]/15 to-transparent opacity-90"></div>
                        {/* Subtle dark overlay for contrast */}
                        <div className="absolute inset-0 bg-black/5"></div>
                    </div>

                    {/* 2. Left Side: Content Wrapper (Contains the User's Manual Tab) */}
                    <div className="w-full md:w-[65%] relative z-10 h-full">
                        {/* --- RESPONSIVE TOP-LEFT TAB --- */}
                        <div className="absolute top-0 left-0 z-30">
                            <div className="relative bg-[#EFEFEF] pt-2 pb-2 md:pt-4 md:pb-4 pl-4 md:pl-6 pr-6 md:pr-10 rounded-br-[30px] md:rounded-br-[50px] rounded-tl-[50px] md:rounded-tl-[10px] flex items-center shadow-sm">
                                <div className="flex items-center -space-x-2 md:-space-x-4">
                                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-[2px] border-[#222] overflow-hidden z-[1]">
                                        <img src="https://i.pravatar.cc/100?img=11" alt="U1" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-[2px] border-[#222] overflow-hidden z-[2]">
                                        <img src="https://i.pravatar.cc/100?img=12" alt="U2" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-[2px] border-[#222] overflow-hidden z-[3]">
                                        <img src="https://i.pravatar.cc/100?img=13" alt="U3" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-[2px] border-[#222] overflow-hidden z-[4]">
                                        <img src="https://i.pravatar.cc/100?img=50" alt="U4" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-[2px] border-[#222] bg-[#0066b2] flex items-center justify-center text-white text-[10px] md:text-xs lg:text-sm font-bold z-[5]">
                                        {trustCount}
                                    </div>
                                </div>

                                {/* Responsive Inverted Curves (Scoops) */}
                                <div className="absolute top-0 left-full w-6 h-6 md:w-8 md:w-10 h-6 md:h-8 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>

                                <div className="absolute top-full left-0 w-6 h-6 md:w-8 md:w-10 h-6 md:h-8 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Right Side: Product Showcase & New Bottom-Right Tab */}
                    <div className="w-full md:w-[35%] relative z-20 flex flex-col items-center justify-center py-12 md:py-20 px-6 md:px-8 mt-auto md:mt-0">

                        {/* Responsive Product & Pedestal */}
                        <div className="relative mb-12 sm:mb-20 md:mb-32 flex flex-col items-center w-full group">
                            <img
                                src={productImage}
                                alt="Water Purifier"
                                className="w-[140px] sm:w-[180px] md:w-[220px] z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-[1.03]"
                            />
                            <div className="relative -mt-8 sm:-mt-10 md:-mt-22 w-fit">
                                <div className="w-[140px] sm:w-[180px] md:w-[340px] h-[35px] sm:h-[50px] md:h-[100px] bg-white rounded-[100%] border-b-4 sm:border-b-8 border-gray-300 shadow-2xl z-10 relative"></div>
                                <div className="w-[140px] sm:w-[180px] md:w-[340px] h-[45px] sm:h-[65px] md:h-[110px] bg-gradient-to-b from-white via-gray-100 to-gray-400 -mt-[20px] sm:-mt-[25px] md:-mt-[50px] rounded-b-[40px] sm:rounded-b-[50px] md:rounded-b-[80px] shadow-inner border-x border-gray-100"></div>
                            </div>
                        </div>

                        {/* --- RESPONSIVE BOTTOM-RIGHT CONCAVE TAB --- */}
                        <div className="absolute bottom-0 right-0 z-30">
                            <div className="relative bg-[#EFEFEF] pt-2 pb-1 sm:pt-4 sm:pb-1.5 pl-4 sm:pl-6 md:pl-5 pr-3 sm:pr-4 md:pr-4 rounded-tl-[25px] sm:rounded-tl-[35px] md:rounded-tl-[45px] flex items-center shadow-md">

                                {/* Responsive Mirror Scoops */}
                                <div className="absolute bottom-0 right-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>

                                <div className="absolute right-0 bottom-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>

                                {/* Scalable Order Now Button */}
                                <button
                                    onClick={onOrderClick}
                                    className="bg-black text-white py-1 sm:py-1.5 md:py-3 pl-4 sm:pl-6 md:pl-8 pr-1 sm:pr-1.5 md:pr-2 rounded-full flex items-center gap-2 sm:gap-3 md:gap-5 text-[10px] sm:text-sm md:text-2xl font-medium tracking-tight transition-all hover:bg-neutral-800 shadow-sm active:scale-95 group"
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

                {/* Bottom Center Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 md:w-60 h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner border border-white/10 z-30">
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
