// Servicio de API para comunicación con el backend
import axios from 'axios';

// Usar variable de entorno o fallback para desarrollo
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Instancia de Axios configurada
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// === REVIEWS ===

/**
 * Obtener todas las reseñas
 */
export const getReviews = async () => {
    try {
        const response = await api.get('/reviews');
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

/**
 * Crear una nueva reseña
 */
export const createReview = async (reviewData) => {
    try {
        const response = await api.post('/reviews', reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

// === CONTACT ===

/**
 * Enviar mensaje de contacto
 */
export const sendContactMessage = async (contactData) => {
    try {
        const response = await api.post('/contact', contactData);
        return response.data;
    } catch (error) {
        console.error('Error sending contact message:', error);
        throw error;
    }
};

// === CHATBOT ===

/**
 * Enviar mensaje al chatbot
 */
export const sendChatMessage = async (message) => {
    try {
        const response = await api.post('/chatbot', { message });
        return response.data;
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
    }
};

// === HEALTH CHECK ===

/**
 * Verificar estado del servidor
 */
export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error('API health check failed:', error);
        throw error;
    }
};

export default api;
