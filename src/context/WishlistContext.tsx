import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { apiGetWishlist, apiToggleWishlist, apiRemoveProductFromWishlist } from '../services/order/orderService';

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
    const { user } = useAuth();
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
        const savedWishlist = localStorage.getItem('vst_wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // 🔄 Sync: Load wishlist from database on login
    useEffect(() => {
        const fetchDBWishlist = async () => {
            if (user?.id) {
                try {
                    const response = await apiGetWishlist(user.id);
                    if (response.success && response.data?.products) {
                        const mappedItems: WishlistItem[] = response.data.products.map((p: any) => ({
                            id: p._id,
                            name: p.name,
                            price: p.price,
                            image: p.images?.[0] || '',
                            rating: 5,
                            reviewsCount: 0,
                            inStock: true
                        }));
                        setWishlistItems(mappedItems);
                    }
                } catch (err) {
                    console.error("Failed to sync wishlist from database:", err);
                }
            } else {
                // If logged out, load from local storage
                const savedWishlist = localStorage.getItem('vst_wishlist');
                setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
            }
        };

        fetchDBWishlist();
    }, [user?.id]);

    // Save to local storage for offline / quick reference fallback
    useEffect(() => {
        localStorage.setItem('vst_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);

    const addToWishlist = async (item: WishlistItem) => {
        // Prevent duplicate local additions
        if (wishlistItems.some(i => i.id === item.id)) return;

        setWishlistItems(prev => [...prev, item]);

        // Sync with backend database if logged in
        if (user?.id) {
            try {
                await apiToggleWishlist(user.id, item.id.toString());
            } catch (err) {
                console.error("Failed to save wishlist item to database:", err);
            }
        }
    };

    const removeFromWishlist = async (id: string | number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
        const newSelection = new Set(selectedItems);
        newSelection.delete(id);
        setSelectedItems(newSelection);

        // Sync with backend database if logged in
        if (user?.id) {
            try {
                await apiRemoveProductFromWishlist(user.id, id.toString());
            } catch (err) {
                console.error("Failed to remove wishlist item from database:", err);
            }
        }
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
