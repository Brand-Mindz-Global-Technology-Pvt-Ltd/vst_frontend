import AboutHero from '../../components/about/AboutHero';
import AboutStory from '../../components/about/AboutStory';
import MissionVision from '../../components/about/MissionVision';
import MeetFounder from '../../components/about/MeetFounder';
import ClientExperiences from '../../components/about/ClientExperiences';
import Footer from '../../components/ui/footer/Footer';

const About: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col font-outfit">
            <main className="grow">
                <AboutHero />
                <AboutStory />
                <MissionVision />
                <MeetFounder />
                <ClientExperiences />
            </main>
            <Footer />
        </div>
    );
};

export default About;
