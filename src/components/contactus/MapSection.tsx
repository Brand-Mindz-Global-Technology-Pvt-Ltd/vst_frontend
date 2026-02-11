import React from 'react';

const MapSection: React.FC = () => {
    return (
        <section className="w-full bg-[#EFEFEF] py-12 md:py-12 font-outfit">
            <div className="max-w-full mx-auto">

                {/* Map Container */}
                <div className="overflow-hidden p-0 md:p-0">
                    <div className="w-full h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden">
                        {/* Google Maps Embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.0891607876244!2d77.7364354!3d8.732877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0411c9b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sTirunelveli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
