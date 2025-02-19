# Usar una imagen base de Node.js
FROM node:18 AS build

# Establecer el directorio de trabajo en la carpeta client
WORKDIR /app/client

# Copiar los archivos package.json y package-lock.json (si existe) al contenedor
COPY client/package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el contenido del proyecto al contenedor
COPY client/ .

# Construir la aplicación de Next.js
RUN npm run build

# Usar una imagen base de Node.js para el contenedor final
FROM node:18 AS production

# Establecer el directorio de trabajo
WORKDIR /app/client

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app/client /app/client

# Exponer el puerto donde se ejecutará Next.js
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "start"]
