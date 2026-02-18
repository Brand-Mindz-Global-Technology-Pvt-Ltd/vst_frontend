import React from 'react';
import Footer from '../../components/ui/footer/Footer';
import BlogHero from '../../components/blog/BlogHero';
import FeaturedBlogs from '../../components/blog/FeaturedBlogs';
import LatestBlogs from '../../components/blog/LatestBlogs';
import AquaTalksSection from '../../components/blog/AquaTalksSection';

const BlogPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#EFEFEF]">
            <main className="grow">
                <BlogHero />
                <FeaturedBlogs />
                <LatestBlogs />
                <AquaTalksSection />
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;