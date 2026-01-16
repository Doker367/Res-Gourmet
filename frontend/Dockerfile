# Dockerfile para el Frontend
FROM node:18-alpine as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Copiar archivo de entorno de producción
COPY .env.production .env.production

# ARG para recibir variables de entorno en tiempo de build
ARG VITE_API_URL=https://api.res-gourmet.midominio.com/api
ARG VITE_APP_NAME=Res-Gourmet
ARG VITE_NODE_ENV=production

# Exportar variables para el build de Vite
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_NAME=${VITE_APP_NAME}
ENV VITE_NODE_ENV=${VITE_NODE_ENV}

# Construir la aplicación
RUN npm run build

# Etapa de producción con nginx
FROM nginx:alpine

# Copiar el build al directorio de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto de nginx
CMD ["nginx", "-g", "daemon off;"]
