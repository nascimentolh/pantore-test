import { User } from "@domains/user";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";
import { FindAllUserUseCase } from "@use-cases/user/findall.user.usecase";
import { UpdateUserUseCase } from "@use-cases/user/update.user.usecase";
import { CreateUserUseCase } from "../user/create.user.usecase";

@Injectable()
export class UserFacade {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
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

  public async findAll(): Promise<User[]> {
    this.loggerLogGateway.log({
      class: UserFacade.name,
      method: "findAll",
    });

    return this.findAllUserUseCase.findAll();
  }

  public async update(userToUpdate: User): Promise<void> {
    this.loggerLogGateway.log({
      class: UserFacade.name,
      method: "update",
      meta: userToUpdate,
    });

    await this.updateUserUseCase.update(userToUpdate);
  }
}
