import React from 'react';
import HeroSectionTemplate from '../ui/home/hero-section';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();

    const handleOrderNow = () => {
        navigate('/shop');
        console.log('Redirecting to shop...');
    };

    const SLIDES = [
        {
            titleStart: "Pure Water",
            titleEnd: "Pure Life",
            familyImage: "/assets/home/family.webp",
            productImage: "/assets/home/aqu-banner.png",
            trustCount: "15K"
        },
        {
            titleStart: "Pure Water",
            titleEnd: "Pure Life",
            familyImage: "/assets/home/school.webp",
            productImage: "/assets/home/commercial.png",
            trustCount: "12K",
            overlayColor: "#6C1E1E"
        },
        {
            titleStart: "Pure Water",
            titleEnd: "Pure Life",
            familyImage: "/assets/home/hero.webp",
            productImage: "/assets/home/aqu-banner.png",
            trustCount: "18K",
        }
    ];

    return (
        <HeroSectionTemplate
            slides={SLIDES}
            onOrderClick={handleOrderNow}
        />
    );
};

export default Hero;
