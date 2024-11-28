import { User } from "@domains/user";
import {
  UpdateUserDatabaseGateway,
  UpdateUserDatabaseGatewayKey,
} from "@gateways/database/data/user/update.user.database.gateway";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UpdateUserDatabaseGatewayKey)
    private readonly updateUserDatabaseGateway: UpdateUserDatabaseGateway,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async update(userToUpdate: User): Promise<void> {
    this.loggerLogGateway.log({
      class: UpdateUserUseCase.name,
      meta: userToUpdate,
      method: "update",
    });

    await this.updateUserDatabaseGateway.update(userToUpdate);
  }
}
