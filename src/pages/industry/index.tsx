import React from 'react';
import IndustryHero from '../../components/industry/IndustryHero';
import ScrollingTicker from '../../components/ui/shop/ScrollingTicker';
import IndustryCategories from '../../components/industry/IndustryCategories';
import IndustryOfferings from '../../components/industry/IndustryOfferings';
import IndustryCTA from '../../components/industry/IndustryCTA';

const IndustryPage: React.FC = () => {
    return (
        <div className="w-full bg-[#EFEFEF] min-h-screen">
            <IndustryHero
                image="/assets/home/water-droplet.webp"
            />
            <ScrollingTicker />
            <IndustryCategories />
            <IndustryOfferings />
            <IndustryCTA />
        </div>
    );
};

export default IndustryPage;
