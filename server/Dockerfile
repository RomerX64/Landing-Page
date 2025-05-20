FROM node:20

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto (Railway lo define por env, mejor usar process.env.PORT en tu código)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
