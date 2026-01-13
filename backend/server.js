// Servidor principal del backend
const express = require('express');
const cors = require('cors');
const config = require('./config');

// Importar rutas
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

// Inicializar Express
const app = express();

// Middleware
app.use(cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (desarrollo)
if (config.environment === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// Rutas de la API
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'LARCAD Restaurant API is running',
        timestamp: new Date().toISOString()
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: '🍽️ Welcome to LARCAD Restaurant API',
        version: '1.0.0',
        endpoints: {
            reviews: '/api/reviews',
            contact: '/api/contact',
            chatbot: '/api/chatbot',
            health: '/api/health'
        }
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: config.environment === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
app.listen(config.port, () => {
    console.log(`
  🍽️  LARCAD Restaurant API
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🚀 Server running on port ${config.port}
  🌍 Environment: ${config.environment}
  📡 CORS Origin: ${config.corsOrigin}
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

module.exports = app;
