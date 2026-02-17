import React, { type ReactNode } from 'react';

interface CTABannerTemplateProps {
    title: string;
    subtitle: string;
    buttonText: string;
    onButtonClick?: () => void;
    icon?: ReactNode;
    backgroundImage?: string;
    className?: string;
}

const CTABannerTemplate: React.FC<CTABannerTemplateProps> = ({
    title,
    subtitle,
    buttonText,
    onButtonClick,
    icon,
    backgroundImage,
    className = "",
}) => {
    return (
        <section className={`w-full py-12 px-4 md:px-8 font-outfit ${className}`}>
            <div className="max-w-[1400px] mx-auto overflow-hidden rounded-2xl md:rounded-[15px] shadow-2xl relative bg-[#272828] group">

                {/* Background Image & Overlay */}
                {backgroundImage && (
                    <>
                        <div className="absolute inset-0">
                            <img
                                src={backgroundImage}
                                alt="Background"
                                className="w-full h-full object-cover"/>
                        </div>
                        <div className="absolute inset-0 z-0"></div>
                    </>
                )}

                {/* Content Layer */}
                <div className="relative z-10 py-12 md:py-8 px-6 md:px-20 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    {icon && (
                        <div className="mb-0 animate-bounce">
                            {icon}
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-imperator text-white tracking-wide leading-tight mb-4 max-w-5xl">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/80 font-josefin font-light mb-4 max-w-4xl leading-relaxed">
                        {subtitle}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={onButtonClick}
                        className="bg-white text-dark px-10 py-4 rounded-full font-josefin font-bold shadow-xl hover:bg-[#007ebb] hover:text-white transition-all transform hover:scale-105 active:scale-95 text-lg">
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTABannerTemplate;
