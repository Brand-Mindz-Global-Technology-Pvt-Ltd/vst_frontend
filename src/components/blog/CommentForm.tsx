import React, { useState } from 'react';

const CommentForm: React.FC = () => {
    const [formData, setFormData] = useState({
        comment: '',
        name: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
    };

    return (
        <section className="max-w-full w-full relative py-16 md:py-24">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/home/banner-bg.webp"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#021019]/90"></div>
            </div>

            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 md:px-8 text-white font-jost">
                {/* Heading - Left Aligned */}
                <div className="mb-12">
                    <h3 className="text-3xl md:text-5xl font-jost font-semibold mb-4 tracking-wide">Leave a Reply</h3>
                    <p className="text-gray-400 text-sm md:text-lg font-jost">
                        Your email address will not be published. Required fields are marked
                    </p>
                </div>

                {/* Form - Centered */}
                <div className="max-w-[1000px] mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Comment Field */}
                        <div className="space-y-3">
                            <label htmlFor="comment" className="block text-lg md:text-xl font-jost font-medium">
                                Comment *
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows={8}
                                required
                                value={formData.comment}
                                onChange={handleChange}
                                className="w-full bg-white rounded-[4px] p-5 text-dark text-lg focus:outline-none focus:ring-2 focus:ring-[#007ebb]"
                            ></textarea>
                        </div>

                        {/* Name Field */}
                        <div className="space-y-3">
                            <label htmlFor="name" className="block text-lg md:text-xl font-jost font-medium">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white rounded-[4px] px-5 py-4 text-dark text-lg focus:outline-none focus:ring-2 focus:ring-[#007ebb]"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-3">
                            <label htmlFor="email" className="block text-lg md:text-xl font-jost font-medium">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white rounded-[4px] px-5 py-4 text-dark text-lg focus:outline-none focus:ring-2 focus:ring-[#007ebb]"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="bg-[#007ebb] text-white px-10 py-4 rounded-[4px] text-lg font-manrope font-medium hover:bg-[#006aa0] transition-colors shadow-lg"
                            >
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CommentForm;
