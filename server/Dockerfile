# Usa una imagen base oficial de Node.js
FROM node:16

# Define el directorio de trabajo en la carpeta server
WORKDIR /app

# Copia el package.json y package-lock.json en el contenedor
COPY server/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY server ./

# Expone el puerto que usará la app (ajusta si es necesario)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
