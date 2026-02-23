import React from 'react';
import { Eye, Target } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

const MissionVision: React.FC = () => {
    const { setActiveId } = useHighlight();
    return (
        <section className="w-full bg-[#f4faff] mt-12 mb-12 py-16 md:py-16 px-4 md:px-8 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <motion.div
                    onViewportEnter={() => setActiveId('mission-vision')}
                    viewport={{ amount: 0.5 }}
                    className="flex items-center justify-center gap-4 mb-16 md:mb-8"
                >
                    <span className="text-dark text-2xl md:text-4xl lg:text-4xl font-imperator leading-tight">
                        Our Mission
                    </span>
                    <FloatingHighlight
                        id="mission-vision"
                        className="px-6 py-2 pt-3 text-2xl md:text-4xl lg:text-4xl font-imperator leading-tight"
                        boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px]"
                    >
                        & Vision
                    </FloatingHighlight>
                </motion.div>

                {/* Main Content Area - Unified Responsive Path */}
                <div className="relative w-full overflow-hidden rounded-[10px] shadow-2xl">
                    {/* Background Image Container with Inner Shadows */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1590611380053-da6447021fbb?auto=format&fit=crop&q=80"
                            alt="Family drinking pure water"
                            className="w-full h-full object-cover"
                        />
                        {/* Inner Shadows for depth */}
                        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-linear-to-r from-transparent to-black opacity-60" />
                        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-linear-to-l from-transparent to-black opacity-60" />

                        {/* General dark overlay for text contrast */}
                        <div className="absolute inset-0 bg-black/30 z-0" />
                    </div>

                    {/* Content Layer - Single responsive container */}
                    <div className="relative z-20 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col-reverse md:flex-col justify-between min-h-[500px] md:min-h-[650px] lg:min-h-[550px] gap-12 md:gap-0">

                        {/* VISION BLOCK - Appears Bottom on Mobile, Top-Left on Desktop */}
                        <div className="max-w-md md:self-start group">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-3 bg-white rounded-full text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all group-hover:scale-110 duration-300">
                                    <Eye size={32} />
                                </div>
                                <h3 className="text-3xl font-imperator text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
                                    Our Vision
                                </h3>
                            </div>
                            <p className="text-white/95 font-jost text-base sm:text-lg leading-relaxed drop-shadow-md">
                                To create a world where every family enjoys pure, safe, and healthy drinking water — empowering communities with trust, innovation, and sustainability at every drop.
                            </p>
                        </div>

                        {/* MISSION BLOCK - Appears Top on Mobile, Bottom-Right on Desktop */}
                        <div className="max-w-md md:self-end group">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-3 bg-white rounded-full text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all group-hover:scale-110 duration-300">
                                    <Target size={32} />
                                </div>
                                <h3 className="text-3xl font-imperator text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
                                    Our Mission
                                </h3>
                            </div>
                            <p className="text-white/95 font-jost text-base sm:text-lg leading-relaxed md:text-left drop-shadow-md">
                                At VST, our mission is to deliver advanced and affordable water purification solutions that blend cutting-edge technology with uncompromised quality.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
