// Sección de platillos recomendados con destacado visual
import { motion } from 'framer-motion';
import { FaFire, FaStar, FaAward } from 'react-icons/fa';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';
import Badge from './ui/Badge';

// Platillos destacados
const recommendedDishes = [
    {
        id: 1,
        name: 'Filete Wellington',
        description: 'Nuestro platillo signature. Filete de res premium envuelto en hojaldre dorado con duxelles de champiñones y paté.',
        price: 580,
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: 'Más Vendido',
        icon: FaFire
    },
    {
        id: 2,
        name: 'Langosta Thermidor',
        description: 'Media langosta gratinada con una cremosa salsa de queso, mostaza y brandy. Servida con espárragos.',
        price: 750,
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: 'Chef\'s Choice',
        icon: FaStar
    },
    {
        id: 3,
        name: 'Wagyu A5',
        description: 'El corte más exclusivo del mundo. Wagyu japonés A5 con vegetales de temporada y reducción de vino tinto.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1546833998-877b37c2e0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: 'Premium',
        icon: FaAward
    }
];

const RecommendedSection = () => {
    const { ref, isInView } = useScrollAnimation();

    return (
        <section id="recommended" className="py-20 bg-gradient-to-b from-primary-dark to-primary">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={animationVariants.fadeInUp}
                    className="text-center mb-16"
                >
                    <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
                        Exclusivo
                    </span>
                    <h2 className="section-title">
                        Platillos <span className="text-accent">Recomendados</span>
                    </h2>
                    <p className="section-subtitle">
                        Descubre nuestras creaciones más aclamadas, perfectas para una
                        experiencia gastronómica inolvidable.
                    </p>
                </motion.div>

                {/* Featured Dishes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {recommendedDishes.map((dish, index) => (
                        <motion.div
                            key={dish.id}
                            className="relative group"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="relative h-[450px] rounded-2xl overflow-hidden">
                                {/* Image */}
                                <motion.img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent" />

                                {/* Badge */}
                                <div className="absolute top-4 left-4">
                                    <motion.div
                                        className="flex items-center gap-2 bg-accent text-primary-dark px-4 py-2 rounded-full font-bold text-sm"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <dish.icon />
                                        {dish.badge}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                        {dish.name}
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                                        {dish.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-accent text-2xl font-bold">${dish.price}</span>
                                        <motion.button
                                            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent hover:text-primary-dark transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Ordenar
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Decorative glow */}
                                <div className="absolute inset-0 border-2 border-accent/0 rounded-2xl group-hover:border-accent/50 transition-colors duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedSection;
