import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";
import { FacadeModule } from "@use-cases/facade/facade.module";
import { AuthenticationController } from "./authentication.controller";

@Module({
  imports: [FacadeModule, LoggerModule],
  controllers: [AuthenticationController],
})
export class AuthenticationControllerModule {}
