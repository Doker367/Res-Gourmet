// Rutas para el chatbot
const express = require('express');
const router = express.Router();
const { processMessage } = require('../controllers/chatbotController');

// POST /api/chatbot - Procesar mensaje del chatbot
router.post('/', processMessage);

module.exports = router;
