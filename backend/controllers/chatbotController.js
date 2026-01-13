// Controlador para el chatbot
// Respuestas predefinidas para el chatbot del restaurante

const responses = {
    // Saludos
    greetings: [
        '¡Hola! Bienvenido a LARCAD. ¿En qué puedo ayudarte hoy?',
        '¡Hola! Soy el asistente virtual de LARCAD. ¿Tienes alguna pregunta?'
    ],

    // Horarios
    hours: {
        keywords: ['horario', 'hora', 'abren', 'cierran', 'abierto', 'cerrado'],
        response: '🕐 Nuestros horarios son:\n• Lunes a Jueves: 12:00 - 22:00\n• Viernes y Sábado: 12:00 - 23:00\n• Domingo: 12:00 - 21:00'
    },

    // Reservaciones
    reservations: {
        keywords: ['reserva', 'reservar', 'mesa', 'reservación'],
        response: '📅 Para hacer una reservación:\n• Llámanos al (555) 123-4567\n• O usa el botón "Reservar Mesa" en nuestra página\n¿Para cuántas personas y qué fecha te gustaría?'
    },

    // Menú
    menu: {
        keywords: ['menu', 'menú', 'carta', 'platillos', 'comida', 'platos'],
        response: '🍽️ Nuestro menú incluye:\n• Entradas gourmet\n• Carnes premium\n• Mariscos frescos\n• Pastas artesanales\n• Postres de autor\n\nPuedes ver el menú completo en la sección "Menú" de nuestra página.'
    },

    // Ubicación
    location: {
        keywords: ['ubicación', 'direccion', 'dirección', 'donde', 'dónde', 'llegar', 'mapa'],
        response: '📍 Nos encontramos en:\nAv. Gourmet 1234, Zona Premium\nCiudad, CP 12345\n\nPuedes ver el mapa interactivo en la sección "Ubicación" de nuestra página.'
    },

    // Precios
    prices: {
        keywords: ['precio', 'precios', 'costo', 'costos', 'cuanto', 'cuánto'],
        response: '💰 Nuestro rango de precios:\n• Entradas: $150 - $280\n• Platos fuertes: $320 - $580\n• Postres: $120 - $180\n\nOfrecemos opciones para diversos presupuestos.'
    },

    // Eventos
    events: {
        keywords: ['evento', 'eventos', 'privado', 'fiesta', 'celebración', 'cumpleaños', 'aniversario'],
        response: '🎉 ¡Organizamos eventos privados!\n• Salón privado hasta 30 personas\n• Menú personalizado\n• Decoración especial\n\nContáctanos para más información.'
    },

    // Default
    default: 'Disculpa, no entendí tu pregunta. Puedo ayudarte con:\n• Horarios de atención\n• Reservaciones\n• Información del menú\n• Ubicación\n• Eventos privados\n\n¿Sobre qué tema te gustaría saber más?'
};

// Procesar mensaje del usuario
const processMessage = (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'El mensaje es requerido'
            });
        }

        const userMessage = message.toLowerCase().trim();
        let botResponse = '';

        // Detectar saludos
        if (['hola', 'hi', 'hello', 'buenos días', 'buenas tardes', 'buenas noches', 'hey'].some(g => userMessage.includes(g))) {
            botResponse = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        }
        // Buscar coincidencias en las categorías
        else if (responses.hours.keywords.some(k => userMessage.includes(k))) {
            botResponse = responses.hours.response;
        }
        else if (responses.reservations.keywords.some(k => userMessage.includes(k))) {
            botResponse = responses.reservations.response;
        }
        else if (responses.menu.keywords.some(k => userMessage.includes(k))) {
            botResponse = responses.menu.response;
        }
        else if (responses.location.keywords.some(k => userMessage.includes(k))) {
            botResponse = responses.location.response;
        }
        else if (responses.prices.keywords.some(k => userMessage.includes(k))) {
            botResponse = responses.prices.response;
        }
        else if (responses.events.keywords.some(k => userMessage.includes(k))) {
            botResponse = responses.events.response;
        }
        else {
            botResponse = responses.default;
        }

        // Simular delay de respuesta (más natural)
        setTimeout(() => {
            res.status(200).json({
                success: true,
                data: {
                    message: botResponse,
                    timestamp: new Date().toISOString()
                }
            });
        }, 500);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al procesar mensaje',
            error: error.message
        });
    }
};

module.exports = {
    processMessage
};
