import { UserDataBaseGatewayModule } from "@gateways/database/data/user/user.database.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./create.user.usecase";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";

@Module({
  imports: [UserDataBaseGatewayModule, LoggerModule],
  providers: [CreateUserUseCase, FindUserByEmailUseCase],
  exports: [CreateUserUseCase, FindUserByEmailUseCase],
})
export class UserUseCaseModule {}
