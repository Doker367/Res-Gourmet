# 📝 Resumen de Configuración de Variables de Entorno - Res-Gourmet

## ✅ Archivos Creados

### Backend
- ✅ `backend/.env.example` - Plantilla de ejemplo
- ✅ `backend/.env.development` - Variables para desarrollo
- ✅ `backend/.env.production` - Variables para producción

### Frontend
- ✅ `frontend/.env.example` - Plantilla de ejemplo
- ✅ `frontend/.env.development` - Variables para desarrollo
- ✅ `frontend/.env.production` - Variables para producción

---

## 📋 Variables de Entorno

### Backend (`.env.production`)

```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://res-gourmet.midominio.com

# Base de datos (opcional - descomenta si usas DB)
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=resgourmet
# DB_USER=resgourmet_user
# DB_PASSWORD=tu_password_seguro

# JWT (opcional - descomenta si usas autenticación)
# JWT_SECRET=tu_secreto_jwt_muy_seguro
# JWT_EXPIRES_IN=7d

# Email Service (opcional - descomenta y configura)
# SENDGRID_API_KEY=tu_api_key
# EMAIL_FROM=noreply@res-gourmet.midominio.com
```

### Frontend (`.env.production`)

```env
VITE_API_URL=https://api.res-gourmet.midominio.com/api
VITE_APP_NAME=Res-Gourmet
VITE_NODE_ENV=production
```

---

## 🔧 Archivos Modificados

### 1. `frontend/src/services/api.js`
**Cambio:** Ahora usa la variable de entorno `VITE_API_URL`

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

### 2. `docker-compose.yml`
**Cambios principales:**
- ❌ Eliminado `ports` (sin exposición de puertos)
- ❌ Eliminado `volumes` (sin montar código en producción)
- ✅ Agregada red externa `web`
- ✅ Agregados labels de Traefik
- ✅ `CORS_ORIGIN` apunta a dominio de producción
- ✅ Build context con rutas absolutas

### 3. `backend/Dockerfile`
**Mejoras de seguridad:**
- ✅ Usuario no-root
- ✅ `npm ci --only=production` (solo dependencias de prod)
- ✅ Health check integrado
- ✅ Comando `node server.js` en lugar de `npm start`

### 4. `frontend/Dockerfile`
**Mejoras:**
- ✅ ARG y ENV para variables de build
- ✅ Copia de `.env.production`
- ✅ Variables de entorno pasadas al build de Vite

### 5. `.gitignore`
**Agregado:**
- ✅ Todos los archivos `.env*` excepto `.env.example`

---

## 📂 Nuevos Archivos de Documentación

### 1. `DEPLOYMENT.md`
Guía completa de despliegue en producción con:
- Pre-requisitos del servidor
- Configuración de variables de entorno
- Comandos de deployment
- Verificación del despliegue
- Troubleshooting
- Mejores prácticas de seguridad

### 2. `deploy.sh`
Script automatizado de deployment que:
- Verifica prerequisitos
- Valida archivos de configuración
- Construye imágenes Docker
- Inicia contenedores
- Realiza health checks
- Muestra logs y estado

**Uso:**
```bash
chmod +x deploy.sh
./deploy.sh production   # Para producción
./deploy.sh development  # Para desarrollo
```

---

## 🚀 Pasos para Usar en Producción

### 1️⃣ En tu máquina local

```bash
# Editar docker-compose.yml
# Cambiar:
#   - /opt/repos/Res-Gourmet → ruta real en servidor
#   - midominio.com → tu dominio real
```

### 2️⃣ En el servidor Ubuntu

```bash
# Clonar el repo
cd /opt/repos
git clone https://github.com/tu-usuario/Res-Gourmet.git
cd Res-Gourmet

# Configurar variables de entorno
cd backend
cp .env.example .env.production
nano .env.production  # Editar con valores reales

cd ../frontend
cp .env.example .env.production
nano .env.production  # Editar con valores reales

# Volver a raíz
cd ..

# Desplegar
chmod +x deploy.sh
./deploy.sh production
```

### 3️⃣ Verificar

```bash
# Ver contenedores
docker ps | grep res-gourmet

# Ver logs
docker-compose logs -f

# Probar health check
curl https://api.res-gourmet.midominio.com/api/health

# Abrir en navegador
# https://res-gourmet.midominio.com
```

---

## ⚠️ IMPORTANTE: Seguridad

### ✅ Hacer ANTES de subir a Git:

1. **Nunca subir archivos `.env.production`:**
   ```bash
   # Verificar que están en .gitignore
   cat .gitignore | grep .env
   ```

2. **Solo subir archivos `.env.example`:**
   ```bash
   git add backend/.env.example
   git add frontend/.env.example
   git commit -m "Add environment examples"
   ```

3. **Verificar antes de push:**
   ```bash
   git status
   # NO debe aparecer .env.production ni .env.development
   ```

---

## 🔐 Mejores Prácticas Aplicadas

- [x] Variables de entorno separadas por ambiente
- [x] `.env` files en `.gitignore`
- [x] Archivos `.env.example` como plantillas
- [x] CORS configurado por dominio
- [x] Sin exposición de puertos en producción
- [x] Usuario no-root en contenedores
- [x] Health checks configurados
- [x] Build context con rutas absolutas
- [x] Certificados SSL automáticos (Let's Encrypt)
- [x] Scripts de deployment automatizados

---

## 📞 Siguiente Paso

1. **Edita los archivos de producción:**
   - `backend/.env.production` → Configura con tus credenciales reales
   - `frontend/.env.production` → Configura con tu dominio real
   - `docker-compose.yml` → Ajusta rutas y dominios

2. **Lee la documentación completa:**
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía paso a paso

3. **Despliega:**
   ```bash
   ./deploy.sh production
   ```

---

✅ **Tu proyecto está listo para producción con configuración profesional de variables de entorno!**
