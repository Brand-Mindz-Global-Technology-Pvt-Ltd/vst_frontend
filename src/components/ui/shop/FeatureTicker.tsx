import React from 'react';
import { Zap, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: <Zap size={20} className="text-white" />,
        text: "RO + UV + UF Technology"
    },
    {
        icon: <Truck size={20} className="text-white" />,
        text: "Free Installation On All Water Purifiers"
    },
    {
        icon: <ShoppingBag size={20} className="text-white" />,
        text: "Fresh Water Every Day"
    },
    {
        icon: <ShieldCheck size={20} className="text-white" />,
        text: "Safe Online Payment, 100% Secure Checkout"
    }
];

const FeatureTicker: React.FC = () => {
    return (
        <section className="bg-[#2D2D2D] py-3 md:py-5 overflow-hidden w-full relative">
            <div className="flex whitespace-nowrap animate-ticker">
                {/* First set of features */}
                <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12 min-w-full justify-around">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-4 shrink-0">
                            <div className="p-1 md:p-1.5 translate-y-px">
                                {feature.icon}
                            </div>
                            <span className="text-white text-xs md:text-lg font-outfit font-light tracking-wide uppercase">
                                {feature.text}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Duplicate set for infinite scroll */}
                <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12 min-w-full justify-around">
                    {features.map((feature, index) => (
                        <div key={`dup-${index}`} className="flex items-center gap-2 md:gap-4 shrink-0">
                            <div className="p-1 md:p-1.5 translate-y-px">
                                {feature.icon}
                            </div>
                            <span className="text-white text-xs md:text-lg font-outfit font-light tracking-wide uppercase">
                                {feature.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-ticker {
                    animation: ticker 40s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default FeatureTicker;
