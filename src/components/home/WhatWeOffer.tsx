import React from 'react';
import { Settings, Wrench } from 'lucide-react';
import WhatWeOfferTemplate from '../ui/home/WhatWeOfferTemplate';

const WhatWeOffer: React.FC = () => {
    const serviceData = [
        {
            id: 1,
            title: "Installation",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet.",
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
            icon: <Settings size={28} className="md:w-8 md:h-8" />,
            ctaText: "Enquiry Now"
        },
        {
            id: 2,
            title: "Repair",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet.",
            image: "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=2070&auto=format&fit=crop",
            icon: <Wrench size={28} className="md:w-8 md:h-8" />,
            ctaText: "Enquiry Now"
        }
    ];

    return (
        <WhatWeOfferTemplate
            titlePrefix="What"
            highlightedTitle="We Offer"
            services={serviceData}
        />
    );
};

export default WhatWeOffer;
