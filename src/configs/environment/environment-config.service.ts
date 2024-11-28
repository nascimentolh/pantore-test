import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppProperties } from "./app.properties";
import { AppConfig } from "./app.properties.interface";

@Injectable()
export class EnvironmentConfigService implements AppConfig {
  constructor(private configService: ConfigService<AppProperties>) {}

  public getDatabaseHost(): string {
    return this.configService.get<string>("DATABASE_HOST");
  }

  public getDatabasePort(): number {
    return this.configService.get<number>("DATABASE_PORT");
  }

  public getDatabaseUser(): string {
    return this.configService.get<string>("DATABASE_USER");
  }

  public getDatabasePassword(): string {
    return this.configService.get<string>("DATABASE_PASSWORD");
  }

  public getDatabaseName(): string {
    return this.configService.get<string>("DATABASE_NAME");
  }

  public getDatabaseSchema(): string {
    return this.configService.get<string>("DATABASE_SCHEMA");
  }

  public getDatabaseSync(): boolean {
    return this.configService.get<boolean>("DATABASE_SYNCHRONIZE");
  }

  public getJwtSecret(): string {
    return this.configService.get<string>("JWT_SECRET");
  }

  public getJwtExpirationTime(): number {
    return this.configService.get<number>("JWT_EXPIRATION_TIME");
  }

  public getJwtRefreshTokenExpirationTime(): number {
    return this.configService.get<number>("JWT_REFRESH_TOKEN_EXPIRATION_TIME");
  }

  public getEncryptionPassword(): string {
    return this.configService.get<string>("ENCRYPTION_PASSWORD");
  }

  public getEncryptionIV(): string {
    return this.configService.get<string>("ENCRYPTION_IV");
  }
}
