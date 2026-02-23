import React from 'react';
import ContactBannerTemplate from '../../components/ui/contact/ContactBannerTemplate';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-[#EFEFEF] min-h-screen font-outfit">
            <ContactBannerTemplate
                title="Privacy Policy"
                logoText1="Pure Water"
                logoText2="Pure Life"
                highlightId="privacy-policy-hero"
                image="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop"
            />

            <section className="py-8 md:py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <div className="space-y-12 text-[#3E3E3E]">
                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Introduction</h2>
                            <p className="leading-relaxed text-lg">
                                This Privacy Policy is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000 and the rules made thereunder. This policy does not require any physical or digital signature.
                            </p>
                            <p className="leading-relaxed text-lg mt-4">
                                VST Maarketing (“we”, “our”, “us”) is committed to protecting the privacy of users who access our website, WhatsApp chatbot, mobile platforms, or services related to Domestic, Commercial, and Industrial Water Purifiers and Water Dispensers.
                            </p>
                            <p className="leading-relaxed text-lg mt-4 font-semibold italic text-[#007ebb]">
                                This Privacy Policy should be read along with our Terms & Conditions.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Information We Collect</h2>
                            <p className="leading-relaxed text-lg mb-4">We may collect the following information:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Name</li>
                                <li>Phone number</li>
                                <li>Email address</li>
                                <li>Address</li>
                                <li>Payment-related details (processed via secure payment gateways)</li>
                                <li>Enquiry and service-related information</li>
                            </ul>
                            <p className="leading-relaxed text-lg mt-6">Information is collected when you:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Contact us</li>
                                <li>Place an order</li>
                                <li>Request service or AMC</li>
                                <li>Chat with us on WhatsApp</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">How We Use Your Information</h2>
                            <p className="leading-relaxed text-lg mb-4">Your information is used to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Provide products and services</li>
                                <li>Process orders and payments</li>
                                <li>Respond to enquiries and service requests</li>
                                <li>Send service updates and important notifications</li>
                                <li>Improve customer experience</li>
                            </ul>
                            <p className="leading-relaxed text-lg mt-6 italic">
                                You may opt out of promotional communications at any time.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Sharing of Information</h2>
                            <p className="leading-relaxed text-lg mb-4">We do not sell or rent your personal information. Information may be shared only:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>If required by law</li>
                                <li>To comply with legal processes</li>
                                <li>To protect our rights and prevent fraud</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Data Security</h2>
                            <p className="leading-relaxed text-lg">
                                We use reasonable security measures to protect your information. However, no online transmission is completely secure.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Your Consent</h2>
                            <p className="leading-relaxed text-lg">
                                By using our website or services, you consent to this Privacy Policy.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Updates to This Policy</h2>
                            <p className="leading-relaxed text-lg">
                                We may update this Privacy Policy at any time. Changes will be posted on this page.
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
                                <div className="flex gap-3">
                                    <span className="font-bold whitespace-nowrap">📍 Address:</span>
                                    <p>
                                        No. 9061, 1st Floor, Thai Complex,<br />
                                        Tenkasi Main Road, Near Tenkasi Railway Station,<br />
                                        Tenkasi, Tamil Nadu – 626117
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
