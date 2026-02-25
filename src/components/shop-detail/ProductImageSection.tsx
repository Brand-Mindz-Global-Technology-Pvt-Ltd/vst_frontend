import React from 'react';

const ProductImageSection: React.FC = () => {
    return (
        <div className="h-full flex flex-col">
            {/* Breadcrumbs */}
            <div className="flex items-center mb-5 text-sm text-black font-medium">
                <span className="hover:underline cursor-pointer">Shop</span>
                <span className="text-black mx-1">&gt;</span>
                <span className="text-black">Fiji Aqua Pro</span>
            </div>
            <div className="bg-[#EAF8FF] rounded-3xl overflow-hidden relative flex items-center justify-center p-6 sm:p-12 min-h-[400px] sm:min-h-[500px]">
                {/* 99.9% Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 scale-90 sm:scale-100 origin-top-left">
                    <div className="flex items-start gap-2">
                        <img src="/assets/shopdetail/icons/guarantee.png" className="w-8 h-8 sm:w-9 sm:h-9" alt="" />
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-4xl font-bold font-josefin leading-none">99.9%</span>
                            <span className="text-[9px] sm:text-[17px] font-semibold font-josefin   text-black px-0 py-0 rounded-sm w-fit">Guarantee pure water</span>
                        </div>
                    </div>
                </div>

                {/* 10X Badge */}
                <div className="absolute top-4 right-10 sm:top-6 sm:right-10 z-10 text-left scale-90 sm:scale-100 origin-top-right">
                    <div className="flex items-start gap-2">
                        <div className="flex items-start gap-2">
                            <img src='/assets/shopdetail/icons/watercheck.png' className='w-8 h-8 sm:w-10 sm:h-10 md:mt-0' alt='' />
                            <div className='flex flex-col'>
                                <span className='text-xl sm:text-4xl font-bold font-josefin leading-none'>10X</span>
                                <span className="text-[10px] sm:text-[18px] font-semibold font-josefin leading-tight max-w-[140px] sm:max-w-[200px]">
                                    more effective at <br className="hidden sm:block" />removing impurities
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Product Image */}
                <div className="relative w-full h-full mt-10 sm:mt-16 flex items-center justify-center">
                    <img
                        src="/assets/home/aqu-banner.png"
                        alt="Fiji Aqua Pro"
                        className="w-full max-w-[300px] sm:max-w-[450px] aspect-square object-contain relative z-10"
                    />
                    {/* Podium */}
                    <img
                        src="/assets/home/podium.webp"
                        alt="podium"
                        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[110%] opacity-40 z-0"
                    />
                </div>

                {/* Smoke/Mist Effect (CSS implementation) */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-white/30 to-transparent pointer-events-none z-20"></div>

                {/* Nav Buttons */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:bg-white transition-all z-30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:bg-white transition-all z-30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="min-w-[80px] sm:min-w-[100px] aspect-square bg-[#000000] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#007EBB] transition-all relative">
                        <img
                            src="/assets/home/aqu-banner.png"
                            alt={`Thumbnail ${i}`}
                            className="w-full h-full object-contain p-2 relative z-10"
                        />
                        <img
                            src="/assets/home/podium.webp"
                            alt="podium"
                            className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[110%] opacity-40 z-0"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImageSection;
