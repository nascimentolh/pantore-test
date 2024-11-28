import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";

import { AuthenticationUseCaseModule } from "@use-cases/authentication/authentication.usecase.module";
import { UserUseCaseModule } from "../user/user.usecase.module";
import { AuthenticationFacade } from "./authentication.facade";
import { UserFacade } from "./user.facade";

@Module({
  imports: [LoggerModule, UserUseCaseModule, AuthenticationUseCaseModule],
  providers: [UserFacade, AuthenticationFacade],
  exports: [UserFacade, AuthenticationFacade],
})
export class FacadeModule {}
