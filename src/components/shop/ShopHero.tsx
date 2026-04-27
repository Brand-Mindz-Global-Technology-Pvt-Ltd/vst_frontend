import React from 'react';
import ShopHeroTemplate from '../ui/shop/ShopHeroTemplate';

const ShopHero: React.FC = () => {
    const handleOrderNow = () => {
        console.log('Order Now clicked in ShopHero container');
    };

    return (
        <ShopHeroTemplate
            titleStart="Explore Our"
            titleEnd="Products"
            bannerImage="/assets/Images/shop_banner.png"
            productImage="/assets/home/commercial.png"
            trustCount="15K"
            onOrderClick={handleOrderNow}
        />
    );
};

export default ShopHero;
