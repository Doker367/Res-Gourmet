// Configuración del servidor
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  environment: process.env.NODE_ENV || 'development'
};
