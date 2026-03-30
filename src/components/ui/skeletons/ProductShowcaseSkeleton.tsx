import React from 'react';

const ProductShowcaseSkeleton: React.FC = () => {
  return (
    <section className="w-full bg-[#f1f8ff] py-16 px-4 md:px-8 font-josefin overflow-hidden min-h-[700px]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section Skeleton */}
        <div className="flex flex-col items-center mb-16 px-4">
          <div className="h-12 w-96 bg-gray-200 animate-pulse rounded-2xl mb-10"></div>
          
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-32 bg-gray-200 animate-pulse rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Main Content Area Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Featured Product Skeleton */}
          <div className="lg:col-span-4 w-full">
            <div className="w-full h-[560px] bg-gray-200 animate-pulse rounded-[15px]"></div>
          </div>

          {/* Details & Carousel Skeleton */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-24 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="flex gap-4 mt-4">
                <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            </div>

            {/* Carousel Skeleton */}
            <div className="flex gap-5 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[220px] h-[340px] bg-gray-200 animate-pulse rounded-[24px]"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSkeleton;
