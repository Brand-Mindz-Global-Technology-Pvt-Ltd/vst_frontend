import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHighlight } from '../../../context/HighlightContext';
import FloatingHighlight from '../framer/FloatingHighlight';
import { motion } from 'framer-motion';

export interface BlogData {
    id: number | string;
    image: string;
    title: string;
    tags: string[];
    description: string;
    link?: string;
}

interface AquaTalksTemplateProps {
    blogs: BlogData[];
}

const AquaTalksTemplate: React.FC<AquaTalksTemplateProps> = ({ blogs }) => {
    const navigate = useNavigate();
    const { setActiveId } = useHighlight();

    const handleCardClick = (id: number | string) => {
        navigate(`/blog/${id}`);
    };

    return (
        <section className="w-full bg-[#ECF8FF] py-8 md:py-8 px-4 md:px-8 mt-8 mb-12 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-center mb-10 md:mb-12 px-4 relative gap-6 md:gap-0">
                    <motion.div
                        onViewportEnter={() => setActiveId('aqua-talks-heading')}
                        viewport={{ amount: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <h2 className="text-2xl md:text-4xl lg:text-4xl font-imperator text-dark tracking-tight flex items-center gap-3">
                            Aqua
                            <FloatingHighlight
                                id="aqua-talks-heading"
                                boxClassName="rounded-tl-[15px] rounded-bl-[15px]"
                                className="px-4 pt-3 pb-1.5 flex items-center justify-center leading-none">
                                Talks
                            </FloatingHighlight>
                        </h2>
                    </motion.div>

                    <button className="md:absolute md:right-4 bg-[#007ebb] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#006699] transition-all flex items-center justify-center text-lg md:text-xl shadow-md active:scale-95">
                        See More
                    </button>
                </div>

                {/* Cards Container - For Auto Scroll */}
                <div className="flex gap-8 overflow-x-auto pt-4 pb-12 scrollbar-hide snap-x snap-mandatory blog-scroll-container">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            onClick={() => handleCardClick(blog.id)}
                            className="min-w-[300px] md:min-w-[340px] lg:min-w-[360px] bg-white rounded-[25px] shadow-xl shadow-blue-900/5 group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 snap-center cursor-pointer"
                        >
                            {/* Image Section with Scooped Cutout */}
                            <div className="relative h-[250px] md:h-[300px] rounded-[20px] overflow-hidden mb-6">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* --- BOTTOM-RIGHT CONCAVE TAB (Hero-Style) --- */}
                                <div className="absolute bottom-0 right-0 z-10">
                                    <div className="relative bg-white pt-2 pb-1.5 sm:pt-2.5 sm:pb-2 md:pt-3 md:pb-2 pl-3 sm:pl-4 md:pl-4 pr-2 sm:pr-2.5 md:pr-3 rounded-tl-[20px] sm:rounded-tl-[25px] md:rounded-tl-[30px] flex items-center">

                                        {/* Scoop extending left along bottom edge */}
                                        <div className="absolute bottom-0 right-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 overflow-hidden pointer-events-none">
                                            <div className="w-full h-full rounded-br-[15px] sm:rounded-br-[18px] md:rounded-br-[20px] shadow-[8px_8px_0_0_#ffffff] sm:shadow-[10px_10px_0_0_#ffffff] md:shadow-[12px_12px_0_0_#ffffff]"></div>
                                        </div>

                                        {/* Scoop extending up along right edge */}
                                        <div className="absolute bottom-full right-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 overflow-hidden pointer-events-none">
                                            <div className="w-full h-full rounded-br-[15px] sm:rounded-br-[18px] md:rounded-br-[20px] shadow-[8px_8px_0_0_#ffffff] sm:shadow-[10px_10px_0_0_#ffffff] md:shadow-[12px_12px_0_0_#ffffff]"></div>
                                        </div>

                                        {/* Arrow Button */}
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center text-white transition-all hover:bg-[#007ebb] shadow-lg group/btn">
                                            <ArrowUpRight strokeWidth={2.5} size={28} className="sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="px-2 pb-4">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-dark leading-snug group-hover:text-[#007ebb] transition-colors inline font-josefin">
                                        {blog.title}{' '}
                                    </h3>
                                    <span className="inline-flex gap-2 align-middle ml-1">
                                        {blog.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className={`px-2 pt-1.5 py-1 rounded-[6px] text-[11px] whitespace-nowrap font-bold uppercase tracking-tight
                                                    ${i === 0 ? 'bg-[#00abff] text-white' : 'bg-black text-white'}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                </div>

                                <p className="text-black text-[15px] leading-relaxed line-clamp-3 font-jost">
                                    {blog.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
};

export default AquaTalksTemplate;
