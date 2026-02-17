import React from 'react';
import ContactBannerTemplate from '../ui/contact/ContactBannerTemplate';

const AboutHero: React.FC = () => {
    return (
        <ContactBannerTemplate
            title="About Us"
            logoText1="Legacy of"
            logoText2="Purity"
            image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
            avatars={[
                "https://i.pravatar.cc/150?u=1",
                "https://i.pravatar.cc/150?u=2",
                "https://i.pravatar.cc/150?u=3",
                "https://i.pravatar.cc/150?u=4"
            ]}
        />
    );
};

export default AboutHero;
