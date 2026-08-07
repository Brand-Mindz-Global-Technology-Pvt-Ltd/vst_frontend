import React from 'react';
import { Phone, MapPin, MessageCircle, Calendar, Clock } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';
import { ContactForm } from './ContactForm';

const ContactTeam: React.FC = () => {
    const { setActiveId } = useHighlight();
    return (
        <section className="w-full bg-[#EFEFEF] py-4 md:py-6 font-outfit">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    onViewportEnter={() => setActiveId('contact-team')}
                    viewport={{ amount: 0.5 }}
                    className="flex items-center justify-center gap-3 mb-8"
                >
                    <h2 className="pt-2 text-3xl md:text-4xl lg:text-4xl font-imperator text-dark tracking-tight font-normal">
                        Contact
                    </h2>
                    <FloatingHighlight
                        id="contact-team"
                        className="pt-4 px-4 py-2 text-3xl md:text-4xl lg:text-4xl font-imperator tracking-tight font-normal"
                        boxClassName="rounded-tr-[15px] rounded-br-[15px] rounded-tl-[10px]"
                    >
                        Our Team
                    </FloatingHighlight>
                </motion.div>

                {/* Main White Container */}
                <div className="bg-white rounded-[15px] shadow-xl overflow-hidden p-6 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* Left Side - Image with Info Cards */}
                        <div className="relative min-h-[400px] lg:min-h-[550px] rounded-[10px] overflow-hidden shadow-xl flex flex-col justify-between p-6 lg:block lg:p-0">
                            {/* Background Image */}
                            <img
                                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
                                alt="Team Meeting"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/60"></div>

                            {/* Contact Information - Top Left */}
                            <div className="relative w-full lg:w-auto lg:absolute lg:top-8 lg:left-8 z-10">
                                <div className="p-6 shadow-2xl w-full lg:max-w-[280px]">
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
                                                <p className="text-white font-medium text-sm">+91 90477 22131</p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="text-white text-xs">Location</p>
                                                <p className="text-white font-medium text-sm">Thai Complex, 906L, Tenkasi Road, Rajapalayam, Tamil Nadu, 626117</p>
                                            </div>
                                        </div>

                                        {/* Chat Support */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                                <MessageCircle className="w-5 h-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="text-white text-xs">Chat to support</p>
                                                <p className="text-white font-medium text-sm">vstmaarketing@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours - Bottom Right */}
                            <div className="relative w-full lg:w-auto mt-6 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8 z-10">
                                <div className="p-6 shadow-2xl w-full lg:max-w-[280px]">
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
                        <div id="contact-form" className="bg-white rounded-[15px] shadow-[-10px_10px_20px_rgba(0,0,0,0.40)] p-8 md:p-10 lg:p-12 flex flex-col justify-center scroll-mt-24">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactTeam;
