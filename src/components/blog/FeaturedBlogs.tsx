import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { getPublishedBlogs } from '../../services/blog/blogService';
import type { Blog } from '../../types/blog';

const dateLabel = (value: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));

const FeaturedBlogCard: React.FC<{ blog: Blog; size: 'large' | 'small' }> = ({ blog, size }) => {
    const navigate = useNavigate();
    const isLarge = size === 'large';
    return (
        <div onClick={() => navigate(`/blog/${blog.slug}`)} className={`relative group overflow-hidden rounded-[25px] cursor-pointer transition-all duration-500 hover:shadow-2xl ${isLarge ? 'h-[550px] md:h-[650px]' : 'h-[260px] md:h-[305px]'}`}>
            <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end ${isLarge ? 'pb-12 md:pb-5' : 'pb-8 md:pb-8'}`}>
                <div className="flex flex-wrap gap-2 mb-4">{blog.tags.map((tag) => <span key={tag} className={`px-2 py-1 pt-2 rounded-[10px] text-[12px] font-josefin font-medium tracking-wider ${tag.toLowerCase() === 'trending' ? 'bg-[#00abff] border border-white text-white' : 'bg-white text-dark border border-gray-200'}`}>{tag}</span>)}</div>
                <h3 className={`font-josefin text-white leading-tight group-hover:text-[#00abff] transition-colors ${isLarge ? 'text-2xl md:text-4xl max-w-2xl font-semibold' : 'text-lg md:text-xl max-w-md line-clamp-2'}`}>{blog.title}</h3>
                {isLarge && <div className="flex flex-wrap items-center mt-6 gap-6 text-white text-[15px]">
                    <div className="flex items-center gap-3">{blog.author.avatar ? <img src={blog.author.avatar} alt={blog.author.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 object-cover" /> : <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#007ebb] flex items-center justify-center font-semibold">{blog.author.name.charAt(0)}</span>}<span>{blog.author.name}, {dateLabel(blog.publishedAt || blog.createdAt)}</span></div>
                    <div className="flex items-center gap-2"><MessageCircle size={24} /><span>{blog.comments || 0}</span></div>
                    <div className="flex items-center gap-2"><Clock size={24} /><span>{blog.readTime}</span></div>
                </div>}
            </div>
            <div className="absolute bottom-0 right-0 z-10"><div className={`relative ${isLarge ? 'w-24 h-24 md:w-28 md:h-28' : 'w-16 h-16 md:w-20 md:h-20'} bg-white rounded-tl-[35px] md:rounded-tl-[50px] flex items-center justify-center`}><div className={`${isLarge ? 'w-16 h-16 md:w-20 md:h-20' : 'w-10 h-10 md:w-12 md:h-12'} ${isLarge ? 'bg-black' : 'bg-[#00abff]'} rounded-full flex items-center justify-center text-white hover:bg-[#007ebb]`}><ArrowUpRight size={isLarge ? 32 : 24} /></div></div></div>
        </div>
    );
};

const FeaturedBlogs: React.FC = () => {
    const { setActiveId } = useHighlight();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => { getPublishedBlogs({ featured: true, limit: 100 }).then((result) => setBlogs(result.data)).catch(() => setBlogs([])); }, []);
    if (!blogs.length) return null;
    const visibleBlogs = blogs.slice(startIndex, startIndex + 3);
    const canGoBack = startIndex > 0;
    const canGoForward = startIndex + 3 < blogs.length;
    return <section className="w-full bg-white py-16 px-4 md:px-8 font-josefin"><div className="max-w-[1400px] mx-auto">
        <motion.div onViewportEnter={() => setActiveId('featured-blogs')} viewport={{ amount: 0.5 }} className="flex items-center justify-center gap-4 mb-14"><FloatingHighlight id="featured-blogs" boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-xl shadow-blue-900/10" className="pt-2 px-8 py-1 text-3xl md:text-4xl font-medium font-imperator">Main</FloatingHighlight><h2 className="text-3xl md:text-4xl font-imperator text-dark font-medium pt-1">Blog</h2></motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10"><div className="lg:col-span-7"><FeaturedBlogCard blog={visibleBlogs[0]} size="large" /></div>{visibleBlogs.length > 1 && <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">{visibleBlogs.slice(1, 3).map((blog) => <FeaturedBlogCard key={blog._id} blog={blog} size="small" />)}</div>}</div>
        {blogs.length > 3 && <div className="mt-10 flex items-center justify-center gap-4"><button type="button" onClick={() => setStartIndex((value) => Math.max(0, value - 1))} disabled={!canGoBack} aria-label="Previous main blog" className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:bg-[#007ebb] disabled:cursor-not-allowed disabled:bg-gray-300"><ChevronLeft size={25} /></button><span className="min-w-28 text-center text-lg md:text-xl font-semibold text-gray-600">{startIndex + 1}–{Math.min(startIndex + 3, blogs.length)} of {blogs.length}</span><button type="button" onClick={() => setStartIndex((value) => Math.min(blogs.length - 3, value + 1))} disabled={!canGoForward} aria-label="Next main blog" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#007ebb] text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"><ChevronRight size={25} /></button></div>}
    </div></section>;
};
export default FeaturedBlogs;
