import React from 'react';

const clients = [
    { name: 'Lubi', logo: '/assets/home/logo/logo1.jpeg' },
    { name: 'Grundfos', logo: '/assets/home/logo/logo2.jpeg' },
    { name: 'Ekki', logo: '/assets/home/logo/logo3.jpeg' },
    { name: 'Kirloskar', logo: '/assets/home/logo/logo4.jpeg' },
    { name: 'UKL Instruments', logo: '/assets/home/logo/logo5.jpeg' },
    { name: 'Berlington', logo: '/assets/home/logo/logo6.jpeg' },
    { name: 'Initiative Engineering', logo: '/assets/home/logo/logo7.jpeg' },
    { name: 'Thermax', logo: '/assets/home/logo/logo8.jpeg' },
    { name: 'Pentair', logo: '/assets/home/logo/logo9.jpeg' },
    { name: 'Tata', logo: '/assets/home/logo/logo10.jpeg' },
    { name: 'Ion Exchange', logo: '/assets/home/logo/logo11.jpeg' },
    { name: 'Initiative Engineering', logo: '/assets/home/logo/logo12.jpeg' },
];

const ClientsLogos: React.FC = () => {
    // Duplicate list for seamless scrolling
    const scrollingClients = [...clients, ...clients];

    return (
        <section className="w-full bg-[#EFEFEF] py-4 px-4 md:px-8">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}} />
            <div className="max-w-[1400px] mx-auto bg-white rounded-[15px] md:rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10 border border-white/50 overflow-hidden">
                <div className="flex items-center gap-8 md:gap-16 lg:gap-36 w-max animate-scroll">
                    {scrollingClients.map((client, index) => (
                        <div
                            key={`${client.name}-${index}`}
                            className="flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 shrink-0"
                        >
                            <img src={client.logo} alt={client.name} className="h-8 md:h-12 w-auto object-contain max-w-[130px]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsLogos;
