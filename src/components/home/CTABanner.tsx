import React from 'react';
import CTABannerTemplate from '../ui/home/CTABannerTemplate';

const CTABanner: React.FC = () => {
    const handleRequestQuote = () => {
        console.log("Request Quote Clicked");
        // Add navigation or modal logic here
    };

    const WaterDropIcon = (
        <div className="relative w-12 h-16 flex items-center justify-center">
            {/* Simple Water Drop Design */}
            <div className="w-10 h-10 bg-blue-400 rounded-full relative">
                <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-20 border-l-transparent border-b-30 border-b-blue-400 border-r-20 border-r-transparent"></div>
                {/* Shine/Reflection */}
                <div className="absolute top-2 left-2 w-2 h-4 bg-white/40 rounded-full rotate-[-20deg]"></div>
            </div>
            {/* Image alternative if preferred: 
            <img src="https://cdn-icons-png.flaticon.com/512/3105/3105807.png" className="w-full h-full object-contain" alt="Water Drop" /> 
            */}
        </div>
    );

    return (
        <CTABannerTemplate
            title="Don't worry if you're unsure, we'll help you choose right!"
            subtitle="Contact us for the best recommendation"
            buttonText="Request a Quote"
            onButtonClick={handleRequestQuote}
            icon={WaterDropIcon}
        />
    );
};

export default CTABanner;
