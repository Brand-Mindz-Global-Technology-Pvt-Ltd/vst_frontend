import React from 'react';

const clients = [
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'H&M', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
    { name: 'Levi\'s', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Levi%27s_logo.svg' },
    { name: 'U.S. Polo Assn.', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/US_Polo_Assn_logo.svg/1200px-US_Polo_Assn_logo.svg.png' },
    { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/en/6/64/Puma_complete_logo.svg' },
    { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { name: 'Gucci', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gucci_logo.svg/1200px-Gucci_logo.svg.png' },
    { name: 'Zara', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg' },
    { name: 'Uniqlo', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Uniqlo_logo.svg' },
    { name: 'Fila', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fila_logo.svg/1200px-Fila_logo.svg.png' },
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
            <div className="max-w-[1500px] mx-auto bg-white rounded-[15px] md:rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10 border border-white/50 overflow-hidden">
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
