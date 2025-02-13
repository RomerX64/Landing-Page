# Usa una imagen base oficial de Node.js
FROM node:16

# Define el directorio de trabajo en la carpeta /app
WORKDIR /app

# Copia el package.json y package-lock.json en el contenedor
COPY server/package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY server/ ./

# Compila el proyecto TypeScript (esto genera la carpeta dist/)
RUN npm run build

# Expone el puerto que usará la app
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]