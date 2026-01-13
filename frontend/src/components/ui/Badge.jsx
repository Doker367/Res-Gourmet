// Componente Badge para etiquetas visuales
import { motion } from 'framer-motion';

const Badge = ({
    children,
    variant = 'accent',
    className = '',
    animated = false
}) => {
    const variants = {
        accent: 'bg-accent text-primary-dark',
        outline: 'border border-accent text-accent bg-transparent',
        dark: 'bg-primary-light text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-primary-dark',
    };

    const Component = animated ? motion.span : 'span';
    const animationProps = animated ? {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: 'spring', stiffness: 500 }
    } : {};

    return (
        <Component
            className={`
        ${variants[variant]}
        px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full
        ${className}
      `}
            {...animationProps}
        >
            {children}
        </Component>
    );
};

export default Badge;
