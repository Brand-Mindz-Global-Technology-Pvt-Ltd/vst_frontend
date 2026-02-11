import React from 'react';
import CTABannerTemplate from '../ui/home/CTABannerTemplate';
import { Phone } from 'lucide-react';

const CTABanner: React.FC = () => {
    // Editable CTA data
    const ctaData = {
        title: "Ready to Experience Pure Water?",
        subtitle: "Get your water purifier installed today and enjoy safe, clean water for your family.",
        buttonText: "Call us now",
        icon: <img src="./assets/home/water-droplet.webp" alt="Water Drop" className="w-20 h-20 object-contain" />
    };

    const handleButtonClick = () => {
        window.location.href = "tel:+919843232131";
    };

    return (
        <CTABannerTemplate
            title={ctaData.title}
            subtitle={ctaData.subtitle}
            buttonText={ctaData.buttonText}
            icon={ctaData.icon}
            backgroundImage="/assets/cta/cta-banner.webp"
            onButtonClick={handleButtonClick}
            className="bg-[#EFEFEF]"
        />
    );
};

export default CTABanner;
