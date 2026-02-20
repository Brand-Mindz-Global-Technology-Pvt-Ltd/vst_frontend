import React, { useRef } from 'react';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import TopPickCard from '../ui/shop/TopPickCard';

const topPicksData = [
    {
        id: 1,
        name: "Fiji Aqua Pro",
        image: "/assets/home/aqu-banner.png",
        discount: "40% OFF",
        categories: ["Bluestar", "Aquaguard"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet.",
        currentPrice: "4,000",
        originalPrice: "8,000"
    },
    {
        id: 2,
        name: "Aqua Guard Max",
        image: "/assets/home/aqu-banner.png",
        discount: "30% OFF",
        categories: ["Aquaguard"],
        description: "Advanced multi-stage purification system with RO+UV protection for crystal clear drinking water.",
        currentPrice: "5,500",
        originalPrice: "7,800"
    },
    {
        id: 3,
        name: "Pure Flow Plus",
        image: "/assets/home/aqu-banner.png",
        discount: "25% OFF",
        categories: ["PureFlow"],
        description: "Elegant design meets superior performance. Perfect for modern kitchens and office spaces.",
        currentPrice: "3,200",
        originalPrice: "4,200"
    },
    {
        id: 4,
        name: "Hydro Smart V8",
        image: "/assets/home/aqu-banner.png",
        discount: "20% OFF",
        categories: ["HydroSmart"],
        description: "Smart monitoring and automatic filter replacement alerts. IoT enabled purification.",
        currentPrice: "6,800",
        originalPrice: "8,500"
    },
    {
        id: 5,
        name: "Eco Oasis Pro",
        image: "/assets/home/aqu-banner.png",
        discount: "15% OFF",
        categories: ["EcoOasis"],
        description: "Environmentally friendly purification with zero water wastage technology.",
        currentPrice: "4,500",
        originalPrice: "5,300"
    },
    {
        id: 6,
        name: "Fiji Aqua Pro",
        image: "/assets/home/aqu-banner.png",
        discount: "40% OFF",
        categories: ["Bluestar", "Aquaguard"],
        description: "Our best-selling model with enhanced mineral retention and pH balance technology.",
        currentPrice: "4,000",
        originalPrice: "8,000"
    },
];

const TopPicks: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = React.useState<number | null>(null);

    // Click outside section to close detailed view
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveCard(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSectionClick = (e: React.MouseEvent) => {
        // If clicking exactly the section background (not its children)
        if (e.target === e.currentTarget) {
            setActiveCard(null);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const firstCard = container.firstElementChild as HTMLElement;

            if (firstCard) {
                // Calculate card width + gap
                const cardWidth = firstCard.offsetWidth;
                const gap = parseInt(window.getComputedStyle(container).gap) || 24;
                const scrollAmount = cardWidth + gap;

                const { scrollLeft } = container;
                const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

                container.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            ref={containerRef}
            onClick={handleSectionClick}
            className="w-full bg-[#EAF8FF] py-8 sm:py-12 md:py-20 overflow-hidden"
        >
            {/* Header Area - Edge to Edge */}
            <div className="flex items-center justify-between mb-8 md:mb-16 w-full">
                {/* Title Banner - No left space */}
                <div className="bg-[#3d3d3d] rounded-r-full py-4 md:py-6 pl-4 sm:pl-10 md:pl-20 pr-12 md:pr-24 shadow-xl self-start">
                    <h2 className="text-white text-xl md:text-3xl font-josefin font-medium tracking-wide">
                        This Month's Top Pick
                    </h2>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pr-6 md:pr-12">
                    <button
                        onClick={() => scroll('left')}
                        className="bg-white text-dark w-10 h-10 md:w-14 md:h-14 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100 flex items-center justify-center group"
                    >
                        <ChevronFirst size={24} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="bg-white text-dark w-10 h-10 md:w-14 md:h-14 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100 flex items-center justify-center group"
                    >
                        <ChevronLast size={24} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Cards Container - Fixed Width and Mutual Exclusion */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 pb-8 pl-4 sm:pl-10 md:pl-20 pr-6 md:pr-12 scroll-smooth"
            >
                {topPicksData.map((product) => (
                    <div key={product.id} className="w-[280px] sm:w-[340px] md:w-[400px] shrink-0 h-full">
                        <TopPickCard
                            {...product}
                            isDetailed={activeCard === product.id}
                            onToggle={() => setActiveCard(activeCard === product.id ? null : product.id)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopPicks;
