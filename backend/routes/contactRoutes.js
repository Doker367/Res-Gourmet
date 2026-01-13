// Rutas para contacto
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/contactController');

// POST /api/contact - Enviar mensaje de contacto
router.post('/', sendMessage);

// GET /api/contact - Obtener mensajes (admin)
router.get('/', getMessages);

module.exports = router;
