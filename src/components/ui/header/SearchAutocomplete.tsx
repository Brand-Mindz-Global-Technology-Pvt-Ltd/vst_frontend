import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { productService } from '../../../services/shop/productService';
import { getImageUrl } from '../../../config/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';

const SearchAutocomplete: React.FC = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await productService.searchProducts(query);
                if (response.success) {
                    setSuggestions(response.data.slice(0, 5)); // Show top 5
                    setIsOpen(true);
                }
            } catch (error) {
                console.error("Search suggestions error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);

            // If already on shop page, scroll down to results
            if (location.pathname === '/shop') {
                setTimeout(() => {
                    const section = document.getElementById('shop-main-section');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    };

    const handleSuggestionClick = (productId: string) => {
        navigate(`/shop/${productId}`);
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-[400px]" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    placeholder="Search for products..."
                    className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-full py-2.5 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-[#007ebb]/20 focus:border-[#007ebb] transition-all text-sm font-medium placeholder:text-gray-400"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007ebb] transition-colors" size={18} />
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {isLoading && <Loader2 className="animate-spin text-[#007ebb]" size={16} />}
                    {query && (
                        <button 
                            type="button" 
                            onClick={() => { setQuery(''); setSuggestions([]); }}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </form>

            <AnimatePresence>
                {isOpen && (suggestions.length > 0 || (query.length >= 2 && !isLoading)) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[9999]"
                    >
                        {suggestions.length > 0 ? (
                            <div className="py-2">
                                <p className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">Suggestions</p>
                                {suggestions.map((item) => (
                                    <button
                                        key={item._id}
                                        onClick={() => handleSuggestionClick(item._id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50/50 transition-colors text-left group"
                                    >
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 p-1">
                                            <img src={getImageUrl(item.images?.[0])} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-dark truncate group-hover:text-[#007ebb] transition-colors">{item.name}</p>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{item.category}</p>
                                        </div>
                                        <ArrowRight size={14} className="text-gray-300 group-hover:text-[#007ebb] transition-all -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </button>
                                ))}
                                <button 
                                    onClick={handleSearch}
                                    className="w-full px-4 py-3 text-center text-xs font-bold text-[#007ebb] hover:bg-blue-50 transition-colors border-t border-gray-50 mt-1"
                                >
                                    View all results for "{query}"
                                </button>
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-sm text-gray-400 font-medium">No results found for "{query}"</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchAutocomplete;
