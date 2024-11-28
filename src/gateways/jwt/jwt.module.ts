import { EnvironmentConfigModule } from "@configs/environment/environment-config.module";
import { LoggerModule } from "@gateways/logger/logger.module";
import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtPassport } from "./impl/jwt-passport.impl";
import { JwtStrategy } from "./jwt.strategy";
import { RefreshTokenGatewayKey } from "./refresh.gateway.token";
import { TokenGatewayKey } from "./token.gateway";

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    PassportModule,
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    {
      provide: TokenGatewayKey,
      useClass: JwtPassport,
    },
    {
      provide: RefreshTokenGatewayKey,
      useClass: JwtPassport,
    },
    JwtStrategy,
  ],
  exports: [TokenGatewayKey, RefreshTokenGatewayKey],
})
export class JwtModule {}
