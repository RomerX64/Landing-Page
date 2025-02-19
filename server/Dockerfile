FROM node:20

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY server/package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos
COPY server/ .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
