import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const tickerItems = [
    { icon: <ShieldCheck size={22} />, text: "RO + UV + UF Technology" },
    { icon: <img src="/assets/shop/icons/delivery-icon.png" alt="Delivery" className="w-6 h-6 object-contain shrink-0" onError={(e) => console.error("Ticker Icon Error: delivery")} />, text: "Free Installation On All Water Purifiers" },
    { icon: <img src="/assets/shop/icons/product-icon.png" alt="Product" className="w-6 h-6 object-contain shrink-0" onError={(e) => console.error("Ticker Icon Error: product")} />, text: "Fresh Water Every Day" },
    { icon: <img src="/assets/shop/icons/payment-icon.png" alt="Payment" className="w-6 h-6 object-contain shrink-0" onError={(e) => console.error("Ticker Icon Error: payment")} />, text: "Safe Online Payment, 100% Secure Checkout" },
    { icon: <img src="/assets/shop/icons/support-icon.png" alt="Support" className="w-6 h-6 object-contain shrink-0" onError={(e) => console.error("Ticker Icon Error: support")} />, text: "24/7 Support Always Be There for You" },
];

const ScrollingTicker: React.FC = () => {
    // Duplicate items to create a seamless loop
    const doubledItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

    return (
        <div className="w-full bg-[#343434] py-4 overflow-hidden border-y border-white/5">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: [0, -1500],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40,
                        ease: "linear",
                    },
                }}
            >
                {doubledItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 px-12 text-[#E1E1E1] font-roboto text-sm md:text-[14px] font-medium"
                    >
                        <div className="text-white opacity-90 flex items-center justify-center w-6 h-6 shrink-0">
                            {item.icon}
                        </div>
                        <span className="shrink-0">{item.text}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ScrollingTicker;
