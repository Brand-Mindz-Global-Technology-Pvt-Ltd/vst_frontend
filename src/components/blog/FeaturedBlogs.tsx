import React from 'react';
import { ArrowUpRight, MessageCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
            className={`relative group overflow-hidden rounded-[20px] cursor-pointer shadow-lg transition-all duration-500 hover:shadow-2xl ${isLarge ? 'h-[550px] md:h-[680px]' : 'h-[260px] md:h-[325px]'}`}
        >
            {/* Background Image */}
            <img
                src={blog.image}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 ${isLarge ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'}`}></div>

            {/* Content Container */}
            <div className={`absolute inset-0 p-6 md:p-10 flex flex-col justify-end ${isLarge ? 'pb-16' : 'pb-10'}`}>
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                    {blog.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`px-3 py-1 pt-2 rounded-[5px] text-[11px] font-bold tracking-wider ${tag === 'Trending' ? 'bg-[#00abff] text-white' : 'bg-white text-black'}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className={`font-semibold text-white leading-tight group-hover:text-[#00abff] transition-colors ${isLarge ? 'text-2xl md:text-4xl max-w-2xl font-josefin' : 'text-xl md:text-2xl line-clamp-2'}`}>
                    {blog.title}
                </h3>

                {/* Metadata for Large Card */}
                {isLarge && (
                    <div className="flex flex-wrap items-center gap-6 text-white/80 text-[15px]">
                        <div className="flex items-center gap-3">
                            <img src={blog.author.avatar} alt={blog.author.name} className="w-12 h-12 rounded-full border border-white/30" />
                            <span className="font-medium text-white">{blog.author.name}, {blog.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MessageCircle size={18} />
                            <span>{blog.comments}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={18} />
                            <span>{blog.readTime}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Scooped Button Corner */}
            <div className="absolute bottom-0 right-0 z-10">
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-tl-[35px] flex items-center justify-center shadow-[-5px_-5px_20px_rgba(0,0,0,0.1)]">
                    {/* Inverted Radii for smooth curve */}
                    <div className="absolute -top-[35px] right-0 w-[35px] h-[35px] bg-transparent shadow-[15px_15px_0_15px_#fff] pointer-events-none"></div>
                    <div className="absolute bottom-0 -left-[35px] w-[35px] h-[35px] bg-transparent shadow-[15px_15px_0_15px_#fff] pointer-events-none"></div>

                    {/* The Button */}
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center text-white transition-all group-hover:bg-[#007ebb] transform group-hover:rotate-12">
                        <ArrowUpRight size={28} strokeWidth={2.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedBlogs: React.FC = () => {
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
                <div className="flex items-center justify-center gap-4 mb-14">
                    <div className="bg-[#007ebb] text-white px-8 py-2 rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] text-4xl font-medium shadow-xl shadow-blue-900/10">
                        Main
                    </div>
                    <h2 className="text-4xl font-josefin text-dark font-medium pt-1">Blog</h2>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Large Featured Card */}
                    <div className="lg:col-span-2">
                        <FeaturedBlogCard blog={featuredBlogs[0]} size="large" />
                    </div>

                    {/* Smaller Stacked Cards */}
                    <div className="flex flex-col gap-10">
                        <FeaturedBlogCard blog={featuredBlogs[1]} size="small" />
                        <FeaturedBlogCard blog={featuredBlogs[2]} size="small" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlogs;
