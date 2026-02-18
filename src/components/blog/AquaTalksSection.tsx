import React from 'react';
import AquaTalksTemplate, { type BlogData } from '../ui/home/AquaTalksTemplate';

const AquaTalksSection: React.FC = () => {
    // This data can be fetched from an API in the future to make it dynamic
    const aquaTalksBlogs: BlogData[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1594398044700-14e667086851?q=80&w=2070&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            tags: ["Trending", "Health"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1548810931-e3b0ad88b5cf?q=80&w=2069&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            tags: ["Trending", "Health"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1518173946687-a4c8a9b746f4?q=80&w=2187&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            tags: ["Trending", "Health"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
            title: "How Water Purifiers Protect Your Family's Health ?",
            tags: ["Trending", "Health"],
            description: "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi. Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi."
        }
    ];

    return (
        <section className="bg-white">
            <AquaTalksTemplate blogs={aquaTalksBlogs} />
        </section>
    );
};

export default AquaTalksSection;
