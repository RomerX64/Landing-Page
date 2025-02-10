# Usar la imagen base de Node.js para la etapa de construcción
FROM node:20 AS build

# Configuración del directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración del cliente (package.json y package-lock.json)
COPY client/package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente de la carpeta client
COPY client/ ./

# Instalar las dependencias necesarias para sharp (si es que es necesario)
RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev

# Construir la aplicación de Next.js
# RUN npm run build

# Usar una imagen base de Node.js para la etapa de producción
FROM node:20 AS production

# Configuración del directorio de trabajo para la ejecución
WORKDIR /app

# Copiar los archivos construidos y las dependencias desde la etapa de construcción
COPY --from=build /app /app

# Copiar las dependencias de producción
COPY --from=build /app/node_modules /app/node_modules

# Exponer el puerto que Next.js usará
EXPOSE 3000

# Ejecutar el servidor de Next.js
CMD ["npm", "start"]
