import React from 'react';
import CTABannerTemplate from '../ui/home/CTABannerTemplate';
import { Phone } from 'lucide-react';

const CTABanner: React.FC = () => {
    // Editable CTA data
    const ctaData = {
        title: "Ready to Experience Pure Water?",
        subtitle: "Get your water purifier installed today and enjoy safe, clean water for your family.",
        buttonText: "Call us now",
        icon: <Phone size={32} className="text-white" />
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
            onButtonClick={handleButtonClick}
            className="bg-[#EFEFEF]"
        />
    );
};

export default CTABanner;
