import React from 'react';
import { Phone } from 'lucide-react';

interface ContactBannerTemplateProps {
    title?: string;
    image?: string;
    logoText1?: string;
    logoText2?: string;
    phoneRedirection?: string;
    logoIcon?: string;
    avatars?: string[];
}

const ContactBannerTemplate: React.FC<ContactBannerTemplateProps> = ({
    title = "Contact Us",
    image = "/assets/home/water-droplet.webp",
    logoText1 = "Pure Water",
    logoText2 = "Pure Life",
    phoneRedirection = "tel:+919843232131",
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

                {/* 2. Main Banner Wrapper — NO overflow-hidden so title can bleed out */}
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
                            alt="Banner"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Dark Overlay for Text Legibility */}
                        <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-black/20 to-transparent" />

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
                                    {(avatars.length > 0 ? avatars : [1, 2, 3, 4]).map((avatar, i) => (
                                        <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                            <img
                                                src={typeof avatar === 'string' ? avatar : `https://i.pravatar.cc/150?u=${i + 20}`}
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-[#007ebb] flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold shadow-sm">
                                        15K
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom-Right Phone Cutout */}
                        <div className="absolute bottom-0 right-0 z-20">
                            <div className="bg-[#EFEFEF] pt-4 sm:pt-6 pl-6 sm:pl-8 pb-2 sm:pb-3 pr-2 sm:pr-3 rounded-tl-[35px] sm:rounded-tl-[40px] md:rounded-tl-[45px] relative">
                                {/* Responsive Mirror Scoops */}
                                <div className="absolute bottom-0 right-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>

                                <div className="absolute right-0 bottom-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 overflow-hidden pointer-events-none">
                                    <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[30px] shadow-[10px_10px_0_0_#EFEFEF]"></div>
                                </div>

                                <a
                                    href={phoneRedirection}
                                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-dark rounded-[16px] sm:rounded-[20px] flex items-center justify-center text-white hover:bg-[#007ebb] transition-all duration-300 transform hover:scale-105">
                                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                                </a>
                            </div>
                        </div>
                        {/* 3. "Contact Us" title — positioned at the bottom edge, half in / half out */}
                        <div className="absolute bottom-6 left-4 sm:left-6 md:left-32 translate-y-1/2 pointer-events-none z-30">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] font-imperator text-white/50 tracking-tight leading-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactBannerTemplate;
