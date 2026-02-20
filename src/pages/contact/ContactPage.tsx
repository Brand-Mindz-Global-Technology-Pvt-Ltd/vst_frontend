import React from 'react';
import Footer from '../../components/ui/footer/Footer';
import ContactBanner from '../../components/contactus/ContactBanner';
import GetInTouch from '../../components/contactus/GetInTouch';
import CTABanner from '../../components/contactus/CTABanner';
import ContactTeam from '../../components/contactus/ContactTeam';
import MapSection from '../../components/contactus/MapSection';

const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#EFEFEF]">

            <main className="grow">
                <ContactBanner />
                <GetInTouch />
                <CTABanner />
                <ContactTeam />
                <MapSection />
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
