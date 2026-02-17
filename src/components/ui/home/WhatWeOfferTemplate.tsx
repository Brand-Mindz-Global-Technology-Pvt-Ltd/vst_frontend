import React, { useRef, type ReactNode } from 'react';
import { ArrowRight, ChevronFirst, ChevronLast } from 'lucide-react';

interface ServiceData {
    id: number | string;
    title: string;
    description: string;
    image: string;
    icon?: ReactNode;
    ctaText: string;
    onCtaClick?: () => void;
}

interface WhatWeOfferTemplateProps {
    titlePrefix: string;
    highlightedTitle: string;
    services: ServiceData[];
    className?: string;
}

const ServiceCard: React.FC<ServiceData> = ({
    title,
    description,
    image,
    icon,
    ctaText,
    onCtaClick,
}) => {
    return (
        <div className="relative group overflow-hidden rounded-[30px] md:rounded-[40px] shadow-xl bg-white aspect-4/3 md:aspect-16/10">
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Icon Badge */}
            {icon && (
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                    <div className="bg-black text-white p-2 md:p-3 rounded-full shadow-lg border-2 border-white/20">
                        {icon}
                    </div>
                </div>
            )}

            {/* Glassmorphism Title Overlay */}
            <div className="absolute bottom-20 md:bottom-28 left-0 right-0 px-4 md:px-0 z-10">
                <div className="bg-white/10 backdrop-blur-xs py-4 md:py-6 px-6 md:px-10 flex flex-col gap-1">
                    <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-4 z-20">
                {/* Description */}
                <p className="text-white/90 text-md md:text-md font-medium max-w-sm leading-relaxed order-2 md:order-1">
                    {description}
                </p>

                {/* Enquiry Button */}
                <button
                    onClick={onCtaClick}
                    className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3.5 rounded-full font-bold flex items-center gap-2 group/btn hover:bg-[#007ebb] transition-all transform hover:scale-105 active:scale-95 shadow-xl order-1 md:order-2 self-end">
                    <span className="text-sm md:text-base ">{ctaText}</span>
                    <div className="bg-white text-black rounded-full p-1 md:p-1.5 transition-transform group-hover/btn:-rotate-45">
                        <ArrowRight size={14} className="md:w-4 md:h-4" />
                    </div>
                </button>
            </div>
        </div>
    );
};

const WhatWeOfferTemplate: React.FC<WhatWeOfferTemplateProps> = ({
    titlePrefix,
    highlightedTitle,
    services,
    className = "",
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth * 0.8;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={`w-full bg-[#f1f8ff] py-16 md:py-24 px-4 md:px-8 overflow-hidden ${className}`}>
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-center items-center mb-12 md:mb-16 relative">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl md:text-5xl font-imperator  text-dark tracking-tight">
                            {titlePrefix}
                        </h2>
                        {/* Perfected Header Box */}
                        <div className="bg-[#007ebb] px-6 md:px-8 py-2 md:py-2 rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-lg flex items-center justify-center">
                            <h2 className="pt-2 text-2xl md:text-4xl font-imperator  text-white tracking-tight leading-none text-center">
                                {highlightedTitle}
                            </h2>
                        </div>
                    </div>

                    {/* Navigation Arrows - Absolute on Desktop */}
                    <div className="flex gap-4 mt-6 md:mt-0 md:absolute md:right-0">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-white text-dark p-3 md:p-4 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-black/5 flex items-center justify-center group"
                        >
                            <ChevronFirst size={24} strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-[#007ebb] text-white p-3 md:p-4 rounded-full shadow-xl shadow-[#007ebb]/20 hover:bg-dark transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center group"
                        >
                            <ChevronLast size={24} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* Services Grid/Slider */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 md:gap-10 pb-8 scrollbar-hide snap-x snap-mandatory no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {services.map((service) => (
                        <div key={service.id} className="min-w-[85vw] md:min-w-[calc(50%-15px)] snap-start">
                            <ServiceCard {...service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOfferTemplate;
