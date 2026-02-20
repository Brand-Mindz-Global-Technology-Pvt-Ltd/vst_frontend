import React from 'react';
import WhatWeOfferTemplate from '../ui/home/WhatWeOfferTemplate';
import { Search, Zap } from 'lucide-react';

const servicesData = [
    {
        id: 1,
        title: "Process Water Treatment",
        description: "High-purity water solutions for manufacturing, pharmaceuticals, and food production processes.",
        image: "/assets/about/subtract.png",
        icon: <Search className="text-white" size={24} />,
        ctaText: "Enquiry Now",
        onCtaClick: () => console.log("Service 1 Clicked")
    },
    {
        id: 2,
        title: "Wastewater Recycling",
        description: "Advanced recycling systems to minimize discharge and promote sustainable water management.",
        image: "/assets/about/subtract.png",
        icon: <Zap className="text-white" size={24} />,
        ctaText: "Enquiry Now",
        onCtaClick: () => console.log("Service 2 Clicked")
    }
];

const IndustryOfferings: React.FC = () => {
    return (
        <WhatWeOfferTemplate
            titlePrefix="SOLUTIONS"
            highlightedTitle="CUSTOMIZED FOR YOU"
            services={servicesData}
        />
    );
};

export default IndustryOfferings;
