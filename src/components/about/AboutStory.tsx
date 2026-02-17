import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';

const AboutStory: React.FC = () => {
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
                <div className="flex items-center justify-center gap-4 mb-12 md:mb-20">
                    <span className="bg-[#007ebb] text-white px-6 py-2.5 rounded-[12px] text-3xl md:text-5xl font-imperator leading-tight">
                        Our Story
                    </span>
                    <span className="text-dark text-3xl md:text-5xl font-imperator leading-tight">
                        Our Success
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-imperator text-dark leading-tight tracking-tight">
                            Driven by <span className="text-[#007ebb]">Trust</span>,<br />
                            <span className="text-[#007ebb]">Sustained</span> by Service
                        </h2>

                        <div className="space-y-6 text-gray-700 text-base md:text-lg font-jost leading-relaxed max-w-xl">
                            <p>
                                Our journey is not just about products; it's about people. The trust of our customers drives us to innovate and deliver solutions that truly make a difference. With a strong service network and customer-first philosophy, we continue to redefine purity, performance, and peace of mind.
                            </p>
                            <p>
                                Our journey is not just about products; it's about people. The trust of our customers drives us to innovate and deliver solutions that truly make a difference. With a strong service network and customer-first philosophy, we continue to redefine purity, performance, and peace of mind.
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Image & Overlays */}
                    <div className="relative">
                        {/* Main Image Container */}
                        <div className="relative rounded-[40px] overflow-hidden lg:h-[550px]">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                                alt="Our Story Team"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Stats Box Card Container */}
                        <div className="absolute -bottom-8 md:-bottom-12 -left-4 md:-left-8 z-20">
                            <div className="relative">
                                {/* Thumbs Up Badge - Positioned at Top Right of Content Box */}
                                <div className="absolute -top-6 -right-6 z-30">
                                    <div className="bg-[#007ebb] text-white p-4 md:p-6 rounded-full shadow-2xl shadow-blue-900/40">
                                        <ThumbsUp size={24} strokeWidth={2.5} className="md:w-8 md:h-8" />
                                    </div>
                                </div>

                                {/* Content Box */}
                                <div className="bg-[#f0f2f5] p-8 md:p-12 pb-12 md:pb-16 rounded-[30px] md:rounded-[40px] shadow-lg min-w-[200px] md:min-w-[280px]">
                                    <div className="min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center text-center space-y-2">
                                        <h3 className="text-5xl md:text-7xl font-imperator text-dark font-medium leading-none transition-all duration-500 transform">
                                            {statsData[activeIndex].value}
                                        </h3>
                                        <p className="text-gray-600 font-jost text-sm md:text-base leading-tight font-medium max-w-[150px] transition-all duration-500">
                                            {statsData[activeIndex].label}
                                        </p>
                                    </div>


                                    {/* Progress Bar at Bottom */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] max-w-[200px]">
                                        <div className="relative h-1.5 bg-gray-300 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-[#007ebb] rounded-full transition-all duration-500"
                                                style={{ width: `${((activeIndex + 1) / statsData.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutStory;
