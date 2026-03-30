import React from 'react';
import ContactBannerTemplate from '../../components/ui/contact/ContactBannerTemplate';

const RefundReturnPolicy: React.FC = () => {
    return (
        <div className="bg-[#EFEFEF] min-h-screen font-outfit">
            <ContactBannerTemplate
                title="Refund & Return Policy"
                logoText1="Pure Water"
                logoText2="Pure Life"
                highlightId="refund-policy-hero"
                image="/assets/home/family.webp"
            />

            <section className="py-8 md:py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <div className="space-y-12 text-[#3E3E3E]">
                        <div>
                            <h1 className="text-4xl font-serif text-dark mb-8 uppercase tracking-widest text-center">Refund & Return Policy</h1>
                            <p className="leading-relaxed text-lg text-center font-bold mb-4">VST MAARKETING</p>
                            <p className="leading-relaxed text-lg text-center">
                                This policy explains the terms related to returns, cancellations, and refunds.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Return Policy</h2>
                            <p className="leading-relaxed text-lg mb-4">
                                Due to the nature of water purification products, returns are generally not accepted once the product is delivered and installed.
                            </p>
                            <p className="leading-relaxed text-lg mb-2">However, returns may be considered in the case of:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Damaged product during delivery</li>
                                <li>Manufacturing defects</li>
                            </ul>
                            <p className="leading-relaxed text-lg mt-4 font-semibold text-[#007ebb]">
                                You must notify us within 24 hours of delivery for further assistance.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Refund Policy</h2>
                            <p className="leading-relaxed text-lg mb-4">
                                Refunds are applicable only under certain conditions as per company policy.
                            </p>
                            <p className="leading-relaxed text-lg mb-2">Refunds may be processed if:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>The order cannot be fulfilled by VST Maarketing</li>
                                <li>The order is cancelled by the company</li>
                            </ul>
                            <p className="leading-relaxed text-lg mt-6 mb-2">Refunds are not applicable for:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Installed products</li>
                                <li>Service and installation charges</li>
                                <li>AMC (Annual Maintenance Contract) fees</li>
                            </ul>
                            <p className="leading-relaxed text-lg mt-4 italic">
                                Approved refunds will be processed through the original payment method within a reasonable time.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Cancellation Policy</h2>
                            <p className="leading-relaxed text-lg">
                                Orders once confirmed may not be cancelled. Any cancellation request is subject to company approval.
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

export default RefundReturnPolicy;
