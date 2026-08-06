import React from 'react';
import { Clock, MessageCircle, Share2 } from 'lucide-react';
import type { Blog } from '../../types/blog';

const BlogContent: React.FC<{ data: Blog }> = ({ data }) => {
    const handleShare = () => navigator.share ? navigator.share({ title: data.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href);
    const date = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(data.publishedAt || data.createdAt));
    return <article className="w-full max-w-[1600px] mx-auto px-4 md:px-0 font-josefin text-dark">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-normal leading-tight mb-6">{data.title}</h1>
        <div className="flex flex-wrap items-center justify-end gap-4 md:gap-6 text-sm md:text-base text-gray-600 mt-6 pb-6"><span>{date}</span><div className="flex items-center gap-1"><MessageCircle size={16} /><span>{data.comments || 0}</span></div><div className="flex items-center gap-1"><Clock size={16} /><span>{data.readTime}</span></div><button onClick={handleShare} className="flex items-center gap-2 bg-dark text-white px-5 py-1.5 rounded-full text-sm font-medium hover:bg-[#007ebb]"><Share2 size={14} />Share</button></div>
        <div className="space-y-8 text-justify text-sm md:text-base leading-relaxed">{data.sections.map((section, index) => {
            if (section.type === 'intro' || section.type === 'paragraph') return <p key={index} className="text-dark leading-9">{section.content}</p>;
            if (section.type === 'cta') return <p key={index} className="text-dark font-medium">{section.content}</p>;
            return <div key={index} className="space-y-3">{section.heading && <h2 className="text-base md:text-lg font-jost font-semibold text-dark">{section.heading}</h2>}{section.content && <p className="text-dark leading-9">{section.content}</p>}{section.featureLabel && <p className="font-semibold">{section.featureLabel}</p>}{section.items?.length ? <ul className="space-y-2 list-disc pl-8 md:pl-24 text-dark">{section.items.map((item, itemIndex) => <li key={itemIndex} className="pl-2">{item.text}</li>)}</ul> : null}</div>;
        })}</div>
    </article>;
};
export default BlogContent;
