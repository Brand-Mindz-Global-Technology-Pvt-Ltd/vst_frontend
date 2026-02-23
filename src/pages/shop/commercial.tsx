import React from 'react';
import CommercialHero from '../../components/shop/CommercialHero';
import ScrollingTicker from '../../components/ui/shop/ScrollingTicker';
import TopPicks from '../../components/shop/TopPicks';
import CommercialMain from '../../components/shop/CommercialMain';

const Commercial: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#EFEFEF]">
            <main className="grow">
                <CommercialHero />
                <ScrollingTicker />
                <TopPicks />
                <CommercialMain />
            </main>
        </div>
    );
};

export default Commercial;
