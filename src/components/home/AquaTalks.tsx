import React, { useEffect } from 'react';
import AquaTalksTemplate, { type BlogData } from '../ui/home/AquaTalksTemplate';

const AquaTalks: React.FC = () => {
    const blogData: BlogData[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            tags: ["Trending", "Health"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1934&auto=format&fit=crop",
            title: "The Importance of Mineral Balance in Drinking Water",
            tags: ["Science", "Health"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1976&auto=format&fit=crop",
            title: "Choosing the Right Purifier for Your Home Type",
            tags: ["Trending", "Guide"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1495556650867-99590cea3657?q=80&w=2070&auto=format&fit=crop",
            title: "Understanding TDS Levels in Your Tap Water",
            tags: ["Tips", "Safety"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1512067337264-3f307701f3e5?q=80&w=2070&auto=format&fit=crop",
            title: "Eco-Friendly Living: Reducing Plastic with RO Systems",
            tags: ["Eco", "Lifestyle"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1627933604052-64547b90169d?q=80&w=1935&auto=format&fit=crop",
            title: "Morning Routine: Why a Glass of Pure Water Matters",
            tags: ["Wellness", "Health"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        }
    ];

    useEffect(() => {
        const container = document.querySelector('.blog-scroll-container') as HTMLElement;
        if (!container) return;

        let autoScroll: any;

        const startScrolling = () => {
            autoScroll = window.setInterval(() => {
                const card = container.querySelector('.snap-center') as HTMLElement;
                if (!card) return;

                const cardWidth = card.offsetWidth;
                const gap = 24; // gap-6
                const scrollAmount = cardWidth + gap;

                // If at the end, jump back to start
                if (Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 5000);
        };

        startScrolling();

        const handleMouseEnter = () => window.clearInterval(autoScroll);
        const handleMouseLeave = () => startScrolling();

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.clearInterval(autoScroll);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="scroll-mt-20 overflow-hidden">
            <AquaTalksTemplate blogs={blogData} />
        </div>
    );
};

export default AquaTalks;
