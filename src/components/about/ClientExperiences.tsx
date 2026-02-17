import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    text: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Ram Kumar",
        text: "Lorem Nam id Nam exercitationem commodi et ducimus quia in dolore animi sit ducimus quia in dolore animi sit ",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?bg=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        name: "Arun",
        text: "Lorem Nam id Nam exercitationem commodi et ducimus quia in dolore animi sit ducimus quia in dolore animi sit ",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        name: "Jothi",
        text: "Lorem Nam id Nam exercitationem commodi et ducimus quia in dolore animi sit ducimus quia in dolore animi sit ",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 4,
        name: "Suresh",
        text: "VST products have transformed our daily water usage. The quality is exceptional and the service is always on point. Very satisfied.",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 5,
        name: "Anitha",
        text: "Exceptional water purification solutions. The installation was seamless and the team was professional. Definitely value for money.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
];

const ClientExperiences: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(1); // Default to Arun (index: 1)

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative w-full py-16 md:py-24 px-4 md:px-8 font-outfit overflow-hidden">
            {/* Main Background Image for the whole section */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/assets/about/family.webp"
                    alt="Section Background"
                    className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Section Header - Styled as per image */}
                <div className="flex items-center justify-center gap-2 mb-12 md:mb-16">
                    <span className="text-white text-4xl md:text-5xl lg:text-5xl font-imperator leading-tight">
                        Client
                    </span>
                    <div className="bg-white px-8 py-2 md:py-3 rounded-lg shadow-sm">
                        <span className="text-[#007ebb] text-4xl md:text-5xl lg:text-5xl font-imperator leading-tight">
                            Experiences
                        </span>
                    </div>
                </div>

                {/* Main Card with light white opacity reduced background */}
                <div className="relative w-full min-h-[500px] lg:min-h-[600px] rounded-[20px] overflow-hidden shadow-2xl border border-white/20">
                    <div className="flex flex-col lg:flex-row h-full">

                        {/* Left Side: Descriptive Content (40%) */}
                        <div className="w-full lg:w-[42%] py-8 md:py-14 lg:py-12 pr-8 md:pr-14 lg:pr-12 flex flex-col justify-center bg-[#e0e0e0]/60">
                            <div className="relative">
                                {/* Heading with white bg - flush left attachment */}
                                <div className="bg-white/50 p-8 md:p-12 pl-8 md:pl-12 lg:pl-16 rounded-tr-[60px] mb-8">
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-imperator text-dark leading-tight flex flex-wrap items-center gap-x-3 gap-y-2">
                                        What <span className="text-[#007ebb]">Our</span>
                                        <div className="inline-flex items-center">
                                            <img
                                                src="../assets/public/water-droplet.webp"
                                                alt="Drop"
                                                className="w-10 h-10 md:w-14 lg:w-16"
                                                onError={(e) => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png')}
                                            />
                                        </div>
                                        <span className="text-dark">Customers</span> Says
                                    </h2>
                                </div>
                                <div className="px-8 md:px-12 lg:px-16">
                                    <p className="text-dark/80 font-jost text-lg md:text-xl leading-relaxed max-w-[450px]">
                                        Our journey is not just about products; it's about people. The trust of our customers drives us to innovate and deliver solutions that truly make a difference. With a strong service network
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Slider Area (60%) */}
                        <div className="w-full lg:w-[58%] relative p-6 md:p-14 lg:p-20 flex flex-col items-center justify-center bg-white/80">

                            {/* Navigation Arrows - Specific Image Placement */}
                            <div className="absolute left-4 lg:left-10 h-full py-20 flex flex-col justify-between z-20 pointer-events-none lg:translate-x-[-50%]">
                                <button
                                    onClick={handlePrev}
                                    className="w-12 h-12 flex flex-col items-center justify-center bg-white text-[#007ebb] rounded-full shadow-md hover:bg-gray-50 transition-all duration-300 border border-[#007ebb]/20 pointer-events-auto"
                                >
                                    <div className="w-3 h-[2px] bg-[#007ebb] rounded-full" />
                                    <ChevronUp size={20} strokeWidth={3} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-12 h-12 flex flex-col items-center justify-center bg-[#007ebb] text-white rounded-full shadow-md hover:bg-[#006699] transition-all duration-300 pointer-events-auto"
                                >
                                    <ChevronDown size={20} strokeWidth={3} />
                                    <div className="w-3 h-[2px] bg-white rounded-full" />
                                </button>
                            </div>

                            {/* Center vertical blue line separator (Desktop) */}
                            <div className="absolute left-4 lg:left-0 top-1/2 -translate-y-1/2 w-[4px] h-[60%] bg-[#007ebb] z-10 hidden lg:block rounded-full lg:translate-x-[-2px]" />

                            {/* Testimonials Stack */}
                            <div className="flex flex-col gap-8 w-full max-w-lg items-center">
                                {testimonials.map((testimonial, index) => {
                                    const isActive = index === activeIndex;
                                    // Logic to show active and neighbors
                                    const isVisible = Math.abs(index - activeIndex) <= 1 ||
                                        (activeIndex === 0 && index === testimonials.length - 1) ||
                                        (activeIndex === testimonials.length - 1 && index === 0);

                                    if (!isVisible) return null;

                                    return (
                                        <div
                                            key={testimonial.id}
                                            className={`
                                                relative bg-white p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 transition-all duration-500 transform w-full lg:max-w-lg
                                                ${isActive
                                                    ? 'border-2 border-[#007ebb] shadow-2xl scale-100 z-10 opacity-100 lg:self-start'
                                                    : 'shadow-md scale-90 opacity-60 blur-[0.1px] lg:self-center rounded-[25px]'}
                                            `}
                                        >
                                            <div className="relative shrink-0">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2 relative w-full text-center sm:text-left">
                                                {/* Quote Icon - Desktop position as per image */}
                                                <div className="absolute -top-1 -right-1">
                                                    <Quote
                                                        size={28}
                                                        className={isActive ? "text-[#007ebb]" : "text-gray-200"}
                                                        fill="currentColor"
                                                    />
                                                </div>

                                                <h3 className="text-xl md:text-2xl font-imperator text-dark tracking-wide font-semibold">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-dark/70 font-jost text-[13px] md:text-sm lg:text-base leading-relaxed italic">
                                                    "{testimonial.text}"
                                                </p>
                                            </div>

                                            {/* Blue corner decorations for active card */}
                                            {isActive && (
                                                <>
                                                    {/* Bottom left vertical line */}
                                                    <div className="absolute bottom-0 left-0 w-[3px] h-16 md:h-20 bg-[#007ebb]" />
                                                    {/* Bottom right vertical line */}
                                                    <div className="absolute bottom-0 right-0 w-[3px] h-16 md:h-20 bg-[#007ebb]" />
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientExperiences;
