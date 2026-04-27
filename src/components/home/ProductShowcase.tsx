import { ChevronFirst, ChevronLast, Heart, PackageSearch } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeService } from '../../services/home/homeService';
import { getImageUrl } from '../../config/apiConfig';
import ProductShowcaseSkeleton from '../ui/skeletons/ProductShowcaseSkeleton';

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    discount?: string;
    price?: string;
    type?: string;
}


const STATIC_TABS = [
    { id: 'domestic', name: 'Domestic' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'industry', name: 'Industry' }
];

const ProductShowcase: React.FC = () => {
    const [activeTab, setActiveTab] = useState('domestic');
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { setActiveId } = useHighlight();
    const { toggleCheckout } = useCart();
    const navigate = useNavigate();

    // Fetch products when activeTab changes
    useEffect(() => {
        const fetchProducts = async () => {
            // Initial load uses 'loading' for skeleton, subsequent switches use 'productsLoading' for spinner
            if (loading) setLoading(true);
            else setProductsLoading(true);

            try {
                // The backend is now case-insensitive, so we can pass 'domestic', 'commercial', etc.
                const response = await homeService.getShowcaseProducts(activeTab);
                
                if (response.success && Array.isArray(response.data)) {
                    const mappedProducts: Product[] = response.data.map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        description: p.description || 'Quality purification system ensuring clean and safe water for your needs.',
                        image: getImageUrl(p.images?.[0]),
                        discount: p.discount ? `${p.discount}% OFF` : undefined,
                        price: p.price ? `₹${p.price}` : undefined,
                        type: p.brand || 'Sony'
                    }));
                    setDisplayProducts(mappedProducts);
                } else {
                    setDisplayProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setDisplayProducts([]);
            } finally {
                setLoading(false);
                setProductsLoading(false);
            }
        };

        fetchProducts();
    }, [activeTab]);

    if (loading) return <ProductShowcaseSkeleton />;

    const featuredProduct = displayProducts[0];
    const carouselProducts = displayProducts.slice(1);

    const handleProductChange = (targetId: string) => {
        const targetIndex = displayProducts.findIndex(p => p.id === targetId);
        if (targetIndex === 0) return;
        const newOrder = [...displayProducts.slice(targetIndex), ...displayProducts.slice(0, targetIndex)];
        setDisplayProducts(newOrder);
    };

    const nextProduct = () => {
        if (displayProducts.length <= 1) return;
        const newOrder = [...displayProducts.slice(1), displayProducts[0]];
        setDisplayProducts(newOrder);
    };

    const prevProduct = () => {
        if (displayProducts.length <= 1) return;
        const newOrder = [displayProducts[displayProducts.length - 1], ...displayProducts.slice(0, -1)];
        setDisplayProducts(newOrder);
    };

    return (
        <section className="w-full bg-[#f1f8ff] py-16 px-4 md:px-8 font-josefin overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 px-4">
                    <motion.div
                        onViewportEnter={() => setActiveId('product-showcase-heading')}
                        viewport={{ amount: 0.5 }}
                        className="flex flex-nowrap items-center justify-center gap-6 mb-10">
                        <h2 className="pt-4 text-2xl sm:text-3xl md:text-4xl font-imperator text-dark tracking-tight">
                            Choose
                        </h2>
                        <FloatingHighlight
                            id="product-showcase-heading"
                            boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-lg"
                            className="text-2xl sm:text-3xl md:text-4xl font-imperator tracking-tight px-6 md:px-6 pt-4 pb-2">
                            Your Pure Solution
                        </FloatingHighlight>
                    </motion.div>

                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 relative max-w-5xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center bg-white rounded-3xl md:rounded-full border border-black/5">
                            {STATIC_TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 md:px-10 py-2 md:py-4 rounded-full text-md md:text-2xl font-semibold transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-[#3d3d3d] text-white shadow-xl'
                                        : 'bg-white text-[#3E3E3E] hover:text-dark'
                                        }`}>
                                    {tab.name}
                                </button>
                            ))}
                        </div>

                        <div className="lg:absolute lg:right-[-100px]">
                            <button
                                onClick={() => {
                                    const paths: Record<string, string> = {
                                        domestic: '/shop',
                                        commercial: '/commercial',
                                        industry: '/industry'
                                    };
                                    navigate(paths[activeTab] || '/shop');
                                }}
                                className="bg-[#007ebb] text-white px-6 py-2 rounded-full font-semibold hover:bg-dark transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base"
                            >
                                See More
                            </button>
                        </div>
                    </div>
                </div>

                {productsLoading ? (
                    <div className="opacity-50 pointer-events-none transition-opacity">
                         <div className="flex justify-center items-center py-20 min-h-[400px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007ebb]"></div>
                        </div>
                    </div>
                ) : displayProducts.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left Column: Featured Banner */}
                        <div className="lg:col-span-4 w-full px-4 md:px-0">
                            <div className={`relative w-full h-[480px] sm:h-[520px] md:h-[560px] rounded-[15px] md:rounded-[15px] overflow-hidden group transition-all duration-500`}>
                                <div className="absolute inset-0 z-0 bg-[#C8E1EC]"></div>
                                <div className="absolute top-6 md:top-8 left-0 right-0 text-center z-20 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.h3
                                            key={featuredProduct.id + '-name'}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            className="text-2xl sm:text-3xl md:text-4xl font-imperator text-[#ffffff]/80 uppercase px-6"
                                        >
                                            {featuredProduct.name}
                                        </motion.h3>
                                    </AnimatePresence>
                                </div>
                                <div className="absolute top-16 md:top-18 left-0 z-40">
                                    <div className="bg-[#00cc00] text-white text-[12px] sm:text-[14px] md:text-sm font-semibold px-3 md:px-3 py-1 rounded-r-[5px] shadow-lg uppercase">
                                        {featuredProduct.discount || "40% OFF"}
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pt-12 sm:pt-16 pb-8 px-4 sm:px-6 md:px-8 z-10 w-full h-full">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <img src="/assets/home/podium.webp" alt="podium" className="absolute bottom-[-30px] md:bottom-[-120px] lg:bottom-[-40px] w-[110%] md:w-[110%] lg:w-[120%] max-w-none object-contain select-none pointer-events-none opacity-75 z-0" />
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                layoutId={`product-image-${featuredProduct.id}`}
                                                key={featuredProduct.id}
                                                src={featuredProduct.image}
                                                alt={featuredProduct.name}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                className="relative bottom-0 sm:bottom-0 md:bottom-8 lg:bottom-4 z-10 w-[240px] h-[240px] sm:w-[180px] sm:h-[180px] md:w-[260px] md:h-[300px] object-contain"
                                                style={{ filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.25)) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15))' }}
                                                whileHover={{ scale: 1.02 }}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/assets/home/aqu-banner.png';
                                                }}
                                            />
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-linear-to-t from-[#EAF8FF] via-[#EAF8FF]/80 to-transparent z-30 pointer-events-none rounded-b-[15px]"></div>
                                <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center z-40 px-6">
                                    <button 
                                        onClick={() => {
                                            const cartItem: any = {
                                                id: featuredProduct.id,
                                                name: featuredProduct.name,
                                                description: featuredProduct.description,
                                                price: parseInt(featuredProduct.price?.replace(/[^\d]/g, '') || '0'),
                                                image: featuredProduct.image,
                                                quantity: 1,
                                                rating: 4.5,
                                                reviewsCount: "0",
                                                discount: featuredProduct.discount
                                            };
                                            toggleCheckout(true, cartItem);
                                        }}
                                        className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] bg-[#007ebb] text-white py-2 md:py-2.5 rounded-full font-semibold shadow-xl hover:bg-dark transition-all transform hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-lg flex items-center justify-center gap-2"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Details & Carousel */}
                        <div className="lg:col-span-8 flex flex-col gap-12">
                            <div className="flex flex-col gap-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={featuredProduct.id + '-content'}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="flex flex-col gap-2"
                                    >
                                        <h3 className="text-3xl md:text-4xl font-imperator text-[#3E3E3E] leading-tight lowercase first-letter:uppercase">
                                            {featuredProduct.type || 'VV'}
                                        </h3>
                                        <p className="text-base md:text-lg text-[#282828] leading-relaxed max-w-4xl font-normal text-justify">
                                            {featuredProduct.description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={prevProduct}
                                        className="bg-white text-dark w-12 h-12 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100 flex items-center justify-center group">
                                        <ChevronFirst size={20} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
                                    </button>
                                    <button
                                        onClick={nextProduct}
                                        className="bg-white text-dark w-12 h-12 rounded-full shadow-md hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center group">
                                        <ChevronLast size={20} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Product Selection Carousel */}
                            <div className="relative group/slider">
                                {carouselProducts.length > 0 ? (
                                    <div
                                        ref={sliderRef}
                                        className="flex overflow-x-auto gap-5 pb-8 scrollbar-hide snap-x snap-mandatory no-scrollbar scroll-smooth"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        {carouselProducts.map((product) => (
                                            <motion.div
                                                layout
                                                key={product.id}
                                                onClick={() => handleProductChange(product.id)}
                                                className="w-[170px] md:w-[240px] shrink-0 bg-white rounded-[24px] p-5 border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center snap-start relative group/card">
                                                <div className="w-full relative flex justify-center items-center mb-3 px-2">
                                                    <span className="text-sm font-bold text-dark font-imperator truncate max-w-[150px] text-center">
                                                        {product.name}
                                                    </span>
                                                    <button
                                                        className="absolute right-0 text-gray-300 hover:text-red-400 transition-colors duration-300"
                                                        onClick={(e) => { e.stopPropagation(); }}>
                                                        <Heart size={18} fill="none" />
                                                    </button>
                                                </div>

                                                <div className="aspect-square w-full mb-4 overflow-hidden rounded-2xl flex items-center justify-center p-6 relative">
                                                    <motion.img
                                                        layoutId={`product-image-${product.id}`}
                                                        src={product.image}
                                                        className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                                                        alt={product.name}
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/assets/home/aqu-banner.png';
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex w-full gap-2 mt-auto">
                                                    {/* <button className="flex-1 py-1 px-1 pb-1 bg-transparent border border-[#515151] rounded-lg text-[11px] font-semibold text-[#515151] hover:bg-gray-200 transition-colors">
                                                        Add to Cart
                                                    </button> */}
                                                    <button 
                                                        className="flex-1 py-1 px-1 pb-1 bg-[#00cc00] rounded-lg text-[11px] font-semibold text-white hover:bg-[#1DAC00] transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const cartItem: any = {
                                                                id: product.id,
                                                                name: product.name,
                                                                description: product.description,
                                                                price: parseInt(product.price?.replace(/[^\d]/g, '') || '0'),
                                                                image: product.image,
                                                                quantity: 1,
                                                                rating: 4.5,
                                                                reviewsCount: "0",
                                                                discount: product.discount
                                                            };
                                                            toggleCheckout(true, cartItem);
                                                        }}
                                                    >
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 px-8 bg-white/50 border border-dashed border-gray-300 rounded-[30px]">
                                        <PackageSearch className="text-gray-400 mb-4" size={48} strokeWidth={1.5} />
                                        <h4 className="text-xl font-imperator text-gray-600 mb-2">Exclusive Selection</h4>
                                        <p className="text-sm text-gray-500 text-center max-w-sm">
                                            We are currently curating more premium products for this category. Stay tuned for our latest arrivals.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 px-4 text-center"
                    >
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 max-w-2xl">
                            <PackageSearch className="text-[#007ebb] mx-auto mb-6" size={64} strokeWidth={1} />
                            <h3 className="text-3xl font-imperator text-[#3d3d3d] mb-4">Discover Pure Excellence</h3>
                            <p className="text-lg text-gray-600 leading-relaxed font-josefin mb-8">
                                Explore our wide range of premium water purification solutions. We are currently updating our inventory for this category - stay tuned for exciting additions and pure innovations!
                            </p>
                            <button 
                                onClick={() => navigate('/shop')}
                                className="bg-[#007ebb] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-dark transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 mx-auto"
                            >
                                Explore All Products
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ProductShowcase;
