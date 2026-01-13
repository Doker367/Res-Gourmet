// Card de platillo con hover animado
import { motion } from 'framer-motion';
import Badge from './ui/Badge';

const MenuCard = ({
    image,
    name,
    description,
    price,
    isRecommended = false,
    category = ''
}) => {
    return (
        <motion.div
            className="card group cursor-pointer"
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <motion.img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {isRecommended && (
                        <Badge animated>Recomendado</Badge>
                    )}
                    {category && (
                        <Badge variant="dark">{category}</Badge>
                    )}
                </div>

                {/* Price tag on hover */}
                <motion.div
                    className="absolute bottom-4 right-4 bg-accent text-primary-dark font-bold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100"
                    initial={{ x: 20 }}
                    whileHover={{ x: 0 }}
                >
                    ${price}
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {name}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                    <span className="text-accent font-bold text-lg">${price}</span>
                    <motion.span
                        className="text-text-muted text-sm group-hover:text-accent transition-colors"
                        whileHover={{ x: 5 }}
                    >
                        Ver detalles →
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuCard;
