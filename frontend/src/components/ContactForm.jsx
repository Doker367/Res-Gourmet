// Formulario de contacto con validaciones y feedback visual
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';
import { sendContactMessage } from '../services/api';

const ContactForm = () => {
    const { ref, isInView } = useScrollAnimation();

    // Estados del formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Validación del formulario
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es requerido';
        } else if (formData.message.length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar error del campo al escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await sendContactMessage(formData);
            setSubmitStatus('success');
            // Limpiar formulario
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Ocultar mensaje de estado después de 5 segundos
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-primary to-primary-dark">
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
                        Contáctanos
                    </span>
                    <h2 className="section-title">
                        Haz tu <span className="text-accent">Reservación</span>
                    </h2>
                    <p className="section-subtitle">
                        Completa el formulario y nos pondremos en contacto contigo para
                        confirmar tu reservación o responder tus preguntas.
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-2xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Nombre completo *"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                error={errors.name}
                            />
                            <Input
                                label="Email *"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                error={errors.email}
                            />
                        </div>

                        {/* Phone & Subject Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Teléfono"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(555) 123-4567"
                            />
                            <Input
                                label="Asunto"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Reservación, consulta, etc."
                            />
                        </div>

                        {/* Message */}
                        <Textarea
                            label="Mensaje *"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Cuéntanos en qué podemos ayudarte..."
                            rows={5}
                            error={errors.message}
                        />

                        {/* Submit Button */}
                        <div className="flex flex-col items-center gap-4">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="inline-block"
                                        >
                                            ⏳
                                        </motion.span>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Enviar Mensaje
                                    </>
                                )}
                            </Button>

                            {/* Status Messages */}
                            <AnimatePresence mode="wait">
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-lg"
                                    >
                                        <FaCheck />
                                        <span>¡Mensaje enviado exitosamente! Te contactaremos pronto.</span>
                                    </motion.div>
                                )}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-lg"
                                    >
                                        <FaExclamationCircle />
                                        <span>Error al enviar. Por favor intenta nuevamente.</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
