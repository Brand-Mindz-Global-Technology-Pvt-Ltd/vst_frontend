import React, { useState } from 'react';

const categories = [
    "Legend Stainless Steel",
    "Electric Water Purifier",
    "AquaSplash",
    "Atlanti Water Dispenser",
    "Spare Parts"
];

const FilterSidebar: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("Electric Water Purifier");
    const [priceRange, setPriceRange] = useState(14000);

    return (
        <aside className="w-full flex flex-col gap-8 pb-20 no-scrollbar">
            <h2 className="text-3xl font-semibold text-black font-josefin">Filter Options</h2>

            <hr className="border-[#7C7C7C]" />

            {/* Categories */}
            <div>
                <h3 className="text-2xl font-josefin font-semibold text-gray-900 mb-3">By Categories</h3>
                {/* <span className="text-[12px]  px-4 py-0 rounded-md pt-1 text-black font-medium border border-black  tracking-tighter">All</span> */}

                <div className="flex flex-col gap-4 pl-1">
                    {["All", ...categories].map((cat) => (
                        <label
                            key={cat}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={activeCategory === cat || (cat === "All" && activeCategory === "All")}
                                    onChange={() => setActiveCategory(cat)}
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
                            <span className={`text-md font-josefin transition-colors ${activeCategory === cat ? "text-black font-semibold" : "text-[#4D5E6B]"}`}>
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-josefin">Price</h3>
                <div className="px-1">
                    <div className="relative h-2 bg-gray-200 rounded-full mb-8">
                        <div
                            className="absolute h-full bg-[#0077B6] rounded-full"
                            style={{ width: `${((priceRange - 4000) / 16000) * 100}%` }}
                        ></div>
                        <input
                            type="range"
                            min="4000"
                            max="20000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="absolute top-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#0077B6] border-2 border-white rounded-full shadow-md pointer-events-none"
                            style={{ left: `calc(${((priceRange - 4000) / 16000) * 100}% - 10px)` }}
                        ></div>
                    </div>
                    <div className="flex justify-between gap-20">
                        <div className="flex-1 border border-[#0077B6] rounded-lg  py-2 bg-white text-md font-semibold text-black text-center font-josefin">
                            ₹ 4,000
                        </div>
                        <div className="flex-1 border border-[#0077B6] rounded-lg  py-2 bg-white text-md font-semibold text-black text-center font-josefin">
                            ₹ {priceRange.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div>
                <h3 className="text-xl font-semibold text-black mb-4 font-josefin">Reviews</h3>
                <div className="flex gap-3">
                    {[5, 4, 3, 2].map((rating) => (
                        <button
                            key={rating}
                            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-0 bg-white hover:border-[#0077B6] hover:bg-[#0077B6] transition-all group"
                        >
                            <span className="text-[#FFB400] text-xl leading-none group-hover:text-white transition-colors">★</span>
                            <span className="font-bold text-gray-700 text-xl font-josefin group-hover:text-white transition-colors">{rating}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <button className="w-full bg-[#343434] text-white font-semibold py-3 rounded-xl shadow-xl hover:bg-black transition-all tracking-widest text-lg mt-2 font-josefin">
                Apply Filter
            </button>
        
        </aside>
    );
};

export default FilterSidebar;
