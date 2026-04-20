import React, { useState, useEffect } from 'react';
import { productService } from '../../services/shop/productService';

interface Category {
    _id: string;
    name: string;
    slug: string;
    subCategories?: any[];
}

interface FilterSidebarProps {
    onApply: (filters: { category: string; minPrice: string; maxPrice: string; rating: string }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApply }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(20000);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productService.getCategories();
                if (response.success) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleToggleCategory = (categoryName: string) => {
        if (categoryName === "All") {
            setSelectedCategories([]);
            return;
        }

        setSelectedCategories(prev => {
            if (prev.includes(categoryName)) {
                return prev.filter(c => c !== categoryName);
            } else {
                return [...prev, categoryName];
            }
        });
    };

    const handleApply = () => {
        onApply({
            category: selectedCategories.join(','),
            minPrice: '0',
            maxPrice: priceRange.toString(),
            rating: selectedRating?.toString() || ''
        });
    };

    return (
        <aside className="w-full flex flex-col gap-8 pb-20 no-scrollbar">
            <h2 className="text-3xl font-semibold text-black font-josefin">Filter Options</h2>

            <hr className="border-[#7C7C7C]" />

            {/* Categories */}
            <div>
                <h3 className="text-2xl font-josefin font-semibold text-gray-900 mb-3">By Categories</h3>
                
                {loading ? (
                    <div className="flex flex-col gap-3 pl-1 animate-pulse">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-6 bg-gray-100 rounded w-3/4"></div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 pl-1">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.length === 0}
                                    onChange={() => handleToggleCategory("All")}
                                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#0077B6] checked:border-[#0077B6] transition-all cursor-pointer"
                                />
                                <svg
                                    className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className={`text-md font-josefin transition-colors ${selectedCategories.length === 0 ? "text-black font-semibold" : "text-[#4D5E6B]"}`}>
                                All
                            </span>
                        </label>

                        {categories.map((cat) => (
                            <label
                                key={cat._id}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.name)}
                                        onChange={() => handleToggleCategory(cat.name)}
                                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#0077B6] checked:border-[#0077B6] transition-all cursor-pointer"
                                    />
                                    <svg
                                        className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className={`text-md font-josefin transition-colors ${selectedCategories.includes(cat.name) ? "text-black font-semibold" : "text-[#4D5E6B]"}`}>
                                    {cat.name}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-josefin">Price</h3>
                <div className="px-1">
                    <div className="relative h-2 bg-gray-200 rounded-full mb-8">
                        <div
                            className="absolute h-full bg-[#0077B6] rounded-full"
                            style={{ width: `${((priceRange - 0) / 20000) * 100}%` }}
                        ></div>
                        <input
                            type="range"
                            min="0"
                            max="20000"
                            step="500"
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="absolute top-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#0077B6] border-2 border-white rounded-full shadow-md pointer-events-none"
                            style={{ left: `calc(${((priceRange - 0) / 20000) * 100}% - 10px)` }}
                        ></div>
                    </div>
                    <div className="flex justify-between gap-10">
                        <div className="flex-1 border border-[#0077B6] rounded-lg py-2 bg-white text-md font-semibold text-black text-center font-josefin">
                            ₹ 0
                        </div>
                        <div className="flex-1 border border-[#0077B6] rounded-lg py-2 bg-white text-md font-semibold text-black text-center font-josefin">
                            ₹ {priceRange.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div>
                <h3 className="text-xl font-semibold text-black mb-4 font-josefin">Reviews</h3>
                <div className="flex gap-2">
                    {[5, 4, 3, 2].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                            className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-1 transition-all group ${
                                selectedRating === rating 
                                    ? "bg-[#0077B6] border-[#0077B6]" 
                                    : "bg-white border-gray-200 hover:border-[#0077B6]"
                            }`}
                        >
                            <span className={`text-xl leading-none transition-colors ${
                                selectedRating === rating ? "text-white" : "text-[#FFB400]"
                            }`}>★</span>
                            <span className={`font-bold text-xl font-josefin transition-colors ${
                                selectedRating === rating ? "text-white" : "text-gray-700"
                            }`}>{rating}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <button 
                onClick={handleApply}
                className="w-full bg-[#343434] text-white font-semibold py-3 rounded-xl shadow-xl hover:bg-black transition-all tracking-widest text-lg mt-2 font-josefin"
            >
                Apply Filter
            </button>
        
        </aside>
    );
};

export default FilterSidebar;
