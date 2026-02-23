import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { useHighlight } from '../../context/HighlightContext';
import FloatingHighlight from '../ui/framer/FloatingHighlight';
import { motion } from 'framer-motion';

const GetInTouch: React.FC = () => {
    const { setActiveId } = useHighlight();
    // Redirection and content data
    const data = {
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop",
        description: "Our journey is not just about products; it's about people. The trust of our customers drives us to innovate and deliver solutions that truly make a difference.",
        socials: [
            {
                icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
                href: "https://twitter.com",
                label: "Twitter"
            },
            { icon: <Facebook className="w-6 h-6 fill-current" />, href: "https://facebook.com", label: "Facebook" },
            { icon: <Instagram className="w-6 h-6" />, href: "https://instagram.com", label: "Instagram" }
        ]
    };

    const handleCall = () => {
        window.location.href = "tel:+919843232131";
    };

    return (
        <section className="w-full bg-white py-20 font-outfit overflow-hidden">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column - Image (60% width) */}
                    <div className="w-full lg:w-[65%] relative">
                        <div className="relative rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl shadow-blue-900/10 group">
                            <img
                                src={data.image}
                                alt="Team"
                                className="w-full h-full object-cover aspect-16/10 md:aspect-video lg:aspect-16/10 transition-transform duration-1000 group-hover:scale-105" />

                            {/* Bottom Right Social Cutout */}
                            <div className="absolute bottom-0 right-0 z-20">
                                <div className="bg-white pt-4 sm:pt-6 pl-5 sm:pl-8 pb-2 sm:pb-3 pr-2 sm:pr-4 rounded-tl-[35px] sm:rounded-tl-[45px] relative">
                                    {/* Responsive Mirror Scoops (Inverted Corners) */}
                                    <div className="absolute bottom-0 right-full w-6 h-6 sm:w-10 sm:h-10 overflow-hidden pointer-events-none">
                                        <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[40px] shadow-[10px_10px_0_0_#FFFFFF]"></div>
                                    </div>

                                    <div className="absolute right-0 bottom-full w-6 h-6 sm:w-10 sm:h-10 overflow-hidden pointer-events-none">
                                        <div className="w-full h-full rounded-br-[20px] sm:rounded-br-[40px] shadow-[10px_10px_0_0_#FFFFFF]"></div>
                                    </div>

                                    {/* Social Box - Black Pill */}
                                    <div className="bg-black py-2.5 sm:py-6 px-6 sm:px-10 rounded-full flex items-center gap-6 sm:gap-10 shadow-xl">
                                        {data.socials.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white hover:text-[#007ebb] transition-colors transform hover:scale-110 flex items-center justify-center"
                                                aria-label={link.label}
                                            >
                                                <span className="block w-6 h-6 sm:w-6 lg:w-7">
                                                    {/* Clone icon with responsive sizes */}
                                                    {React.cloneElement(link.icon as React.ReactElement<{ className?: string }>, {
                                                        className: `${(link.icon as React.ReactElement<{ className?: string }>).props.className || ''} w-full h-full`
                                                    })}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content (40% width) */}
                    <div className="w-full lg:w-[35%] flex flex-col gap-6">
                        <motion.div
                            onViewportEnter={() => setActiveId('get-in-touch')}
                            viewport={{ amount: 0.5 }}
                            className="space-y-0"
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-imperator tracking-tight leading-tight">
                                <span className="text-black">Get </span>
                                <span className="text-[#0077B6]">in -</span>
                            </h2>
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-imperator tracking-tight leading-tight flex items-center gap-2">
                                <FloatingHighlight
                                    id="get-in-touch"
                                    className="text-[#0077B6] pt-2 px-2 font-imperator"
                                >
                                    Touch
                                </FloatingHighlight>
                                <span className="text-black">with us</span>
                            </h2>
                        </motion.div>

                        <p className="text-black text-base sm:text-lg md:text-xl leading-relaxed font-josefin font-medium opacity-80 max-w-full md:max-w-[600px] text-justify">
                            {data.description}
                        </p>

                        <button
                            onClick={handleCall}
                            className="w-fit bg-[#0077B6] text-white px-8 py-2 rounded-[10px] font-josefin font-medium text-base sm:text-lg md:text-xl hover:bg-[#006699] transition-all active:scale-95 transform">
                            <span className="whitespace-nowrap">Call us</span>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GetInTouch;
