import { ExceptionHandler } from "@configs/handlers/exception/exception.handler";
import { LoggerErrorGatewayKey } from "@gateways/logger/interfaces/logger.error.gateway";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ExceptionHandler(app.get(LoggerErrorGatewayKey)));

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
