import { User } from "@domains/user";
import {
  FindAllUserDatabaseGateway,
  FindAllUserDatabaseGatewayKey,
} from "@gateways/database/data/user/findall.user.database.gateway";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject(FindAllUserDatabaseGatewayKey)
    private readonly findAllUserDatabaseGateway: FindAllUserDatabaseGateway,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async findAll(): Promise<User[]> {
    this.loggerLogGateway.log({
      class: FindAllUserUseCase.name,
      method: "findAll",
    });

    return this.findAllUserDatabaseGateway.findAll();
  }
}
