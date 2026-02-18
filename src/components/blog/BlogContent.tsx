import React from 'react';

const BlogContent: React.FC = () => {
    return (
        <article className="prose prose-lg md:prose-xl max-w-none text-dark font-josefin">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light mb-8 italic">
                In today's fast-paced world, access to clean drinking water is no longer a luxury but a fundamental necessity for human health and well-being.
            </p>

            <p className="mb-8">
                As we look ahead to 2025, the quality of our tap water is becoming increasingly complex due to industrial runoff, aging infrastructure, and emerging contaminants. This is why every modern home needs a reliable water purification system more than ever before.
            </p>

            <h3 className="text-3xl font-bold mb-6 mt-12 text-[#007ebb]">Understanding Modern Water Challenges</h3>
            <p className="mb-8">
                Traditional filtration methods often fall short when dealing with microplastics, pharmaceuticals, and synthetic chemicals that have found their way into our water systems. Modern RO (Reverse Osmosis) and UV purification technologies are specifically designed to target these invisible threats, ensuring that every glass of water you consume is as pure as nature intended.
            </p>

            <div className="bg-[#f8fcfd] p-8 rounded-[30px] border-l-8 border-[#00abff] my-12">
                <p className="text-2xl font-medium text-dark italic mb-0">
                    "Health is not just the absence of disease, but the presence of pure vitality. It starts with the water we drink."
                </p>
            </div>

            <h3 className="text-3xl font-bold mb-6 mt-12 text-[#007ebb]">Long-term Health Benefits</h3>
            <p className="mb-8">
                Consistently drinking purified water aids in better digestion, clearer skin, and improved immune function. By removing excessive minerals and heavy metals, you're not just protecting your appliances from scale buildup, but you're also protecting your internal organs from long-term accumulation of harmful substances.
            </p>

            {/* More content can be added here */}
            <div className="mt-16 pt-16 border-t border-gray-100 text-center">
                <p className="text-gray-400 italic">This is a featured blog post. Full content development is in progress.</p>
            </div>
        </article>
    );
};

export default BlogContent;
