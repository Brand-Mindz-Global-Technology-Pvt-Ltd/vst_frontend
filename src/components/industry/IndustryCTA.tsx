import React from 'react';
import CTABannerTemplate from '../ui/home/CTABannerTemplate';

const IndustryCTA: React.FC = () => {
    return (
        <CTABannerTemplate
            title="Ready To Optimize Your Water Treatment ?"
            subtitle="Join hundreds of companies that trust VST for their water management needs. Our experts are ready to design the perfect solution for your specific requirements."
            buttonText="Talk To Our Experts"
            onButtonClick={() => window.location.href = '/contact'}
            backgroundImage="/assets/cta/cta-banner.webp"
            className="mb-20"
        />
    );
};

export default IndustryCTA;
