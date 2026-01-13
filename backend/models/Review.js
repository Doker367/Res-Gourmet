// Modelo de datos para reseñas
// En producción, esto se conectaría a una base de datos

// Datos de ejemplo para demostración
const reviews = [
    {
        id: 1,
        name: "María García",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        comment: "Una experiencia gastronómica excepcional. Los sabores son únicos y la presentación es impecable. Sin duda volveré.",
        date: "2026-01-10"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        comment: "El mejor restaurante de la ciudad. El ambiente es elegante y el servicio es de primera clase.",
        date: "2026-01-08"
    },
    {
        id: 3,
        name: "Ana Martínez",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4,
        comment: "Platillos deliciosos y un ambiente muy acogedor. La carta de vinos es excelente.",
        date: "2026-01-05"
    },
    {
        id: 4,
        name: "Roberto Sánchez",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: 5,
        comment: "Celebramos nuestro aniversario aquí y fue mágico. Atención personalizada y comida espectacular.",
        date: "2026-01-02"
    },
    {
        id: 5,
        name: "Laura Fernández",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        rating: 5,
        comment: "Cada platillo es una obra de arte. El chef realmente sabe cómo sorprender a los comensales.",
        date: "2025-12-28"
    }
];

// Obtener todas las reseñas
const getAllReviews = () => {
    return reviews;
};

// Agregar una nueva reseña
const addReview = (reviewData) => {
    const newReview = {
        id: reviews.length + 1,
        ...reviewData,
        date: new Date().toISOString().split('T')[0]
    };
    reviews.push(newReview);
    return newReview;
};

module.exports = {
    getAllReviews,
    addReview
};
