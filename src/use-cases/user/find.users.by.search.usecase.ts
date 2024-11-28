import { User } from "@domains/user";
import {
  FindUsersBySearchGateway,
  FindUsersBySearchGatewayKey,
} from "@gateways/database/data/user/find.users.by.search.gateway";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class FindUsersBySearchUseCase {
  constructor(
    @Inject(FindUsersBySearchGatewayKey)
    private readonly findUsersBySearchGateway: FindUsersBySearchGateway,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async findUsersBySearch(field: string, searchValue: string): Promise<User[]> {
    this.loggerLogGateway.log({
      class: FindUsersBySearchUseCase.name,
      method: "findUsersBySearch",
    });

    return this.findUsersBySearchGateway.findUsersBySearch(field, searchValue);
  }
}
