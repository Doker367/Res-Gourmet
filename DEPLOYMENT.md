# 🚀 Guía de Despliegue en Producción - Res-Gourmet

## 📋 Pre-requisitos del Servidor

- Ubuntu Server (20.04 o superior)
- Docker y Docker Compose instalados
- Traefik configurado y corriendo
- Red Docker `web` creada: `docker network create web`
- Dominios apuntando al servidor:
  - `res-gourmet.midominio.com` → Frontend
  - `api.res-gourmet.midominio.com` → Backend

---

## 🔧 Configuración Inicial

### 1️⃣ Clonar el Repositorio en el Servidor

```bash
cd /opt/repos
git clone https://github.com/tu-usuario/Res-Gourmet.git
cd Res-Gourmet
```

### 2️⃣ Configurar Variables de Entorno

#### Backend

```bash
cd /opt/repos/Res-Gourmet/backend
cp .env.example .env.production
nano .env.production
```

**Editar con tus valores reales:**

```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://res-gourmet.midominio.com

# Configura tu base de datos si la usas
# DB_HOST=tu_host_db
# DB_PASSWORD=tu_password_seguro

# Configura tu servicio de email
# SENDGRID_API_KEY=tu_api_key
# EMAIL_FROM=noreply@res-gourmet.midominio.com
```

#### Frontend

```bash
cd /opt/repos/Res-Gourmet/frontend
cp .env.example .env.production
nano .env.production
```

**Editar con tus valores reales:**

```env
VITE_API_URL=https://api.res-gourmet.midominio.com/api
VITE_APP_NAME=Res-Gourmet
VITE_NODE_ENV=production
```

### 3️⃣ Ajustar docker-compose.yml

Editar las rutas absolutas en `docker-compose.yml`:

```bash
nano docker-compose.yml
```

Cambiar:
- `/opt/repos/Res-Gourmet` → la ruta real donde clonaste el repo
- `midominio.com` → tu dominio real

---

## 🏗️ Construcción y Despliegue

### Opción A: Despliegue Completo (Primera vez)

```bash
cd /opt/repos/Res-Gourmet

# Construir las imágenes
docker-compose build --no-cache

# Iniciar los contenedores
docker-compose up -d

# Ver los logs
docker-compose logs -f
```

### Opción B: Actualizar Aplicación (Deployments posteriores)

```bash
cd /opt/repos/Res-Gourmet

# Obtener cambios del repo
git pull origin main

# Reconstruir y reiniciar
docker-compose up -d --build

# Ver logs
docker-compose logs -f --tail=100
```

---

## ✅ Verificación del Despliegue

### 1. Verificar que los contenedores están corriendo

```bash
docker ps | grep res-gourmet
```

Deberías ver:
- `res-gourmet-backend`
- `res-gourmet-frontend`

### 2. Verificar logs del Backend

```bash
docker logs res-gourmet-backend
```

Deberías ver: `🚀 Server running on port 3001`

### 3. Verificar logs del Frontend

```bash
docker logs res-gourmet-frontend
```

### 4. Probar endpoints

```bash
# Health check del backend
curl https://api.res-gourmet.midominio.com/api/health

# Debería responder:
# {"success":true,"message":"LARCAD Restaurant API is running","timestamp":"..."}

# Probar el frontend
curl -I https://res-gourmet.midominio.com

# Debería responder: HTTP/2 200
```

### 5. Verificar certificados SSL

```bash
# Ver certificados de Traefik
docker exec traefik ls -la /letsencrypt/acme.json

# Verificar en el navegador
# https://res-gourmet.midominio.com
# https://api.res-gourmet.midominio.com
```

---

## 🛠️ Comandos Útiles

### Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend
```

### Reiniciar servicios

```bash
# Reiniciar todo
docker-compose restart

# Solo backend
docker-compose restart backend

# Solo frontend
docker-compose restart frontend
```

### Detener servicios

```bash
# Detener sin eliminar
docker-compose stop

# Detener y eliminar contenedores
docker-compose down

# Detener, eliminar contenedores e imágenes
docker-compose down --rmi all
```

### Ejecutar comandos dentro del contenedor

```bash
# Backend
docker exec -it res-gourmet-backend sh

# Frontend (Nginx)
docker exec -it res-gourmet-frontend sh
```

### Ver uso de recursos

```bash
docker stats res-gourmet-backend res-gourmet-frontend
```

---

## 🔒 Seguridad y Mejores Prácticas

### ✅ Implementadas

- [x] Sin exposición de puertos (todo a través de Traefik)
- [x] HTTPS automático con Let's Encrypt
- [x] CORS configurado para dominio específico
- [x] Usuario no-root en el backend
- [x] Variables de entorno separadas por ambiente
- [x] `.env` files en `.gitignore`
- [x] Health checks configurados

### 🔐 Recomendaciones Adicionales

1. **Firewall**: Solo abre los puertos 80, 443 y 22 (SSH)

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

2. **Backups**: Configura backups automáticos de:
   - Base de datos (si la usas)
   - Certificados SSL de Traefik
   - Variables de entorno

3. **Monitoring**: Implementa monitoreo con:
   - Uptime monitoring (UptimeRobot, Pingdom)
   - Logs centralizados (ELK Stack, Loki)
   - Métricas (Prometheus + Grafana)

4. **Rate Limiting**: Traefik puede configurar rate limiting global

5. **Secrets Management**: Para producción seria, usa:
   - Docker Secrets
   - HashiCorp Vault
   - AWS Secrets Manager

---

## 🐛 Troubleshooting

### Problema: Contenedor no inicia

```bash
# Ver logs detallados
docker logs res-gourmet-backend --tail=50

# Verificar que el puerto 3001 no está ocupado
docker exec res-gourmet-backend netstat -tlnp
```

### Problema: Error de CORS

Verificar que:
- `CORS_ORIGIN` en backend `.env.production` coincide con el dominio del frontend
- No hay espacios en blanco en la variable
- El dominio incluye `https://`

### Problema: Traefik no encuentra el servicio

```bash
# Verificar que están en la red 'web'
docker network inspect web

# Deberías ver res-gourmet-backend y res-gourmet-frontend
```

### Problema: Certificado SSL no se genera

```bash
# Ver logs de Traefik
docker logs traefik

# Verificar que el dominio apunta correctamente
nslookup res-gourmet.midominio.com
```

---

## 📦 Estructura de Archivos de Producción

```
/opt/repos/Res-Gourmet/
├── docker-compose.yml          # Configuración de producción
├── docker-compose.dev.yml      # Configuración de desarrollo
├── backend/
│   ├── .env.production        # Variables de backend (NO subir a Git)
│   ├── .env.example           # Plantilla de variables
│   └── Dockerfile
└── frontend/
    ├── .env.production        # Variables de frontend (NO subir a Git)
    ├── .env.example           # Plantilla de variables
    └── Dockerfile
```

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica las variables de entorno
3. Asegúrate de que Traefik está corriendo
4. Verifica que los dominios apuntan correctamente

---

## 🔄 Actualización de Código

Cada vez que actualices el código:

```bash
cd /opt/repos/Res-Gourmet
git pull origin main
docker-compose up -d --build
docker-compose logs -f --tail=50
```

**Nota**: El `--build` forzará la reconstrucción de las imágenes con el nuevo código.

---

✅ **¡Tu aplicación Res-Gourmet está lista para producción!**
