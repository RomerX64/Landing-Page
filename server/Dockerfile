# Usa una imagen base
FROM node:16

# Establece un directorio de trabajo
WORKDIR /app

# Copia solo archivos esenciales para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start:dev"]
