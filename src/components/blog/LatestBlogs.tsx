import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { getPublishedBlogs } from '../../services/blog/blogService';
import type { Blog } from '../../types/blog';

const formatDate = (value: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));

const HorizontalBlogCard: React.FC<{ blog: Blog; size: 'large' | 'small' }> = ({ blog, size }) => {
    const navigate = useNavigate();
    const isLarge = size === 'large';
    return <div onClick={() => navigate(`/blog/${blog.slug}`)} className={`bg-white rounded-[30px] md:rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col md:flex-row ${isLarge ? 'md:h-[430px]' : 'md:h-[340px]'}`}>
        <div className="shrink-0 overflow-hidden md:w-[45%] aspect-4/3 md:aspect-auto"><img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
        <div className={`flex flex-col justify-center flex-1 ${isLarge ? 'p-8 md:p-10 lg:p-14' : 'p-6 md:p-8'}`}>
            <div className="flex flex-wrap gap-2 mb-6">{blog.tags.map((tag, index) => <span key={tag} className={`px-4 py-1.5 pt-2.5 rounded-lg text-[14px] font-josefin font-medium tracking-wider ${index === 0 ? 'bg-[#00abff] text-white' : 'bg-white text-dark shadow-xl'}`}>{tag}</span>)}</div>
            <h3 className={`font-semibold text-dark group-hover:text-[#007ebb] transition-colors font-josefin mb-3 ${isLarge ? 'text-2xl md:text-3xl lg:text-4xl md:leading-[45px]' : 'text-base md:text-lg'}`}>{blog.title}</h3>
            <p className={`text-black font-josefin font-light line-clamp-4 text-justify ${isLarge ? 'text-sm md:text-base lg:text-xl mb-8 md:leading-[25px]' : 'text-xs md:text-sm mb-4'}`}>{blog.description}</p>
            <div className={`flex flex-wrap items-center mt-auto ${isLarge ? 'gap-8 text-base' : 'gap-4 text-sm'} text-black font-josefin`}><div className="flex items-center gap-3">{blog.author.avatar ? <img src={blog.author.avatar} alt={blog.author.name} className={`${isLarge ? 'w-10 h-10 md:w-14 md:h-14' : 'w-8 h-8 md:w-10 md:h-10'} rounded-full object-cover`} /> : <span className={`${isLarge ? 'w-10 h-10 md:w-14 md:h-14' : 'w-8 h-8 md:w-10 md:h-10'} rounded-full bg-[#007ebb] text-white flex items-center justify-center`}>{blog.author.name.charAt(0)}</span>}<span>{blog.author.name}, {formatDate(blog.publishedAt || blog.createdAt)}</span></div><div className="flex items-center gap-2"><MessageCircle size={isLarge ? 24 : 14} /><span>{blog.comments || 0}</span></div><div className="flex items-center gap-2"><Clock size={isLarge ? 24 : 14} /><span>{blog.readTime}</span></div></div>
        </div>
    </div>;
};

const LatestBlogs: React.FC = () => {
    const { setActiveId } = useHighlight();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => { getPublishedBlogs({ limit: 100 }).then((result) => setBlogs(result.data)).catch(() => setBlogs([])); }, []);
    if (!blogs.length) return <section className="py-16 text-center text-gray-500">No published blogs yet.</section>;
    const visibleBlogs = blogs.slice(startIndex, startIndex + 3);
    const canGoBack = startIndex > 0;
    const canGoForward = startIndex + 3 < blogs.length;
    return <section className="w-full py-16 px-4 md:px-8 font-imperator"><div className="max-w-[1400px] mx-auto"><motion.div onViewportEnter={() => setActiveId('latest-blogs')} viewport={{ amount: 0.5 }} className="flex items-center justify-center gap-4 mb-16"><h2 className="text-3xl md:text-4xl font-imperator text-dark font-medium pt-1">Latest</h2><FloatingHighlight id="latest-blogs" boxClassName="rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-xl shadow-blue-900/10" className="pt-3 px-8 py-2 text-3xl md:text-4xl font-medium">Blogs</FloatingHighlight></motion.div><div className="flex flex-col gap-10"><HorizontalBlogCard blog={visibleBlogs[0]} size="large" />{visibleBlogs.length > 1 && <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">{visibleBlogs.slice(1, 3).map((blog) => <HorizontalBlogCard key={blog._id} blog={blog} size="small" />)}</div>}</div>{blogs.length > 3 && <div className="mt-10 flex items-center justify-center gap-4"><button type="button" onClick={() => setStartIndex((value) => Math.max(0, value - 1))} disabled={!canGoBack} aria-label="Previous latest blog" className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:bg-[#007ebb] disabled:cursor-not-allowed disabled:bg-gray-300"><ChevronLeft size={25} /></button><span className="min-w-28 text-center text-lg md:text-xl font-semibold font-josefin text-gray-600">{startIndex + 1}–{Math.min(startIndex + 3, blogs.length)} of {blogs.length}</span><button type="button" onClick={() => setStartIndex((value) => Math.min(blogs.length - 3, value + 1))} disabled={!canGoForward} aria-label="Next latest blog" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#007ebb] text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"><ChevronRight size={25} /></button></div>}</div></section>;
};
export default LatestBlogs;
