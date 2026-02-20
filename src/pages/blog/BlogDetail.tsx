import React, { useEffect } from 'react';
import BlogDetailHero from '../../components/blog/BlogDetailHero';
import BlogContent from '../../components/blog/BlogContent';
import CommentForm from '../../components/blog/CommentForm';

const BlogDetailPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#efefef]">
            <main className="grow">
                {/* Hero Section */}
                <BlogDetailHero />

                {/* Main Content Area */}
                <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-16">
                    <BlogContent />
                </div>
                <CommentForm />
            </main>
        </div>
    );
};

export default BlogDetailPage;
