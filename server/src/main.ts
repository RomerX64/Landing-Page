import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as http from 'http';

async function getAvailablePort(startPort: number): Promise<number> {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.listen(startPort, () => {
      server.close(() => resolve(startPort));
    });
    server.on('error', () => {
      resolve(getAvailablePort(startPort + 1));
    });
  });
}

async function bootstrap() {
  const port = await getAvailablePort(parseInt(process.env.PORT ?? '3000'));
  const app = await NestFactory.create(AppModule);

  app.enableCors(); 

  const config = new DocumentBuilder()
    .setTitle('API Assetly') // Nombre de la API
    .setDescription('Documentación de la API de Assetly')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
  console.log(`App running on port ${port}`);
  console.log(`Swagger disponible en: /docs`);
}

bootstrap();
