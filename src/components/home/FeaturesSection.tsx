import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Users, MapPin, Clock, ChevronFirst, ChevronLast, ArrowUpRight } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

const stats = [
    {
        value: '22',
        unit: '+',
        label: 'Years of Proven Purification Expertise',
        bg: 'bg-[#f1f1f1]',
        text: 'text-dark',
        icon: <Droplets size={20} />,
        iconBg: 'bg-[#007ebb]',
        iconColor: 'text-white',
    },
    {
        value: '20',
        unit: 'K',
        label: 'Proudly serving 20,000+ satisfied homes and businesses.',
        bg: 'bg-[#f1f1f1]',
        text: 'text-dark',
        icon: <Users size={20} />,
        iconBg: 'bg-[#007ebb]',
        iconColor: 'text-white',
    },
    {
        value: '5',
        unit: '+',
        label: 'Expanding pure water access across multiple states.',
        bg: 'bg-[#f1f1f1]',
        text: 'text-dark',
        icon: <MapPin size={20} />,
        iconBg: 'bg-[#007ebb]',
        iconColor: 'text-white',
    },
    {
        value: '24',
        unit: 'hrs',
        label: 'Quick and reliable support.',
        bg: 'bg-[#333333]',
        text: 'text-white',
        icon: <Clock size={20} />,
        iconBg: 'bg-white',
        iconColor: 'text-dark',
    },
];

const imageSets = [
    {
        layout: 'standard',
        images: [
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1974&auto=format&fit=crop',
        ],
        text: '22 YEARS OF EXPERTISE'
    },
    {
        layout: 'alternate',
        images: [
            'https://images.unsplash.com/photo-1600880212319-78443973a116?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop',
        ],
        text: ''
    },
];

