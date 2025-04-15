# Assetly Landing Page

## Descripción

Proyecto de Landing Page desarrollado con tecnologías modernas, utilizando un skeleton inspirado en el [template Open de Cruip](https://github.com/cruip/open-react-template).

## Requisitos Previos

- [Node.js](https://nodejs.org/) (20)
- [npm](https://www.npmjs.com/)

## Configuración e Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/RomerX64/Landing-Page.git Assetly-LandingPage
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd Assetly-LandingPage
   ```

3. Instala las dependencias en cada carpeta:

   ```bash
   # Instalar dependencias del backend
   cd server
   npm install

   # Instalar dependencias del frontend
   cd ../client
   npm install
   ```

## Ejecución del Proyecto

### Configuración Importante

⚠️ **Orden de Inicio**:

- **Primero debe iniciarse el Backend** escuchando en el puerto 3000
- Luego se puede iniciar el Frontend

### Backend

Navega a la carpeta del servidor y ejecuta:

```bash
cd server
npm run start:dev
```

El servidor estará corriendo en `http://localhost:3000`

### Frontend

En otra terminal, navega a la carpeta del cliente y ejecuta:

```bash
cd client
npm run dev
```

La aplicación web estará disponible en `http://localhost:3001`

## Estructura del Proyecto

- `server/`: Código del servidor (NestJS)
- `client/`: Código del cliente (React/Next.js)
- `main.ts`: Archivo principal de configuración

## Despliegue

### Ramas de Producción

Para desplegar cambios:

1. Backend:

   ```bash
   git checkout prod-back
   git reset --hard origin/main
   git push origin prod-back --force
   git checkout main
   ```

2. Frontend:
   ```bash
   git checkout prod-front
   git reset --hard origin/main
   git push origin prod-front --force
   git checkout main
   ```

## Contribuciones

Si deseas contribuir:

1. Realiza un **fork** del repositorio
2. Crea tu rama de features
3. Envía un **pull request**

## Tecnologías

- Backend: NestJS
- Frontend: React / Next.js
- Estilos: Tailwind CSS
