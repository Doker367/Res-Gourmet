// Carrusel de reseñas de clientes
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import StarRating from './ui/StarRating';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Datos de reseñas (en producción vendrían del API)
const reviewsData = [
    {
        id: 1,
        name: "María García",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        comment: "Una experiencia gastronómica excepcional. Los sabores son únicos y la presentación es impecable. El servicio fue atento sin ser invasivo. Sin duda volveré.",
        date: "Enero 2026"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        comment: "El mejor restaurante de la ciudad. El ambiente es elegante y el servicio es de primera clase. El Filete Wellington es una obra maestra culinaria.",
        date: "Enero 2026"
    },
    {
        id: 3,
        name: "Ana Martínez",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        comment: "Platillos deliciosos y un ambiente muy acogedor. La carta de vinos es excelente y el sommelier nos ayudó a elegir el maridaje perfecto.",
        date: "Diciembre 2025"
    },
    {
        id: 4,
        name: "Roberto Sánchez",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: 5,
        comment: "Celebramos nuestro aniversario aquí y fue mágico. Atención personalizada, decoración impecable y comida espectacular. Totalmente recomendado.",
        date: "Diciembre 2025"
    },
    {
        id: 5,
        name: "Laura Fernández",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        rating: 5,
        comment: "Cada platillo es una obra de arte. El chef realmente sabe cómo sorprender a los comensales. La experiencia completa vale cada peso.",
        date: "Noviembre 2025"
    }
];

const ReviewCarousel = () => {
    const { ref, isInView } = useScrollAnimation();
    const [swiper, setSwiper] = useState(null);

    return (
        <section id="reviews" className="py-20 bg-primary relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={animationVariants.fadeInUp}
                    className="text-center mb-16"
                >
                    <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
                        Testimonios
                    </span>
                    <h2 className="section-title">
                        Lo que dicen nuestros <span className="text-accent">clientes</span>
                    </h2>
                    <p className="section-subtitle">
                        Cada reseña refleja nuestro compromiso con la excelencia y la
                        satisfacción de quienes nos visitan.
                    </p>
                </motion.div>

                {/* Reviews Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                >
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{ clickable: true }}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        onSwiper={setSwiper}
                        className="pb-14"
                    >
                        {reviewsData.map((review) => (
                            <SwiperSlide key={review.id}>
                                <motion.div
                                    className="bg-primary-dark rounded-2xl p-6 h-full border border-white/5 hover:border-accent/30 transition-colors duration-300"
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Quote Icon */}
                                    <FaQuoteLeft className="text-accent/30 text-3xl mb-4" />

                                    {/* Rating */}
                                    <StarRating rating={review.rating} className="mb-4" />

                                    {/* Comment */}
                                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                        "{review.comment}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review.avatar}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                                        />
                                        <div>
                                            <h4 className="text-white font-semibold">{review.name}</h4>
                                            <span className="text-text-muted text-sm">{review.date}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors hidden lg:flex"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors hidden lg:flex"
                    >
                        <FaChevronRight />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ReviewCarousel;
