import React, { useState } from 'react';
import { Star, Play, Quote } from 'lucide-react';

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
}

const testimonialsData: TestimonialData[] = [
    {
        id: 1,
        name: "Ram Kumar",
        designation: "Home Owner",
        location: "Thirunelveli",
        title: "The best water purifer",
        description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Et labore harum non nobis ipsum eum molestias et corporis praesentium a laudantium internos. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Et labore harum non nobis ipsum eum molestias.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        videoThumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Priya S.",
        designation: "Interior Designer",
        location: "Chennai",
        title: "Premium Quality & Support",
        description: "Excellent service and product quality. The installation was seamless, and the water tastes amazing. Highly recommend to everyone looking for a reliable water purifier. The customer support team is also very responsive and helpful with any queries.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
        videoThumbnail: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Arun V.",
        designation: "Business Owner",
        location: "Madurai",
        title: "Worth Every Penny",
        description: "We have been using this for 6 months now. Zero issues. The water quality is tested and it is perfectly safe. The design of the unit also adds a modern look to our kitchen. Very happy with the purchase and the periodic maintenance alerts.",
        rating: 4,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
        videoThumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Deepa R.",
        designation: "Bank Manager",
        location: "Coimbatore",
        title: "Excellent Service!",
        description: "The team was very professional. They explained everything clearly and ensured the setup was correct. The water purifier itself is top-notch. I especially like the compact design and the smart features that notify us about filter life.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
        videoThumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Suresh M.",
        designation: "Chef",
        location: "Kochi",
        title: "Great Product",
        description: "I use this water for my restaurant too. Consistent quality is what I need and that's what I get. The high flow rate is a big plus for busy kitchen hours. Service is prompt and technical team is knowledgeable.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        videoThumbnail: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1974&auto=format&fit=crop"
    }
];

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [isPlaying, setIsPlaying] = useState<number | string | null>(null);

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
                        : 'w-full max-w-3xl z-10 scale-90 opacity-20 hidden lg:block'
                    }
                    ${position === 'prev' ? 'lg:-translate-x-[25%]' : ''}
                    ${position === 'next' ? 'lg:translate-x-[25%]' : ''}`}>
                <div className="bg-white rounded-[15px] md:rounded-[15px] shadow-2xl overflow-hidden grid grid-cols-12 min-h-[350px] md:min-h-[480px] border border-gray-100">
                    {/* Left: Video Component (Wider column per user request) */}
                    <div className="col-span-12 md:col-span-5 relative group bg-black overflow-hidden h-full">
                        {isPlaying === data.id && isActive ? (
                            <div className="w-full h-full flex items-center justify-center bg-black text-white p-4 text-center italic text-sm">
                                Video is playing... <br /> (Iframe would load here)
                            </div>
                        ) : (
                            <div className="w-full h-full relative" onClick={(e) => isActive && handleVideoClick(e, data.id)}>
                                <img
                                    src={data.videoThumbnail}
                                    alt="Video Thumbnail"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20"></div>
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
                        <div className="absolute top-8 right-10 text-gray-100 z-0 select-none">
                            <Quote size={100} fill="currentColor" className="opacity-50" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            {/* User Profile */}
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={data.avatar}
                                    alt={data.name}
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <div>
                                    <h4 className="text-lg md:text-2xl font-bold text-dark mb-0.5 font-serif">
                                        {data.name}
                                    </h4>
                                    <p className="text-xs md:text-sm text-gray-400 font-medium">
                                        {data.location}
                                    </p>
                                </div>
                            </div>

                            {/* Testimonial Text */}
                            <div className="mb-6 grow">
                                <h3 className="text-lg md:text-xl font-bold text-dark mb-4 tracking-tight leading-tight">
                                    {data.title}
                                </h3>
                                <p className="text-gray-500 text-xs md:text-[14px] leading-relaxed italic font-normal text-justify max-w-xl">
                                    "{data.description}"
                                </p>
                            </div>

                            {/* Ratings */}
                            <div className="flex items-center gap-1 mt-auto pt-6 border-t border-gray-50">
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
        );
    };

    return (
        <section className="w-full bg-white py-12 md:py-12 mt-12 px-0 font-outfit overflow-hidden">
            <div className="max-w-full mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 px-8">
                    <div className="bg-[#007ebb] px-8 md:px-12 py-3 md:py-4 rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[5px] rounded-br-[5px] shadow-lg">
                        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-none">
                            Testimonial
                        </h2>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-dark tracking-tight">
                        Our Success Stories
                    </h2>
                </div>

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
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover shadow-xl"
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Fixed Carousel with Half-Hidden side cards */}
                <div className="relative w-full flex justify-center items-center overflow-visible px-4 md:px-0 h-[400px] md:h-[520px]">
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
