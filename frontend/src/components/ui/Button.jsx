// Componente Button reutilizable con variantes y animaciones
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    ...props
}) => {
    // Variantes de estilo
    const variants = {
        primary: 'bg-accent text-primary-dark hover:bg-accent-hover hover:shadow-glow',
        outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-primary-dark hover:shadow-glow bg-transparent',
        ghost: 'text-accent hover:bg-accent/10 bg-transparent',
    };

    // Tamaños
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        font-semibold rounded-lg
        transition-colors duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
