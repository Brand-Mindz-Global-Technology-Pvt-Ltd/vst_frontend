import React, { useState, useRef } from 'react';
import type { Product } from '../../types/product';
import { getImageUrl } from '../../config/apiConfig';
import { Link } from 'react-router-dom';

interface ProductImageSectionProps {
    product: Product;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div className="h-full flex flex-col">
            {/* Breadcrumbs */}
            <div className="flex items-center mb-5 text-sm text-gray-500 font-medium font-josefin tracking-wide">
                <Link to="/shop" className="hover:text-[#007ebb] transition-colors">Shop</Link>
                <span className="mx-2 text-gray-300">/</span>
                <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="capitalize hover:text-[#007ebb] transition-colors">{product.category}</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-dark font-bold truncate max-w-[150px] sm:max-w-none">{product.name}</span>
            </div>

            <div className="bg-[#EAF8FF] rounded-[40px] overflow-hidden relative flex items-center justify-center p-6 sm:p-12 min-h-[400px] sm:min-h-[500px] border border-white/60 shadow-inner">
                {/* 99.9% Badge */}
                {product.badge99 && (
                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10 scale-90 sm:scale-100 origin-top-left">
                        <div className="flex items-start gap-2">
                            <img src="/assets/shopdetail/icons/guarantee.png" className="w-8 h-8 sm:w-10 sm:h-10" alt="" />
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-4xl font-black font-josefin leading-none text-dark">99.9%</span>
                                <span className="text-[9px] sm:text-[14px] font-bold font-josefin text-gray-500 uppercase tracking-tighter">Guarantee pure water</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 10X Badge */}
                {product.badge10x && (
                    <div className="absolute top-4 right-10 sm:top-8 sm:right-10 z-10 text-left scale-90 sm:scale-100 origin-top-right">
                        <div className="flex items-start gap-2">
                            <img src='/assets/shopdetail/icons/watercheck.png' className='w-8 h-8 sm:w-11 sm:h-11' alt='' />
                            <div className='flex flex-col'>
                                <span className='text-xl sm:text-4xl font-black font-josefin leading-none text-dark'>10X</span>
                                <span className="text-[10px] sm:text-[14px] font-bold font-josefin text-gray-500 leading-tight uppercase tracking-tighter">
                                    More effective <br className="hidden sm:block" />impurities removal
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Product Image with Zoom */}
                <div 
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    className="relative w-full h-full mt-10 sm:mt-16 flex items-center justify-center cursor-zoom-in group"
                >
                    <div className="relative z-10 w-full max-w-[300px] sm:max-w-[450px] aspect-square overflow-hidden rounded-2xl transition-transform duration-500 group-hover:shadow-2xl">
                        <img
                            src={getImageUrl(product.images?.[selectedImage])}
                            alt={product.name}
                            style={{
                                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                transform: isZooming ? 'scale(2)' : 'scale(1)',
                            }}
                            className="w-full h-full object-contain transition-transform duration-200 ease-out"
                        />
                    </div>
                    {/* Podium */}
                    <img
                        src="/assets/home/podium.webp"
                        alt="podium"
                        className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[110%] opacity-30 z-0 pointer-events-none transition-opacity group-hover:opacity-10"
                    />
                </div>

                {/* Smoke/Mist Effect (CSS implementation) */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-white/30 to-transparent pointer-events-none z-20"></div>

                {/* Nav Buttons */}
                {product.images && product.images.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:bg-white transition-all z-30"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button
                            onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:bg-white transition-all z-30"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail Navigation */}
            <div className={`flex gap-3 sm:gap-4 mt-6  no-scrollbar pb-2 ${product.images && product.images.length > 0 ? 'justify-center' : ''}`}>
                {product.images?.map((image, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-14 h-14 sm:w-20 sm:h-20 aspect-square bg-[#000000] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#007EBB] transition-all relative shrink-0 ${selectedImage === i ? 'ring-2 ring-[#007EBB]' : ''}`}
                    >
                        <img
                            src={getImageUrl(image)}
                            alt={`${product.name} ${i + 1}`}
                            className="w-full h-full object-contain p-1.5 sm:p-2 relative z-10"
                        />
                        <img
                            src="/assets/home/podium.webp"
                            alt="podium"
                            className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[110%] opacity-40 z-0"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImageSection;
