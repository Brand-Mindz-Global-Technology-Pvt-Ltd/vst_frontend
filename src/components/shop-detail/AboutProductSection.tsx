import React from 'react';
import { motion } from 'framer-motion';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import type { Product } from '../../types/product';
import { getImageUrl } from '../../config/apiConfig';
import { Sparkles } from 'lucide-react';

interface AboutProductSectionProps {
    product: Product;
}

const AboutProductSection: React.FC<AboutProductSectionProps> = ({ product }) => {
    const { setActiveId } = useHighlight();

    const hasAboutData = product.aboutDescription || (product.aboutPoints && product.aboutPoints.length > 0);

    return (
        <section className="bg-white py-20 px-4 sm:px-10 md:px-20 font-josefin">
            <div className="max-w-[1440px] mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 px-4">
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-imperator tracking-tight text-dark pt-1"
                        >
                            About
                        </motion.h2>

                        <motion.div
                            onViewportEnter={() => setActiveId('about-product-heading')}
                            viewport={{ once: true }}
                        >
                            <FloatingHighlight
                                id="about-product-heading"
                                className="text-3xl md:text-5xl font-imperator tracking-tight px-6 pt-2 pb-1"
                            >
                                The Product
                            </FloatingHighlight>
                        </motion.div>
                    </div>
                    <div 
                        className="text-black text-lg md:text-xl text-justify font-light leading-relaxed max-w-5xl mx-auto"
                        dangerouslySetInnerHTML={{ __html: product.aboutDescription || product.description }}
                    />
                </div>

                {/* Cards Grid / Fallback */}
                {product.aboutPoints && product.aboutPoints.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {product.aboutPoints.slice(0, 3).map((point, index) => (
                            <div key={index} className="relative group overflow-hidden aspect-4/5 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm transition-all hover:shadow-xl">
                                {point.image ? (
                                    <img
                                        src={getImageUrl(point.image)}
                                        alt={point.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 italic">
                                        No Image Provided
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-transparent p-8 flex flex-col items-center text-center">
                                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4 drop-shadow-md">
                                        {point.title || "Premium Feature"}
                                    </h3>
                                    {/* <button className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#0077B6] hover:text-white transition-all transform active:scale-95">
                                        Shop now
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !hasAboutData ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6 bg-slate-50 rounded-[40px] border border-slate-100 text-center" id="about-fallback">
                        <Sparkles className="w-10 h-10 text-blue-500 mb-4 animate-pulse" />
                        <h4 className="text-2xl font-semibold text-gray-800 mb-2">Detailed View Coming Soon</h4>
                        <p className="text-gray-500 max-w-md mx-auto">
                            We are preparing a multi-dimensional look at this product's unique advantages. 
                            In the meantime, feel free to explore the features above.
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default AboutProductSection;
