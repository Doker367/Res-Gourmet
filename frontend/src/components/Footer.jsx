// Footer del sitio web
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaTripadvisor, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaFacebookF, href: '#', label: 'Facebook' },
        { icon: FaInstagram, href: '#', label: 'Instagram' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
        { icon: FaTripadvisor, href: '#', label: 'TripAdvisor' },
    ];

    const quickLinks = [
        { name: 'Inicio', href: '#hero' },
        { name: 'Menú', href: '#menu' },
        { name: 'Reseñas', href: '#reviews' },
        { name: 'Ubicación', href: '#location' },
        { name: 'Contacto', href: '#contact' },
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-primary-dark pt-16 pb-6">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold text-white mb-4">
                            LAR<span className="text-accent">CAD</span>
                        </h3>
                        <p className="text-text-secondary text-sm mb-6">
                            Experiencia gastronómica premium donde cada platillo cuenta una historia
                            de pasión e innovación culinaria.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-text-secondary hover:bg-accent hover:text-primary-dark transition-all duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-text-secondary hover:text-accent transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contacto</h4>
                        <ul className="space-y-2 text-text-secondary text-sm">
                            <li>Av. Gourmet 1234</li>
                            <li>Zona Premium, Ciudad</li>
                            <li>Tel: (555) 123-4567</li>
                            <li>info@larcad.com</li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Horarios</h4>
                        <ul className="space-y-2 text-text-secondary text-sm">
                            <li>Lunes - Jueves: 12:00 - 22:00</li>
                            <li>Viernes - Sábado: 12:00 - 23:00</li>
                            <li>Domingo: 12:00 - 21:00</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-muted text-sm">
                        © {currentYear} LARCAD. Todos los derechos reservados.
                    </p>
                    <p className="text-text-muted text-sm flex items-center gap-1">
                        Hecho con <FaHeart className="text-accent" /> en México
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
