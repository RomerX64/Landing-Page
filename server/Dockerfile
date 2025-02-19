# Etapa de construcción
FROM node:20-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY server/package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY server/ ./

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine AS runtime

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY server/package*.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist ./dist

# Exponer el puerto 3000
EXPOSE 3000

# Establecer el usuario para ejecutar la aplicación
USER node

# Comando para iniciar la aplicación
CMD ["npm", "start"]
