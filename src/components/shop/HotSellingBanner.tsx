import React from 'react';

const HotSellingBanner: React.FC = () => {
    return (
        <div className="w-full py-12 pb-20">
            <div className="relative">
                {/* Hot Selling Badge */}
                <div className="bg-[#B70000] text-white text-[13px] font-medium px-5 py-2 inline-block font-josefin mb-6 shadow-md rounded-tr-[4px] rounded-br-[4px]">
                    Hot Selling Product
                </div>

                {/* Product Card */}
                <div
                    className="bg-black bg-cover bg-center rounded-[20px] w-full overflow-hidden shadow-2xl relative"
                    style={{ backgroundImage: "url('/assets/shop/hotselling-banner.png')" }}
                >
                    {/* Overlay for readability if image is bright */}
                    <div className="absolute inset-0 bg-black/10 z-0"></div>

                    {/* Main Content Container */}
                    <div className="flex p-5 gap-4 items-center relative z-10">
                        {/* Image Side */}
                        <div className="w-1/2">
                            <img
                                src="/assets/home/aqu-banner.png"
                                alt="Hot Selling Product"
                                className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            />
                        </div>

                        {/* Text Side */}
                        <div className="w-1/2 flex flex-col pt-4">
                            <h4 className="text-[12px] font-medium text-white/90 leading-tight mb-2 font-josefin">
                                Aquaguard Sure Delight NXT RO+UV Water Purifier
                            </h4>
                            <div className="flex items-center gap-1 mb-3">
                                <div className="flex gap-0.5 text-white text-[12px]">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <span className="text-white/70 text-[11px] font-bold">4.6</span>
                            </div>
                            <p className="font-semibold text-white text-3xl mb-4 font-josefin tracking-tight">₹4,000</p>
                            <button className="bg-[#2EB800] hover:bg-[#259300] text-white text-[12px] font-bold px-6 py-2 rounded-md shadow-lg transition-all font-josefin transform active:scale-95">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    
                </div>

              
            </div>
            {/* Carousel Indicator */}
                    <div className="flex justify-center gap-2 pt-6">
                        <div className="w-8 h-1.5 bg-gray-500/50 rounded-full"></div>
                        <div className="w-12 h-1.5 bg-black rounded-full border border-gray-500/30"></div>
                    </div>
        </div>
    );
};

export default HotSellingBanner;
