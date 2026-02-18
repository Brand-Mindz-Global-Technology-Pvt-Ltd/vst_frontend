import React from 'react';
import HeroSectionTemplate from '../ui/home/hero-section';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();

    const handleOrderNow = () => {
        // Redirection logic here
        navigate('/shop');
        console.log('Redirecting to shop...');
    };

    return (
        <HeroSectionTemplate
            titleStart="Pure Water"
            titleEnd="Pure Life"
            familyImage="/assets/home/hero.webp"
            productImage="/assets/home/aqu-banner.png"
            trustCount="15K"
            onOrderClick={handleOrderNow}
        />
    );
};

export default Hero;
