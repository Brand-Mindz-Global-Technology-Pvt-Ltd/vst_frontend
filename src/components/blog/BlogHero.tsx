import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

const BlogHero: React.FC = () => {
    const { setActiveId } = useHighlight();
    const avatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    ];

    return (
        <section className="w-full py-12 px-4 md:px-8 font-josefin">
            <div className="max-w-[1400px] mx-auto">

                <motion.div
                    onViewportEnter={() => setActiveId('blog-hero')}
                    viewport={{ amount: 0.5 }}
                    className="flex items-center justify-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-imperator text-dark tracking-tight flex items-center gap-1 md:gap-2">
                        <span>Pure Water</span>
                        <span className="flex items-center justify-center px-1 md:px-2">
                            <img
                                src="/assets/home/water-droplet.webp"
                                alt="Droplet" className="w-10 h-10 md:w-16 md:h-16 object-contain translate-y-[-2px]" />
                        </span>
                        <FloatingHighlight
                            id="blog-hero"
                            className="text-white px-5 md:px-8 py-2 md:py-3 leading-none text-3xl md:text-5xl lg:text-5xl"
                            boxClassName="rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[10px]"
                        >
                            Pure Life
                        </FloatingHighlight>
                    </h1>
                </motion.div>

                {/* Main Banner with Scoops */}
                <div className="relative w-full h-[300px] sm:h-[350px] md:h-[500px] rounded-[30px] md:rounded-[50px] overflow-hidden group">
                    {/* Banner Image */}
                    <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                        alt="Forest and Water"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Dark Overlay for text legibility */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                    {/* Blog Title Overlay */}
                    <div className="absolute bottom-10 left-10 md:bottom-16 md:left-28 z-10">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-imperator text-white/40">
                            Blog
                        </h2>
                    </div>

                    {/* Top-Left Scooped Cutout (Avatars) */}
                    <div className="absolute top-0 left-0 bg-[#EFEFEF] pt-2 pb-2 md:pt-4 md:pb-4 pl-4 md:pl-6 pr-6 md:pr-10 rounded-br-[30px] md:rounded-br-[50px] z-20 flex items-center shadow-sm">
                        {/* Inverted radii for the scoop */}
                        <div className="absolute top-0 left-full w-6 h-6 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                            <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                        </div>
                        <div className="absolute top-full left-0 w-6 h-6 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                            <div className="w-full h-full rounded-tl-[20px] md:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                        </div>

                        {/* Avatar Stack */}
                        <div className="flex -space-x-4">
                            {avatars.map((avatar, idx) => (
                                <img
                                    key={idx}
                                    src={avatar}
                                    alt="User"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#222] object-cover"
                                />
                            ))}
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00abff] border-2 border-[#222] flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg">
                                15K
                            </div>
                        </div>
                    </div>

                    {/* Bottom-Right Scooped Cutout (Read More Button) */}
                    <div className="absolute bottom-0 right-0 bg-[#EFEFEF] pt-6 pb-2 pl-10 pr-4 rounded-tl-[30px] md:rounded-tl-[50px] z-20 flex items-center justify-center shadow-sm">

                        {/* Inverted radii for the scoop */}
                        <div className="absolute bottom-0 right-full w-6 h-6 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                            <div className="w-full h-full rounded-br-[20px] md:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                        </div>
                        <div className="absolute bottom-full right-0 w-6 h-6 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                            <div className="w-full h-full rounded-br-[20px] md:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                        </div>

                        {/* Read More Button */}
                        <button className="bg-black text-white mr-2 md:mr-4 px-4 py-2 rounded-full flex items-center gap-3 group/btn hover:bg-[#007ebb] transition-all transform active:scale-95">
                            <span className="font-josefin text-xs md:text-sm font-medium tracking-wider">Read More</span>
                            <div className="bg-white rounded-full p-2 transition-transform group-hover/btn:-rotate-45">
                                <ArrowRight size={14} className="text-black" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
