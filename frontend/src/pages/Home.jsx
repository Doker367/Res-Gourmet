// Página principal del restaurante
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import RecommendedSection from '../components/RecommendedSection';
import ReviewCarousel from '../components/ReviewCarousel';
import LocationSection from '../components/LocationSection';
import ContactForm from '../components/ContactForm';

const Home = () => {
    return (
        <>
            <Hero />
            <MenuSection />
            <RecommendedSection />
            <ReviewCarousel />
            <LocationSection />
            <ContactForm />
        </>
    );
};

export default Home;
