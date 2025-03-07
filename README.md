# Landing-Page Assetly

Este es un proyecto que incluye tanto el cliente como el servidor. A continuación se detallan los pasos para iniciar y trabajar en el proyecto.

## Requisitos previos

- Tener [Node.js](https://nodejs.org/) instalado en tu máquina.
- Tener [npm](https://www.npmjs.com/) instalado.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/RomerX64/Landing-Page.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd Landing-Page
   ```

3. Instala las dependencias tanto del cliente como del servidor:

   ```bash
   npm install
   ```

## Iniciar el Proyecto

### Servidor

Para iniciar el servidor, utiliza el siguiente comando:

```bash
npm run start:dev
```

### Cliente

Para iniciar la web, utiliza el siguiente comando:

```bash
npm run dev
```

Recuerda que el servidor debe estar en funcionamiento antes de iniciar el cliente, ya que el servidor escucha en el puerto 3000, utilizado por el cliente.

## Trabajar en la Aplicación

El código principal se encuentra en el archivo `main`. Aquí es donde se debe realizar el trabajo de desarrollo.

## Despliegue en Producción

Una vez que los cambios estén listos y hayan sido subidos a la rama `main`, sigue estos pasos para llevarlos `Produccion`:

1. Cambia a la rama `prod-(front/back)` dependiendo el ambito si backend o frontend:

   ```bash
   git checkout prod-back
   git reset --hard origin/main
   git push origin prod-back --force
   git checkout main

   ```

2. Para volver a la rama `main`, usa el siguiente comando:

   ```bash
   git checkout prod-front
   git reset --hard origin/main
   git push origin prod-front --force
   git checkout main

   ```

## Contribuciones

Si deseas contribuir a este proyecto, por favor realiza un **fork** y luego envía un **pull request**.


## Card
5547 3000 1630 0199
04/29    041

GONZALO EMANUEL AGUETTI

39737674

tomiromera2903mini@gmail.com