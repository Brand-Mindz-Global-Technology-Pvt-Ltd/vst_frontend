import React from 'react';
import ContactBannerTemplate from '../ui/contact/ContactBannerTemplate';

const ContactBanner: React.FC = () => {
    // These values can be easily edited here
    const bannerData = {
        title: "Contact Us",
        image: "/assets/contact/contact.webp",
        logoText1: "Pure Water",
        logoText2: "Pure Life",
        phoneRedirection: "tel:+919843232131",
        avatars: [
            "https://i.pravatar.cc/150?u=11",
            "https://i.pravatar.cc/150?u=12",
            "https://i.pravatar.cc/150?u=13",
            "https://i.pravatar.cc/150?u=14"
        ]
    };

    return (
        <ContactBannerTemplate
            title={bannerData.title}
            image={bannerData.image}
            logoText1={bannerData.logoText1}
            logoText2={bannerData.logoText2}
            highlightId="contact-hero"
            phoneRedirection={bannerData.phoneRedirection}
            avatars={bannerData.avatars}
        />
    );
};

export default ContactBanner;
