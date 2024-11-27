import { EnvironmentConfigModule } from "@configs/environment/environment-config.module";
import { EnvironmentConfigService } from "@configs/environment/environment-config.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
  ({
    type: "postgres",
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [`${__dirname}./../../**/*.entity{.ts,.js}`],
    synchronize: true,
    schema: config.getDatabaseSchema(),
    ssl: false,
    logging: true,
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
