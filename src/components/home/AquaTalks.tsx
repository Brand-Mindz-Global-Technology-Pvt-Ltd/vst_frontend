import React, { useEffect, useState } from 'react';
import AquaTalksTemplate, { type BlogData } from '../ui/home/AquaTalksTemplate';
import { getPublishedBlogs } from '../../services/blog/blogService';

const AquaTalks: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    useEffect(() => { getPublishedBlogs({ limit: 8 }).then(({ data }) => setBlogs(data.map((blog) => ({ id: blog.slug, image: blog.image, title: blog.title, tags: blog.tags, description: blog.description })))).catch(() => setBlogs([])); }, []);
    useEffect(() => {
        const container = document.querySelector('.blog-scroll-container') as HTMLElement | null;
        if (!container || !blogs.length) return;
        let autoScroll = window.setInterval(() => {
            const card = container.querySelector('.snap-center') as HTMLElement | null;
            if (!card) return;
            if (Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 10) container.scrollTo({ left: 0, behavior: 'smooth' });
            else container.scrollBy({ left: card.offsetWidth + 24, behavior: 'smooth' });
        }, 5000);
        const pause = () => window.clearInterval(autoScroll);
        const resume = () => { pause(); autoScroll = window.setInterval(() => container.scrollBy({ left: 364, behavior: 'smooth' }), 5000); };
        container.addEventListener('mouseenter', pause); container.addEventListener('mouseleave', resume);
        return () => { pause(); container.removeEventListener('mouseenter', pause); container.removeEventListener('mouseleave', resume); };
    }, [blogs]);
    if (!blogs.length) return null;
    return <div className="scroll-mt-20 overflow-hidden"><AquaTalksTemplate blogs={blogs} /></div>;
};
export default AquaTalks;
