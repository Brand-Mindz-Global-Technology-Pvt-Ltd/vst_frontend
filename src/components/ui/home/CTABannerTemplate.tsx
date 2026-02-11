import React, { type ReactNode } from 'react';

interface CTABannerTemplateProps {
    title: string;
    subtitle: string;
    buttonText: string;
    onButtonClick?: () => void;
    icon?: ReactNode;
    className?: string;
}

const CTABannerTemplate: React.FC<CTABannerTemplateProps> = ({
    title,
    subtitle,
    buttonText,
    onButtonClick,
    icon,
    className = "",
}) => {
    return (
        <section className={`w-full py-20 px-4 md:px-8 font-outfit ${className}`}>
            <div className="max-w-[1400px] mx-auto overflow-hidden rounded-2xl md:rounded-[15px] shadow-2xl relative bg-dark">

                {/* Content Layer */}
                <div className="relative z-10 py-12 md:py-8 px-6 md:px-20 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    {icon && (
                        <div className="mb-2 animate-bounce">
                            {icon}
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl md:text-4xl font-serif text-white tracking-tight leading-tight mb-4 max-w-5xl">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-base md:text-xl text-white/70 font-medium mb-10 max-w-2xl">
                        {subtitle}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={onButtonClick}
                        className="bg-white text-dark px-10 py-4 rounded-full font-bold shadow-xl hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-105 active:scale-95 text-md"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTABannerTemplate;
