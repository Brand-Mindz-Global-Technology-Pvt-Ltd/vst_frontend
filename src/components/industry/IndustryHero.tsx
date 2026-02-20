import React from 'react';
import { ArrowRight } from 'lucide-react';

interface IndustryHeroProps {
    title?: string;
    image?: string;
    logoText1?: string;
    logoText2?: string;
    logoIcon?: string;
    avatars?: string[];
}

const IndustryHero: React.FC<IndustryHeroProps> = ({
    image = "/assets/home/water-droplet.webp", // Replace with appropriate image if available, else placeholder
    logoText1 = "Pure Water",
    logoText2 = "Pure Life",
    logoIcon = "/assets/home/water-droplet.webp",
    avatars = []
}) => {
    return (
        <section className="w-full bg-[#EFEFEF] pt-8 pb-12 md:pb-12 lg:pb-16 font-outfit">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12">

                {/* 1. Header Logo / Slogan Section */}
                <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-8 md:mb-10">
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-imperator font-medium text-dark tracking-tight">
                        {logoText1}
                    </h2>

                    {/* Water Drop Icon */}
                    <div className="relative w-10 h-10 sm:w-16 md:w-20 flex items-center justify-center">
                        <img src={logoIcon} alt="Water Drop" className="w-[60px] sm:w-[100px] md:w-[120px] h-auto object-contain" />
                    </div>

                    <div className="bg-[#007ebb] px-3 sm:px-6 py-1 sm:py-2 rounded-[5px]">
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-imperator font-medium text-white tracking-tight leading-none">
                            {logoText2}
                        </h2>
                    </div>
                </div>

                {/* 2. Main Banner Wrapper */}
                <div className="relative w-full">

                    {/* Banner Image Container with inverted corners */}
                    <div
                        className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] shadow-2xl shadow-blue-900/10 group"
                        style={{
                            borderRadius: '40px',
                            overflow: 'hidden',
                        }}>

                        {/* Banner Image */}
                        <img
                            src={image}
                            alt="Industry Banner"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Dark Overlay for Text Legibility and Blue side shadows */}
                        <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent">
                            {/* Blue Shadow on left and right sides */}
                            <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-[#007ebb]/80 to-transparent md:w-1/3 mix-blend-multiply opacity-80" />
                            <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-[#007ebb]/80 to-transparent md:w-1/3 mix-blend-multiply opacity-80" />
                        </div>

                        {/* Top-Left Avatar Cutout */}
                        <div className="absolute top-0 left-0 z-20">
                            <div className="bg-[#EFEFEF] pt-2 pb-4 sm:pb-5 px-4 sm:px-6 rounded-br-[35px] sm:rounded-br-[40px] md:rounded-br-[45px] relative">
                                {/* Responsive Inverted Curves (Scoops) */}
                                <div className="absolute top-0 left-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] sm:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>

                                <div className="absolute top-full left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-tl-[20px] sm:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#EFEFEF]"></div>
                                </div>

                                {/* Avatar Pile */}
                                <div className="flex items-center -space-x-2 md:-space-x-4">
                                    {(avatars.length > 0 ? avatars : [
                                        "/assets/home/avatar1.webp",
                                        "/assets/home/avatar2.webp",
                                        "/assets/home/avatar3.webp",
                                        "/assets/home/avatar4.webp"
                                    ]).map((avatar, i) => (
                                        <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white overflow-hidden shadow-sm bg-gray-200">
                                            <img
                                                src={avatar}
                                                alt={`User ${i + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback image if local avatar not found
                                                    (e.target as HTMLImageElement).src = `https://i.pravatar.cc/150?u=${i + 20}`;
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-[#007ebb] flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold shadow-sm z-10 relative">
                                        15K
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom-Right Enquiry Cutout */}
                        <div className="absolute bottom-0 right-0 z-20">
                            <div className="bg-[#EFEFEF] pt-4 sm:pt-6 pl-6 sm:pl-8 pb-3 sm:pb-4 pr-3 sm:pr-4 rounded-tl-[35px] sm:rounded-tl-[40px] md:rounded-tl-[45px] relative">
                                {/* Responsive Mirror Scoops */}
                                <div className="absolute bottom-0 right-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>

                                <div className="absolute right-0 bottom-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>

                                <a
                                    href="/contact"
                                    className="flex items-center gap-2 sm:gap-3 bg-black rounded-full py-2 sm:py-3 px-4 sm:px-6 hover:bg-[#007ebb] transition-colors duration-300 group/btn"
                                >
                                    <span className="text-white text-sm sm:text-base md:text-lg font-medium whitespace-nowrap">
                                        Enquiry Now
                                    </span>
                                    <div className="bg-white rounded-full p-1 sm:p-1.5 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-[#007ebb] transition-colors duration-300">
                                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-black group-hover/btn:text-[#007ebb]" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustryHero;
