import { EncryptionGatewayModule } from "@gateways/encryption/encryption.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserUseCaseModule } from "@use-cases/user/user.usecase.module";
import { AuthenticationUseCase } from "./authentication.usecase";
import { CreateTokensUseCase } from "./create.tokens.usecase";

@Module({
  imports: [UserUseCaseModule, LoggerModule, JwtModule, EncryptionGatewayModule],
  providers: [AuthenticationUseCase, CreateTokensUseCase],
  exports: [AuthenticationUseCase, CreateTokensUseCase],
})
export class AuthenticationUseCaseModule {}
