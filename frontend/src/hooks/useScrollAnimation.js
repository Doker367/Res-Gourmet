// Custom hook para animaciones de scroll con Framer Motion
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook para detectar cuando un elemento entra en el viewport
 * y activar animaciones de scroll
 */
export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true, // Solo animar una vez
        margin: "-100px", // Activar 100px antes de entrar completamente
        ...options
    });

    return { ref, isInView };
};

/**
 * Variantes de animación predefinidas para Framer Motion
 */
export const animationVariants = {
    // Fade in desde abajo
    fadeInUp: {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },

    // Fade in desde arriba
    fadeInDown: {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },

    // Fade in desde la izquierda
    fadeInLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },

    // Fade in desde la derecha
    fadeInRight: {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },

    // Scale in
    scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    },

    // Container para stagger children
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    },

    // Item hijo para stagger
    staggerItem: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }
};

export default useScrollAnimation;
