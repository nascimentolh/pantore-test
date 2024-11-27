import type { User } from "@domains/user";
import {
  type FindUserByEmailDatabaseGateway,
  FindUserByEmailDatabaseGatewayKey,
} from "@gateways/database/data/user/find.user.by.email.gateway";
import { type LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @Inject(FindUserByEmailDatabaseGatewayKey)
    private readonly FindUserByEmailDatabaseGateway: FindUserByEmailDatabaseGateway,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async find(email: string): Promise<User | null> {
    this.loggerLogGateway.log({
      class: FindUserByEmailUseCase.name,
      meta: email,
      method: "find",
    });

    return await this.FindUserByEmailDatabaseGateway.findByEmail(email);
  }
}
