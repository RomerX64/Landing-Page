# Etapa de construcción
FROM node:20 AS build

# Configuración del directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración del servidor (package.json y package-lock.json)
COPY server/package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente de la carpeta server
COPY server/ ./

# Exponer el puerto que el servidor usará
EXPOSE 4000

# Ejecutar el servidor de Node.js
CMD ["npm", "start"]
