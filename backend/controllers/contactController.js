// Controlador para mensajes de contacto
const emailService = require('../services/emailService');

// Almacenamiento temporal de mensajes
const messages = [];

// Procesar mensaje de contacto
const sendMessage = (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validación
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, email y mensaje son requeridos'
            });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de email inválido'
            });
        }

        // Guardar mensaje
        const newMessage = {
            id: messages.length + 1,
            name,
            email,
            phone: phone || '',
            subject: subject || 'Consulta general',
            message,
            date: new Date().toISOString(),
            read: false
        };

        messages.push(newMessage);

        // En producción, aquí se enviaría el email
        // await emailService.sendContactEmail(newMessage);

        res.status(200).json({
            success: true,
            message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al enviar mensaje',
            error: error.message
        });
    }
};

// Obtener todos los mensajes (para admin)
const getMessages = (req, res) => {
    res.status(200).json({
        success: true,
        data: messages
    });
};

module.exports = {
    sendMessage,
    getMessages
};
