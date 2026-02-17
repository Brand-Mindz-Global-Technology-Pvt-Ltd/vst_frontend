import React, { useState } from 'react';
import { Heart, ShoppingCart, User, Menu, X, Megaphone } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/', active: true },
        { name: 'Shop', href: '/shop' },
        { name: 'Commercials', href: '#' },
        { name: 'Industry', href: '#' },
        { name: 'Services', href: '#' },
    ];

    return (
        <header className="w-full font-josefin">
            {/* Announcement Bar */}
            <div className="bg-dark text-white py-3 px-4 flex items-center justify-center gap-4 text-[13px] md:text-sm tracking-wide">
                <Megaphone size={16} className="shrink-0" />
                <p className="text-center font-medium">
                    Exclusive Deal : Order now and save additional 10% · Limited time only!
                </p>
            </div>

            {/* Main Navbar */}
            <nav className="bg-[#EFEFEF] backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-[1500px] mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        {/* Logo */}
                        <div className="shrink-0 flex items-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-gray-100 overflow-hidden bg-white shadow-sm">
                                <img
                                    src="./assets/home/VST-logo.png"
                                    alt="VST Logo"
                                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                                />
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center justify-center flex-1">
                            <div className="flex items-baseline space-x-8 lg:space-x-12">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`relative text-[15px] transition-colors duration-200 ${link.active
                                            ? 'text-black font-semibold'
                                            : 'text-black font-medium'
                                            }`}
                                    >
                                        {link.name}
                                        {link.active && (
                                            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black rounded-full" />
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 md:gap-6">

                            <button className="text-gray-700 hover:text-black transition-colors" aria-label="Wishlist">
                                <Heart size={22} strokeWidth={1.5} />
                            </button>
                            <button className="text-gray-700 hover:text-black transition-colors relative" aria-label="Cart">
                                <ShoppingCart size={22} strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                            </button>
                            <button className="text-gray-700 hover:text-black transition-colors" aria-label="User Profile">
                                <User size={22} strokeWidth={1.5} />
                            </button>

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
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`block px-3 py-4 text-base border-b border-gray-50 last:border-0 ${link.active
                                        ? 'text-black font-semibold'
                                        : 'text-gray-600 hover:text-black hover:bg-gray-50 font-medium'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
