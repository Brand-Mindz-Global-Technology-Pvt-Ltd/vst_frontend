import React from 'react';
import { Facebook, Instagram, Twitter, Check } from 'lucide-react';

const MeetFounder: React.FC = () => {
    return (
        <section className="w-full bg-white py-16 md:py-24 px-4 md:px-8 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-2 mb-12 md:mb-16">
                    <span className="bg-[#007ebb] text-white px-4 py-1.5 pt-2 rounded-tl-[12px] rounded-bl-[12px] text-2xl md:text-3xl lg:text-4xl font-imperator leading-tight">
                        Meet Our
                    </span>
                    <span className="text-dark text-2xl md:text-3xl lg:text-4xl font-imperator leading-tight">
                        Founder
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Separated Background and Founder Image */}
                    <div className="relative group">
                        <div className="relative w-full aspect-4/5 max-w-[550px] mx-auto rounded-[30px] overflow-hidden shadow-2xl bg-[#f0f7ff]">
                            {/* Background Layer (Blurred Office) */}
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                                alt="Office Background"
                                className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-40"
                            />

                            {/* Founder Image (Foreground) */}
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                                alt="Founder of VST"
                                className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Decorative Icons */}
                        {/* Checkmark Icon Container (Bottom Right) */}
                        <div className="absolute -bottom-4 -right-2 md:right-4 bg-white p-3 rounded-tl-[20px] rounded-br-[20px] shadow-xl z-20">
                            <div className="bg-[#007ebb] text-white p-2 rounded-full">
                                <Check size={28} strokeWidth={3} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="space-y-6 md:space-y-6 max-w-2xl">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-imperator text-dark leading-tight">
                                Founder Name
                            </h2>
                            <p className="text-gray-500 font-jost text-lg md:text-2xl font-medium tracking-wide">
                                Founder of VST
                            </p>
                        </div>

                        <p className="text-dark/80 font-jost text-lg md:text-xl leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>

                        <div className="space-y-8 pt-4">
                            <button className="bg-[#007ebb] text-white px-6 py-2.5 rounded-xl font-jost text-lg font-semibold transition-all duration-300 hover:bg-[#006699] hover:shadow-lg active:scale-95">
                                Get in Touch
                            </button>

                            {/* Social Links - Now below the button */}
                            <div className="flex items-center gap-6 pt-2">
                                <a href="#" className="text-dark/80 hover:text-[#007ebb] transition-all duration-300 hover:-translate-y-1">
                                    <Twitter size={24} />
                                </a>
                                <a href="#" className="text-dark/80 hover:text-[#007ebb] transition-all duration-300 hover:-translate-y-1">
                                    <Facebook size={24} />
                                </a>
                                <a href="#" className="text-dark/80 hover:text-[#007ebb] transition-all duration-300 hover:-translate-y-1">
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetFounder;
