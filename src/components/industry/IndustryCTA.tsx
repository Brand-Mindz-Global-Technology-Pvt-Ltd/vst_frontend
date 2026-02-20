import React from 'react';
import CTABannerTemplate from '../ui/home/CTABannerTemplate';

const IndustryCTA: React.FC = () => {
    return (
        <CTABannerTemplate
            title="READY TO OPTIMIZE YOUR WATER TREATMENT?"
            subtitle="Join hundreds of companies that trust VST for their water management needs. Our experts are ready to design the perfect solution for your specific requirements."
            buttonText="TALK TO OUR EXPERTS"
            onButtonClick={() => window.location.href = '/contact'}
            backgroundImage="/assets/cta/cta-banner.webp"
            className="mb-20"
        />
    );
};

export default IndustryCTA;
