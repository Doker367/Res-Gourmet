// Layout principal de la aplicación
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-primary-dark">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default MainLayout;
