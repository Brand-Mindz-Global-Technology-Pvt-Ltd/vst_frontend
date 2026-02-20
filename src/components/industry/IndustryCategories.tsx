import React, { useState } from 'react';
import { ArrowRight, Droplet, RefreshCw, Zap, Search } from 'lucide-react';

// Data for the categories
const categoriesData = [
    {
        id: 'ro-plant',
        title: 'Industrial RO Plant',
        icon: <Droplet size={20} />,
        image: 'public/assets/about/subtract.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet.',
        benefits: [
            'High Efficiency Filtration',
            'Pure Water, Peak Productivity'
        ]
    },
    {
        id: 'effluent-plant',
        title: 'Effluent Treatment Plant',
        icon: <RefreshCw size={20} />,
        image: 'public/assets/about/subtract.png',
        description: 'Advanced effluent treatment solutions designed to handle complex industrial wastewater, ensuring compliance with environmental regulations while recovering usable water.',
        benefits: [
            'Eco-friendly Processing',
            'Cost-effective Waste Management'
        ]
    },
    {
        id: 'sewage-plant',
        title: 'Sewage Treatment Plant',
        icon: <Zap size={20} />,
        image: 'public/assets/about/subtract.png',
        description: 'Robust sewage treatment systems for residential and commercial spaces. Our STPs are compact, odorless, and highly efficient in treating wastewater for secondary uses.',
        benefits: [
            'Odorless Operation',
            'Compact Footprint'
        ]
    },
    {
        id: 'water-plant',
        title: 'Water Treatment Plant',
        icon: <Droplet size={20} />,
        image: 'public/assets/about/subtract.png',
        description: 'Comprehensive water treatment plants providing safe, potable water from various sources. We customize solutions based on raw water quality and precise requirements.',
        benefits: [
            'Safe Drinking Water',
            'Customized Filtration Media'
        ]
    },
    {
        id: 'custom-solution',
        title: 'Custom Solution',
        icon: <Search size={20} />,
        image: 'public/assets/about/subtract.png',
        description: 'Tailor-made water management systems engineered for specific industry needs. Describe your challenge, and our experts will design the perfect purification process for you.',
        benefits: [
            'Industry-Specific Design',
            'Expert Consultation'
        ]
    }
];

const IndustryCategories: React.FC = () => {
    const [activeTab, setActiveTab] = useState(categoriesData[0].id);

    const activeData = categoriesData.find(cat => cat.id === activeTab) || categoriesData[0];

    return (
        <section className="w-full bg-[#EFEFEF] py-12 md:py-20 font-outfit">
            <div className="max-w-[1300px] mx-auto px-4 md:px-8">

                {/* Header Area */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-imperator font-medium tracking-tight mb-2">
                        <span className="text-dark">End-to-End</span> <span className="text-dark">Water</span> <span className="text-gray-400">Management</span>
                    </h2>
                    <div className="bg-[#007ebb] px-6 py-2 md:py-3 rounded-tl-[15px] rounded-bl-[15px] rounded-tr-[10px] shadow-md mt-2 md:mt-4">
                        <h3 className="text-2xl md:text-4xl lg:text-4xl font-imperator font-medium text-white tracking-widest leading-none">
                            Designed for Performance, Built for Purity !
                        </h3>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left: Tabs List */}
                    <div className="w-full lg:w-[35%] flex flex-col gap-3 md:gap-4">
                        {categoriesData.map((category) => {
                            const isActive = activeTab === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveTab(category.id)}
                                    className={`
                                        w-full flex items-center p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 text-left cursor-pointer
                                        ${isActive
                                            ? 'bg-[#007ebb] text-white shadow-lg scale-[1.02] ml-0 md:ml-4'
                                            : 'bg-white text-dark hover:bg-gray-50 shadow-sm ml-0'
                                        }
                                    `}
                                >
                                    {/* Icon Container */}
                                    <div className={`
                                        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shrink-0 mr-4 transition-colors duration-300
                                        ${isActive ? 'bg-white text-[#007ebb]' : 'bg-[#EFEFEF] text-[#007ebb] border border-gray-200'}
                                    `}>
                                        {category.icon}
                                    </div>

                                    {/* Tab Title */}
                                    <span className="font-outfit font-medium text-lg md:text-xl lg:text-xl">
                                        {category.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Content Panel */}
                    <div className="w-full lg:w-[65%] mt-8 lg:mt-0 relative flex items-stretch">
                        <div className="w-full bg-[#cdecff] p-5 md:p-8 lg:p-10 flex flex-col lg:flex-row items-stretch rounded-sm shadow-sm gap-8 lg:gap-0">

                            {/* Image container */}
                            <div className="w-full lg:w-[45%] h-[250px] md:h-[350px] lg:h-auto lg:min-h-[400px] shrink-0 relative pointer-events-none">
                                <img
                                    src={activeData.image}
                                    alt={activeData.title}
                                    className="w-full h-full object-cover rounded-sm lg:rounded-none"
                                />
                            </div>

                            {/* Content Description */}
                            <div className="w-full lg:w-[55%] flex flex-col relative z-20">

                                {/* Blue Title Box */}
                                <div className="bg-[#007ebb] text-white px-5 md:px-8 py-3 md:py-4 font-outfit text-lg md:text-xl font-medium w-full lg:w-max lg:min-w-[85%] lg:absolute lg:top-0 lg:left-0 flex items-center rounded-sm lg:rounded-l-none shadow-sm">
                                    {activeData.title}
                                </div>

                                {/* Main Text Content */}
                                <div className="flex flex-col flex-grow justify-center mt-2 lg:mt-[4.5rem] animate-in fade-in zoom-in-95 duration-500">
                                    {/* Description Paragraph */}
                                    <p className="text-black font-outfit text-sm md:text-[15px] leading-relaxed font-semibold lg:pl-10 mb-6">
                                        {activeData.description}
                                    </p>

                                    {/* Checkmark List */}
                                    <ul className="space-y-3 mb-8">
                                        {activeData.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-center gap-3 md:gap-4 lg:pl-10 bg-white p-1.5 pr-6 md:pr-8 rounded-r-[50px] w-max max-w-full shadow-sm">
                                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="font-outfit font-semibold text-sm md:text-[15px] text-black shrink-0">
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Enquiry Button */}
                                    <div className="lg:pl-10">
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center gap-3 bg-black rounded-full py-2.5 px-6 hover:bg-[#007ebb] transition-colors duration-300 group/btn shadow-md"
                                        >
                                            <span className="text-white text-sm md:text-[15px] font-semibold whitespace-nowrap">
                                                Enquiry Now
                                            </span>
                                            <div className="bg-white rounded-full p-1.5 flex items-center justify-center transition-colors duration-300">
                                                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-black group-hover/btn:text-[#007ebb]" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default IndustryCategories;
