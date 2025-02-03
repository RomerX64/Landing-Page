import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
  const port = await getAvailablePort(parseInt(process.env.PORT ?? '3000', 10));
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`App running on port ${port}`);
}

bootstrap();
