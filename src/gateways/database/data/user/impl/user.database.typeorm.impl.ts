import type { User } from "@domains/user";
import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { UserEntity } from "../../user.entity";
import type { CreateUserDatabaseGateway } from "../create.user.database.gateway";

export class UserDatabaseTypeOrmImpl implements CreateUserDatabaseGateway {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public async insert(user: User): Promise<void> {
    try {
      await this.userEntityRepository.create(user);
    } catch (error) {
      throw new UserDatabaseGatewayException(error.stack);
    }
  }
}
