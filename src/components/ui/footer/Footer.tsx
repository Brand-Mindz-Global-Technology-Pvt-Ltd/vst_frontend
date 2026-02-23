import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#111111] text-white pt-16 font-outfit relative overflow-hidden">
            {/* Subtle Water Ripple Background Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            </div>

            <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8 pb-16">
                    {/* Brand Section */}
                    <div className="w-full lg:w-[32%] flex flex-col gap-6 items-start">
                        <img
                            src="/assets/footer/footer-logo.png"
                            alt="VST Marketing"
                            className="h-14 md:h-16 w-auto object-contain"
                        />
                        <p className="text-white text-sm leading-relaxed max-w-[350px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="p-2 transition-transform hover:scale-110">
                                <img src="/assets/footer/facebook.svg" alt="Facebook" className="w-6 h-6" />
                            </a>
                            <a href="#" className="p-2 transition-transform hover:scale-110">
                                <img src="/assets/footer/instagram.svg" alt="Instagram" className="w-6 h-6" />
                            </a>
                            <a href="#" className="p-2 transition-transform hover:scale-110">
                                <img src="/assets/footer/youtube.svg" alt="YouTube" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full lg:w-[18%] flex flex-col gap-6">
                        <h3 className="text-xl font-serif tracking-wide border-b border-white pb-2 w-fit min-w-[120px]">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-4 text-white text-sm">
                            <li><a href="/" className="hover:text-[#007ebb] transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-[#007ebb] transition-colors">About us</a></li>
                            <li><a href="/products" className="hover:text-[#007ebb] transition-colors">Products</a></li>
                            <li><a href="/blog" className="hover:text-[#007ebb] transition-colors">Blogs</a></li>
                            <li><a href="/contact" className="hover:text-[#007ebb] transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div className="w-full lg:w-[22%] flex flex-col gap-6">
                        <h3 className="text-xl font-serif tracking-wide border-b border-white pb-2 w-fit min-w-[120px]">
                            Customer Support
                        </h3>
                        <ul className="flex flex-col gap-4 text-white text-sm">
                            {/* <li><a href="#" className="hover:text-[#007ebb] transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-[#007ebb] transition-colors">Warranty Registration</a></li>
                            <li><a href="#" className="hover:text-[#007ebb] transition-colors">Installation Request</a></li> */}
                            <li><a href="/terms-conditions" className="hover:text-[#007ebb] transition-colors">Terms & Conditions</a></li>
                            <li><a href="/cookie-policy" className="hover:text-[#007ebb] transition-colors">Cookie Policy</a></li>
                            <li><a href="/privacy-policy" className="hover:text-[#007ebb] transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div className="w-full lg:w-[22%] flex flex-col gap-6">
                        <h3 className="text-xl font-serif tracking-wide border-b border-white pb-2 w-fit min-w-[120px]">
                            Contact Us
                        </h3>
                        <ul className="flex flex-col gap-6 text-white text-sm">
                            <li className="flex gap-3">
                                <div className="mt-1"><MapPin className="w-5 h-5 text-white" /></div>
                                <span>Thai Complex, 906L, Tenkasi Road, Rajapalayam, Tamil Nadu, 626117</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone className="w-5 h-5 text-white" />
                                <span>+91 98432 32131</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail className="w-5 h-5 text-white" />
                                <span>vstpurifier@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="w-full bg-[#000000] py-6">
                <div className="max-w-[1500px] mx-auto px-6 text-center text-sm text-white font-medium">
                    Copyright © 2026 VST, All rights reserved. Made with ❤ by Brand Mindz.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
