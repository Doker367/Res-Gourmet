#!/bin/bash

# Script de Despliegue Automático para Res-Gourmet
# Uso: ./deploy.sh [production|development]

set -e  # Detener el script si hay errores

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar argumentos
ENVIRONMENT=${1:-production}

if [ "$ENVIRONMENT" != "production" ] && [ "$ENVIRONMENT" != "development" ]; then
    print_error "Ambiente inválido. Usa: ./deploy.sh [production|development]"
    exit 1
fi

print_message "🚀 Iniciando despliegue en modo: $ENVIRONMENT"

# Verificar que estamos en el directorio correcto
if [ ! -f "docker-compose.yml" ]; then
    print_error "docker-compose.yml no encontrado. Ejecuta este script desde el directorio raíz del proyecto."
    exit 1
fi

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado"
    exit 1
fi

# Verificar archivos .env
print_message "🔍 Verificando archivos de configuración..."

if [ "$ENVIRONMENT" == "production" ]; then
    if [ ! -f "backend/.env.production" ]; then
        print_warning "backend/.env.production no encontrado. Copiando desde .env.example..."
        cp backend/.env.example backend/.env.production
        print_error "Debes editar backend/.env.production con tus valores reales"
        exit 1
    fi
    
    if [ ! -f "frontend/.env.production" ]; then
        print_warning "frontend/.env.production no encontrado. Copiando desde .env.example..."
        cp frontend/.env.example frontend/.env.production
        print_error "Debes editar frontend/.env.production con tus valores reales"
        exit 1
    fi
fi

# Detener contenedores existentes
print_message "🛑 Deteniendo contenedores existentes..."
docker-compose down || true

# Limpiar imágenes viejas (opcional - comentar si no quieres)
# print_message "🧹 Limpiando imágenes antiguas..."
# docker image prune -f

# Construir nuevas imágenes
print_message "🔨 Construyendo imágenes Docker..."
if [ "$ENVIRONMENT" == "production" ]; then
    docker-compose build --no-cache
else
    docker-compose -f docker-compose.dev.yml build --no-cache
fi

# Iniciar contenedores
print_message "🚀 Iniciando contenedores..."
if [ "$ENVIRONMENT" == "production" ]; then
    docker-compose up -d
else
    docker-compose -f docker-compose.dev.yml up -d
fi

# Esperar a que los servicios estén listos
print_message "⏳ Esperando a que los servicios inicien..."
sleep 10

# Verificar estado de los contenedores
print_message "📊 Verificando estado de los contenedores..."
docker-compose ps

# Health check del backend
print_message "🏥 Realizando health check..."
if [ "$ENVIRONMENT" == "production" ]; then
    # En producción, verificar a través de Traefik (si está configurado)
    print_warning "Verifica manualmente: https://api.res-gourmet.midominio.com/api/health"
else
    # En desarrollo, verificar directamente
    sleep 5
    if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
        print_message "✅ Backend está respondiendo correctamente"
    else
        print_error "❌ Backend no responde. Verifica los logs:"
        docker-compose logs backend --tail=50
        exit 1
    fi
fi

# Mostrar logs
print_message "📋 Últimas líneas de logs:"
echo ""
if [ "$ENVIRONMENT" == "production" ]; then
    docker-compose logs --tail=20
else
    docker-compose -f docker-compose.dev.yml logs --tail=20
fi

echo ""
print_message "✅ Despliegue completado exitosamente!"
echo ""
print_message "📌 Comandos útiles:"
if [ "$ENVIRONMENT" == "production" ]; then
    echo "  - Ver logs:        docker-compose logs -f"
    echo "  - Reiniciar:       docker-compose restart"
    echo "  - Detener:         docker-compose down"
    echo "  - Ver estado:      docker-compose ps"
else
    echo "  - Ver logs:        docker-compose -f docker-compose.dev.yml logs -f"
    echo "  - Reiniciar:       docker-compose -f docker-compose.dev.yml restart"
    echo "  - Detener:         docker-compose -f docker-compose.dev.yml down"
    echo "  - Ver estado:      docker-compose -f docker-compose.dev.yml ps"
fi
echo ""

if [ "$ENVIRONMENT" == "production" ]; then
    print_message "🌐 URLs:"
    echo "  - Frontend: https://res-gourmet.midominio.com"
    echo "  - Backend:  https://api.res-gourmet.midominio.com"
    echo "  - Health:   https://api.res-gourmet.midominio.com/api/health"
else
    print_message "🌐 URLs:"
    echo "  - Frontend: http://localhost:5173"
    echo "  - Backend:  http://localhost:3001"
    echo "  - Health:   http://localhost:3001/api/health"
fi
echo ""
