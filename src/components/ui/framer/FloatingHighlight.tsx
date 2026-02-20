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
                    layoutId="shared-blue-box" // This MUST be the same everywhere
                    className={`absolute inset-0 bg-[#0077B6] ${boxClassName}`}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25
                    }}
                />
            )}

            {/* The Content (Text or Icon) */}
            <div className={`relative z-10 flex items-center justify-center transition-colors duration-500 ${isActive ? 'text-white' : ''} ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default FloatingHighlight;