import { User } from "@domains/user";
import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { LoggerErrorGateway, LoggerErrorGatewayKey } from "@gateways/logger/interfaces/logger.error.gateway";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../user.entity";
import { CreateUserDatabaseGateway } from "../create.user.database.gateway";
import { FindUserByEmailDatabaseGateway } from "../find.user.by.email.gateway";
import { FindUserByIdDatabaseGateway } from "../find.user.by.id.database.gateway";
import { FindUsersBySearchGateway } from "../find.users.by.search.gateway";
import { FindAllUserDatabaseGateway } from "../findall.user.database.gateway";
import { mapperUserEntityFromUser, mapperUserFromUserEntity } from "../mappers/user.database.mapper";
import { UpdateUserDatabaseGateway } from "../update.user.database.gateway";

export class UserDatabaseTypeOrmImpl
  implements
    CreateUserDatabaseGateway,
    FindUserByEmailDatabaseGateway,
    FindAllUserDatabaseGateway,
    UpdateUserDatabaseGateway,
    FindUserByIdDatabaseGateway,
    FindUsersBySearchGateway
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
    @Inject(LoggerErrorGatewayKey)
    private readonly loggerErrorGateway: LoggerErrorGateway,
  ) {}

  public async findUsersBySearch(field: string, searchValue: string): Promise<User[]> {
    try {
      this.loggerLogGateway.log({
        class: UserDatabaseTypeOrmImpl.name,
        method: "findUsersBySearch",
        meta: { field, searchValue },
      });

      const usersEntity = await this.userEntityRepository
        .createQueryBuilder("user")
        .where(`user.${field} LIKE :searchValue`, { searchValue: `%${searchValue}%` })
        .getMany();

      return usersEntity.map(mapperUserFromUserEntity);
    } catch (error) {
      this.loggerErrorGateway.error({
        class: UserDatabaseTypeOrmImpl.name,
        method: "findUsersBySearch",
        error: error.stack,
      });
      throw new UserDatabaseGatewayException(error.stack);
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      this.loggerLogGateway.log({
        class: UserDatabaseTypeOrmImpl.name,
        method: "findAll",
      });

      const usersEntity = await this.userEntityRepository.find();

      return usersEntity.map(mapperUserFromUserEntity);
    } catch (error) {
      throw new UserDatabaseGatewayException(error.stack);
    }
  }

  public async findByEmail(email: string): Promise<User | null> {
    try {
      this.loggerLogGateway.log({
        class: UserDatabaseTypeOrmImpl.name,
        meta: email,
        method: "findByEmail",
      });

      const userEntity = await this.userEntityRepository.findOneBy({ email });

      if (!userEntity) {
        return null;
      }

      return mapperUserFromUserEntity(userEntity);
    } catch (error) {
      this.loggerErrorGateway.error({
        class: UserDatabaseTypeOrmImpl.name,
        meta: error.message,
        method: "findByEmail",
        error: error.stack,
      });

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
      this.loggerErrorGateway.error({
        class: UserDatabaseTypeOrmImpl.name,
        meta: error.message,
        method: "insert",
        error: error.stack,
      });
      throw new UserDatabaseGatewayException(error.stack);
    }
  }

  public async update(userToUpdate: User): Promise<void> {
    try {
      this.loggerLogGateway.log({
        class: UserDatabaseTypeOrmImpl.name,
        method: "update",
        meta: userToUpdate,
      });

      const userToUpdateMapped = mapperUserEntityFromUser(userToUpdate);

      await this.userEntityRepository.update(
        {
          id: userToUpdateMapped.id,
        },
        userToUpdateMapped,
      );
    } catch (error) {
      throw new UserDatabaseGatewayException(error.stack);
    }
  }

  public async findById(id: number): Promise<User | null> {
    try {
      this.loggerLogGateway.log({
        class: UserDatabaseTypeOrmImpl.name,
        meta: id,
        method: "findById",
      });

      const userEntity = await this.userEntityRepository.findOneBy({ id });

      return mapperUserFromUserEntity(userEntity);
    } catch (error) {
      throw new UserDatabaseGatewayException(error.stack);
    }
  }
}
