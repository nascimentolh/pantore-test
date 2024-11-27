import type { User } from "@domains/user";
import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { type LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { UserEntity } from "../../user.entity";
import type { CreateUserDatabaseGateway } from "../create.user.database.gateway";
import type { FindUserByEmailDatabaseGateway } from "../find.user.by.email.gateway";
import { mapperUserFromUserEntity } from "../mappers/user.database.mapper";

export class UserDatabaseTypeOrmImpl implements CreateUserDatabaseGateway, FindUserByEmailDatabaseGateway {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async findByEmail(email: string): Promise<User | null> {
    try {
      this.loggerLogGateway.log({
        class: UserDatabaseTypeOrmImpl.name,
        meta: email,
        method: "findByEmail",
      });

      const userEntity = await this.userEntityRepository.findOneBy({ email });

      return mapperUserFromUserEntity(userEntity);
    } catch (error) {
      throw new UserDatabaseGatewayException(error.stack);
    }
  }

  public async insert(user: User): Promise<void> {
    try {
      this.loggerLogGateway.log({
        class: UserDatabaseTypeOrmImpl.name,
        meta: user,
        method: "insert",
      });
      await this.userEntityRepository.save(user);
    } catch (error) {
      throw new UserDatabaseGatewayException(error.stack);
    }
  }
}
