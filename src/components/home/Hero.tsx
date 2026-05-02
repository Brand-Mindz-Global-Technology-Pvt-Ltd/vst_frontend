import React from 'react';
import HeroSectionTemplate from '../ui/home/hero-section';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleCheckout } = useCart();
    const { isAuthenticated } = useAuth();

    const handleOrderNow = () => {
        if (!isAuthenticated) {
            navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
            return;
        }
        toggleCheckout(true);
    };

    const SLIDES = [
        {
            titleStart: "Pure Water",
            titleEnd: "Pure Life",
            familyImage: "/assets/home/family.webp",
            productImage: "/assets/home/purifier.png",
            trustCount: "15K"
        },
        {
            titleStart: "Pure Water",
            titleEnd: "Pure Life",
            familyImage: "/assets/home/school.webp",
            productImage: "/assets/home/commercial.png",
            trustCount: "12K",
            overlayColor: "#6C1E1E"
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
