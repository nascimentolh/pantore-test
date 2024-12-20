import { EnvironmentConfigService } from "@configs/environment/environment-config.service";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTGatewayException } from "../exceptions/jwt.gateway.exception";
import { JwtPayload } from "../jwt.payload";
import { RefreshTokenGateway } from "../refresh.gateway.token";
import { TokenGateway } from "../token.gateway";

@Injectable()
export class JwtPassport implements TokenGateway, RefreshTokenGateway {
  constructor(
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
    private readonly jwtTokenService: JwtService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}
  public createAccessToken(jwtPayload: JwtPayload): string {
    try {
      this.loggerLogGateway.log({
        class: JwtPassport.name,
        meta: jwtPayload,
        method: "createAccessToken",
      });

      return this.jwtTokenService.sign(
        { jwtPayload },
        {
          expiresIn: this.environmentConfigService.getJwtExpirationTime(),
        },
      );
    } catch (error) {
      throw new JWTGatewayException(error.stack);
    }
  }

  public createRefreshToken(jwtPayload: JwtPayload): string {
    try {
      this.loggerLogGateway.log({
        class: JwtPassport.name,
        meta: jwtPayload,
        method: "createRefreshToken",
      });

      return this.jwtTokenService.sign(
        { jwtPayload },
        {
          expiresIn: this.environmentConfigService.getJwtRefreshTokenExpirationTime(),
        },
      );
    } catch (error) {
      throw new JWTGatewayException(error.stack);
    }
  }
}
