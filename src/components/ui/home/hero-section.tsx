import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useHighlight } from '../../../context/HighlightContext';
import FloatingHighlight from '../framer/FloatingHighlight';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideData {
    titleStart: string;
    titleEnd: string;
    familyImage: string;
    productImage: string;
    trustCount: string;
    overlayColor?: string;
}

interface HeroProps {
    slides: SlideData[];
    onOrderClick?: () => void;
}

const HeroSectionTemplate: React.FC<HeroProps> = ({
    slides,
    onOrderClick = () => console.log("Order Now clicked"),
}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [rotationY, setRotationY] = React.useState(0);
    const { setActiveId } = useHighlight();

    // Update highlight context when slide changes
    const [isReady, setIsReady] = React.useState(false);

    // Auto-scroll, Readiness, and Highlight synchronization
    React.useEffect(() => {
        // Initial 2s delay to set component as ready (to match the intro highlight delay)
        let readyTimer: ReturnType<typeof setTimeout> | undefined;
        if (!isReady) {
            readyTimer = setTimeout(() => setIsReady(true), 2000);
        }

        // 4s interval for auto-sliding
        const scrollTimer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
            setRotationY((prev) => prev + 180);
        }, 4000);

        return () => {
            if (readyTimer) clearTimeout(readyTimer);
            clearInterval(scrollTimer);
        };
    }, [currentIndex, slides.length, isReady]);

    const currentSlide = slides[currentIndex];

    return (
        <section className="w-full bg-[#EFEFEF] py-8 md:py-6 px-4 md:px-8 font-outfit overflow-hidden">

            {/* Heading Layer */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                <motion.h2
                    key={`title-start-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-imperator tracking-tight text-dark md:pt-4"
                >
                    {currentSlide.titleStart}
                </motion.h2>

                <motion.div
                    onViewportEnter={() => {
                        if (isReady) {
                            setActiveId('hero-heading');
                        }
                    }}
                    className="flex items-center gap-2 md:gap-4"
                >
                    <div className="relative">
                        <img
                            src={'./assets/home/water-droplet.webp'}
                            alt="Water Droplet"
                            className="w-8 h-8 md:w-16 md:h-16"
                        />
                        <div className="absolute inset-0 blur-2xl bg-[#00a8e8]/20 rounded-full"></div>
                    </div>

                    <FloatingHighlight
                        id="hero-heading"
                        className="text-3xl md:text-5xl  font-imperator tracking-tight md:pt-4 px-6 md:px-8 py-1 md:py-2"
                    >
                        {currentSlide.titleEnd}
                    </FloatingHighlight>
                </motion.div>
            </div>

            {/* Main Banner Container */}
            <div className="max-w-[1400px] mx-auto relative px-4 md:px-0">
                <div className="flex flex-col md:flex-row bg-[#f1f1f1] h-[550px] sm:h-[600px] md:h-[650px] rounded-br-[60px] md:rounded-br-[15px] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] relative overflow-hidden">

                    {/* Background Images Layer */}
                    <div className="absolute inset-0 z-0">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={currentSlide.familyImage}
                                alt="Background"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        {/* Right-to-Left Dynamic Overlay */}
                        <motion.div
                            animate={{
                                background: `linear-gradient(to left, ${currentSlide.overlayColor || '#00A7FF'}, ${currentSlide.overlayColor || '#00A7FF'}59, transparent)`
                            }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 z-0 opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/5"></div>
                    </div>

                    {/* Left Side: Content Wrapper */}
                    <div className="w-full md:w-[60%] relative z-10 h-full">
                        {/* TOP-LEFT TAB */}
                        <div className="absolute top-0 left-0 z-30">
                            <div className="relative bg-[#EFEFEF] pt-2 pb-2 md:pt-4 md:pb-4 pl-4 md:pl-6 pr-6 md:pr-10 rounded-br-[30px] md:rounded-br-[50px] rounded-tl-[10px] flex items-center shadow-sm">
                                <div className="flex items-center -space-x-2 md:-space-x-4">
                                    {[11, 12, 13, 50].map((imgId, idx) => (
                                        <div key={idx} className={`w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-2 border-[#222] overflow-hidden z-${idx + 1}`}>
                                            <img src={`https://i.pravatar.cc/100?img=${imgId}`} alt={`U${idx}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border-[1.5px] md:border-2 border-[#222] bg-[#0066b2] flex items-center justify-center text-white text-[10px] md:text-xs lg:text-sm font-bold z-5">
                                        {currentSlide.trustCount}
                                    </div>
                                </div>

                                {/* Inverted Curves */}
                                <div className="absolute top-0 left-full w-6 h-6 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>
                                <div className="absolute top-full left-0 w-6 h-6 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Product & Podium */}
                    <div className="w-full md:w-[45%] relative z-20 flex flex-col items-center justify-end mt-auto md:mt-0 pb-12 md:pb-8 lg:pb-12 overflow-visible px-4 md:px-0">

                        {/* THE PODIUM SYSTEM */}
                        <div className="relative w-full flex flex-col items-center justify-end scale-75 md:scale-[0.85] lg:scale-100">

                            {/* 3D CONTAINER: High perspective makes it look like a label spin */}
                            <div className="relative z-30 mb-[-60px] lg:mb-[-80px]" style={{ perspective: '2000px' }}>
                                <motion.div
                                    key="spinning-product"
                                    animate={{ rotateY: rotationY }}
                                    transition={{
                                        duration: 1.9,
                                        ease: [0.22, 1, 0.36, 1] // "Quintic" easing for that smooth high-end look
                                    }}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        width: '320px',
                                        height: '450px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    {/* FRONT FACE: Visible on even rotations (0, 360, 720...) */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'rotateY(0deg) translateZ(120px)',
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={((rotationY / 180) % 2 === 0)
                                                ? slides[currentIndex].productImage
                                                : slides[(currentIndex + 1) % slides.length].productImage
                                            }
                                            alt="Product Front"
                                            className="max-h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]"
                                        />
                                    </div>

                                    {/* BACK FACE: Visible on odd rotations (180, 540, 900...) */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg) translateZ(150px)',
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={((rotationY / 180) % 2 !== 0)
                                                ? slides[currentIndex].productImage
                                                : slides[(currentIndex + 1) % slides.length].productImage
                                            }
                                            alt="Product Back"
                                            className="max-h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Podium Body (Keep this simple so it doesn't distract from the spin) */}
                            <div className="relative w-[320px] sm:w-[380px] md:w-[340px] lg:w-[380px]">
                                {/* Top Surface */}
                                <div className="w-full h-[70px] bg-white rounded-[100%] border-b-[6px] border-gray-200/50 shadow-[0_15px_30px_rgba(0,0,0,0.1)] relative z-20"></div>
                                {/* Curved Base */}
                                <div className="w-full h-[60px] bg-linear-to-b from-white via-gray-100 to-gray-300 rounded-b-[120px] -mt-[35px] border-x border-gray-200 shadow-inner z-10"></div>
                            </div>
                        </div>

                        {/* --- ORDER NOW BUTTON TAB --- */}
                        <div className="absolute bottom-0 right-0 z-40">
                            <div className="relative bg-[#EFEFEF] pt-6 pb-2 pl-6 pr-4 rounded-tl-[40px] shadow-[-10px_-10px_20px_rgba(0,0,0,0.05)] flex items-center">

                                {/* Mirror Scoops for the Tab */}
                                <div className="absolute bottom-0 right-full w-10 h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[30px] shadow-[15px_15px_0_0_#EFEFEF]"></div>
                                </div>
                                <div className="absolute right-0 bottom-full w-10 h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[30px] shadow-[15px_15px_0_0_#EFEFEF]"></div>
                                </div>

                                <button
                                    onClick={onOrderClick}
                                    className="bg-black text-white py-2 pl-6 pr-1.5 rounded-full flex items-center gap-4 text-lg md:text-xl font-medium transition-all hover:bg-neutral-800 active:scale-95 group"
                                >
                                    Order Now
                                    <div className="bg-white text-black rounded-full p-2 transition-all duration-300 group-hover:bg-[#00a8e8] group-hover:text-white">
                                        <ArrowRight size={18} className="-rotate-45" strokeWidth={3} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Pagination (Cumulative Segmented Progress Bar) */}
                <div className="absolute bottom-0 left-24 md:bottom-6 md:left-1/2 md:-translate-x-1/2 w-32 md:w-48 h-1 md:h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm z-30 flex">
                    {slides.map((_, index) => (
                        <div key={index} className="flex-1 relative h-full bg-white/10">
                            {/* Previous segments already filled */}
                            {currentIndex > index && (
                                <motion.div
                                    initial={{ backgroundColor: '#00d2ff' }} // Default initial color
                                    animate={{ backgroundColor: currentSlide.overlayColor || '#00d2ff' }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0"
                                />
                            )}
                            {/* Current segment filling */}
                            {currentIndex === index && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: "100%",
                                        backgroundColor: currentSlide.overlayColor || '#00d2ff'
                                    }}
                                    transition={{
                                        width: { duration: 4, ease: "linear" },
                                        backgroundColor: { duration: 0.8 }
                                    }}
                                    className="absolute inset-0"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSectionTemplate;
