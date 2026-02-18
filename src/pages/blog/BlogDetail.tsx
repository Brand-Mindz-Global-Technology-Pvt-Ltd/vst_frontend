import React, { useEffect } from 'react';
import Footer from '../../components/ui/footer/Footer';
import BlogDetailHero from '../../components/blog/BlogDetailHero';
import BlogContent from '../../components/blog/BlogContent';

const BlogDetailPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="grow">
                {/* Hero Section */}
                <BlogDetailHero />

                {/* Main Content Area */}
                <div className="max-w-[1000px] mx-auto px-4 md:px-0 py-16">
                    <BlogContent />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogDetailPage;
