import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

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
    return (
        <section className="w-full bg-[#f4faff] py-16 md:py-24 px-4 md:px-8 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 px-4">
                    <div className="flex items-center gap-2 justify-center w-full">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-dark tracking-tight flex items-center gap-3 text-center">
                            Aqua
                            <span className="bg-[#007ebb] text-white px-5 py-1 rounded-[10px] transform -rotate-1">
                                Talks
                            </span>
                        </h2>
                    </div>

                    <button className="bg-[#007ebb] text-white px-8 py-3 rounded-full font-medium hover:bg-[#006699] transition-all flex items-center gap-2 shadow-lg shadow-blue-900/10 group">
                        See More
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Cards Container - For Auto Scroll */}
                <div className="flex gap-6 overflow-x-auto pt-12 pb-12 scrollbar-hide snap-x snap-mandatory blog-scroll-container">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="min-w-[280px] md:min-w-[320px] lg:min-w-[320px] bg-white rounded-[40px] p-4 shadow-xl shadow-blue-900/5 group hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 snap-center cursor-pointer"
                        >
                            {/* Image Section with Scooped Cutout */}
                            <div className="relative h-[240px] md:h-[280px] -mx-4 -mt-4 rounded-[15px] overflow-hidden mb-6">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Scooped Corner Effect for Arrow Button */}
                                <div className="absolute bottom-0 right-0 z-10">
                                    {/* The Inverted Radius Background Piece */}
                                    <div className="absolute bottom-0 right-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-tl-[30px] md:rounded-tl-[30px] transition-transform duration-500 group-hover:scale-105 origin-bottom-right shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                                        {/* Inverted Radius Top */}
                                        <div className="absolute -top-[30px] right-0 w-[30px] h-[30px] bg-transparent shadow-[15px_15px_0_15px_#fff]"></div>
                                        {/* Inverted Radius Left */}
                                        <div className="absolute bottom-0 -left-[30px] w-[30px] h-[30px] bg-transparent shadow-[15px_15px_0_15px_#fff]"></div>

                                        {/* The Button */}
                                        <div className="absolute bottom-4 right-4 w-12 h-12 md:w-14 md:h-14 bg-black rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#007ebb] transition-all shadow-lg group/btn">
                                            <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="px-2 pb-2">
                                <div className="mb-4">
                                    <h3 className="text-lg md:text-xl font-bold text-dark leading-tight group-hover:text-[#007ebb] transition-colors inline">
                                        {blog.title}{' '}
                                    </h3>
                                    <span className="inline-flex gap-2 align-middle">
                                        {blog.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className={`px-3 py-0.5 rounded-full text-[10px] whitespace-nowrap font-bold uppercase tracking-wider
                                                    ${tag.toLowerCase() === 'trending' ? 'bg-[#00abff] text-white' : 'bg-black text-white'}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
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
