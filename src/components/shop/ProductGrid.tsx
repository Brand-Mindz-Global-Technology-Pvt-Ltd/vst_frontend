import React from 'react';
import ShopProductCard from './ShopProductCard';
import { useProducts } from '../../hooks/useProducts';
import { getImageUrl } from '../../config/apiConfig';
import { ChevronLeft, ChevronRight, ListFilter, X } from 'lucide-react';

interface ProductGridProps {
    filters: {
        category: string;
        minPrice: string;
        maxPrice: string;
        rating: string;
    };
    page: number;
    sort: string;
    search: string;
    onPageChange: (page: number) => void;
    onSortChange: (sort: string) => void;
    onClearSearch: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ filters, page, sort, search, onPageChange, onSortChange, onClearSearch }) => {
    const { products, loading, error, pagination } = useProducts(
        page, 
        12, 
        filters.category, 
        '', 
        search, 
        filters.minPrice, 
        filters.maxPrice, 
        filters.rating,
        sort
    );

    if (loading) {
        return (
            <div className="flex flex-col grow min-h-[400px] items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DAC00]"></div>
                <p className="mt-4 text-gray-500 font-josefin">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col grow min-h-[400px] items-center justify-center">
                <p className="text-red-500 font-josefin">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col grow">
            {/* Top Bar - Sort & View Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-sm">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-josefin text-gray-500">
                        Showing <span className="font-bold text-dark">{products?.length || 0}</span> of <span className="font-bold text-dark">{pagination?.total || 0}</span> results
                    </p>
                    {search && (
                        <div className="flex items-center gap-2 bg-[#007ebb]/10 text-[#007ebb] pl-3 pr-1 py-1 rounded-full text-xs font-bold animate-in fade-in slide-in-from-left-4 duration-300">
                            Search: {search}
                            <button 
                                onClick={onClearSearch}
                                className="p-1 hover:bg-[#007ebb]/20 rounded-full transition-colors group"
                                title="Clear Search"
                            >
                                <X size={14} className="group-active:scale-90 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mr-2">
                        <ListFilter size={16} />
                        Sort by:
                    </div>
                    <select 
                        value={sort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="bg-white border border-gray-100 text-sm font-bold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007ebb]/20 focus:border-[#007ebb] cursor-pointer transition-all shadow-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            {!products || products.length === 0 ? (
                <div className="flex flex-col grow min-h-[400px] items-center justify-center bg-white/30 rounded-[40px] border border-dashed border-gray-300">
                    <p className="text-gray-400 font-josefin text-xl uppercase tracking-widest">No products found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search term</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => {
                            const productImage = getImageUrl(product.images?.[0]);

                            return (
                                <ShopProductCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    image={productImage}
                                    rating={product.rating || 0}
                                    reviews={product.reviewsCount?.toString() || "0"}
                                    currentPrice={product.price || 0}
                                    originalPrice={product.oldPrice || 0}
                                    isLimitedTime={product.isLimitedTime}
                                    category={product.category}
                                />
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-3 mt-16">
                            <button
                                onClick={() => onPageChange(page - 1)}
                                disabled={page === 1}
                                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-gray-100 text-gray-400 hover:text-[#007ebb] hover:border-[#007ebb] disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400 transition-all shadow-sm group"
                            >
                                <ChevronLeft size={20} className="group-active:scale-90 transition-transform" />
                            </button>
                            
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => onPageChange(i + 1)}
                                    className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                                        page === i + 1 
                                            ? 'bg-[#007ebb] text-white shadow-blue-500/20' 
                                            : 'bg-white border border-gray-100 text-gray-500 hover:border-[#007ebb] hover:text-[#007ebb]'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => onPageChange(page + 1)}
                                disabled={page === pagination.totalPages}
                                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-gray-100 text-gray-400 hover:text-[#007ebb] hover:border-[#007ebb] disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400 transition-all shadow-sm group"
                            >
                                <ChevronRight size={20} className="group-active:scale-90 transition-transform" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductGrid;
