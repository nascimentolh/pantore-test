import { User } from "@domains/user";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "../user/create.user.usecase";

@Injectable()
export class UserFacade {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async create(userToCreate: User): Promise<void> {
    this.loggerLogGateway.log({
      class: UserFacade.name,
      meta: userToCreate,
      method: "create",
    });

    await this.createUserUseCase.create(userToCreate);
  }
}
