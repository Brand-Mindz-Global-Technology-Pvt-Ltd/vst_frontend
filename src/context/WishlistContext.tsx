import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface WishlistItem {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewsCount: number;
    discount?: string;
    inStock: boolean;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    isWishlistOpen: boolean;
    selectedItems: Set<string | number>;
    toggleWishlist: () => void;
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string | number) => void;
    toggleItemSelection: (id: string | number) => void;
    clearSelection: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
        const savedWishlist = localStorage.getItem('vst_wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('vst_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);

    const addToWishlist = (item: WishlistItem) => {
        setWishlistItems(prev => [...prev, item]);
    };

    const removeFromWishlist = (id: string | number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
        const newSelection = new Set(selectedItems);
        newSelection.delete(id);
        setSelectedItems(newSelection);
    };

    const toggleItemSelection = (id: string | number) => {
        const newSelection = new Set(selectedItems);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedItems(newSelection);
    };

    const clearSelection = () => setSelectedItems(new Set());

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            isWishlistOpen,
            selectedItems,
            toggleWishlist,
            addToWishlist,
            removeFromWishlist,
            toggleItemSelection,
            clearSelection
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
