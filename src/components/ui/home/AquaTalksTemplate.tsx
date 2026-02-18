import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

    const handleCardClick = (id: number | string) => {
        navigate(`/blog/${id}`);
    };

    return (
        <section className="w-full bg-[#f4faff] py-8 md:py-8 px-4 md:px-8 mt-8 mb-12 font-outfit overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-center mb-8 px-4 relative">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl md:text-5xl lg:text-5xl font-imperator text-dark tracking-tight flex items-center gap-3">
                            Aqua
                            <span className="bg-[#007ebb] text-white px-4 pt-4 py-1.5 rounded-tl-[15px] rounded-bl-[15px] flex items-center justify-center leading-none">
                                Talks
                            </span>
                        </h2>
                    </div>

                    <button className="md:absolute md:right-4 bg-[#007ebb] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#006699] transition-all flex items-center justify-center text-lg mt-4 md:mt-0">
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

                                {/* Scooped Corner Effect for Arrow Button */}
                                <div className="absolute bottom-0 right-0 z-10 scale-90 md:scale-100 origin-bottom-right">
                                    <div className="relative w-24 h-24 md:w-28 md:h-28 bg-white rounded-tl-[35px] shadow-[-8px_8px_30px_rgba(0,0,0,0.08)]">
                                        {/* Inverted Radii for the scoop */}
                                        <div className="absolute -top-[35px] right-0 w-[35px] h-[35px] bg-transparent shadow-[20px_20px_0_20px_#fff]"></div>
                                        <div className="absolute bottom-0 -left-[35px] w-[35px] h-[35px] bg-transparent shadow-[20px_20px_0_20px_#fff]"></div>

                                        {/* The Button */}
                                        <div className="absolute bottom-4 right-4 w-14 h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center text-white transition-all hover:bg-[#007ebb] shadow-lg group/btn">
                                            <ArrowUpRight strokeWidth={2.5} size={32} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
