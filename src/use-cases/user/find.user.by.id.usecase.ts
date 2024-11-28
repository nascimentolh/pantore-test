import { User } from "@domains/user";
import {
  FindUserByIdDatabaseGateway,
  FindUserByIdDatabaseGatewayKey,
} from "@gateways/database/data/user/find.user.by.id.database.gateway";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";
import { UserNotFoundBusinessException } from "@use-cases/exceptions/user.not.found.business.exception";

@Injectable()
export class FindUserByIdUserUseCase {
  constructor(
    @Inject(FindUserByIdDatabaseGatewayKey)
    private readonly findUserByIdDatabaseGateway: FindUserByIdDatabaseGateway,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async findById(id: number): Promise<User> {
    this.loggerLogGateway.log({
      class: FindUserByIdUserUseCase.name,
      meta: id,
      method: "findById",
    });

    const user = await this.findUserByIdDatabaseGateway.findById(id);

    if (user) {
      return user;
    }

    throw new UserNotFoundBusinessException();
  }
}
