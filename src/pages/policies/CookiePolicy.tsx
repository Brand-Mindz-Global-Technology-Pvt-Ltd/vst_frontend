import React from 'react';
import ContactBannerTemplate from '../../components/ui/contact/ContactBannerTemplate';

const CookiePolicy: React.FC = () => {
    return (
        <div className="bg-[#EFEFEF] min-h-screen font-outfit">
            <ContactBannerTemplate
                title="Cookie Policy"
                logoText1="Pure Water"
                logoText2="Pure Life"
                highlightId="cookie-policy-hero"
                image="https://images.unsplash.com/photo-1543286386-713bcd534a70?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-8 md:py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <div className="space-y-12 text-[#3E3E3E]">
                        <div>
                            <h1 className="text-4xl font-serif text-dark mb-8 uppercase tracking-widest text-center">Cookie Policy</h1>
                            <p className="leading-relaxed text-lg text-center">
                                This Cookie Policy explains how VST Maarketing uses cookies and similar technologies on our website.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">What Are Cookies?</h2>
                            <p className="leading-relaxed text-lg">
                                Cookies are small text files stored on your device that help websites function properly and improve user experience.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">How We Use Cookies</h2>
                            <p className="leading-relaxed text-lg mb-4">We use cookies to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Remember user preferences</li>
                                <li>Improve website performance</li>
                                <li>Analyze website traffic</li>
                                <li>Enhance security</li>
                            </ul>
                            <p className="leading-relaxed text-lg mt-4 font-semibold text-[#007ebb]">
                                Cookies do not store personally identifiable information.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Types of Cookies We Use</h2>
                            <ul className="space-y-4 text-lg">
                                <li><span className="font-bold">Essential Cookies</span> – Required for website functionality</li>
                                <li><span className="font-bold">Performance Cookies</span> – Help analyze site usage</li>
                                <li><span className="font-bold">Functional Cookies</span> – Remember preferences</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Managing Cookies</h2>
                            <p className="leading-relaxed text-lg">
                                You can control or disable cookies through your browser settings. Disabling cookies may affect website functionality.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif text-dark mb-6">Updates to This Policy</h2>
                            <p className="leading-relaxed text-lg">
                                This Cookie Policy may be updated periodically. Changes will be reflected on this page.
                            </p>
                        </div>

                        <div className="pt-10 border-t border-gray-100">
                            <h2 className="text-3xl font-serif text-dark mb-6">Contact Us</h2>
                            <p className="leading-relaxed text-lg mb-6">For questions related to cookies, contact:</p>
                            <div className="space-y-4 text-lg">
                                <p className="flex items-center gap-3">
                                    <span className="font-bold">📧 Email:</span> vstmaarketing@gmail.com
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="font-bold">📞 Phone:</span> +91 90477 22131
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CookiePolicy;
