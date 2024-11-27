import { EnvironmentConfigModule } from "@configs/environment/environment-config.module";
import { LoggerMiddleware } from "@configs/logger/logger.middleware";
import { TypeOrmConfigModule } from "@gateways/database/typeorm/typeorm.module";
import { UserControllerModule } from "@gateways/http/controllers/user/user.controller.module";
import { LoggerModule } from "@gateways/logger/logger.module";
import { type MiddlewareConsumer, Module, type NestModule } from "@nestjs/common";

@Module({
  imports: [UserControllerModule, EnvironmentConfigModule, TypeOrmConfigModule, LoggerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
