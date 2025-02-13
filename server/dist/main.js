"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const http = require("http");
async function getAvailablePort(startPort) {
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
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Assetly')
        .setDescription('Documentación de la API de Assetly')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(port);
    console.log(`App running on port ${port}`);
    console.log(`Swagger disponible en: /docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map