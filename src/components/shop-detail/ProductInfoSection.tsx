import React from 'react';
import { Heart, Share2, Star, ChevronDown } from 'lucide-react';

const ProductInfoSection: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 font-josefin md:pt-12">

            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="bg-[#EFEFEF] border border-gray-500 text-[11px] text-gray-500 px-2 py-0.5 rounded-lg w-fit font-semibold  tracking-wider">Aquaguard</span>
                        <h1 className="text-3xl md:text-5xl py-2 pt-3 font-imperator font-medium text-[#3E3E3E]">Fiji Aqua Pro</h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10  rounded-full flex items-center justify-center hover:bg-gray-50 transition-all">
                            <Heart size={25} className="text-black" />
                        </button>
                        <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all">
                            <Share2 size={25} className="text-black" />
                        </button>
                    </div>
                </div>
                <p className="text-[#646464] text-lg md:text-xl font-medium">
                    Aqua Pro RO + UV + UF + TDS Adjuster<br />Water Purifier
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400 gap-1">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" stroke="none" />)}
                    </div>
                    <span className="text-xs text-[#646464] mt-0.5 font-medium">4.6 (500 Reviews)</span>
                </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 md:-mt-2">
                <span className="text-3xl sm:text-4xl font-semibold text-black leading-none">₹4,000</span>
                <span className="text-lg sm:text-xl text-[#3f3f3f] line-through decoration-red-500 opacity-60">₹8,000</span>
            </div>

            {/* Short Description */}
            <p className="text-black text-md md:text-lg  text-justify md:-mt-1 font-light">
                The Fiji Aqua Pro is a cutting-edge water purifier designed to deliver the highest quality drinking water. Featuring RO + UV + UF purification along with a TDS adjuster, it ensures that your water is not only safe but also perfectly balanced in terms of essential minerals.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-[140px]">
                        <button className="w-full flex items-center md:text-[19px] justify-between px-4 py-3 bg-[#EFEFEF] border border-black rounded-xl text-black font-semibold">
                            <span>Quantity : 1</span>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                    <div className="flex-2">
                        <button className="relative group overflow-hidden w-full py-3 bg-[#EFEFEF] md:text-[19px] border border-black rounded-xl text-black font-semibold transition-all duration-300">
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Add to cart</span>
                            <div className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-500 group-hover:h-full z-0"></div>
                        </button>
                    </div>
                </div>
                <button className="w-full py-3 bg-[#0077B6] text-white rounded-lg font-normal md:text-xl hover:bg-[#006ca1] transition-all shadow-lg">
                    Buy Now
                </button>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-10 gap-y-2 sm:gap-y-1.5 mt-4 text-[14px] sm:text-[17px]">
                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Brand</span>
                    <span className="text-black font-medium">KENT</span>
                </div>

                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Special Feature</span>
                    <span className="text-black font-medium text-right sm:text-left">RO, Reduce TDS</span>
                </div>

                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Product Dimensions</span>
                    <span className="text-black font-medium text-right sm:text-left">40L x 25W x 52H cm</span>
                </div>

                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Package Information</span>
                    <span className="text-black font-medium text-right sm:text-left">Dispenser</span>
                </div>

                <div className="flex justify-between sm:contents">
                    <span className="font-bold text-black">Installation Type</span>
                    <span className="text-black font-medium text-right sm:text-left">Brand installation</span>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <div className="h-px bg-black w-[80%] opacity-80"></div>
            </div>

            {/* Feature Icons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center  rounded-lg">
                        <img
                            src="/assets/shopdetail/icons/material.png"
                            alt="Material"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-black text-md md:text-lg leading-tight">Material</span>
                        <span className="text-[#646464] font-medium">Plastic</span>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center  rounded-lg bg-black text-white">
                        <img
                            src="/assets/shopdetail/icons/capacity.png"
                            alt="Capacity"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain invert"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-black text-lg leading-tight">Capacity</span>
                        <span className="text-[#646464] font-medium">8 liters</span>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center  rounded-lg">
                        <img
                            src="/assets/shopdetail/icons/warranty.png"
                            alt="Warranty"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-black text-lg leading-tight ">Included Components</span>
                        <span className="text-[#646464] font-medium">Warrenty Card</span>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center  rounded-lg">
                        <img
                            src="/assets/shopdetail/icons/purification.png"
                            alt="Purification"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-black text-lg leading-tight">Purification method</span>
                        <span className="text-[#646464] font-medium">RO + UV + UF + TDS</span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ProductInfoSection;
