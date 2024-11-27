import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log("Starting application...", "Bootstrap");

  app.enableShutdownHooks(); // Opcional, para capturar eventos de shutdown

  app.setGlobalPrefix("/api/v1");

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Pantore API")
    .setDescription("Cadastro de usuários")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
