import React, { useState } from 'react';
import { Star, Play, Quote } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

interface TestimonialData {
    id: number | string;
    name: string;
    designation: string;
    location: string;
    title: string;
    description: string;
    rating: number;
    avatar: string;
    videoThumbnail: string;
    videoId: string;
}

const testimonialsData: TestimonialData[] = [
    {
        id: 1,
        name: "Anitha R.",
        designation: "Residential Customer",
        location: "Chennai",
        title: "Taste & Quality Focus",
        description: "After installing the RO system, the water quality improved immediately. It tastes fresh, clean, and completely odor-free. My family feels much safer drinking this water every day.",
        rating: 5,
        avatar: "",
        videoThumbnail: "",
        videoId: "EngW7tLk6R8"
    },
    {
        id: 2,
        name: "Rajesh Kumar",
        designation: "Home Owner",
        location: "Madurai",
        title: "Health & Safety",
        description: "We were worried about water contamination in our area. This purifier gave us complete peace of mind—especially for our kids. The difference in water clarity and taste is amazing.",
        rating: 5,
        avatar: "",
        videoThumbnail: "",
        videoId: "EngW7tLk6R8"
    },
    {
        id: 3,
        name: "Sneha V.",
        designation: "Home Maker",
        location: "Coimbatore",
        title: "Convenience",
        description: "No more buying bottled water! This purifier has saved us money and made our daily life much easier.",
        rating: 5,
        avatar: "",
        videoThumbnail: "",
        videoId: "EngW7tLk6R8"
    },
    {
        id: 4,
        name: "Vikram Seth",
        designation: "Office Manager",
        location: "Bangalore",
        title: "Office Use",
        description: "We installed this system in our office, and the staff noticed the difference instantly. Clean drinking water has improved employee satisfaction and reduced dependency on cans.",
        rating: 5,
        avatar: "",
        videoThumbnail: "",
        videoId: "EngW7tLk6R8"
    },
    {
        id: 5,
        name: "Karthik S.",
        designation: "Business Owner",
        location: "Trichy",
        title: "Maintenance & Service",
        description: "The installation was quick and professional. Their service team is very responsive and always available when needed.",
        rating: 5,
        avatar: "",
        videoThumbnail: "",
        videoId: "EngW7tLk6R8"
    },
    {
        id: 6,
        name: "Manoj P.",
        designation: "Factory Manager",
        location: "Hosur",
        title: "Industrial Client",
        description: "We implemented their water treatment system in our factory, and the performance has been excellent. It consistently delivers high-quality treated water with minimal maintenance.",
        rating: 5,
        avatar: "",
        videoThumbnail: "",
        videoId: "EngW7tLk6R8"
    },
    {
        id: 7,
        name: "Dr. Kavita",
        designation: "Technical Lead",
        location: "Pune",
        title: "Custom Solution",
        description: "They analyzed our raw water quality and designed a customized solution. The results exceeded our expectations.",
        rating: 5,
        avatar: "",
        videoThumbnail: "",
        videoId: "EngW7tLk6R8"
    }
];

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [isPlaying, setIsPlaying] = useState<number | string | null>(null);
    const { setActiveId } = useHighlight();

    const handleIndexChange = (index: number) => {
        setActiveIndex(index);
        setIsPlaying(null);
    };

    const handleVideoClick = (e: React.MouseEvent, id: number | string) => {
        e.stopPropagation();
        setIsPlaying(id);
    };

    const getTestimonialIndex = (offset: number) => {
        const len = testimonialsData.length;
        return (activeIndex + offset + len) % len;
    };

    const prevIndex = getTestimonialIndex(-1);
    const nextIndex = getTestimonialIndex(1);

    const displayedTestimonials = [
        { data: testimonialsData[prevIndex], position: 'prev' as const },
        { data: testimonialsData[activeIndex], position: 'active' as const },
        { data: testimonialsData[nextIndex], position: 'next' as const }
    ];

    const TestimonialCard = ({ data, position }: { data: TestimonialData, position: 'prev' | 'active' | 'next' }) => {
        const isActive = position === 'active';

        return (
            <div
                onClick={() => !isActive && handleIndexChange(testimonialsData.findIndex(t => t.id === data.id))}
                className={`transition-all duration-1000 ease-in-out cursor-pointer h-full relative shrink-0
                    ${isActive
                        ? 'w-full max-w-3xl z-20 scale-100 opacity-100'
                        : 'w-full max-w-3xl z-10 scale-[0.88] opacity-60 hidden lg:block'
                    }
                    ${position === 'prev' ? 'lg:-translate-x-0%' : ''}
                    ${position === 'next' ? 'lg:translate-x-[0%]' : ''}`}>
                {/* Gradient Border Wrapper */}
                <div className="rounded-[15px] md:rounded-[15px] p-[2px] bg-linear-to-br from-gray-300 via-gray-200 to-gray-100 shadow-2xl">
                    <div className="bg-white rounded-[13px] md:rounded-[13px] overflow-hidden grid grid-cols-12 min-h-[520px] md:min-h-[480px]">
                        {/* Left: Video Component (Wider column per user request) */}
                        <div className="col-span-12 md:col-span-5 relative group bg-black overflow-hidden h-full min-h-[220px] md:min-h-full aspect-video md:aspect-auto">
                            {isPlaying === data.id && isActive ? (
                                <div className="w-full h-full relative">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&controls=1`}
                                        title="User Testimonial Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="w-full h-full relative cursor-pointer" onClick={(e) => isActive && handleVideoClick(e, data.id)}>
                                    {data.videoThumbnail ? (
                                        <img
                                            src={data.videoThumbnail}
                                            alt="Video Thumbnail"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <div className="w-24 h-24 bg-[#007ebb]/10 rounded-full flex items-center justify-center">
                                                <Play size={40} className="text-[#007ebb]/20" fill="currentColor" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    {/* Play Button Integration */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center transition-transform group-hover:scale-110">
                                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-dark shadow-xl">
                                                <Play size={20} fill="currentColor" strokeWidth={3} className="ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Content Area */}
                        <div className="col-span-12 md:col-span-7 p-8 md:p-10 md:pl-12 flex flex-col relative bg-white">
                            {/* Quote Icon - Rotated and placed as per design */}
                            <div className="absolute top-24 right-10 rotate-180 text-gray-100 z-0 select-none">
                                <Quote size={90} fill="currentColor" className="opacity-80" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                {/* User Profile (Top) */}
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-14 h-14 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shadow-lg flex items-center justify-center shrink-0">
                                        {data.avatar ? (
                                            <img
                                                src={data.avatar}
                                                alt={data.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xl md:text-3xl font-bold text-[#007ebb]/40 font-josfins">
                                                {data.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-2xl font-semibold text-dark mb-0.5 font-josfins">
                                            {data.name}
                                        </h4>
                                        <p className="text-xs md:text-sm text-black font-medium font-josfins">
                                            {data.location}
                                        </p>
                                    </div>
                                </div>

                                {/* Flexible Spacer to push following content to bottom */}
                                <div className="flex-1"></div>

                                {/* Testimonial Text (Bottom) */}
                                <div className="mt-auto">
                                    <h3 className="text-lg md:text-2xl font-semibold text-dark mb-4 tracking-tight leading-tight font-josfins">
                                        {data.title}
                                    </h3>
                                    <p className="text-black text-xs md:text-[16px] leading-relaxed font-normal text-start max-w-xl font-jost opacity-90">
                                        "{data.description}"
                                    </p>

                                    {/* Ratings (Bottom-most) */}
                                    <div className="flex items-center gap-1 mt-4 pt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                fill={i < data.rating ? "#FFB800" : "none"}
                                                className={i < data.rating ? "text-[#FFB800]" : "text-gray-200"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="w-full bg-white py-12 md:py-12 mt-12 px-0 font-outfit overflow-hidden">
            <div className="max-w-full mx-auto">
                {/* Header Section */}
                <motion.div
                    onViewportEnter={() => setActiveId('testimonials-heading')}
                    viewport={{ amount: 0.5 }}
                    className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 mb-20 px-4 sm:px-8"
                >
                    <FloatingHighlight
                        id="testimonials-heading"
                        boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[5px] shadow-lg"
                        className="text-2xl sm:text-2xl md:text-4xl font-imperator tracking-tight leading-none px-4 sm:px-8 py-3 md:py-4"
                    >
                        Testimonial
                    </FloatingHighlight>
                    <h2 className="text-2xl sm:text-2xl md:text-4xl font-imperator text-dark tracking-tight whitespace-nowrap">
                        Our Success Stories
                    </h2>
                </motion.div>

                {/* Avatar Row */}
                <div className="flex justify-center items-center gap-4 md:gap-14 mb-20 relative px-8">
                    {testimonialsData.map((t, idx) => {
                        const distance = Math.min(
                            Math.abs(activeIndex - idx),
                            testimonialsData.length - Math.abs(activeIndex - idx)
                        );

                        let opacityClass = 'opacity-100 scale-125';
                        if (distance === 1) opacityClass = 'opacity-40 scale-100';
                        if (distance >= 2) opacityClass = 'opacity-15 scale-90';

                        return (
                            <button
                                key={t.id}
                                onClick={() => handleIndexChange(idx)}
                                className={`relative transition-all duration-700 transform ${opacityClass}`}
                            >
                                <div className={`p-1 rounded-full ${activeIndex === idx
                                    ? 'border-2 border-[#007ebb]'
                                    : 'border-2 border-transparent'
                                    }`}>
                                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-50 border border-gray-100 shadow-md flex items-center justify-center">
                                        {t.avatar ? (
                                            <img
                                                src={t.avatar}
                                                alt={t.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm md:text-lg font-bold text-[#007ebb]/30">
                                                {t.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Fixed Carousel with Half-Hidden side cards */}
                <div className="relative w-full flex justify-center items-center overflow-visible px-4 md:px-0 h-[580px] md:h-[520px]">
                    {displayedTestimonials.map((item) => (
                        <TestimonialCard key={`${item.data.id}-${item.position}`} {...item} />
                    ))}
                </div>

                {/* Mobile indicators */}
                <div className="flex justify-center gap-3 mt-10 lg:hidden">
                    {testimonialsData.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-10 bg-[#007ebb]' : 'w-3 bg-gray-200'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
