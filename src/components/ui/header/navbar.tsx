import React, { useState, useEffect } from 'react';
import { User, Menu, X, Megaphone, ShoppingBag, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import FloatingHighlight from '../framer/FloatingHighlight';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const { cartCount, toggleCart } = useCart();
    const { wishlistItems, toggleWishlist } = useWishlist();

    // Scroll listener for sticky effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Shop', href: '/shop' },
        { name: 'Commercial', href: '/commercial' },
        { name: 'Industry', href: '/industry' },
        { name: 'Contact Us', href: '/contact' }
    ];

    return (
        <header className="w-full font-josefin z-9999 sticky top-0 transition-all duration-500">
            {/* Announcement Bar */}
            <div className={`bg-dark text-white transition-all duration-500 ease-in-out overflow-hidden flex items-center justify-center gap-4 text-[13px] md:text-sm tracking-wide ${isScrolled ? 'h-0 opacity-0' : 'h-auto py-3 px-4'}`}>
                <Megaphone size={16} className="shrink-0" />
                <p className="text-center font-medium">
                    Exclusive Deal : Order now and save additional 10% · Limited time only!
                </p>
            </div>

            {/* Main Navbar */}
            <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'py-4 px-4 md:px-12' : 'py-0 px-0'}`}>
                <nav className={`transition-all duration-500 ease-in-out ${isScrolled
                    ? 'bg-white/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl border border-white/40 max-w-[1400px] mx-auto'
                    : 'bg-[#EFEFEF] backdrop-blur-md w-full'
                    }`}>
                    <div className="max-w-[1500px] mx-auto px-4 md:px-8">
                        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16 md:h-18' : 'h-20 md:h-24'}`}>
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <div className={`transition-all duration-300 flex items-center justify-center rounded-full border border-gray-100 overflow-hidden bg-white shadow-sm ${isScrolled ? 'w-10 h-10 md:w-14 md:h-14' : 'w-12 h-12 md:w-16 md:h-16'}`}>
                                    <img
                                        src="/assets/home/VST-logo.png"
                                        alt="VST Logo"
                                        className={`object-contain transition-all duration-300 ${isScrolled ? 'w-8 h-8 md:w-10 md:h-10' : 'w-10 h-10 md:w-12 md:h-12'}`}
                                    />
                                </div>
                            </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center justify-center flex-1">
                            <div className={`flex items-baseline transition-all duration-300 ${isScrolled ? 'space-x-6 lg:space-x-8' : 'space-x-8 lg:space-x-12'}`}>
                                {navLinks.map((link) => {
                                    const isActive = link.href === '/'
                                        ? location.pathname === '/'
                                        : location.pathname.startsWith(link.href) && link.href !== '#';

                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className={`relative text-[15px] whitespace-nowrap transition-colors duration-200 ${isActive
                                                ? 'text-black font-semibold'
                                                : 'text-black font-medium'
                                                }`}
                                        >
                                            {link.name}
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black rounded-full" />
                                            )}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:gap-4">
                             {/* Cart Icon */}
                             <button 
                                onClick={toggleCart}
                                className="relative flex items-center justify-center transition-colors" 
                                aria-label="Open Cart"
                             >
                                <FloatingHighlight id="header-cart" boxClassName="rounded-full">
                                    <div className="p-2 relative">
                                        <ShoppingBag size={22} strokeWidth={1.5} />
                                        {cartCount > 0 && (
                                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>
                                </FloatingHighlight>
                            </button>

                            {/* Wishlist Icon */}
                            <button 
                                onClick={toggleWishlist}
                                className="relative flex items-center justify-center transition-colors" 
                                aria-label="Open Wishlist"
                             >
                                <FloatingHighlight id="header-wishlist" boxClassName="rounded-full">
                                    <div className="p-2 relative">
                                        <Heart size={22} strokeWidth={1.5} />
                                        {wishlistItems.length > 0 && (
                                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                                {wishlistItems.length}
                                            </span>
                                        )}
                                    </div>
                                </FloatingHighlight>
                            </button>

                             <a href="/profile" className="relative flex items-center justify-center transition-colors" aria-label="User Profile">
                                <FloatingHighlight id="header-icon" boxClassName="rounded-full">
                                    <div className="p-2 flex items-center gap-2">
                                        <User size={22} strokeWidth={1.5} />
                                        {isAuthenticated && user && (
                                            <span className="hidden lg:block text-sm font-medium text-dark">{user.name.split(' ')[0]}</span>
                                        )}
                                    </div>
                                </FloatingHighlight>
                            </a>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden text-gray-700 hover:text-black p-2"
                                aria-label="Open menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = link.href === '/'
                                    ? location.pathname === '/'
                                    : location.pathname.startsWith(link.href) && link.href !== '#';

                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`block px-3 py-4 text-base border-b border-gray-50 last:border-0 ${isActive
                                            ? 'text-black font-semibold'
                                            : 'text-gray-600 hover:text-black hover:bg-gray-50 font-medium'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;