// Rutas para reseñas
const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/reviewController');

// GET /api/reviews - Obtener todas las reseñas
router.get('/', getReviews);

// POST /api/reviews - Crear una nueva reseña
router.post('/', createReview);

module.exports = router;
