import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AquaTalksTemplate, { type BlogData } from '../ui/home/AquaTalksTemplate';
import { useHighlight } from '../../context/HighlightContext';
import { getPublishedBlogs } from '../../services/blog/blogService';

const AquaTalksSection: React.FC = () => {
    const { setActiveId } = useHighlight();
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    useEffect(() => { getPublishedBlogs({ limit: 8 }).then(({ data }) => setBlogs(data.map((blog) => ({ id: blog.slug, image: blog.image, title: blog.title, tags: blog.tags, description: blog.description })))).catch(() => setBlogs([])); }, []);
    if (!blogs.length) return null;
    return <motion.section onViewportEnter={() => setActiveId('aqua-talks-heading')} className="bg-white"><AquaTalksTemplate blogs={blogs} /></motion.section>;
};
export default AquaTalksSection;
