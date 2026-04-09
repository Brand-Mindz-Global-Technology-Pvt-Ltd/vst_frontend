import { motion } from 'framer-motion';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import type { Product } from '../../types/product';

interface AboutProductSectionProps {
    product: Product;
}

const AboutProductSection: React.FC<AboutProductSectionProps> = ({ product }) => {
    const { setActiveId } = useHighlight();

    return (
        <section className="bg-#[3E3E3E] py-20 px-4 sm:px-10 md:px-20 font-josefin">
            <div className="max-w-[1440px] mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
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
                        className="text-black text-lg md:text-xl text-justify font-light"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="relative group overflow-hidden aspect-4/5 bg-gray-100">
                        <img
                            src="/assets/home/aqu-banner.png"
                            alt="Smart Purity"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-transparent p-8 flex flex-col items-center text-center">
                            <h3 className="text-white text-3xl font-bold leading-tight mb-4">
                                Smart Purity with<br />
                                <span className="text-white">Smart Power</span>
                            </h3>
                            <button className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#0077B6] hover:text-white transition-all">
                                Shop now
                            </button>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative group overflow-hidden aspect-4/5 bg-gray-100">
                        <img
                            src="/assets/home/family.webp"
                            alt="Germ-Free"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-transparent p-8 flex flex-col items-center text-center">
                            <h3 className="text-white text-3xl font-bold leading-tight mb-4">
                                100% Germ-Free<br />
                                <span className="text-white">Peace of Mind</span>
                            </h3>
                            <button className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#0077B6] hover:text-white transition-all">
                                Shop now
                            </button>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative group overflow-hidden aspect-4/5 bg-gray-100">
                        <img
                            src="/assets/home/commercial.png"
                            alt="Every Temperature"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-transparent p-8 flex flex-col items-center text-center">
                            <h3 className="text-white text-3xl font-bold leading-tight mb-4">
                                One Purifier<br />
                                <span className="text-white">Every Temperature</span>
                            </h3>
                            <button className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#0077B6] hover:text-white transition-all">
                                Shop now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutProductSection;