const FeaturesSection: React.FC = () => {
    const { setActiveId } = useHighlight();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate sets for seamless looping
    const scrollingSets = [...imageSets, ...imageSets];

    // Smooth continuous scroll logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let lastTimestamp = 0;
        const scrollSpeed = 0.5; // Pixels per frame

        const step = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            if (!isPaused && scrollContainer) {
                scrollContainer.scrollLeft += scrollSpeed * (delta / 16.67);

                // Seamless loop: when reaches half-way, reset to start
                const halfWidth = scrollContainer.scrollWidth / 2;
                if (scrollContainer.scrollLeft >= halfWidth) {
                    scrollContainer.scrollLeft -= halfWidth;
                }
            }

            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const handleNext = () => {
        if (scrollRef.current) {
            // Best practice: scroll by the approximate width of one item
            const itemWidth = window.innerWidth < 768 ? window.innerWidth - 32 : (window.innerWidth < 1024 ? 600 : 712);
            scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (scrollRef.current) {
            const itemWidth = window.innerWidth < 768 ? window.innerWidth - 32 : (window.innerWidth < 1024 ? 600 : 712);
            scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white py-10 px-4 md:px-8 font-josefin mt-10 mb-16 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Heading Layer */}
                <motion.div
                    // This tells the blue box: "I am visible now, fly to me!"
                    onViewportEnter={() => setActiveId('features-heading')}
                    viewport={{ amount: 0.5 }} // Triggers when half the heading is visible
                    className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12"
                >
                    {/* Use our reusable component here */}
                    <FloatingHighlight
                        id="features-heading"
                        boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-lg"
                        className="text-2xl sm:text-2xl md:text-4xl font-imperator tracking-tight leading-tight px-6 sm:px-8 md:px-4 py-3"
                    >
                        Trusted Purification
                    </FloatingHighlight>

                    <h2 className="text-2xl sm:text-2xl md:text-4xl font-imperator text-dark tracking-tight leading-tight text-center">
                        Smart Technology
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.bg} ${stat.text} p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#007ebb] hover:text-[#ffffff] group border border-black/5`}>
                                <div className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg} ${stat.iconColor} group-hover:bg-white group-hover:text-[#007ebb] transition-all duration-300 shadow-sm`}>
                                    {stat.icon}
                                </div>
                                <div className="mb-3 flex items-baseline gap-1">
                                    <h3 className="text-5xl md:text-6xl font-imperator leading-none group-hover:text-white">
                                        {stat.value}
                                    </h3>
                                    <span className="text-5xl md:text-6xl font-imperator ml-1 group-hover:text-white">
                                        {stat.unit}
                                    </span>
                                </div>
                                <p className="text-sm md:text-lg font-josefin font-medium leading-snug opacity-95 group-hover:opacity-100 max-w-[200px]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Complex Multi-Image Carousel with Continuous Scroll */}
                    <div
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className="relative group rounded-2xl overflow-hidden"
                    >
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto no-scrollbar pointer-events-auto cursor-grab active:cursor-grabbing"
                            style={{ scrollSnapType: 'none' }}
                        >
                            {scrollingSets.map((set, setIndex) => (
                                <div
                                    key={setIndex}
                                    className="w-[calc(100vw-32px)] md:w-[600px] lg:w-[680px] shrink-0 px-2 lg:px-4"
                                >
                                    {set.layout === 'standard' ? (
                                        <div className="relative grid grid-cols-12 gap-4 h-full md:h-[400px]">
                                            {/* Feature 1: Top Banner */}
                                            <div className="col-span-12 relative rounded-2xl overflow-hidden shadow-lg h-[200px]">
                                                <img
                                                    src={set.images[0]}
                                                    alt="Feature Top"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Feature 2: Bottom Row - Left (Small Banner) */}
                                            <div className="col-span-12 md:col-span-7 flex flex-col gap-3 h-[160px]">
                                                <div className="relative rounded-2xl overflow-hidden shadow-md h-full">
                                                    <img
                                                        src={set.images[1]}
                                                        alt="Feature Small"
                                                        className="w-full h-full object-cover" />
                                                </div>
                                            </div>

                                            {/* Feature 3: Bottom Row - Right (Square/Vertical Image) */}
                                            <div className="col-span-12 md:col-span-5 relative rounded-2xl overflow-hidden shadow-md h-[180px] md:h-[200px]">
                                                <img
                                                    src={set.images[2]}
                                                    alt="Feature Square"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative grid grid-cols-12 gap-4 h-full md:h-[450px]">
                                            {/* Feature 1: Large Horizontal Rectangle (Left) */}
                                            <div className="col-span-12 md:col-span-7 relative rounded-2xl overflow-hidden h-[220px] md:h-[380px]">
                                                <img
                                                    src={set.images[0]}
                                                    alt="Feature Rectangle"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/10"></div>
                                            </div>

                                            {/* Feature 2: Stacked Squares (Right) */}
                                            <div className="col-span-12 md:col-span-5 flex flex-col gap-4 h-full">
                                                <div className="relative rounded-2xl overflow-hidden h-[180px] md:h-[calc(50%-8px)]">
                                                    <img
                                                        src={set.images[1]}
                                                        alt="Feature Square 1"
                                                        className="w-full h-full object-cover" />
                                                </div>
                                                <div className="relative rounded-2xl overflow-hidden shadow-md h-[180px] md:h-[calc(50%-8px)]">
                                                    <img
                                                        src={set.images[2]}
                                                        alt="Feature Square 2"
                                                        className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons - Responsive Positioning */}
                        <div className="relative mt-6 pb-8 flex justify-center gap-3 md:absolute md:bottom-4 md:left-6 md:mt-0 md:pb-0 md:justify-start z-30">
                            <button
                                onClick={handlePrev}
                                className="bg-[#EFEFEF] backdrop-blur-sm text-dark p-3 rounded-full hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-105 border border-black/5 shadow-md">
                                <ChevronFirst size={20} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-[#EFEFEF] backdrop-blur-sm text-dark p-3 rounded-full hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-105 border border-black/5 shadow-md">
                                <ChevronLast size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Central Floating Action Button - Positioned exactly at intersection */}
                        <div className="absolute top-[200px] left-[58.33%] -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                            <button className="bg-[#007ebb] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-[#007ebb]/40 pointer-events-auto">
                                <ArrowUpRight size={28} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
