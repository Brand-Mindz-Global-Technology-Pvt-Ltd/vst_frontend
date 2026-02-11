import React from 'react';

const clients = [
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'H&M', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
    { name: 'Levi\'s', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Levi%27s_logo.svg' },
    { name: 'U.S. Polo Assn.', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/US_Polo_Assn_logo.svg/1200px-US_Polo_Assn_logo.svg.png' },
    { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/en/6/64/Puma_complete_logo.svg' },
];

const ClientsLogos: React.FC = () => {
    return (
        <section className="w-full bg-[#EFEFEF] py-4 px-4 md:px-8">
            <div className="max-w-7xl mx-auto bg-white rounded-[30px] md:rounded-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10 border border-white/50">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-36">
                    {clients.map((client) => (
                        <div
                            key={client.name}
                            className="flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="h-8 md:h-12 w-auto object-contain max-w-[120px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsLogos;
