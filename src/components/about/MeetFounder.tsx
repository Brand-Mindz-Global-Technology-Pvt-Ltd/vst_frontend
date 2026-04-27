import React from 'react';
import { Check } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

const MeetFounder: React.FC = () => {
    const { setActiveId } = useHighlight();
    return (
        <section className="w-full bg-white py-16 md:py-12 px-4 md:px-8 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    onViewportEnter={() => setActiveId('meet-founder')}
                    viewport={{ amount: 0.5 }}
                    className="flex items-center justify-center gap-2 mb-4 md:mb-4"
                >
                    <FloatingHighlight
                        id="meet-founder"
                        className="px-4 py-1.5 pt-2 text-2xl md:text-3xl lg:text-4xl font-imperator leading-tight"
                        boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[12px]"
                    >
                        Meet Our
                    </FloatingHighlight>
                    <span className="text-dark text-2xl md:text-3xl lg:text-4xl font-imperator leading-tight">
                        Founder
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Separated Background and Founder Image with Overflow */}
                    <div className="relative group pt-4 md:pt-4 lg:pt-4">
                        {/* Background Container Box */}
                        <div className="absolute inset-x-0 bottom-0 top-20 md:top-28 lg:top-24 w-full max-w-[550px] mx-auto rounded-[40px] md:rounded-[60px] overflow-hidden bg-[#EFEFEF]">
                            {/* Background Layer (Blurred Office) */}
                            <img
                                src="/public/assets/about/subtract.png"
                                alt="Office Background"
                                className="absolute inset-0 w-full h-full object-cover opacity-100 scale-110"
                            />
                        </div>

                        {/* Founder Image (Overflowing Top) */}
                        <div className="relative z-10 w-full aspect-3/4 max-w-[550px] mx-auto px-4 md:px-0">
                            <img
                                src="/public/assets/about/founder.png"
                                alt="Founder of VST"
                                className="w-full h-full object-contain object-bottom drop-shadow-3xl"
                            />
                        </div>

                        {/* Checkmark Badge Container (Bottom Right Cutout) */}
                        <div className="absolute bottom-0 right-0 md:right-13 lg:right-11 z-20">
                            <div className="bg-white p-2 md:p-4 pt-4 md:pt-8 pl-4 md:pl-8 rounded-tl-[40px] md:rounded-tl-[60px] relative shadow-[-4px_-4px_10px_rgba(0,0,0,0.02)]">
                                {/* Responsive Inverted Curves (Scoops) - Corner design like hero banner */}
                                <div className="absolute bottom-0 right-full w-8 h-8 md:w-14 md:h-14 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[25px] md:rounded-br-[45px] shadow-[15px_15px_0_0_white]"></div>
                                </div>
                                <div className="absolute right-0 bottom-full w-8 h-8 md:w-14 md:h-14 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[25px] md:rounded-br-[45px] shadow-[15px_15px_0_0_white]"></div>
                                </div>

                                {/* Checkmark Badge */}
                                <div className="bg-[#007ebb] text-white p-4 md:p-6 rounded-full shadow-xl shadow-blue-900/20 flex items-center justify-center">
                                    <Check size={28} strokeWidth={3} className="md:w-10 md:h-10 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="space-y-6 md:space-y-6 max-w-2xl">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-imperator text-dark leading-tight">
                                Founder Name
                            </h2>
                            <p className="text-gray-500 font-jost text-lg md:text-2xl font-medium tracking-wide">
                                Founder of VST
                            </p>
                        </div>

                        <div className="relative">
                            <div className="space-y-6">
                                <p className="text-dark font-jost font-normal text-justify text-lg md:text-xl leading-relaxed relative z-10">
                                    At VST, we believe that access to pure and safe water is a basic right for everyone. Our journey began with the vision of building trust and providing dependable solutions, not just selling products.
                                </p>
                                <p className="text-dark font-jost font-normal text-justify text-lg md:text-xl leading-relaxed relative z-10">
                                    Over the years, seeing the positive impact on families and businesses has been our greatest motivation. We remain committed to delivering high-quality, reliable systems that customers can depend on every day. Thank you for trusting us.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 pt-4">
                            <button className="bg-[#007ebb] text-white px-8 py-2 rounded-xl font-jost text-lg font-medium transition-all duration-300 hover:bg-[#006699] hover:shadow-lg active:scale-95">
                                Get in Touch
                            </button>

                            {/* Social Links - Now below the button */}
                            <div className="flex items-center gap-6 pt-2">
                                <a href="#" aria-label="X (Twitter)" className="text-dark/80 hover:text-[#007ebb] transition-all duration-300 hover:-translate-y-1">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.292 19.487h2.039L6.486 3.24H4.298l13.311 17.399z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Facebook" className="text-dark/80 hover:text-[#007ebb] transition-all duration-300 hover:-translate-y-1">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="text-dark/80 hover:text-[#007ebb] transition-all duration-300 hover:-translate-y-1">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.981-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.01 4.01 0 110-8.019 4.01 4.01 0 010 8.019zm7.846-10.405a1.441 1.441 0 11-2.881 0 1.441 1.441 0 012.881 0z" />
                                    </svg>
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
