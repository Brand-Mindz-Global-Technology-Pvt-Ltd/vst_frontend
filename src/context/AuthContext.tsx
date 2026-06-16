import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    customerId: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (updatedFields: Partial<User>) => void;
    isAuthenticated: boolean;
    isAuthModalOpen: boolean;
    toggleAuthModal: (open?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('vst_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem('vst_user');
            }
        }
        setLoading(false);
    }, []);

    const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('vst_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('vst_user');
    };

    const toggleAuthModal = (open?: boolean) => {
        setIsAuthModalOpen(prev => open !== undefined ? open : !prev);
    };

    const isAuthenticated = !!user && !!user.token;

    if (loading) {
        return null; // Or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAuthModalOpen, toggleAuthModal }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
