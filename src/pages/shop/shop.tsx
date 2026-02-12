import React from 'react';
import Navbar from '../../components/ui/header/navbar';
import Footer from '../../components/ui/footer/Footer';
import ShopHero from '../../components/ui/header/ShopHero';


const Shop: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#EFEFEF]">
            <Navbar />

            <main className="grow">
                <ShopHero />
            </main>

            <Footer />
        </div>
    );
};


export default Shop;
