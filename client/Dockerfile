# Usar una imagen base de Node.js
FROM node:20 AS build

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos package.json y package-lock.json al contenedor
COPY client/package*.json ./
# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente de la carpeta client
COPY . .

# Construir la aplicación de Next.js
RUN npm run build

# Usar una imagen base de Node.js para el contenedor final
FROM node:20 AS production

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app /app

# Exponer el puerto donde se ejecutará Next.js
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "start"]
