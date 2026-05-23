import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import HotSellingBanner from './HotSellingBanner';
import ProductGrid from './ProductGrid';

const ShopMain: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('newest');
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        rating: ''
    });

    // Extract search query from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('search') || '';
        setSearchQuery(q);
        setPage(1); // Reset to page 1 on new search
    }, [location.search]);

    const handleApplyFilters = (newFilters: { category: string; minPrice: string; maxPrice: string; rating: string }) => {
        setFilters(newFilters);
        setPage(1); // Reset to page 1 on filter change
    };

    const handleClearSearch = () => {
        const params = new URLSearchParams(location.search);
        params.delete('search');
        navigate({ pathname: location.pathname, search: params.toString() });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="shop-main-section" className="w-full flex justify-center scroll-mt-32">
            {/* Split Background Container */}
            <div className="w-full flex flex-col lg:flex-row min-h-screen">

                {/* Left Section - Filter Sidebar Column */}
                <div className="lg:w-[380px] xl:w-[400px] lg:shrink-0 border-r border-gray-100">
                    <div className="sticky top-0 h-screen overflow-y-auto no-scrollbar flex flex-col">
                        {/* Filter Section Wrapper - White Background */}
                        <div className="w-full bg-white flex justify-end pt-12">
                            <div className="w-full lg:max-w-72 xl:max-w-80 lg:pr-4 px-6 lg:pl-0">
                                <FilterSidebar onApply={handleApplyFilters} />
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
                        <ProductGrid 
                            filters={filters} 
                            page={page}
                            sort={sort}
                            search={searchQuery}
                            onPageChange={handlePageChange}
                            onSortChange={setSort}
                            onClearSearch={handleClearSearch}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopMain;
