import React from 'react';
import { ShoppingCart, Settings2, ShieldCheck, ThumbsUp } from 'lucide-react';

const ProductFeaturesBar: React.FC = () => {
    return (
        <div className="bg-[#2B2B2B] py-5 w-full">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-20">
                <div className="grid grid-cols-2 lg:flex items-center lg:justify-between gap-y-10 lg:gap-y-0 gap-x-4">
                    {/* Item 1 */}
                    <div className="flex items-center gap-3 text-white justify-start lg:justify-center">
                        <ShoppingCart size={35} strokeWidth={1.5} className="opacity-90" />
                        <span className="text-sm sm:text-lg font-josefin font-light tracking-wide">Buy in store or online</span>
                    </div>

                    <div className="hidden lg:block w-1.5 h-1.5 bg-white rounded-full"></div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-3 text-white justify-start lg:justify-center">
                        <Settings2 size={35} strokeWidth={1.5} className="opacity-90" />
                        <span className="text-sm sm:text-lg font-josefin font-light tracking-wide">Service & Installation</span>
                    </div>

                    <div className="hidden lg:block w-1.5 h-1.5 bg-white rounded-full"></div>

                    {/* Item 3 - Disabled */}
                    <div className="flex items-center gap-3 text-white justify-start lg:justify-center">
                        <ShieldCheck size={35} strokeWidth={1.5} />
                        <span className="text-sm sm:text-lg font-josefin font-light tracking-wide">Product Warranty</span>
                    </div>

                    <div className="hidden lg:block w-1.5 h-1.5 bg-white rounded-full "></div>

                    {/* Item 4 - Disabled */}
                    <div className="flex items-center gap-3 text-white justify-start lg:justify-center">
                        <ThumbsUp size={35} strokeWidth={1.5} />
                        <span className="text-sm sm:text-lg font-josefin font-light tracking-wide">Top Rated Products</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFeaturesBar;
