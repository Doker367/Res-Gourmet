// Sección de Menú con grid de platillos
import { motion } from 'framer-motion';
import { useState } from 'react';
import MenuCard from './MenuCard';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

// Datos de ejemplo del menú
const menuItems = [
    {
        id: 1,
        name: 'Carpaccio de Res',
        description: 'Finas láminas de res con rúcula, parmesano y aceite de trufa negra.',
        price: 245,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Entradas',
        isRecommended: true
    },
    {
        id: 2,
        name: 'Risotto ai Funghi',
        description: 'Cremoso risotto con variedad de hongos silvestres y queso pecorino.',
        price: 320,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Pastas',
        isRecommended: false
    },
    {
        id: 3,
        name: 'Filete Wellington',
        description: 'Filete de res envuelto en hojaldre con duxelles de champiñones.',
        price: 580,
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Carnes',
        isRecommended: true
    },
    {
        id: 4,
        name: 'Salmón en Costra',
        description: 'Salmón noruego con costra de hierbas, puré de coliflor y salsa de cítricos.',
        price: 420,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Mariscos',
        isRecommended: false
    },
    {
        id: 5,
        name: 'Pulpo a la Parrilla',
        description: 'Tentáculos de pulpo a la brasa con papas confitadas y pimentón.',
        price: 380,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Mariscos',
        isRecommended: true
    },
    {
        id: 6,
        name: 'Tarta de Chocolate',
        description: 'Tarta de chocolate belga 70% con helado de vainilla y frutos rojos.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        category: 'Postres',
        isRecommended: false
    }
];

// Categorías disponibles
const categories = ['Todos', 'Entradas', 'Pastas', 'Carnes', 'Mariscos', 'Postres'];

const MenuSection = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const { ref, isInView } = useScrollAnimation();

    // Filtrar platillos por categoría
    const filteredItems = activeCategory === 'Todos'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    return (
        <section id="menu" className="py-20 bg-primary-dark">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={animationVariants.fadeInUp}
                    className="text-center mb-12"
                >
                    <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
                        Nuestra Carta
                    </span>
                    <h2 className="section-title">
                        Menú <span className="text-accent">Gourmet</span>
                    </h2>
                    <p className="section-subtitle">
                        Cada platillo es una obra de arte culinaria, elaborada con los
                        ingredientes más frescos y las técnicas más refinadas.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    variants={animationVariants.staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            variants={animationVariants.staggerItem}
                            onClick={() => setActiveCategory(category)}
                            className={`
                px-5 py-2 rounded-full text-sm font-medium
                transition-all duration-300
                ${activeCategory === category
                                    ? 'bg-accent text-primary-dark'
                                    : 'bg-primary text-text-secondary hover:text-accent border border-primary-light'}
              `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Menu Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={animationVariants.staggerContainer}
                    initial="hidden"
                    animate="visible"
                    key={activeCategory} // Re-animar al cambiar categoría
                >
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={animationVariants.staggerItem}
                            custom={index}
                        >
                            <MenuCard {...item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MenuSection;
