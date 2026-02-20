import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Define what information our "Brain" needs to track
interface HighlightContextType {
    activeId: string;
    setActiveId: (id: string) => void;
}

const HighlightContext = createContext<HighlightContextType | undefined>(undefined);

// 2. The Provider
export const HighlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initial state is 'header-icon' (The Profile Icon)
    const [activeId, setActiveId] = useState('header-icon');

    // Initial 2-second delay: stay on profile icon then move to hero heading
    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveId('hero-heading');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <HighlightContext.Provider value={{ activeId, setActiveId }}>
            {children}
        </HighlightContext.Provider>
    );
};

// 3. Custom hook
export const useHighlight = () => {
    const context = useContext(HighlightContext);
    if (!context) throw new Error('useHighlight must be used within HighlightProvider');
    return context;
};