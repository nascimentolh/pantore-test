import { UserDataBaseGatewayModule } from "@gateways/database/data/user/user.database.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./create.user.usecase";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";
import { FindUserByIdUserUseCase } from "./find.user.by.id.usecase";
import { FindAllUserUseCase } from "./findall.user.usecase";
import { UpdateUserUseCase } from "./update.user.usecase";

@Module({
  imports: [UserDataBaseGatewayModule, LoggerModule],
  providers: [
    CreateUserUseCase,
    FindUserByEmailUseCase,
    FindAllUserUseCase,
    UpdateUserUseCase,
    FindUserByIdUserUseCase,
  ],
  exports: [CreateUserUseCase, FindUserByEmailUseCase, FindAllUserUseCase, UpdateUserUseCase, FindUserByIdUserUseCase],
})
export class UserUseCaseModule {}
