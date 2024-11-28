import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user.entity";
import { CreateUserDatabaseGatewayKey } from "./create.user.database.gateway";
import { FindUserByEmailDatabaseGatewayKey } from "./find.user.by.email.gateway";
import { FindUserByIdDatabaseGatewayKey } from "./find.user.by.id.database.gateway";
import { FindAllUserDatabaseGatewayKey } from "./findall.user.database.gateway";
import { UserDatabaseTypeOrmImpl } from "./impl/user.database.typeorm.impl";
import { UpdateUserDatabaseGatewayKey } from "./update.user.database.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
  providers: [
    {
      provide: CreateUserDatabaseGatewayKey,
      useClass: UserDatabaseTypeOrmImpl,
    },
    {
      provide: FindUserByEmailDatabaseGatewayKey,
      useClass: UserDatabaseTypeOrmImpl,
    },
    {
      provide: FindAllUserDatabaseGatewayKey,
      useClass: UserDatabaseTypeOrmImpl,
    },
    {
      provide: UpdateUserDatabaseGatewayKey,
      useClass: UserDatabaseTypeOrmImpl,
    },
    {
      provide: FindUserByIdDatabaseGatewayKey,
      useClass: UserDatabaseTypeOrmImpl,
    },
  ],
  exports: [
    CreateUserDatabaseGatewayKey,
    FindUserByEmailDatabaseGatewayKey,
    FindAllUserDatabaseGatewayKey,
    UpdateUserDatabaseGatewayKey,
    FindUserByIdDatabaseGatewayKey,
  ],
})
export class UserDataBaseGatewayModule {}
