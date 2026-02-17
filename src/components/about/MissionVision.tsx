import React from 'react';
import { Eye, Target } from 'lucide-react';

const MissionVision: React.FC = () => {
    return (
        <section className="w-full bg-[#f4faff] py-16 md:py-24 px-4 md:px-8 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-center gap-4 mb-16 md:mb-20">
                    <span className="text-dark text-4xl md:text-5xl lg:text-5xl font-imperator leading-tight">
                        Our Mission
                    </span>
                    <span className="bg-[#007ebb] text-white px-6 py-2 pt-3 rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] text-4xl md:text-5xl lg:text-5xl font-imperator leading-tight">
                        & Vision
                    </span>
                </div>

                {/* Main Content Area */}
                <div className="relative w-full rounded-[12px] overflow-hidden group">
                    {/* Background Image Container */}
                    <div className="relative h-[500px] md:h-[650px] lg:h-[600px] w-full">
                        <img
                            src="https://images.unsplash.com/photo-1590611380053-da6447021fbb?auto=format&fit=crop&q=80"
                            alt="Family drinking pure water"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Content Blocks - Desktop Overlay */}
                    <div className="absolute inset-0 p-8 md:p-14 lg:p-20 hidden md:flex flex-col justify-between pointer-events-none">
                        {/* Vision Block (Top Left) */}
                        <div className="max-w-md pointer-events-auto">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white rounded-full text-black">
                                    <Eye size={32} />
                                </div>
                                <h3 className="text-3xl font-imperator text-white">Our Vision</h3>
                            </div>
                            <p className="text-white/90 font-jost text-lg leading-relaxed">
                                To create a world where every family enjoys pure, safe, and healthy drinking water — empowering communities with trust, innovation, and sustainability at every drop.
                            </p>
                        </div>

                        {/* Mission Block (Bottom Right) */}
                        <div className="max-w-md self-end pointer-events-auto">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white rounded-full text-black">
                                    <Target size={32} />
                                </div>
                                <h3 className="text-3xl font-imperator text-white">Our Mission</h3>
                            </div>
                            <p className="text-white/90 font-jost text-lg leading-relaxed">
                                At VST, our mission is to deliver advanced and affordable water purification solutions that blend cutting-edge technology with uncompromised quality.
                            </p>
                        </div>
                    </div>

                    {/* Content Blocks - Mobile Stack */}
                    <div className="md:hidden p-6 space-y-6 bg-black/60">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Eye className="text-[#007ebb]" size={24} />
                                <h3 className="text-2xl font-imperator text-white">Our Vision</h3>
                            </div>
                            <p className="text-white/80 font-jost text-base leading-relaxed">
                                To create a world where every family enjoys pure, safe, and healthy drinking water — empowering communities with trust, innovation, and sustainability at every drop.
                            </p>
                        </div>
                        <div className="h-px bg-white/20 w-full" />
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Target className="text-[#007ebb]" size={24} />
                                <h3 className="text-2xl font-imperator text-white">Our Mission</h3>
                            </div>
                            <p className="text-white/80 font-jost text-base leading-relaxed">
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
