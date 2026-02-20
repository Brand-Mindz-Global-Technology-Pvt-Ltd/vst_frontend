import React, { useRef, type ReactNode } from 'react';
import { ArrowRight, ChevronFirst, ChevronLast } from 'lucide-react';
import { useHighlight } from '../../../context/HighlightContext';
import FloatingHighlight from '../framer/FloatingHighlight';
import { motion } from 'framer-motion';

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
        <div className="relative group overflow-hidden rounded-[30px] bg-white aspect-4/5 lg:aspect-16/10">
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>
            </div>

            {/* --- TOP-LEFT TAB with Icon Badge (Hero-Style) --- */}
            {icon && (
                <div className="absolute top-0 left-0 z-20">
                    <div className="relative bg-[#f1f8ff] p-3 sm:p-2.5 md:p-3 lg:p-5 rounded-tl-[30px] rounded-br-[25px] sm:rounded-br-[22px] md:rounded-br-[28px] lg:rounded-br-[40px] flex items-center justify-center">
                        <div className="bg-black text-white p-2.5 sm:p-2 md:p-2.5 lg:p-4 rounded-full shadow-lg">
                            {icon}
                        </div>

                        {/* Scoop extending right along top edge */}
                        <div className="absolute top-0 left-full w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-10 lg:h-10 overflow-hidden pointer-events-none">
                            <div className="w-full h-full rounded-tl-[18px] sm:rounded-tl-[15px] md:rounded-tl-[18px] lg:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#f1f8ff] sm:shadow-[-8px_-8px_0_0_#f1f8ff] md:shadow-[-10px_-10px_0_0_#f1f8ff] lg:shadow-[-16px_-16px_0_0_#f1f8ff]"></div>
                        </div>

                        {/* Scoop extending down along left edge */}
                        <div className="absolute top-full left-0 w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-10 lg:h-10 overflow-hidden pointer-events-none">
                            <div className="w-full h-full rounded-tl-[18px] sm:rounded-tl-[15px] md:rounded-tl-[18px] lg:rounded-tl-[30px] shadow-[-10px_-10px_0_0_#f1f8ff] sm:shadow-[-8px_-8px_0_0_#f1f8ff] md:shadow-[-10px_-10px_0_0_#f1f8ff] lg:shadow-[-16px_-16px_0_0_#f1f8ff]"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Glassmorphism Title Overlay - Edge to Edge */}
            <div className="absolute bottom-28 sm:bottom-24 md:bottom-26 lg:bottom-28 left-0 right-0 z-10">
                <div className="bg-white/10 backdrop-blur-xs py-3 sm:py-2.5 md:py-3 lg:py-2 px-4 sm:px-4 md:px-5 lg:px-10">
                    <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl font-josefin text-white tracking-tight leading-snug">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Bottom Content: Description (left) */}
            <div className="absolute bottom-0 left-4 right-0 px-4 pb-5 pt-2 sm:pb-4 md:pb-5 lg:px-6 lg:pb-7 z-10">
                <p className="text-white/90 text-xs sm:text-[11px] md:text-xs lg:text-base font-medium max-w-[55%] sm:max-w-[55%] md:max-w-[58%] lg:max-w-sm leading-relaxed">
                    {description}
                </p>
            </div>

            {/* --- BOTTOM-RIGHT TAB with Enquiry Button (Hero-Style) --- */}
            <div className="absolute bottom-0 right-0 z-20">
                <div className="relative bg-[#f1f8ff] p-2.5 sm:p-2 md:p-2.5 lg:p-4 rounded-br-[30px] rounded-tl-[25px] sm:rounded-tl-[22px] md:rounded-tl-[28px] lg:rounded-tl-[40px] flex items-center">

                    {/* Scoop extending left along bottom edge */}
                    <div className="absolute bottom-0 right-full w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-10 lg:h-10 overflow-hidden pointer-events-none">
                        <div className="w-full h-full rounded-br-[18px] sm:rounded-br-[15px] md:rounded-br-[18px] lg:rounded-br-[30px] shadow-[10px_10px_0_0_#f1f8ff] sm:shadow-[8px_8px_0_0_#f1f8ff] md:shadow-[10px_10px_0_0_#f1f8ff] lg:shadow-[16px_16px_0_0_#f1f8ff]"></div>
                    </div>

                    {/* Scoop extending up along right edge */}
                    <div className="absolute bottom-full right-0 w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-10 lg:h-10 overflow-hidden pointer-events-none">
                        <div className="w-full h-full rounded-br-[18px] sm:rounded-br-[15px] md:rounded-br-[18px] lg:rounded-br-[30px] shadow-[10px_10px_0_0_#f1f8ff] sm:shadow-[8px_8px_0_0_#f1f8ff] md:shadow-[10px_10px_0_0_#f1f8ff] lg:shadow-[16px_16px_0_0_#f1f8ff]"></div>
                    </div>

                    {/* Enquiry Button */}
                    <button
                        onClick={onCtaClick}
                        className="bg-black text-white pl-5 sm:pl-4 md:pl-5 lg:pl-8 pr-1.5 sm:pr-1.5 md:pr-1.5 lg:pr-2.5 py-1.5 sm:py-1.5 md:py-1.5 lg:py-3 rounded-full font-medium flex items-center gap-3 sm:gap-2 md:gap-2.5 lg:gap-4 group/btn hover:bg-[#007ebb] transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                        <span className="text-sm sm:text-xs md:text-sm lg:text-lg tracking-tight">{ctaText}</span>
                        <div className="bg-white text-black rounded-full p-1.5 sm:p-1 md:p-1.5 lg:p-2.5 transition-transform group-hover/btn:-rotate-45">
                            <ArrowRight size={14} className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-5 lg:h-5" />
                        </div>
                    </button>
                </div>
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
    const { setActiveId } = useHighlight();

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
        <section className={`w-full bg-[#f1f8ff] py-16 md:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}>
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-12 md:mb-16 relative">
                    <motion.div
                        onViewportEnter={() => setActiveId('what-we-offer-heading')}
                        viewport={{ amount: 0.5 }}
                        className="flex flex-nowrap items-baseline justify-center gap-2 sm:gap-3 lg:gap-6 w-full max-w-full overflow-hidden">
                        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-imperator text-dark tracking-tight leading-snug whitespace-nowrap pt-2">
                            {titlePrefix}
                        </h2>
                        {/* Perfected Header Box */}
                        <FloatingHighlight
                            id="what-we-offer-heading"
                            boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px]"
                            className="mt-2 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-imperator text-white tracking-tight leading-snug text-center whitespace-nowrap px-4 sm:px-5 md:px-6 lg:px-4 py-1.5 lg:py-1">
                            {highlightedTitle}
                        </FloatingHighlight>
                    </motion.div>

                    {/* Navigation Arrows - Absolute on Desktop, Below on Mobile/Tablet */}
                    <div className="flex gap-4 mt-8 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-white text-dark p-3 lg:p-4 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-95 border border-black/5 flex items-center justify-center group shrink-0">
                            <ChevronFirst size={24} strokeWidth={2} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-white text-dark p-3 lg:p-4 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center group shrink-0">
                            <ChevronLast size={24} strokeWidth={2} />
                        </button>
                    </div>
                </div>

                {/* Services Grid/Slider */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 sm:gap-5 md:gap-6 lg:gap-10 pb-8 scrollbar-hide snap-x snap-mandatory no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {services.map((service) => (
                        <div key={service.id} className="min-w-[85vw] sm:min-w-[calc(50%-10px)] md:min-w-[calc(50%-12px)] lg:min-w-[calc(50%-20px)] snap-start">
                            <ServiceCard {...service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOfferTemplate;
