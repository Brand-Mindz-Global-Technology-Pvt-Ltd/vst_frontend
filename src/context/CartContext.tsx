import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
    id: string | number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    rating: number;
    reviewsCount: string;
    discount?: string;
}

interface CartContextType {
    isCartOpen: boolean;
    isCheckoutOpen: boolean;
    cartItems: CartItem[];
    toggleCart: () => void;
    toggleCheckout: () => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    // Mock data based on design
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "ATLANTIS Frosty Plus Hot, Normal & Cold Water Dispenser | Floor Standing | 5L/Hour Cooling & Heating Capacity | Smart Glass Push-Pull Taps | 1 Year Warranty",
            description: "",
            price: 4000,
            originalPrice: 8000,
            image: "/assets/about/subtract.png",
            quantity: 1,
            rating: 4.6,
            reviewsCount: "3K Reviews",
            discount: "40% OFF"
        },
        {
            id: 2,
            name: "ATLANTIS Frosty Plus Hot, Normal & Cold Water Dispenser | Floor Standing | 5L/Hour Cooling & Heating Capacity | Smart Glass Push-Pull Taps | 1 Year Warranty",
            description: "",
            price: 4000,
            originalPrice: 8000,
            image: "/assets/about/subtract.png",
            quantity: 1,
            rating: 4.6,
            reviewsCount: "3K Reviews",
            discount: "40% OFF"
        }
    ]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleCheckout = () => setIsCheckoutOpen(!isCheckoutOpen);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string | number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string | number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            isCartOpen,
            isCheckoutOpen,
            cartItems,
            toggleCart,
            toggleCheckout,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
