
import React from 'react';

const BlogDetailHero: React.FC = () => {
    return (
        <section className="w-full pt-8 pb-4 px-4 md:px-8 font-josefin">
            <div className="max-w-[1300px] mx-auto">

                {/* Brand Header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl text-black font-imperator tracking-tight">
                        Pure Water
                    </h1>
                    <div className="flex items-center justify-center relative">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14">
                            <img
                                src="/assets/home/water-droplet.webp"
                                alt="Water Droplet"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 blur-2xl bg-[#00a8e8]/20 rounded-full pointer-events-none"></div>
                        </div>
                    </div>
                    <div className="bg-[#007ebb] text-white pt-3 pb-1 px-2 sm:px-3 md:px-5 rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] text-2xl sm:text-3xl md:text-5xl font-imperator font-medium tracking-tight leading-none">
                        Pure Life
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-1.5 text-gray-600 text-sm md:text-base mb-4 pl-1 font-josefin">
                    <span className="text-dark font-medium">Blog</span>
                    <span className="text-gray-400">&rsaquo;</span>
                    <span className="text-dark font-medium line-clamp-1">
                        Why Every Home Needs a Water Purifier in 2025
                    </span>
                </div>

                {/* Main Banner */}
                <div className="relative rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl w-full group">
                    {/* Responsive aspect ratio: taller on mobile, wide on desktop */}
                    <div className="aspect-4/3 sm:aspect-video md:aspect-21/9 w-full relative">
                        <img
                            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
                            alt="Woman drinking pure water"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* "Main Blog" Badge */}
                    <div className="absolute top-10 sm:top-12 md:top-16 left-0">
                        <div className="bg-[#007ebb] text-white px-5 sm:px-8 md:px-12 py-2 rounded-r-[20px] text-base sm:text-xl md:text-4xl font-medium shadow-lg tracking-wide">
                            Main Blog
                        </div>
                    </div>

                    {/* Author Info - Bottom Right */}
                    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
                        <div className="flex items-center gap-2 md:gap-3">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                                alt="Author"
                                className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-md object-cover"
                            />
                            <span className="text-white font-medium text-xs sm:text-sm md:text-lg drop-shadow-md">
                                Giftson, 4 Years Ago
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BlogDetailHero;
