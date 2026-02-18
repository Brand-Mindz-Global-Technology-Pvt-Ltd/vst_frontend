import React, { useState, useRef, useEffect } from 'react';
import { ChevronFirst, ChevronLast, Heart, ArrowUpRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    discount?: string;
    price?: string;
    type?: string;
}

interface Category {
    id: string;
    name: string;
    products: Product[];
}

const categories: Category[] = [
    {
        id: 'domestic',
        name: 'Domestic',
        products: [
            {
                id: 1,
                name: 'Fiji Aqua Pro',
                type: 'VV',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                image: 'https://images.unsplash.com/photo-1585707348160-24bc0281b37e?q=80&w=2000&auto=format&fit=crop',
                discount: '40% OFF',
            },
            {
                id: 2,
                name: 'Aqua Guard X',
                type: 'AG',
                description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074&auto=format&fit=crop',
                discount: '30% OFF',
            },
            {
                id: 3,
                name: 'Pure Flow 500',
                type: 'PF',
                description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                image: 'https://images.unsplash.com/photo-1581092921461-7026814b713b?q=80&w=2070&auto=format&fit=crop',
                discount: '25% OFF',
            },
            {
                id: 4,
                name: 'Hydro Smart',
                type: 'HS',
                description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1974&auto=format&fit=crop',
                discount: '15% OFF',
            },
            {
                id: 5,
                name: 'Eco Pure Max',
                type: 'EP',
                description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                image: 'https://images.unsplash.com/photo-1600880212319-78443973a116?q=80&w=2070&auto=format&fit=crop',
                discount: '20% OFF',
            }
        ],
    },
    {
        id: 'commercial',
        name: 'Commercial',
        products: [
            {
                id: 6,
                name: 'Industrial Flow',
                type: 'IF',
                description: 'High-capacity industrial water purification system designed for large scale operations with advanced reverse osmosis technology.',
                image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1974&auto=format&fit=crop',
                discount: '10% OFF',
            },
        ],
    },
    {
        id: 'industry',
        name: 'Industry',
        products: [
            {
                id: 7,
                name: 'Heavy Duty Aqua',
                type: 'HD',
                description: 'Mega-scale purification for industrial processing plants, providing reliable and pure water for technical manufacturing needs.',
                image: 'https://images.unsplash.com/photo-1600880212319-78443973a116?q=80&w=2070&auto=format&fit=crop',
                discount: '15% OFF',
            },
        ],
    },
];

