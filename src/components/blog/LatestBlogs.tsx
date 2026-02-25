import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

interface BlogMetadata {
    id: number | string;
    image: string;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
    };
    date: string;
    comments: number;
    readTime: string;
    tags: string[];
}

const HorizontalBlogCard: React.FC<{ blog: BlogMetadata; size: 'large' | 'small' }> = ({ blog, size }) => {
    const isLarge = size === 'large';
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/blog/${blog.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-[30px] md:rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col md:flex-row gap-0"
        >
            {/* Image Section - Edge to Edge */}
            <div className={`shrink-0 overflow-hidden ${isLarge ? 'md:w-[45%] aspect-4/3 md:aspect-auto' : 'md:w-[45%] aspect-4/3 md:aspect-auto'}`}>
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Content Section - Balanced Padding */}
            <div className={`flex flex-col justify-center flex-1 ${isLarge ? 'p-8 md:p-10 lg:p-14' : 'p-6 md:p-8'}`}>
                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    {blog.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`px-4 py-1.5 pt-2.5 rounded-lg text-[14px] font-josefin font-medium tracking-wider ${tag === 'Trending' ? 'bg-[#00abff] text-white' : 'bg-white text-dark shadow-xl'}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className={`font-semibold text-dark  group-hover:text-[#007ebb] transition-colors font-josefin mb-3 ${isLarge ? 'text-2xl md:text-3xl lg:text-4xl md:leading-[45px]' : 'text-base md:text-lg'}`}>
                    {blog.title}
                </h3>

                {/* Description */}
                <p className={`text-black  font-josefin font-light line-clamp-4 text-justify ${isLarge ? 'text-sm md:text-base lg:text-xl mb-8 md:leading-[25px]' : 'text-xs md:text-sm mb-4'}`}>
                    {blog.description}
                </p>

                {/* Metadata */}
                <div className={`flex flex-wrap items-center mt-auto ${isLarge ? 'gap-8 text-base' : 'gap-4 text-sm'} text-black font-josefin`}>
                    <div className="flex items-center gap-3">
                        <img src={blog.author.avatar} alt={blog.author.name} className={`${isLarge ? 'w-10 h-10 md:w-14 md:h-14' : 'w-8 h-8 md:w-10 md:h-10'} rounded-full border border-gray-100 object-cover`} />
                        <span className="font-medium text-dark">{blog.author.name}, {blog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageCircle size={isLarge ? 24 : 14} className="text-black" />
                        <span>{blog.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={isLarge ? 24 : 14} className="text-black" />
                        <span>{blog.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LatestBlogs: React.FC = () => {
    const { setActiveId } = useHighlight();
    const latestBlogs: BlogMetadata[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1518173946687-a4c8a9b746f4?q=80&w=2187&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi.",
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
            image: "https://images.unsplash.com/photo-1548810931-e3b0ad88b5cf?q=80&w=2069&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi.",
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
            id: 3,
            image: "https://images.unsplash.com/photo-1518173946687-a4c8a9b746f4?q=80&w=2187&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi.",
            author: {
                name: "Giftson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
            },
            date: "4 Years Ago",
            comments: 3,
            readTime: "2 Mins",
            tags: ["Trending", "Health"]
        }
    ];

    return (
        <section className="w-full py-16 px-4 md:px-8 font-imperator">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    onViewportEnter={() => setActiveId('latest-blogs')}
                    viewport={{ amount: 0.5 }}
                    className="flex items-center justify-center gap-4 mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-4xl font-imperator text-dark font-medium pt-1">Latest</h2>
                    <FloatingHighlight
                        id="latest-blogs"
                        boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-xl shadow-blue-900/10"
                        className="pt-3 px-8 py-2 text-3xl md:text-4xl lg:text-4xl font-medium"
                    >
                        Blogs
                    </FloatingHighlight>
                </motion.div>

                {/* Grid Layout */}
                <div className="flex flex-col gap-10">
                    {/* Top Large Card */}
                    <HorizontalBlogCard blog={latestBlogs[0]} size="large" />

                    {/* Bottom Two Small Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <HorizontalBlogCard blog={latestBlogs[1]} size="small" />
                        <HorizontalBlogCard blog={latestBlogs[2]} size="small" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;
