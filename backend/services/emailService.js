// Servicio de envío de emails
// En producción, esto se configuraría con un servicio real como SendGrid, Mailgun, etc.

const sendContactEmail = async (messageData) => {
    // Simular envío de email
    console.log('📧 Enviando email de contacto:', {
        to: 'restaurant@example.com',
        from: messageData.email,
        subject: `Nuevo mensaje de contacto: ${messageData.subject}`,
        body: messageData.message
    });

    return {
        success: true,
        messageId: `msg_${Date.now()}`
    };
};

const sendReservationConfirmation = async (reservationData) => {
    // Simular confirmación de reservación
    console.log('📧 Enviando confirmación de reservación:', {
        to: reservationData.email,
        subject: 'Confirmación de Reservación - LARCAD',
        body: `Tu reservación para ${reservationData.guests} personas el ${reservationData.date} ha sido confirmada.`
    });

    return {
        success: true,
        messageId: `res_${Date.now()}`
    };
};

module.exports = {
    sendContactEmail,
    sendReservationConfirmation
};
