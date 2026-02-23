import React from 'react';
import { motion } from 'framer-motion';
import { useHighlight } from '../../../context/HighlightContext';

interface FloatingHighlightProps {
    id: string;          // Unique ID for this specific spot (e.g., 'hero-heading')
    children: React.ReactNode;
    className?: string;  // For text styling
    boxClassName?: string; // For custom box shapes in different sections
}

const FloatingHighlight: React.FC<FloatingHighlightProps> = ({
    id,
    children,
    className = "",
    boxClassName = "rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px]"
}) => {
    const { activeId } = useHighlight();
    const isActive = activeId === id;

    return (
        <div className="relative inline-flex items-center justify-center shrink-0">
            {/* The Magic Blue Box */}
            {isActive && (
                <motion.div
                    layoutId="shared-blue-box"
                    className={`absolute inset-0 bg-[#0077B6] z-110 ${boxClassName}`}
                    animate={{
                        // To make it look like a circle (dot) during flight, 
                        // we MUST round the corners completely while it's moving.

                        // Shrink to a small dot
                        scale: [1, 0.3, 0.3, 1],
                    }}
                    transition={{
                        layout: {
                            type: "spring",
                            stiffness: 180,
                            damping: 24
                        },
                        duration: 0.5,
                        // Stay as a small circle for the entire middle of the journey (0.15 to 0.85)
                        times: [0, 0.15, 0.85, 1],
                        ease: "linear"
                    }}
                />
            )}

            {/* The Content (Text or Icon) */}
            <div className={`relative z-110 flex items-center justify-center transition-colors duration-500 ${isActive ? 'text-white' : ''} ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default FloatingHighlight;