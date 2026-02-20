import React from 'react';
import { MessageCircle, Clock, Share2 } from 'lucide-react';

// --- Types ---
// Each section can be a paragraph, a subheading, a feature list, or a conclusion CTA.
// This structure makes it easy to drive content from an API/CMS in the future.

interface FeatureItem {
    text: string;
}

interface BlogSection {
    type: 'intro' | 'heading' | 'paragraph' | 'features' | 'conclusion' | 'cta';
    heading?: string;
    content?: string;
    featureLabel?: string;
    items?: FeatureItem[];
}

interface BlogData {
    id: number | string;
    title: string;
    date: string;
    comments: number;
    readTime: string;
    sections: BlogSection[];
}

// --- Static Data (swap this with an API prop in the future) ---
const blogData: BlogData = {
    id: 1,
    title: 'Why Every Home Needs a Water Purifier in 2025',
    date: '12 Mar 2021',
    comments: 3,
    readTime: '2 Mins',
    sections: [
        {
            type: 'intro',
            content:
                'Water Is The Essence Of Life — But In 2025, Pure Water Is No Longer A Guarantee. With Rising Pollution, Industrial Waste, And Aging Water Pipelines, Even Tap Water That Looks Clear May Be Hiding Harmful Contaminants. That\'s Why Having A Water Purifier At Home Has Shifted From Being A Luxury To A Basic Necessity For Every Modern Household.',
        },
        {
            type: 'heading',
            heading: '1. The Changing Quality Of Water',
            content:
                'Over The Past Decade, Rapid Urbanization And Industrial Development Have Led To Increased Contamination Of Natural Water Sources. Heavy Metals Like Lead, Mercury, And Arsenic, Along With Microplastics And Harmful Microorganisms, Are Now Commonly Found In Regular Tap Water. Even Municipal Filtration Systems Can\'t Completely Remove These Impurities, Making At-Home Purification A Critical Step For Safe Drinking Water.',
        },
        {
            type: 'heading',
            heading: '2. Health Comes First',
            content:
                'Contaminated Water Is One Of The Leading Causes Of Waterborne Diseases Such As Typhoid, Cholera, And Diarrhea. Long-Term Consumption Of Impure Water Can Also Lead To Kidney Problems, Skin Issues, And Weakened Immunity. A Reliable Water Purifier Ensures That Every Sip You Take Is Clean, Mineral-Balanced, And Healthy, Protecting Your Family\'s Well-Being Every Day.',
        },
        {
            type: 'heading',
            heading: '3. Smart Technology For Smart Homes',
            content:
                'In 2025, Water Purifiers Have Evolved Far Beyond Simple Filtration. The Latest Models',
            featureLabel: 'Feature:',
            items: [
                { text: 'RO + UV + UF Purification For Multi-Layer Protection' },
                { text: 'TDS Control To Retain Essential Minerals' },
                { text: 'Smart Indicators For Filter Change And Water Quality Levels' },
                { text: 'Energy-Efficient And Eco-Friendly Designs' },
            ],
        },
        {
            type: 'paragraph',
            content:
                'Modern Purifiers Like Aqua Pure Or Kent Supreme Even Connect To Your Smartphone, Helping You Monitor Performance And Water Usage In Real Time.',
        },
        {
            type: 'conclusion',
            heading: 'Conclusion',
            content:
                'As We Step Further Into 2025, Water Safety Should Be At The Top Of Every Household\'s Priority List. Installing A Water Purifier Is Not Just A Trend — It\'s An Essential Upgrade For Modern Living.',
        },
        {
            type: 'cta',
            content:
                'Make The Smart Choice Today. Drink Pure, Live Pure, And Protect Your Loved Ones With Clean Water',
        },
    ],
};

// --- Component ---

interface BlogContentProps {
    data?: BlogData; // Accept dynamic data in the future; falls back to static content
}

const BlogContent: React.FC<BlogContentProps> = ({ data = blogData }) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: data.title, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <article className="w-full max-w-[1600px] mx-auto px-4 md:px-0 font-josefin text-dark">

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {data.title}
            </h1>

            {/* Meta Bar - Bottom (Right Aligned) */}
            <div className="flex flex-wrap items-center justify-end gap-4 md:gap-6 text-sm md:text-base text-gray-500 mt-6 pb-6">
                <span>{data.date}</span>
                <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    <span>{data.comments}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{data.readTime}</span>
                </div>
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-dark text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#007ebb] transition-colors"
                >
                    <Share2 size={14} />
                    Share
                </button>
            </div>

            {/* Sections */}
            <div className="space-y-8 text-justify text-sm md:text-base leading-relaxed">
                {data.sections.map((section, idx) => {
                    switch (section.type) {
                        case 'intro':
                            return (
                                <p key={idx} className="text-dark">
                                    {section.content}
                                </p>
                            );

                        case 'heading':
                            return (
                                <div key={idx} className="space-y-3">
                                    <h2 className="text-base md:text-lg font-bold text-dark">
                                        {section.heading}
                                    </h2>
                                    {section.content && (
                                        <p className="text-dark indent-8">{section.content}</p>
                                    )}
                                    {section.featureLabel && (
                                        <p className="font-semibold">{section.featureLabel}</p>
                                    )}
                                    {section.items && (
                                        <ul className="space-y-1 pl-4">
                                            {section.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1 text-dark font-bold">·</span>
                                                    <span>{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );

                        case 'paragraph':
                            return (
                                <p key={idx} className="text-dark">
                                    {section.content}
                                </p>
                            );

                        case 'conclusion':
                            return (
                                <div key={idx} className="space-y-3">
                                    <h2 className="text-base md:text-lg font-bold text-dark">
                                        {section.heading}
                                    </h2>
                                    <p className="text-dark indent-8">{section.content}</p>
                                </div>
                            );

                        case 'cta':
                            return (
                                <p key={idx} className="text-dark font-medium">
                                    {section.content}
                                </p>
                            );

                        default:
                            return null;
                    }
                })}
            </div>
        </article>
    );
};

export default BlogContent;
