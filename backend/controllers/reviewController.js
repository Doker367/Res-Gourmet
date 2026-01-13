// Controlador para reseñas
const Review = require('../models/Review');

// Obtener todas las reseñas
const getReviews = (req, res) => {
    try {
        const reviews = Review.getAllReviews();
        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener reseñas',
            error: error.message
        });
    }
};

// Crear una nueva reseña
const createReview = (req, res) => {
    try {
        const { name, rating, comment, avatar } = req.body;

        // Validación básica
        if (!name || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, calificación y comentario son requeridos'
            });
        }

        const newReview = Review.addReview({
            name,
            rating: parseInt(rating),
            comment,
            avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c7d300&color=1f1f1f`
        });

        res.status(201).json({
            success: true,
            message: 'Reseña creada exitosamente',
            data: newReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear reseña',
            error: error.message
        });
    }
};

module.exports = {
    getReviews,
    createReview
};
