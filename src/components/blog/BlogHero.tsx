import React from 'react';
import { ArrowRight, Droplets } from 'lucide-react';

const BlogHero: React.FC = () => {
    const avatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    ];

    return (
        <section className="w-full py-12 px-4 md:px-8 font-josefin">
            <div className="max-w-[1400px] mx-auto">
                {/* Brand Message Heading */}
                <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-dark tracking-tight flex items-center">
                        Pure Water
                        <span className="mx-2 md:mx-4 flex items-center justify-center">
                            <Droplets size={40} className="text-[#007ebb] md:w-16 md:h-16" fill="currentColor" />
                        </span>
                        <span className="bg-[#007ebb] text-white px-4 md:px-6 py-1 md:py-2 rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[10px]">
                            Pure Life
                        </span>
                    </h1>
                </div>

                {/* Main Banner with Scoops */}
                <div className="relative w-full aspect-21/9 min-h-[350px] md:min-h-[500px] rounded-[30px] md:rounded-[40px] overflow-hidden group shadow-2xl">
                    {/* Banner Image */}
                    <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                        alt="Forest and Water"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Dark Overlay for text legibility */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                    {/* Blog Title Overlay */}
                    <div className="absolute bottom-10 left-10 md:bottom-16 md:left-32 z-10">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white/50 tracking-tighter">
                            Blog
                        </h2>
                    </div>

                    {/* Top-Left Scooped Cutout (Avatars) */}
                    <div className="absolute top-0 left-0 bg-[#f4faff] w-48 md:w-64 h-16 md:h-20 rounded-br-[40px] z-20 flex items-center px-6 shadow-sm">
                        {/* Inverted radii for the scoop */}
                        <div className="absolute top-0 -right-[40px] w-[40px] h-[40px] bg-transparent shadow-[-20px_-20px_0_20px_#f4faff] pointer-events-none"></div>
                        <div className="absolute -bottom-[40px] left-0 w-[40px] h-[40px] bg-transparent shadow-[-20px_-20px_0_20px_#f4faff] pointer-events-none"></div>

                        {/* Avatar Stack */}
                        <div className="flex -space-x-4">
                            {avatars.map((avatar, idx) => (
                                <img
                                    key={idx}
                                    src={avatar}
                                    alt="User"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover"
                                />
                            ))}
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00abff] border-2 border-white flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg">
                                15K
                            </div>
                        </div>
                    </div>

                    {/* Bottom-Right Scooped Cutout (Read More Button) */}
                    <div className="absolute bottom-0 right-0 bg-[#f4faff] w-44 md:w-56 h-16 md:h-20 rounded-tl-[40px] z-20 flex items-center justify-center shadow-sm">
                        {/* Read More Button */}
                        <button className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-3 group/btn hover:bg-[#007ebb] transition-all transform hover:scale-105">
                            <span className="text-xs md:text-sm font-bold tracking-wider">Read More</span>
                            <div className="bg-white rounded-full p-1.5 transition-transform group-hover/btn:-rotate-45">
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
