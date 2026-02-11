import React from 'react';
import Hero from '../../components/home/Hero';
import ClientsLogos from '../../components/home/ClientsLogos';
import FeaturesSection from '../../components/home/FeaturesSection';
import WhatWeOffer from '../../components/home/WhatWeOffer';
import Testimonials from '../../components/home/Testimonials';
import ProductShowcase from '../../components/home/ProductShowcase';
import CTABanner from '../../components/home/CTABanner';
import AquaTalks from '../../components/home/AquaTalks';
import Footer from '../../components/ui/footer/Footer';

const Home: React.FC = () => {
    return (
        <div className="bg-[#EFEFEF]">
            <Hero />
            <ClientsLogos />
            <FeaturesSection />
            <ProductShowcase />
            <CTABanner />
            <WhatWeOffer />
            <Testimonials />
            <AquaTalks />
            <Footer />
        </div>
    );
};

export default Home;
