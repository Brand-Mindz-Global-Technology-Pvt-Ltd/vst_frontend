import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

const AboutStory: React.FC = () => {
    const { setActiveId } = useHighlight();
    const [activeIndex, setActiveIndex] = useState(0);

    const statsData = [
        { value: "23+", label: "Years of Proven Purification Expertise" },
        { value: "15K+", label: "Happy Customers Globally Served" },
        { value: "200+", label: "Industrial Projects Successfully Done" },
        { value: "100%", label: "Pure Water Quality Guarantee" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % statsData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [statsData.length]);

    return (
        <section className="w-full bg-white py-12 md:py-20 px-4 md:px-8 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <motion.div
                    onViewportEnter={() => setActiveId('about-story')}
                    viewport={{ amount: 0.5 }}
                    className="flex items-center justify-center gap-4 mb-12 md:mb-16"
                >
                    <FloatingHighlight
                        id="about-story"
                        className="px-6 py-2.5 text-2xl md:text-4xl font-imperator leading-tight"
                        boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px]"
                    >
                        Our Story
                    </FloatingHighlight>
                    <span className="text-dark text-2xl md:text-4xl font-imperator leading-tight">
                        Our Success
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Content Area */}
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-imperator text-dark leading-tight tracking-tight">
                            Our <span className="text-[#007ebb]">Story</span>
                        </h2>

                        <div className="space-y-6 text-gray-700 text-base md:text-lg font-jost leading-relaxed max-w-xl text-justify">
                            <p>
                                We started VST with a simple mission to provide clean and safe drinking water for everyone. Understanding that water quality differs from place to place, we focus on delivering customized purification solutions that truly meet each need.
                            </p>
                            <p>
                                From homes to offices and industries, our systems are designed for reliability, performance, and long-term use. With a strong commitment to quality and innovation, we continue to improve everyday lives through better water.
                            </p>
                        </div>
                    </div>

                    {/* Right Content Area - Image & Stats Card */}
                    <div className="relative">
                        <div className="relative w-full">
                            {/* Main Image Container */}
                            <div className="relative rounded-[25px] overflow-hidden border-4 md:border-10 border-white shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                                    alt="Our Story Team"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            {/* --- STATS BOX (Positioned Bottom Left) --- */}
                            <div className="absolute bottom-0 left-0 z-20">
                                <div className="relative bg-white p-2 md:p-5 rounded-tr-[40px] md:rounded-tr-[60px] flex flex-col items-center justify-center min-w-[160px] md:min-w-[360px]">

                                    {/* --- SCOOP CORNERS (Inverted Curves) --- */}

                                    {/* Top-Left Scoop (Above the card) */}
                                    <div className="absolute bottom-full left-0 w-8 h-8 md:w-16 md:h-16 overflow-hidden pointer-events-none">
                                        <div className="w-full h-full rounded-bl-[15px] md:rounded-bl-[35px] shadow-[-10px_10px_0_0_white] md:shadow-[-20px_20px_0_0_white]"></div>
                                    </div>

                                    {/* Bottom-Right Scoop (To the right of the card) */}
                                    <div className="absolute bottom-0 left-full w-8 h-8 md:w-16 md:h-16 overflow-hidden pointer-events-none">
                                        <div className="w-full h-full rounded-bl-[15px] md:rounded-bl-[35px] shadow-[-10px_10px_0_0_white] md:shadow-[-20px_20px_0_0_white]"></div>
                                    </div>

                                    {/* Thumbs Up Badge - Floating at top-right corner of card */}
                                    <div className="absolute -top-5 -right-5 md:-top-10 md:-right-8 z-30">
                                        <div className="bg-[#007ebb] text-white w-12 h-12 md:w-28 md:h-28 rounded-full shadow-2xl flex items-center justify-center border-4 md:border-10 border-white">
                                            <ThumbsUp size={20} strokeWidth={2.5} className="md:w-14 md:h-14 text-white fill-white" />
                                        </div>
                                    </div>

                                    {/* Inner Gray Content Box - Highly compact on mobile */}
                                    <div className="bg-[#f2f4f7] w-full py-5 md:py-14 px-3 md:px-10 rounded-[20px] md:rounded-[45px] flex flex-col items-center justify-center text-center">
                                        <h3 className="text-3xl md:text-[65px] font-imperator text-dark font-medium leading-none tracking-tight">
                                            {statsData[activeIndex].value}
                                        </h3>
                                        <p className="text-dark font-josefin text-[10px] md:text-[22px] leading-tight font-medium max-w-[110px] md:max-w-[280px] mt-1.5 md:mt-4">
                                            {statsData[activeIndex].label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar Container - Positioned at bottom-left area of the column */}
                        <div className="w-full max-w-[200px] md:max-w-[300px]">
                            <div className="h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#007ebb] rounded-full transition-all duration-700 ease-in-out"
                                    style={{ width: `${((activeIndex + 1) / statsData.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutStory;
