import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";

import { UserUseCaseModule } from "../user/user.usecase.module";
import { UserFacade } from "./user.facade";

@Module({
  imports: [LoggerModule, UserUseCaseModule],
  providers: [UserFacade],
  exports: [UserFacade],
})
export class FacadeModule {}
