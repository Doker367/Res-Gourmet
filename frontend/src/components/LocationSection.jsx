// Sección de ubicación con mapa embebido
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhone, FaParking, FaWifi, FaCreditCard } from 'react-icons/fa';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

const LocationSection = () => {
    const { ref, isInView } = useScrollAnimation();

    // Información del restaurante
    const info = [
        {
            icon: FaMapMarkerAlt,
            title: 'Dirección',
            details: ['Av. Gourmet 1234', 'Zona Premium, Ciudad', 'CP 12345']
        },
        {
            icon: FaClock,
            title: 'Horarios',
            details: ['Lun - Jue: 12:00 - 22:00', 'Vie - Sáb: 12:00 - 23:00', 'Dom: 12:00 - 21:00']
        },
        {
            icon: FaPhone,
            title: 'Contacto',
            details: ['Tel: (555) 123-4567', 'WhatsApp: +52 555 123 4567', 'info@larcad.com']
        }
    ];

    const amenities = [
        { icon: FaParking, label: 'Estacionamiento' },
        { icon: FaWifi, label: 'WiFi Gratis' },
        { icon: FaCreditCard, label: 'Todas las Tarjetas' },
    ];

    return (
        <section id="location" className="py-20 bg-primary-dark">
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
                        Encuéntranos
                    </span>
                    <h2 className="section-title">
                        Nuestra <span className="text-accent">Ubicación</span>
                    </h2>
                    <p className="section-subtitle">
                        Te esperamos en un espacio diseñado para deleitar todos tus sentidos.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-2xl overflow-hidden h-[400px] lg:h-full min-h-[400px] relative group"
                    >
                        {/* Google Maps Embed - Styled */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661445684252!2d-99.16869042394941!3d19.427023341886056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses-419!2smx!4v1704000000000!5m2!1ses-419!2smx"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación LARCAD"
                        />

                        {/* Overlay con marca */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-dark/50 to-transparent" />

                        {/* Logo marker */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-primary-dark p-4 rounded-full shadow-glow-lg"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <FaMapMarkerAlt className="text-2xl" />
                        </motion.div>
                    </motion.div>

                    {/* Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {info.map((item, index) => (
                            <motion.div
                                key={item.title}
                                className="bg-primary rounded-xl p-6 flex gap-5 hover:bg-primary-light transition-colors duration-300 group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                    <item.icon className="text-accent text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                                    {item.details.map((detail, i) => (
                                        <p key={i} className="text-text-secondary text-sm">{detail}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* Amenities */}
                        <motion.div
                            className="flex flex-wrap gap-4 pt-4"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                        >
                            {amenities.map((amenity) => (
                                <div
                                    key={amenity.label}
                                    className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-sm"
                                >
                                    <amenity.icon className="text-accent" />
                                    <span className="text-text-secondary">{amenity.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
