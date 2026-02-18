import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Define what information our "Brain" needs to track
interface HighlightContextType {
    activeId: string;
    setActiveId: (id: string) => void;
}

const HighlightContext = createContext<HighlightContextType | undefined>(undefined);

// 2. The Provider wraps your whole app (in main.tsx or App.tsx)
export const HighlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeId, setActiveId] = useState('header-icon'); // Starts at the header

    return (
        <HighlightContext.Provider value={{ activeId, setActiveId }}>
            {children}
        </HighlightContext.Provider>
    );
};

// 3. Custom hook to use the highlight easily
export const useHighlight = () => {
    const context = useContext(HighlightContext);
    if (!context) throw new Error('useHighlight must be used within HighlightProvider');
    return context;
};