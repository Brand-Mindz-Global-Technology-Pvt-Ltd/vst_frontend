import React from 'react';
import { Settings, Wrench, ShieldCheck, Activity } from 'lucide-react';
import WhatWeOfferTemplate from '../ui/home/WhatWeOfferTemplate';

const WhatWeOffer: React.FC = () => {
    const serviceData = [
        {
            id: 1,
            title: "Installation",
            description: "Expert installation for domestic and industrial water systems with safe setup.",
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
            icon: <Wrench size={28} className="md:w-8 md:h-8" />,
            ctaText: "Enquiry Now"
        },
        {
            id: 2,
            title: "Repair",
            description: "Quick repair for all RO systems using genuine parts to restore performance.",
            image: "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=2070&auto=format&fit=crop",
            icon: <Settings size={28} className="md:w-8 md:h-8" />,
            ctaText: "Enquiry Now"
        },
        {
            id: 3,
            title: "AMC (Annual Maintenance Contract)",
            description: "Hassle-free AMC plans for regular servicing and year-round maintenance support.",
            image: "https://images.unsplash.com/photo-1581094481221-111adb2e429b?q=80&w=2070&auto=format&fit=crop",
            icon: <ShieldCheck size={28} className="md:w-8 md:h-8" />,
            ctaText: "Enquiry Now"
        },
        {
            id: 4,
            title: "O&M (Operation & Maintenance)",
            description: "Complete plant operation and maintenance for consistent system reliability.",
            image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop",
            icon: <Activity size={28} className="md:w-8 md:h-8" />,
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
