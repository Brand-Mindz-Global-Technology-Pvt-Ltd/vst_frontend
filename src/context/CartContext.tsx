import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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
    isHeroCheckout: boolean;
    selectedProduct: CartItem | null;
    cartItems: CartItem[];
    toggleCart: () => void;
    toggleCheckout: (isHero?: boolean, product?: CartItem | null) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    clearCart: () => void;
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
    const [isHeroCheckout, setIsHeroCheckout] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('vst_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('vst_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleCheckout = (isHero = false, product: CartItem | null = null) => {
        setIsCheckoutOpen(!isCheckoutOpen);
        setIsHeroCheckout(isHero);
        setSelectedProduct(product);
    };

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
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
    const clearCart = () => {
        setCartItems([]);
    };
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            isCartOpen,
            isCheckoutOpen,
            isHeroCheckout,
            selectedProduct,
            cartItems,
            toggleCart,
            toggleCheckout,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
