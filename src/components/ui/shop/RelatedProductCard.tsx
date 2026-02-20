import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RelatedProductCardProps {
    id: number;
    name: string;
    image: string;
    discount?: string;
}

const RelatedProductCard: React.FC<RelatedProductCardProps> = ({
    id,
    name,
    image,
    discount
}) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full aspect-4/5 rounded-[10px] overflow-hidden group shadow-2xl bg-[#000000] border border-gray-900">
            {/* Dark Background with Smoke Effect Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Simulated Smoke/Mist via a dark gradient and podium */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent z-0"></div>
                <img
                    src="/assets/shopdetail/blackcard.png"
                    alt="podium"
                    className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[110%] object-contain opacity-60 z-1 pointer-events-none"
                />
                {/* Mist/Smoke effect layer */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none z-20"></div> */}
            </div>

            {/* Product Name - Top Center */}
            <div className="absolute top-6 left-0 right-0 text-center z-30">
                <h3 className="text-xl sm:text-2xl font-josefin text-white tracking-wide px-4">
                    {name}
                </h3>
            </div>

            {/* Discount Badge - Top Left */}
            <div className="absolute top-16 left-0 z-40">
                <div className="bg-[#00D100] text-white text-[10px] font-bold px-3 py-1 rounded-r-md uppercase flex items-center shadow-lg">
                    {discount || "40% OFF"}
                </div>
            </div>

            {/* Main Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-8 mt-4 z-20">
                <img
                    src={image}
                    alt={name}
                    className="w-[75%] h-[75%] object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    style={{
                        filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.45))'
                    }}
                />
            </div>

            {/* See Details Button - Bottom Center */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-40 px-6">
                <button
                    onClick={() => navigate(`/shop/${id}`)}
                    className="w-full max-w-[160px] bg-[#007ebb] text-white py-2.5 rounded-lg border border-white/20 font-semibold shadow-xl hover:bg-[#005c8a] transition-all transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                    See Details
                </button>
            </div>
        </div>
    );
};

export default RelatedProductCard;
