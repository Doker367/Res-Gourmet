# 🍽️ LARCAD - Restaurante Gourmet Premium

Sitio web moderno y elegante para un restaurante premium, construido con React + Tailwind CSS en el frontend y Node.js + Express en el backend.

![LARCAD Restaurant](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Características

- **Diseño Premium**: Paleta de colores oscuros con acentos amarillo-verdoso (#c7d300)
- **Microinteracciones**: Animaciones suaves con Framer Motion
- **Responsive**: Mobile-first design
- **Chatbot Interactivo**: Asistente virtual integrado
- **Carrusel de Reseñas**: Con Swiper.js
- **Formulario de Contacto**: Con validaciones en tiempo real
- **API REST**: Backend completo con Express

## 🛠️ Tecnologías

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Swiper.js
- React Icons
- Axios

### Backend
- Node.js
- Express
- Nodemon
- CORS
- dotenv

## 📁 Estructura del Proyecto

```
LARCAD/
├── frontend/                    # React + Tailwind CSS
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── ui/              # Componentes base (Button, Input, etc.)
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MenuCard.jsx
│   │   │   ├── MenuSection.jsx
│   │   │   ├── RecommendedSection.jsx
│   │   │   ├── ReviewCarousel.jsx
│   │   │   ├── LocationSection.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/               # Vistas principales
│   │   ├── layouts/             # Layouts compartidos
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # API services
│   │   └── styles/              # Estilos globales
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                     # Node.js + Express
    ├── controllers/             # Lógica de negocio
    ├── routes/                  # Rutas API
    ├── services/                # Servicios auxiliares
    ├── models/                  # Modelos de datos
    ├── config/                  # Configuración
    └── server.js
```

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js 18+ instalado
- npm o yarn
- Docker y Docker Compose (opcional, para deployment)

---

### 🔧 Desarrollo Local (sin Docker)

#### 1. Clonar/Descargar el proyecto

#### 2. Configurar variables de entorno

**Backend:**
```bash
cd backend
cp .env.example .env.development
# Edita .env.development con tus valores
```

**Frontend:**
```bash
cd frontend
cp .env.example .env.development
# Edita .env.development con tus valores
```

#### 3. Instalar dependencias del Backend
```bash
cd backend
npm install
```

#### 4. Instalar dependencias del Frontend
```bash
cd frontend
npm install
```

#### 5. Ejecutar el Backend (Terminal 1)
```bash
cd backend
npm run dev
```
El servidor se ejecutará en `http://localhost:3001`

#### 6. Ejecutar el Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
La aplicación se abrirá en `http://localhost:5173`

---

### 🐳 Desarrollo con Docker (Recomendado)

#### 1. Iniciar con Docker Compose
```bash
docker-compose -f docker-compose.dev.yml up -d
```

#### 2. Ver logs
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

#### 3. Detener
```bash
docker-compose -f docker-compose.dev.yml down
```

---

### 🚀 Despliegue en Producción

Para despliegue en producción con Traefik y Docker, consulta la [Guía de Despliegue](./DEPLOYMENT.md).

**Pasos rápidos:**

1. Configurar archivos `.env.production` en backend y frontend
2. Ajustar dominios en `docker-compose.yml`
3. Ejecutar script de despliegue:

```bash
chmod +x deploy.sh
./deploy.sh production
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.
```
La aplicación se abrirá en `http://localhost:5173`

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary Dark | `#1f1f1f` | Fondo principal |
| Primary | `#2a2a2a` | Cards, elementos secundarios |
| Accent | `#c7d300` | CTAs, highlights, hover |
| Text Primary | `#ffffff` | Texto principal |
| Text Secondary | `#a0a0a0` | Texto secundario |

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/reviews` | Obtener reseñas |
| POST | `/api/reviews` | Crear reseña |
| POST | `/api/contact` | Enviar mensaje |
| POST | `/api/chatbot` | Procesar mensaje chatbot |
| GET | `/api/health` | Estado del servidor |

## ✨ Microinteracciones Incluidas

- **Navbar**: Cambio de estilo al hacer scroll
- **Hero**: Animaciones de entrada secuenciales
- **Menú**: Filtro por categorías con animación
- **Cards**: Hover con zoom y sombra
- **Reseñas**: Carrusel con autoplay
- **Chatbot**: Animación de apertura/cierre, typing indicator
- **Formulario**: Validación visual en tiempo real
- **Botones**: Scale on hover/tap

## 📱 Responsive Design

La web está diseñada con enfoque mobile-first y se adapta a:
- Móviles (< 640px)
- Tablets (640px - 1024px)
- Desktop (> 1024px)

## 🔧 Personalización

### Cambiar colores
Edita `frontend/tailwind.config.js` en la sección `colors`.

### Agregar platillos
Edita el array `menuItems` en `frontend/src/components/MenuSection.jsx`.

### Modificar respuestas del chatbot
Edita el objeto `responses` en `backend/controllers/chatbotController.js`.

## 📄 Documentación

- [README.md](./README.md) - Este archivo
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía completa de despliegue en producción
- [DOCKER.md](./DOCKER.md) - Documentación de Docker

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**Hecho con ❤️ para LARCAD Restaurant**
