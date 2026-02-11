import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    discount?: string;
    price?: string;
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
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                image: 'https://images.unsplash.com/photo-1585707348160-24bc0281b37e?q=80&w=2000&auto=format&fit=crop',
                discount: '40% OFF',
            },
            {
                id: 2,
                name: 'Aqua Guard X',
                description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074&auto=format&fit=crop',
            },
            {
                id: 3,
                name: 'Pure Flow 500',
                description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                image: 'https://images.unsplash.com/photo-1581092921461-7026814b713b?q=80&w=2070&auto=format&fit=crop',
            },
            {
                id: 4,
                name: 'Hydro Smart',
                description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1974&auto=format&fit=crop',
            },
            {
                id: 5,
                name: 'Eco Pure Max',
                description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                image: 'https://images.unsplash.com/photo-1600880212319-78443973a116?q=80&w=2070&auto=format&fit=crop',
            },
            {
                id: 8,
                name: 'Aqua Pure Pro',
                description: 'Advanced filtration system for modern homes.',
                image: 'https://images.unsplash.com/photo-1585707348160-24bc0281b37e?q=80&w=2000&auto=format&fit=crop',
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
                description: 'High-capacity industrial water purification system.',
                image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1974&auto=format&fit=crop',
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
                description: 'Mega-scale purification for industrial processing plants.',
                image: 'https://images.unsplash.com/photo-1600880212319-78443973a116?q=80&w=2070&auto=format&fit=crop',
            },
        ],
    },
];

const ProductShowcase: React.FC = () => {
    const [activeTab, setActiveTab] = useState('domestic');
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0];
    const featuredProduct = activeCategory.products[currentIndex];

    // Slide function for the product grid
    const slide = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 200; // Adjust as needed
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="w-full bg-[#f1f8ff] py-16 px-4 md:px-8 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16">
                    <div className="flex items-center gap-2 mb-8">
                        <h2 className="text-3xl md:text-5xl font-serif text-dark tracking-tight">
                            Choose
                        </h2>
                        {/* Perfected Header Corners */}
                        <div className="bg-[#007ebb] px-6 md:px-10 py-2.5 rounded-tl-3xl rounded-bl-3xl rounded-tr-md rounded-br-md shadow-lg">
                            <h2 className="text-2xl md:text-4xl font-serif italic text-white tracking-tight">
                                Your Pure Solution
                            </h2>
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 relative">
                        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden p-0.5">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveTab(cat.id);
                                        setCurrentIndex(0);
                                    }}
                                    className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 min-w-[140px] ${activeTab === cat.id
                                        ? 'bg-[#3d3d3d] text-white shadow-xl'
                                        : 'bg-transparent text-gray-400 hover:text-dark'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="md:absolute md:right-0">
                            <button className="bg-[#007ebb] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-dark transition-all transform hover:scale-105 active:scale-95">
                                See More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Featured Card */}
                    <div className="lg:col-span-4 flex flex-col items-center">
                        <div className="relative w-full aspect-4/5 bg-white rounded-[40px] shadow-2xl overflow-hidden p-8 group transition-all duration-500 border border-white/50 bg-linear-to-t from-[#f1fafe] to-white">
                            <div className="text-center mb-4">
                                <h3 className="text-3xl md:text-4xl font-serif text-gray-200 group-hover:text-[#007ebb]/10 transition-colors duration-500">
                                    {featuredProduct.name}
                                </h3>
                            </div>

                            <div className="relative h-3/5 flex items-center justify-center -mt-8">
                                <div className="absolute bottom-[-10%] w-4/5 h-20 bg-[#007ebb]/10 rounded-[50%] blur-2xl transform scale-y-50"></div>
                                <div className="absolute bottom-[-5%] w-3/4 h-14 bg-white/20 rounded-[50%] shadow-[0_15px_30px_rgba(0,126,187,0.15)] ring-1 ring-[#007ebb]/10"></div>

                                <img
                                    src={featuredProduct.image}
                                    alt={featuredProduct.name}
                                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Offer Badge - Repositioned to Top-ish per user request */}
                            <div className="absolute top-20 left-8">
                                <div className="bg-[#00cc00] text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                                    {featuredProduct.discount || "40% OFF"}
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                                <button className="bg-[#007ebb] text-white px-6 py-2 rounded-full font-bold shadow-xl hover:bg-dark transition-all transform hover:scale-105 active:scale-95 text-lg">
                                    See Details
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Grid */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-4xl md:text-5xl font-serif text-dark leading-tight">
                                {featuredProduct.name === 'Fiji Aqua Pro' ? 'VV' : featuredProduct.name}
                            </h3>
                            <p className="text-lg md:text-xl text-dark/70 leading-relaxed max-w-4xl font-normal text-justify">
                                {featuredProduct.description}
                            </p>

                            {/* Slider Navigation Arrows - Now for sliding the product grid */}
                            <div className="flex gap-4 mt-2">
                                <button
                                    onClick={() => slide('left')}
                                    className="bg-white text-dark p-3 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100 flex items-center justify-center"
                                >
                                    <ChevronLeft size={24} strokeWidth={4} />
                                </button>
                                <button
                                    onClick={() => slide('right')}
                                    className="bg-[#007ebb] text-white p-3 rounded-full shadow-xl shadow-[#007ebb]/20 hover:bg-dark transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center"
                                >
                                    <ChevronRight size={24} strokeWidth={4} />
                                </button>
                            </div>
                        </div>

                        {/* Product Slider Grid */}
                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x snap-mandatory no-scrollbar"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {activeCategory.products.map((product, idx) => (
                                <div
                                    key={product.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`min-w-[180px] bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center snap-start ${currentIndex === idx ? 'border-[#007ebb] shadow-xl' : 'border-transparent hover:border-gray-100 hover:shadow-md'
                                        }`}
                                >
                                    <div className="w-full flex justify-between items-center mb-2 px-1">
                                        <span className="text-[11px] font-bold text-dark/80 truncate">
                                            {product.name}
                                        </span>
                                        <button className={`${currentIndex === idx ? 'text-red-500' : 'text-gray-200'} hover:text-red-500 transition-colors`}>
                                            <Heart size={14} fill={currentIndex === idx ? "currentColor" : "none"} />
                                        </button>
                                    </div>

                                    <div className="aspect-square w-full mb-3 overflow-hidden rounded-xl bg-[#f8fbff] flex items-center justify-center p-3 relative">
                                        <img
                                            src={product.image}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            alt={product.name}
                                        />
                                    </div>

                                    <div className="flex w-full gap-1.5 mt-auto">
                                        <button className="flex-1 py-1.5 px-1 bg-[#efefef] rounded-md text-[9px] font-bold text-dark hover:bg-gray-200 transition-colors whitespace-nowrap">
                                            Add to Cart
                                        </button>
                                        <button className="flex-1 py-1.5 px-1 bg-[#00cc00] rounded-md text-[9px] font-bold text-white hover:bg-green-600 transition-colors whitespace-nowrap">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
