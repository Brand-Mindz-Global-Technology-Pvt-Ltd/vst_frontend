import React from 'react';
import { ArrowUpRight, MessageCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

interface BlogMetadata {
    id: number | string;
    image: string;
    title: string;
    author: {
        name: string;
        avatar: string;
    };
    date: string;
    comments: number;
    readTime: string;
    tags: string[];
}

const FeaturedBlogCard: React.FC<{ blog: BlogMetadata; size: 'large' | 'small' }> = ({ blog, size }) => {
    const isLarge = size === 'large';
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/blog/${blog.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className={`relative group overflow-hidden rounded-[40px] cursor-pointer transition-all duration-500 hover:shadow-2xl ${isLarge ? 'h-[550px] md:h-[650px]' : 'h-[260px] md:h-[305px]'}`}
        >
            {/* Background Image */}
            <img
                src={blog.image}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content Container */}
            <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end ${isLarge ? 'pb-12 md:pb-16' : 'pb-8 md:pb-10'}`}>
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                    {blog.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`px-3 py-1 pt-2 rounded-[5px] text-[12px] font-josefin font-medium tracking-wider ${tag === 'Trending' ? 'bg-[#00abff] text-white' : 'bg-white text-dark border border-gray-200'}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className={`font-josefin text-white leading-tight group-hover:text-[#00abff] transition-colors ${isLarge ? 'text-2xl md:text-4xl max-w-2xl font-semibold' : 'text-lg md:text-xl max-w-md line-clamp-2'}`}>
                    {blog.title}
                </h3>

                {/* Metadata for Large Card */}
                {isLarge && (
                    <div className="flex flex-wrap items-center mt-6 gap-6 text-white text-[15px]">
                        <div className="flex items-center gap-3">
                            <img src={blog.author.avatar} alt={blog.author.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30" />
                            <span className="font-josefin text-sm md:text-base">{blog.author.name}, {blog.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageCircle size={24} className="text-white/80" />
                            <span className="font-josefin text-base md:text-lg">{blog.comments > 0 ? blog.comments : '0'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={24} className="text-white/80" />
                            <span className="font-josefin text-base md:text-lg">{blog.readTime}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Scooped Button Corner */}
            <div className="absolute bottom-0 right-0 z-10">
                <div className={`relative ${isLarge ? 'w-24 h-24 md:w-28 md:h-28' : 'w-16 h-16 md:w-20 md:h-20'} bg-white rounded-tl-[35px] md:rounded-tl-[50px] flex items-center justify-center`}>

                    {/* Inverted Radii for smooth curve */}
                    <div className={`absolute bottom-0 right-full ${isLarge ? 'w-10 h-10' : 'w-6 h-6'} overflow-hidden pointer-events-none`}>
                        <div className="w-full h-full rounded-br-[10px] shadow-[15px_15px_0_0_#fff]"></div>
                    </div>
                    <div className={`absolute bottom-full right-0 ${isLarge ? 'w-10 h-10' : 'w-6 h-6'} overflow-hidden pointer-events-none`}>
                        <div className="w-full h-full rounded-br-[10px] shadow-[15px_15px_0_0_#fff]"></div>
                    </div>

                    {/* The Button */}
                    <div className={`${isLarge ? 'w-16 h-16 md:w-20 md:h-20' : 'w-10 h-10 md:w-12 md:h-12'} ${isLarge ? 'bg-black' : 'bg-[#00abff]'} rounded-full flex items-center justify-center text-white transition-all hover:bg-[#007ebb] transform active:scale-95`}>
                        <ArrowUpRight size={isLarge ? 32 : 24} strokeWidth={2.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedBlogs: React.FC = () => {
    const { setActiveId } = useHighlight();
    const featuredBlogs: BlogMetadata[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
            title: "Why Every Home Needs a Water Purifier in 2025",
            author: {
                name: "Giftson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
            },
            date: "4 Years Ago",
            comments: 3,
            readTime: "2 Mins",
            tags: ["Trending", "Health"]
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1500&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            author: { name: "System", avatar: "" },
            date: "",
            comments: 0,
            readTime: "",
            tags: ["Trending", "Health"]
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1500&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            author: { name: "System", avatar: "" },
            date: "",
            comments: 0,
            readTime: "",
            tags: ["Trending", "Health"]
        }
    ];

    return (
        <section className="w-full bg-[#ffffff] py-16 px-4 md:px-8 font-josefin">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    onViewportEnter={() => setActiveId('featured-blogs')}
                    viewport={{ amount: 0.5 }}
                    className="flex items-center justify-center gap-4 mb-14"
                >
                    <FloatingHighlight
                        id="featured-blogs"
                        boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-xl shadow-blue-900/10"
                        className="pt-2 px-8 py-1 text-3xl md:text-4xl lg:text-4xl font-medium font-imperator"
                    >
                        Main
                    </FloatingHighlight>
                    <h2 className="text-3xl md:text-4xl lg:text-4xl font-imperator text-dark font-medium pt-1">Blog</h2>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                    {/* Large Featured Card (Span 7) */}
                    <div className="lg:col-span-7">
                        <FeaturedBlogCard blog={featuredBlogs[0]} size="large" />
                    </div>

                    {/* Smaller Stacked Cards (Span 5) */}
                    <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
                        <FeaturedBlogCard blog={featuredBlogs[1]} size="small" />
                        <FeaturedBlogCard blog={featuredBlogs[2]} size="small" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlogs;