const ProductShowcase: React.FC = () => {
    const [activeTab, setActiveTab] = useState('domestic');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0];
    const featuredProduct = activeCategory.products[currentIndex];

    // Trigger animation state
    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [currentIndex, activeTab]);

    const handleProductChange = (index: number) => {
        if (index === currentIndex) return;
        setCurrentIndex(index);
    };

    const nextProduct = () => {
        const nextIndex = (currentIndex + 1) % activeCategory.products.length;
        handleProductChange(nextIndex);
    };

    const prevProduct = () => {
        const prevIndex = (currentIndex - 1 + activeCategory.products.length) % activeCategory.products.length;
        handleProductChange(prevIndex);
    };

    return (
        <section className="w-full bg-[#f1f8ff] py-16 px-4 md:px-8 font-josefin overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 px-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                        <h2 className="text-3xl md:text-5xl font-imperator text-dark tracking-tight">
                            Choose
                        </h2>
                        <div className="bg-[#007ebb] px-6 md:px-6 py-2 rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-lg">
                            <h2 className="text-2xl md:text-4xl font-imperator pt-2 text-white tracking-tight">
                                Your Pure Solution
                            </h2>
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 relative max-w-5xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center bg-white rounded-3xl md:rounded-full border border-black/5">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveTab(cat.id);
                                        setCurrentIndex(0);
                                    }}
                                    className={`px-4 md:px-10 py-2 md:py-4 rounded-full text-sm md:text-xl font-semibold transition-all duration-300 ${activeTab === cat.id
                                        ? 'bg-[#3d3d3d] text-white shadow-xl'
                                        : 'bg-white text-dark hover:text-dark'
                                        }`}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="md:absolute md:right-[-60px] lg:right-[-100px]">
                            <button className="bg-[#007ebb] text-white px-6 py-2 rounded-full font-semibold hover:bg-dark transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base">
                                See More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    {/* Left Column: Featured Banner */}
                    <div className="lg:col-span-4 w-full px-4 md:px-0">
                        <div className={`relative w-full h-[550px] md:h-[560px] rounded-[15px] md:rounded-[15px] overflow-hidden group transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                            {/* Background Layer with Gradient - Full opacity at top, fades to 20% at bottom */}
                            <div className="absolute inset-0 z-0 bg-[#C8E1EC]"></div>

                            {/* Product Name - Top Center */}
                            <div className="absolute top-6 md:top-8 left-0 right-0 text-center z-20">
                                <h3 className="text-2xl md:text-4xl font-imperator text-[#007ebb]/10 uppercase px-6">
                                    {featuredProduct.name}
                                </h3>
                            </div>

                            {/* Discount Badge - Top Left */}
                            <div className="absolute top-8 md:top-18 left-0 z-40">
                                <div className="bg-[#00cc00] text-white text-[10px] md:text-xs font-bold px-3 md:px-4 py-1.5 rounded-r-full shadow-lg uppercase">
                                    {featuredProduct.discount || "40% OFF"}
                                </div>
                            </div>

                            {/* Product Image Container - Center */}
                            <div className="absolute inset-0 flex items-center justify-center pt-16 pb-8 px-6 md:px-8 z-10">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Podium Layer - Behind Product */}
                                    <img
                                        src="/assets/home/podium.webp"
                                        alt="podium"
                                        className="absolute bottom-[-30px] md:bottom-[-40px] w-[120%] md:w-[120%] max-w-none object-contain select-none pointer-events-none opacity-75 z-0" />

                                    {/* Product Image - With Enhanced Shadow */}
                                    <img
                                        src={featuredProduct.image}
                                        alt={featuredProduct.name}
                                        className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-all duration-700 ease-out"
                                        style={{
                                            filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.25)) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15))'
                                        }} />
                                </div>
                            </div>

                            {/* See Details Button - Bottom Center */}
                            <div className="absolute bottom-6 md:bottom-4 left-0 right-0 flex justify-center z-40 px-6">
                                <button className="w-full max-w-[160px] md:max-w-[180px] bg-[#007ebb] text-white py-2 md:py-2.5 rounded-full font-bold shadow-xl hover:bg-dark transition-all transform hover:scale-105 active:scale-95 text-sm md:text-base flex items-center justify-center gap-2">
                                    See Details
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Carousel */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        <div className={`flex flex-col gap-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                            <h3 className="text-4xl md:text-4xl font-imperator text-dark leading-tight lowercase first-letter:uppercase">
                                {featuredProduct.type || 'VV'}
                            </h3>
                            <p className="text-base md:text-lg text-[#282828] leading-relaxed max-w-4xl font-normal text-justify">
                                {featuredProduct.description}
                            </p>

                            {/* Navigation Arrows */}
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={prevProduct}
                                    className="bg-white text-dark w-12 h-12 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100 flex items-center justify-center group">
                                    <ChevronFirst size={24} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
                                </button>
                                <button
                                    onClick={nextProduct}
                                    className="bg-white text-dark w-12 h-12 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center group">
                                    <ChevronLast size={24} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Product Selection Carousel */}
                        <div className="relative group/slider">
                            <div
                                ref={sliderRef}
                                className="flex overflow-x-auto gap-5 pb-8 scrollbar-hide snap-x snap-mandatory no-scrollbar scroll-smooth"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {activeCategory.products
                                    .map((product, originalIndex) => ({ product, originalIndex }))
                                    .filter((item) => item.originalIndex !== currentIndex)
                                    .map(({ product, originalIndex }) => (
                                        <div
                                            key={product.id}
                                            onClick={() => handleProductChange(originalIndex)}
                                            className="min-w-[190px] md:min-w-[220px] bg-white rounded-[24px] p-5 shadow-sm border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center snap-start relative group/card">
                                            <div className="w-full relative flex justify-center items-center mb-3 px-2">
                                                <span className="text-sm font-bold text-dark/90 font-imperator truncate max-w-[150px] text-center">
                                                    {product.name}
                                                </span>
                                                <button
                                                    className="absolute right-0 text-gray-300 hover:text-red-400 transition-colors duration-300"
                                                    onClick={(e) => { e.stopPropagation(); }}>
                                                    <Heart size={18} fill="none" />
                                                </button>
                                            </div>

                                            <div className="aspect-square w-full mb-4 overflow-hidden rounded-2xl bg-[#f8fbff] flex items-center justify-center p-4 relative">
                                                <img
                                                    src={product.image}
                                                    className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-110"
                                                    alt={product.name} />
                                            </div>

                                            <div className="flex w-full gap-2 mt-auto">
                                                <button className="flex-1 py-2 px-1 pb-1.5 bg-transparent border border-gray-200 rounded-lg text-[11px] font-semibold text-dark hover:bg-gray-200 transition-colors">
                                                    Add to Cart
                                                </button>
                                                <button className="flex-1 py-2 px-1 pb-1.5 bg-[#00cc00] rounded-lg text-[11px] font-semibold text-white hover:bg-green-600 transition-colors">
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
