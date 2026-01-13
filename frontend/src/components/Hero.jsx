// Hero Section con imagen de fondo y CTAs animados
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import Button from './ui/Button';

const Hero = () => {
    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                    }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/60 to-primary-dark" />
                {/* Noise texture */}
                <div className="absolute inset-0 noise-overlay" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Tagline */}
                    <motion.span
                        className="inline-block text-accent text-sm md:text-base uppercase tracking-[0.3em] mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Experiencia Gastronómica Premium
                    </motion.span>

                    {/* Main Title */}
                    <motion.h1
                        className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <span className="text-white">Sabores que</span>
                        <br />
                        <span className="gradient-text">Inspiran</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Descubre una fusión única de ingredientes selectos y técnicas culinarias
                        de vanguardia en un ambiente elegante y acogedor.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            size="lg"
                            onClick={() => scrollToSection('#contact')}
                        >
                            Reservar Mesa
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => scrollToSection('#menu')}
                        >
                            Ver Menú
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.button
                        onClick={() => scrollToSection('#menu')}
                        className="text-accent flex flex-col items-center gap-2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <span className="text-xs uppercase tracking-wider text-text-secondary">
                            Descubrir
                        </span>
                        <HiArrowDown className="text-2xl" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-dark to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            />
        </section>
    );
};

export default Hero;
