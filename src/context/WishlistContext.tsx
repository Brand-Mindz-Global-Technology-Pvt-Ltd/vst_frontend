import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface WishlistItem {
    id: string;
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
    selectedItems: Set<string>;
    toggleWishlist: () => void;
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    toggleItemSelection: (id: string) => void;
    clearSelection: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    // Mock initial data
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
        {
            id: 'wl1',
            name: 'Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000',
            price: 4000,
            originalPrice: 8000,
            image: '/assets/products/purifier.png',
            rating: 4.6,
            reviewsCount: 3000,
            discount: 'Limited time deal',
            inStock: true
        },
        {
            id: 'wl2',
            name: 'Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000',
            price: 4000,
            originalPrice: 8000,
            image: '/assets/products/purifier.png',
            rating: 4.6,
            reviewsCount: 3000,
            inStock: true
        },
        {
            id: 'wl3',
            name: 'Aquaguard Sure Delight NXT RO+UV Water Purifier | Free Service Plan worth ₹2000',
            price: 4000,
            originalPrice: 8000,
            image: '/assets/products/purifier.png',
            rating: 4.6,
            reviewsCount: 3000,
            inStock: true
        }
    ]);

    const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);

    const addToWishlist = (item: WishlistItem) => {
        setWishlistItems(prev => [...prev, item]);
    };

    const removeFromWishlist = (id: string) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
        const newSelection = new Set(selectedItems);
        newSelection.delete(id);
        setSelectedItems(newSelection);
    };

    const toggleItemSelection = (id: string) => {
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
