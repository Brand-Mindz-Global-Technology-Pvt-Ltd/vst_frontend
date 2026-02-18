
import React from 'react';
import { MessageCircle, Clock, Share2 } from 'lucide-react';

const BlogDetailHero: React.FC = () => {
    return (
        <section className="w-full bg-[#f8fcfd] pt-8 pb-12 px-4 md:px-8 font-josefin">
            <div className="max-w-[1400px] mx-auto">
                {/* Brand Header - Exact Design Match */}
                <div className="flex items-center justify-center gap-3 mb-10 transform scale-100 md:scale-110">
                    <h1 className="text-4xl md:text-6xl text-black font-imperator tracking-tight">Pure Water</h1>
                    <div className="flex items-center justify-center relative">
                        {/* Water Drop Effect with Layered Shadows/Gradients */}
                        <div className="relative w-10 h-10 md:w-14 md:h-14">
                            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-lg filter" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="dropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#89d4ff" />
                                        <stop offset="50%" stopColor="#00abff" />
                                        <stop offset="100%" stopColor="#005a8d" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="url(#dropGrad)" />
                                {/* Reflection highlight */}
                                <path d="M12 4.5 Q14 7 14 10" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
                            </svg>
                        </div>
                    </div>
                    <div className="bg-[#007ebb] text-white pt-4 pb-1 px-3 md:px-5 rounded-[4px] text-4xl md:text-6xl font-imperator font-medium tracking-tight leading-none">
                        Pure Life
                    </div>
                </div>

                {/* Breadcrumbs - Simple & Clean */}
                <div className="flex items-center gap-2 text-gray-500 text-sm md:text-[25px] mb-4 pl-1 font-josefin">
                    <span className="text-black">Blog</span>
                    <span className="text-black">&gt;</span>
                    <span className="text-black font-medium">Why Every Home Needs a Water Purifier in 2025</span>
                </div>

                {/* Main Banner - The Hero Image */}
                <div className="relative rounded-[20px] overflow-hidden shadow-2xl w-full mb-12 group">
                    <div className="aspect-21/9 w-full relative">
                        <img
                            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
                            alt="Woman drinking pure water"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* "Main Blog" Badge - Pill Shape */}
                    <div className="absolute top-16 left-0">
                        <div className="bg-[#007ebb] text-white px-8 md:px-12 py-3 md:py-2 rounded-r-[20px] text-xl md:text-2xl font-medium shadow-lg tracking-wide">
                            Main Blog
                        </div>
                    </div>

                    {/* Author Info - Bottom Right */}
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Author" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-md object-cover" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <span className="text-white font-medium text-sm md:text-lg drop-shadow-md">Giftson, 4 Years Ago</span>
                        </div>
                    </div>
                </div>

                {/* Post Title & Metadata */}
                <div className="max-w-full mx-auto text-left">
                    <h2 className="text-4xl md:text-6xl font-serif text-black leading-tight mb-6 tracking-tight">
                        Why Every Home Needs a Water Purifier in 2025
                    </h2>

                    <div className="flex flex-wrap items-center justify-end gap-6 md:gap-8">
                        <div className="text-gray-600 font-medium text-lg">
                            12 Mar 2021
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MessageCircle size={22} />
                            <span className="text-lg">3</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={22} />
                            <span className="text-lg">2 Mins</span>
                        </div>
                        <button className="flex items-center gap-2 bg-black text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-colors shadow-lg ml-auto md:ml-4">
                            <Share2 size={18} />
                            <span className="font-bold uppercase tracking-wider text-sm">Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetailHero;
