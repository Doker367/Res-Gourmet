# ✅ Checklist de Despliegue - Res-Gourmet

## Pre-Despliegue (En tu máquina local)

### Preparación del Código
- [ ] Todo el código está commiteado en Git
- [ ] Has probado todo localmente con Docker
- [ ] `.gitignore` incluye todos los archivos `.env.*` (excepto `.env.example`)
- [ ] Has revisado que NO hay secretos en el código

### Archivos de Configuración
- [ ] `docker-compose.yml` tiene las rutas absolutas correctas
- [ ] `docker-compose.yml` tiene los dominios correctos
- [ ] `backend/.env.example` está actualizado
- [ ] `frontend/.env.example` está actualizado

---

## En el Servidor Ubuntu

### Prerequisitos del Servidor
- [ ] Docker instalado: `docker --version`
- [ ] Docker Compose instalado: `docker-compose --version`
- [ ] Red Docker `web` creada: `docker network ls | grep web`
- [ ] Traefik corriendo: `docker ps | grep traefik`
- [ ] Puertos 80 y 443 abiertos en firewall

### Configuración DNS
- [ ] `res-gourmet.midominio.com` apunta a la IP del servidor
- [ ] `api.res-gourmet.midominio.com` apunta a la IP del servidor
- [ ] Verificado con `nslookup res-gourmet.midominio.com`

### Instalación del Proyecto
- [ ] Repositorio clonado en `/opt/repos/Res-Gourmet` (o ruta elegida)
- [ ] Permisos correctos: `sudo chown -R $USER:$USER /opt/repos/Res-Gourmet`

### Variables de Entorno - Backend
- [ ] Archivo `backend/.env.production` creado desde `.env.example`
- [ ] `NODE_ENV=production` configurado
- [ ] `PORT=3001` configurado
- [ ] `CORS_ORIGIN` con el dominio correcto del frontend (https://...)
- [ ] Variables de base de datos configuradas (si aplica)
- [ ] Variables de email configuradas (si aplica)
- [ ] Variables de JWT configuradas (si aplica)

### Variables de Entorno - Frontend
- [ ] Archivo `frontend/.env.production` creado desde `.env.example`
- [ ] `VITE_API_URL` con el dominio correcto del backend (https://api...)
- [ ] `VITE_APP_NAME` configurado
- [ ] `VITE_NODE_ENV=production` configurado

---

## Despliegue

### Build y Start
- [ ] Script de deploy tiene permisos: `chmod +x deploy.sh`
- [ ] Ejecutado: `./deploy.sh production`
- [ ] Sin errores en el output del script

### Verificación de Contenedores
- [ ] Backend corriendo: `docker ps | grep res-gourmet-backend`
- [ ] Frontend corriendo: `docker ps | grep res-gourmet-frontend`
- [ ] Sin reinicios constantes: `docker ps` (verificar columna STATUS)

### Verificación de Logs
- [ ] Logs del backend sin errores: `docker logs res-gourmet-backend`
- [ ] Logs del frontend sin errores: `docker logs res-gourmet-frontend`
- [ ] Backend muestra: "Server running on port 3001"

### Verificación de Red
- [ ] Backend en red `web`: `docker network inspect web | grep backend`
- [ ] Frontend en red `web`: `docker network inspect web | grep frontend`

---

## Verificación de Funcionamiento

### SSL y Certificados
- [ ] Frontend accesible: `https://res-gourmet.midominio.com`
- [ ] Backend accesible: `https://api.res-gourmet.midominio.com/api/health`
- [ ] Certificado SSL válido (candado verde en navegador)
- [ ] Redirección HTTP → HTTPS funciona

### Health Checks
- [ ] Backend health check: 
  ```bash
  curl https://api.res-gourmet.midominio.com/api/health
  ```
  Respuesta esperada: `{"success":true,...}`

### Funcionalidad de la Aplicación
- [ ] Frontend carga correctamente
- [ ] Menú se muestra correctamente
- [ ] Imágenes cargan (verificar red en DevTools)
- [ ] Formulario de contacto funciona
- [ ] Chatbot se abre y responde
- [ ] Carrusel de reseñas funciona
- [ ] Sin errores en consola del navegador (F12)

### API Endpoints
```bash
# Probar cada endpoint
curl https://api.res-gourmet.midominio.com/api/health
curl https://api.res-gourmet.midominio.com/api/reviews
```
- [ ] `/api/health` responde
- [ ] `/api/reviews` responde
- [ ] CORS configurado correctamente (sin errores de CORS)

---

## Post-Despliegue

### Monitoreo Inicial
- [ ] Dejar logs corriendo: `docker-compose logs -f`
- [ ] Observar por 5-10 minutos que no hay errores
- [ ] Verificar uso de recursos: `docker stats res-gourmet-backend res-gourmet-frontend`

### Documentación
- [ ] Documentar la URL de producción
- [ ] Documentar credenciales de acceso (si aplica)
- [ ] Guardar backup de `.env.production` (en lugar seguro, NO en Git)

### Seguridad
- [ ] Firewall configurado (solo puertos 22, 80, 443)
- [ ] SSH con key-based auth (deshabilitar password)
- [ ] Actualizaciones del sistema: `sudo apt update && sudo apt upgrade`
- [ ] Configurar backups automáticos

### Opcional pero Recomendado
- [ ] Configurar monitoreo (UptimeRobot, Pingdom)
- [ ] Configurar alertas de downtime
- [ ] Configurar backups automáticos de DB
- [ ] Agregar Google Analytics o similar
- [ ] Configurar logs centralizados

---

## Troubleshooting

### Si algo falla:

**1. Contenedores no inician:**
```bash
docker-compose logs backend
docker-compose logs frontend
```

**2. Error de CORS:**
```bash
# Verificar variable en contenedor
docker exec res-gourmet-backend env | grep CORS_ORIGIN
```

**3. SSL no funciona:**
```bash
# Ver logs de Traefik
docker logs traefik | grep res-gourmet
```

**4. Backend no responde:**
```bash
# Entrar al contenedor
docker exec -it res-gourmet-backend sh
# Verificar que el proceso corre
ps aux
# Probar health internamente
wget -O- http://localhost:3001/api/health
```

**5. Frontend muestra error de API:**
```bash
# Verificar que VITE_API_URL se compiló correctamente
# Abrir DevTools > Network > ver las requests
# Deben apuntar a https://api.res-gourmet.midominio.com
```

---

## Rollback (Si necesitas volver atrás)

```bash
# Detener contenedores actuales
docker-compose down

# Volver a versión anterior (si usas Git tags)
git checkout <tag-anterior>

# O restaurar desde backup
# cp -r /backup/Res-Gourmet /opt/repos/

# Reconstruir y reiniciar
./deploy.sh production
```

---

## ✅ Despliegue Exitoso

Si todos los checks están ✅, tu aplicación está:
- 🚀 Desplegada correctamente
- 🔒 Segura con HTTPS
- 📊 Monitoreada
- 🎯 Lista para usuarios

**Siguiente paso:** Anuncia tu sitio y celebra! 🎉

---

## 📞 Comandos Útiles Post-Despliegue

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar un servicio
docker-compose restart backend

# Ver uso de recursos
docker stats

# Actualizar código
cd /opt/repos/Res-Gourmet
git pull origin main
./deploy.sh production

# Backup manual
tar -czf backup-$(date +%Y%m%d).tar.gz /opt/repos/Res-Gourmet
```

---

**Fecha de último despliegue:** _________________

**Desplegado por:** _________________

**Notas adicionales:**
_________________________________________________
_________________________________________________
_________________________________________________
