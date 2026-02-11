import React, { useState } from 'react';
import { Droplets, Users, MapPin, Clock, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const stats = [
    {
        value: '22+',
        label: 'Years of Proven Purification Expertise',
        bg: 'bg-[#f1f1f1]',
        text: 'text-dark',
        icon: <Droplets size={20} />,
        iconBg: 'bg-[#007ebb]',
        iconColor: 'text-white',
    },
    {
        value: '20 K',
        label: 'Proudly serving 20,000+ satisfied homes and businesses.',
        bg: 'bg-[#f1f1f1]',
        text: 'text-dark',
        icon: <Users size={20} />,
        iconBg: 'bg-[#007ebb]',
        iconColor: 'text-white',
    },
    {
        value: '5+',
        label: 'Expanding pure water access across multiple states.',
        bg: 'bg-[#f1f1f1]',
        text: 'text-dark',
        icon: <MapPin size={20} />,
        iconBg: 'bg-[#007ebb]',
        iconColor: 'text-white',
    },
    {
        value: '24 hrs',
        label: 'Quick and reliable support.',
        bg: 'bg-[#333333]',
        text: 'text-white',
        icon: <Clock size={20} />,
        iconBg: 'bg-white',
        iconColor: 'text-dark',
    },
];

const imageSets = [
    {
        topBanner: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
        bottomSmall: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
        bottomSquare: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1974&auto=format&fit=crop',
    },
    {
        topBanner: 'https://images.unsplash.com/photo-1600880212319-78443973a116?q=80&w=2070&auto=format&fit=crop',
        bottomSmall: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
        bottomSquare: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop',
    },
];

const FeaturesSection: React.FC = () => {
    const [currentSet, setCurrentSet] = useState(0);

    const nextSet = () => {
        setCurrentSet((prev) => (prev + 1) % imageSets.length);
    };

    const prevSet = () => {
        setCurrentSet((prev) => (prev - 1 + imageSets.length) % imageSets.length);
    };

    return (
        <section className="w-full bg-transparent py-10 px-4 md:px-8 font-outfit">
            <div className="max-w-[1400px] mx-auto">
                {/* Heading Layer */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                    <div className="bg-[#007ebb] px-8 md:px-4 py-3 rounded-tl-3xl rounded-bl-3xl rounded-tr-md rounded-br-md shadow-lg border border-white/20">
                        <h2 className="text-2xl md:text-5xl font-serif italic text-white tracking-tight leading-tight">
                            Trusted Purification
                        </h2>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-serif text-dark tracking-tight leading-tight">
                        Smart Technology
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.bg} ${stat.text} p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#007ebb] hover:text-white group border border-black/5`}>
                                <div className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg} ${stat.iconColor} group-hover:bg-white group-hover:text-[#007ebb] transition-all duration-300 shadow-sm`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-sm md:text-base font-medium leading-snug opacity-90">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Complex Multi-Image Carousel */}
                    <div className="flex flex-col gap-4">
                        <div className="relative grid grid-cols-12 gap-4">
                            {/* Feature 1: Top Banner */}
                            <div className="col-span-12 relative rounded-2xl overflow-hidden shadow-lg h-[200px]">
                                <img
                                    src={imageSets[currentSet].topBanner}
                                    alt="Feature Top"
                                    className="w-full h-full object-cover transition-all duration-1000"
                                />
                            </div>

                            {/* Feature 2: Bottom Row - Left (Small Banner + Navigation) - Wider (7 cols) */}
                            <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
                                <div className="relative rounded-2xl overflow-hidden shadow-md h-[180px]">
                                    <img
                                        src={imageSets[currentSet].bottomSmall}
                                        alt="Feature Small"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    {currentSet === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center text-center p-3">
                                            <span className="text-white font-bold text-base drop-shadow-lg leading-tight uppercase tracking-wider">22 YEARS OF EXPERTISE</span>
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Buttons - Exactly under image */}
                                <div className="flex gap-3 justify-center md:justify-start">
                                    <button
                                        onClick={prevSet}
                                        className="bg-[#f1f1f1] text-dark p-3 rounded-full hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-105 shadow-sm"
                                    >
                                        <ChevronLeft size={20} strokeWidth={3} />
                                    </button>
                                    <button
                                        onClick={nextSet}
                                        className="bg-[#f1f1f1] text-dark p-3 rounded-full shadow-lg shadow-[#007ebb]/20 hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-105"
                                    >
                                        <ChevronRight size={20} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            {/* Feature 3: Bottom Row - Right (Square/Vertical Image) - Narrower (5 cols) */}
                            <div className="col-span-12 md:col-span-5 relative rounded-2xl overflow-hidden shadow-md h-[180px] md:h-auto md:aspect-4/4">
                                <img
                                    src={imageSets[currentSet].bottomSquare}
                                    alt="Feature Square"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Central Floating Action Button - Positioned exactly at intersection */}
                            <div className="absolute top-[200px] left-[58.33%] -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
                                <button className="bg-[#007ebb] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-[#007ebb]/40">
                                    <ArrowUpRight size={28} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
