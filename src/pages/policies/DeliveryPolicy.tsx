import React from 'react';
import ContactBannerTemplate from '../../components/ui/contact/ContactBannerTemplate';

const DeliveryPolicy: React.FC = () => {
    return (
        <div className="bg-[#EFEFEF] min-h-screen font-outfit">
            <ContactBannerTemplate
                title="Delivery Policy"
                logoText1="Pure Water"
                logoText2="Pure Life"
                highlightId="delivery-policy-hero"
                image="/assets/home/family.webp"
            />

            <section className="py-8 md:py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <div className="space-y-12 text-[#3E3E3E]">
                        <div>
                            <h1 className="text-4xl font-serif text-dark mb-8 uppercase tracking-widest text-center">Delivery Policy</h1>
                            <p className="leading-relaxed text-lg text-center font-bold mb-4">VST MAARKETING</p>
                            <p className="leading-relaxed text-lg text-center">
                                This Delivery Policy outlines how and when your products will be delivered.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Delivery Timelines</h2>
                            <p className="leading-relaxed text-lg">
                                Domestic water purifiers are typically delivered within 1–5 business days after order confirmation. Commercial and industrial systems may take longer depending on customization and capacity.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Order Confirmation & Coordination</h2>
                            <p className="leading-relaxed text-lg">
                                Our team will inform you about the delivery and installation schedule once your order is confirmed.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">External Factors</h2>
                            <p className="leading-relaxed text-lg mb-4">Delivery timelines may be affected by:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Service area limitations</li>
                                <li>Product readiness</li>
                                <li>External factors such as weather or logistics issues</li>
                            </ul>
                            <p className="leading-relaxed text-lg mt-4">
                                We strive to ensure timely delivery and will keep you informed in case of any delays.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif mb-6 text-[#007ebb]">Installation Note</h2>
                            <p className="leading-relaxed text-lg border-l-4 border-[#007ebb] pl-4 italic">
                                Installation is handled by trained technicians and may be scheduled along with or after delivery.
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

export default DeliveryPolicy;
