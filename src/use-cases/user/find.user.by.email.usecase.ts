import { User } from "@domains/user";
import {
  FindUserByEmailDatabaseGateway,
  FindUserByEmailDatabaseGatewayKey,
} from "@gateways/database/data/user/find.user.by.email.gateway";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @Inject(FindUserByEmailDatabaseGatewayKey)
    private readonly findUserByEmailDatabaseGateway: FindUserByEmailDatabaseGateway,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async find(email: string): Promise<User | null> {
    this.loggerLogGateway.log({
      class: FindUserByEmailUseCase.name,
      meta: email,
      method: "find",
    });

    return await this.findUserByEmailDatabaseGateway.findByEmail(email);
  }
}
