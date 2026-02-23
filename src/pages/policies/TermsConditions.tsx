import React from 'react';
import ContactBannerTemplate from '../../components/ui/contact/ContactBannerTemplate';

const TermsConditions: React.FC = () => {
    return (
        <div className="bg-[#EFEFEF] min-h-screen font-outfit">
            <ContactBannerTemplate
                title="Terms & Conditions"
                logoText1="Pure Water"
                logoText2="Pure Life"
                highlightId="terms-conditions-hero"
                image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-8 md:py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <div className="space-y-12 text-[#3E3E3E]">
                        <div>
                            <h1 className="text-4xl font-serif text-dark mb-8 uppercase tracking-widest text-center flex flex-col gap-2">
                                <span>Terms & Conditions</span>
                            </h1>
                            <p className="leading-relaxed text-lg text-center">
                                These Terms & Conditions govern your use of the VST Maarketing website, WhatsApp chatbot, and services. By accessing or using our services, you agree to these terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Services Offered</h2>
                            <p className="leading-relaxed text-lg mb-4">VST Maarketing provides:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Domestic Water Purifiers</li>
                                <li>Commercial Water Purifiers</li>
                                <li>Industrial Water Purifiers</li>
                                <li>Water Dispensers</li>
                                <li>Installation, Service & AMC</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">User Responsibilities</h2>
                            <p className="leading-relaxed text-lg mb-4">You agree to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Provide accurate information</li>
                                <li>Use the website and services for lawful purposes only</li>
                                <li>Not misuse or attempt to harm our systems</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Pricing & Payments</h2>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Prices are subject to change without prior notice</li>
                                <li>Payments must be made as agreed</li>
                                <li>Online payments are processed through secure gateways</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Installation, Service & AMC</h2>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Installation timelines may vary based on location</li>
                                <li>AMC terms are explained at the time of purchase</li>
                                <li>AMC fees are non-refundable unless stated otherwise</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Cancellation & Refunds</h2>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Orders once confirmed may not be cancelled</li>
                                <li>Refunds, if applicable, will be processed as per company policy</li>
                                <li>Installation and service charges are non-refundable</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Limitation of Liability</h2>
                            <p className="leading-relaxed text-lg mb-4">VST Maarketing shall not be liable for:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Indirect or incidental damages</li>
                                <li>Delays due to external factors</li>
                                <li>Improper usage of products</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Intellectual Property</h2>
                            <p className="leading-relaxed text-lg">
                                All website content, logos, images, and text belong to VST Maarketing and may not be copied or reused without permission.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Governing Law</h2>
                            <p className="leading-relaxed text-lg">
                                These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of Tamil Nadu courts.
                            </p>
                        </div>

                        <div className="pt-10 border-t border-gray-100">
                            <h2 className="text-3xl font-serif text-dark mb-6">Contact Information</h2>
                            <div className="space-y-4 text-lg">
                                <p className="flex items-center gap-3">
                                    <span className="font-bold">📞 Phone:</span> +91 90477 22131
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="font-bold">📧 Email:</span> vstmaarketing@gmail.com
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="font-bold">📍 Address:</span> Tenkasi, Tamil Nadu – 626117
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsConditions;
