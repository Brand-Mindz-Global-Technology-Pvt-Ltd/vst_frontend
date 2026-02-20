import React from 'react';
import Footer from '../../components/ui/footer/Footer';
import ShopHero from '../../components/shop/ShopHero';
import ScrollingTicker from '../../components/ui/shop/ScrollingTicker';
import TopPicks from '../../components/shop/TopPicks';
import ShopMain from '../../components/shop/ShopMain';


const Shop: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#EFEFEF]">
            {/* <Navbar /> */}

            <main className="grow">
                <ShopHero />
                <ScrollingTicker />
                <TopPicks />
                <ShopMain />
            </main>

            <Footer />
        </div>
    );
};


export default Shop;
