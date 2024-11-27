import type { User } from "@domains/user";
import {
  type CreateUserDatabaseGateway,
  CreateUserDatabaseGatewayKey,
} from "@gateways/database/data/user/create.user.database.gateway";
import { type LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { type LoggerWarnGateway, LoggerWarnGatewayKey } from "@gateways/logger/interfaces/logger.warn.gateway";
import { Inject, Injectable } from "@nestjs/common";
import { EmailAlreadyExistsBusinessException } from "../exceptions/email.already.register.business.exception";
import type { FindUserByEmailUseCase } from "./find.user.by.email.usecase";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(CreateUserDatabaseGatewayKey)
    private readonly createUserDatabaseGateway: CreateUserDatabaseGateway,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
    @Inject(LoggerWarnGatewayKey)
    private readonly loggerWarnGateway: LoggerWarnGateway,
  ) {}

  public async create(userToCreate: User): Promise<void> {
    this.loggerLogGateway.log({
      class: CreateUserUseCase.name,
      meta: userToCreate,
      method: "create",
    });

    await this.verifyEmailAlreadyRegister(userToCreate.email);

    await this.createUserDatabaseGateway.insert(userToCreate);
  }

  private async verifyEmailAlreadyRegister(email: string) {
    const userFinded = await this.findUserByEmailUseCase.find(email);

    if (userFinded) {
      this.loggerWarnGateway.warn({
        class: CreateUserUseCase.name,
        meta: email,
        method: "verifyEmailAlreadyRegister",
      });

      throw new EmailAlreadyExistsBusinessException();
    }
  }
}
