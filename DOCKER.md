# 🐳 Docker - Instrucciones de Uso

## Requisitos Previos
- Docker Desktop instalado y ejecutándose
- Docker Compose instalado

## 🚀 Modo Producción

### Iniciar los contenedores:
```bash
docker-compose up -d
```

### Ver logs:
```bash
docker-compose logs -f
```

### Detener los contenedores:
```bash
docker-compose down
```

### Acceder a la aplicación:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001

---

## 🛠️ Modo Desarrollo

### Iniciar los contenedores en modo desarrollo:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Ver logs en modo desarrollo:
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

### Detener contenedores de desarrollo:
```bash
docker-compose -f docker-compose.dev.yml down
```

### Acceder a la aplicación en desarrollo:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

En modo desarrollo, los cambios en el código se reflejarán automáticamente (hot reload).

---

## 📦 Comandos Útiles

### Reconstruir las imágenes:
```bash
docker-compose build --no-cache
```

### Ver contenedores en ejecución:
```bash
docker ps
```

### Acceder a un contenedor:
```bash
# Backend
docker exec -it restaurant-backend sh

# Frontend
docker exec -it restaurant-frontend sh
```

### Eliminar todos los contenedores y volúmenes:
```bash
docker-compose down -v
```

### Ver uso de recursos:
```bash
docker stats
```

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` si necesitas configurar variables adicionales:

```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=http://localhost
```

---

## 📁 Estructura Docker

```
├── docker-compose.yml          # Configuración para producción
├── docker-compose.dev.yml      # Configuración para desarrollo
├── .dockerignore               # Archivos ignorados globalmente
├── backend/
│   ├── Dockerfile              # Imagen del backend
│   └── .dockerignore           # Archivos ignorados del backend
└── frontend/
    ├── Dockerfile              # Imagen multi-stage del frontend
    ├── nginx.conf              # Configuración de nginx
    └── .dockerignore           # Archivos ignorados del frontend
```

---

## 🐛 Solución de Problemas

### Error: El puerto ya está en uso
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Cambiar el puerto en docker-compose.yml
ports:
  - "3002:3001"  # Usa el puerto 3002 en el host
```

### Limpiar todo Docker (precaución):
```bash
docker system prune -a --volumes
```

### Verificar que Docker está corriendo:
```bash
docker --version
docker-compose --version
```

---

## 📝 Notas

- El frontend en producción usa **nginx** para servir los archivos estáticos
- El backend corre directamente con **Node.js**
- Los contenedores están en una red privada `restaurant-network`
- En desarrollo, los volúmenes permiten hot-reload
