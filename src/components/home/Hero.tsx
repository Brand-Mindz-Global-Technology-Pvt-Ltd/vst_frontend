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
            familyImage="https://images.unsplash.com/photo-1556911220-e150213ff16a?q=80&w=2070&auto=format&fit=crop"
            productImage="https://images.unsplash.com/photo-1517646281694-3e93d81ca73c?q=80&w=2070&auto=format&fit=crop"
            trustCount="15K"
            onOrderClick={handleOrderNow}
        />
    );
};

export default Hero;
