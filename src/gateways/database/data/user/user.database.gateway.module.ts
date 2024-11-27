import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user.entity";
import { CreateUserDatabaseGatewayKey } from "./create.user.database.gateway";
import { UserDatabaseTypeOrmImpl } from "./impl/user.database.typeorm.impl";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
  providers: [
    {
      provide: CreateUserDatabaseGatewayKey,
      useClass: UserDatabaseTypeOrmImpl,
    },
  ],
  exports: [CreateUserDatabaseGatewayKey],
})
export class UserDataBaseGatewayModule {}