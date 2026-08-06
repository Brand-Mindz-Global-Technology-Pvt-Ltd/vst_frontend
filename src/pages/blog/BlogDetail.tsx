import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogDetailHero from '../../components/blog/BlogDetailHero';
import BlogContent from '../../components/blog/BlogContent';
import CommentForm from '../../components/blog/CommentForm';
import { getPublishedBlog } from '../../services/blog/blogService';
import type { Blog } from '../../types/blog';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0); setLoading(true); setNotFound(false);
        if (!id) { setNotFound(true); setLoading(false); return; }
        getPublishedBlog(id).then(setBlog).catch(() => setNotFound(true)).finally(() => setLoading(false));
    }, [id]);
    if (loading) return <main className="min-h-[60vh] flex items-center justify-center text-gray-500">Loading blog...</main>;
    if (notFound || !blog) return <main className="min-h-[60vh] flex items-center justify-center text-gray-600">Blog not found.</main>;
    return <div className="min-h-screen flex flex-col bg-[#efefef]"><main className="grow"><BlogDetailHero blog={blog} /><div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-16"><BlogContent data={blog} /></div><CommentForm /></main></div>;
};
export default BlogDetailPage;
