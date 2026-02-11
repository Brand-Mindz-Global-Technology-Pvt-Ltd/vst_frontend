import React, { useState } from 'react';
import { Phone, MapPin, MessageCircle, Calendar, Clock } from 'lucide-react';

const ContactTeam: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <section className="w-full bg-[#EFEFEF] py-16 md:py-12 font-outfit">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-dark tracking-tight">
                        Contact
                    </h2>
                    <div className="bg-[#007ebb] px-8 py-2 rounded-lg">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight">
                            Our Team
                        </h2>
                    </div>
                </div>

                {/* Main White Container */}
                <div className="bg-white rounded-[40px] shadow-xl overflow-hidden p-6 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* Left Side - Image with Info Cards */}
                        <div className="relative min-h-[500px] lg:min-h-[650px] rounded-[30px] overflow-hidden shadow-xl">
                            {/* Background Image */}
                            <img
                                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
                                alt="Team Meeting"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/60"></div>

                            {/* Contact Information - Top Left */}
                            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                                <div className="p-6 shadow-2xl max-w-[280px]">
                                    <h3 className="text-xl md:text-2xl font-serif text-white mb-4 pb-3 border-b border-gray-200">
                                        Contact Information
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Phone */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                <Phone className="w-5 h-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="text-white text-xs">Call</p>
                                                <p className="text-white font-medium text-sm">+91 0000000000</p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="text-white text-xs">Location</p>
                                                <p className="text-white font-medium text-sm">No.22 Ave, Tirunelvali</p>
                                            </div>
                                        </div>

                                        {/* Chat Support */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                <MessageCircle className="w-5 h-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="text-white text-xs">Chat to support</p>
                                                <p className="text-white font-medium text-sm">hello@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours - Bottom Right */}
                            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10">
                                <div className="shadow-2xl max-w-[280px]">
                                    <h3 className="text-xl md:text-2xl font-serif text-white border-b border-gray-200 mb-4">
                                        Business Hours
                                    </h3>

                                    <div className="space-y-3">
                                        {/* Days */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                <Calendar className="w-5 h-5 text-black" />
                                            </div>
                                            <p className="text-white font-medium text-sm">Monday - Saturday</p>
                                        </div>

                                        {/* Hours */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                <Clock className="w-5 h-5 text-black" />
                                            </div>
                                            <p className="text-white font-medium text-sm">9:00 Am to 8:00 Pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form with Left & Bottom Shadow */}
                        <div className="bg-white rounded-[30px] shadow-[-16px_16px_40px_rgba(0,0,0,0.15)] p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                            <div className="max-w-[500px] mx-auto w-full">

                                {/* Form Header */}
                                <h3 className="text-3xl md:text-4xl font-serif text-dark mb-3">
                                    Contact us
                                </h3>
                                <p className="text-gray-500 mb-8">
                                    Our friendly team would love to hear from you
                                </p>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">

                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-dark font-medium mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-dark font-medium mb-2">
                                            Gmail
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your gmail"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label className="block text-dark font-medium mb-2">
                                            Phone number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone no"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label className="block text-dark font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Leave us a message..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#007ebb] focus:ring-2 focus:ring-[#007ebb]/20 outline-none transition-all resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-[#007ebb] text-white py-3 rounded-3xl font-bold text-lg hover:bg-[#006699] transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] transform"
                                    >
                                        Send message
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactTeam;
