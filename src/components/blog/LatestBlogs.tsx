import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
            className="bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-8"
        >
            {/* Image Section */}
            <div className={`shrink-0 rounded-[20px] overflow-hidden ${isLarge ? 'md:w-2/5 aspect-4/3 md:aspect-auto' : 'md:w-[45%] aspect-4/3 md:aspect-auto'}`}>
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center flex-1 py-1">
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                    {blog.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-wider ${tag === 'Trending' ? 'bg-[#00abff] text-white' : 'bg-white text-black shadow-sm ring-1 ring-gray-100'}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className={`font-bold text-dark leading-snug group-hover:text-[#007ebb] transition-colors font-josefin mb-4 ${isLarge ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl'}`}>
                    {blog.title}
                </h3>

                {/* Description */}
                <p className={`text-gray-500 leading-relaxed mb-6 line-clamp-3 ${isLarge ? 'text-sm md:text-base' : 'text-sm'}`}>
                    {blog.description}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-auto pt-4 border-t border-gray-100 text-gray-500 text-sm">
                    <div className="flex items-center gap-3">
                        <img src={blog.author.avatar} alt={blog.author.name} className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
                        <span className="font-medium text-dark">{blog.author.name}, {blog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        <span>{blog.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span>{blog.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LatestBlogs: React.FC = () => {
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
        <section className="w-full bg-[#f8fcfd] py-16 px-4 md:px-8 font-josefin">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <h2 className="text-4xl font-serif text-dark font-medium pt-1">Latest</h2>
                    <div className="bg-[#007ebb] text-white px-8 py-2.5 rounded-xl text-3xl font-bold font-josefin shadow-xl shadow-blue-900/10 uppercase tracking-tight">
                        Blogs
                    </div>
                </div>

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
