import React from 'react';
import ShopHeroTemplate from '../ui/shop/ShopHeroTemplate';

const CommercialHero: React.FC = () => {
    const handleOrderNow = () => {
        console.log('Order Now clicked in CommercialHero container');
    };

    return (
        <ShopHeroTemplate
            titleStart="Commercial"
            titleEnd="Solutions"
            bannerImage="/assets/Images/commercial_banner.png"
            productImage="/assets/home/aqu-banner.png"
            trustCount="12K"
            onOrderClick={handleOrderNow}
        />
    );
};

export default CommercialHero;
