import React from 'react';
import ContactBannerTemplate from '../../components/ui/contact/ContactBannerTemplate';

const ShippingPolicy: React.FC = () => {
    return (
        <div className="bg-[#EFEFEF] min-h-screen font-outfit">
            <ContactBannerTemplate
                title="Shipping Policy"
                logoText1="Pure Water"
                logoText2="Pure Life"
                highlightId="shipping-policy-hero"
                image="/assets/home/family.webp"
            />

            <section className="py-8 md:py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <div className="space-y-12 text-[#3E3E3E]">
                        <div>
                            <h1 className="text-4xl font-serif text-dark mb-8 uppercase tracking-widest text-center">Shipping Policy</h1>
                            <p className="leading-relaxed text-lg text-center font-bold mb-4">VST MAARKETING</p>
                            <p className="leading-relaxed text-lg text-center">
                                This Shipping Policy explains how VST Maarketing handles product shipping and order dispatch.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Service Availability</h2>
                            <p className="leading-relaxed text-lg">
                                VST Maarketing provides delivery services across selected regions based on service availability. Shipping timelines depend on product type, order confirmation, and delivery location.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Order Confirmation & Coordination</h2>
                            <p className="leading-relaxed text-lg">
                                Once your order is confirmed, our team will contact you to coordinate delivery and installation.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Shipping Timelines</h2>
                            <p className="leading-relaxed text-lg mb-4">Shipping timelines may vary due to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Product availability</li>
                                <li>Delivery location</li>
                                <li>External conditions such as transport delays</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Installation & Setup</h2>
                            <p className="leading-relaxed text-lg">
                                For most products, shipping is coordinated along with installation to ensure proper setup and customer satisfaction.
                            </p>
                        </div>

                        <div className="pt-10 border-t border-gray-100">
                            <h2 className="text-3xl font-serif text-dark mb-6">Contact Us</h2>
                            <div className="space-y-4 text-lg">
                                <p className="flex items-center gap-3">
                                    <span className="font-bold">📞 Phone:</span> +91 90477 22131
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="font-bold">📧 Email:</span> vstmaarketing@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShippingPolicy;
