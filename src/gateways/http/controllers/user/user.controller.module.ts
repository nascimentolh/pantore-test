import { EncryptionGatewayModule } from "@gateways/encryption/encryption.gateway.module";
import { Module } from "@nestjs/common";
import { FacadeModule } from "@use-cases/facade/facade.module";
import { UserController } from "./user.controller";

@Module({
  imports: [FacadeModule, EncryptionGatewayModule],
  controllers: [UserController],
})
export class UserControllerModule {}
