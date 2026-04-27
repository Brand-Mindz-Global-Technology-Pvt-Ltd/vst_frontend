import React from 'react';
import FilterSidebar from './FilterSidebar';
import HotSellingBanner from './HotSellingBanner';
import CommercialProductGrid from './CommercialProductGrid';

const CommercialMain: React.FC = () => {
    return (
        <section className="w-full flex justify-center">
            {/* Split Background Container */}
            <div className="w-full flex flex-col lg:flex-row min-h-screen">

                {/* Left Section - Filter Sidebar Column */}
                <div className="lg:w-[380px] xl:w-[400px] lg:shrink-0 border-r border-gray-100">
                    <div className="sticky top-0 h-screen overflow-y-auto no-scrollbar flex flex-col">
                        {/* Filter Section Wrapper - White Background */}
                        <div className="w-full bg-white flex justify-end pt-12">
                            <div className="w-full lg:max-w-72 xl:max-w-80 lg:pr-4 px-6 lg:pl-0">
                                <FilterSidebar onApply={() => {}} />
                            </div>
                        </div>

                        {/* Banner Section Wrapper - Grey Background */}
                        <div className="w-full md:mt-10 bg-[#DDDDDD] flex justify-center">
                            <div className="w-full lg:max-w-72 xl:max-w-80  px-0 lg:pl-0 ">
                                <HotSellingBanner />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Product Grid (Grey Background) */}
                <div className="flex-1 bg-[#efefef] py-12 px-4 md:px-8 lg:px-12 xl:px-20">
                    <div className="max-w-[1200px]">
                        <CommercialProductGrid />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommercialMain;
