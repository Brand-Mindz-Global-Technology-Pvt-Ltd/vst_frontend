import React from 'react';
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
        </div>
    );
};

export default ContactPage;
