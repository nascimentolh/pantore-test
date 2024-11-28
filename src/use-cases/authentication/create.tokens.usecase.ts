import { EncryptionGateway, EncryptionGatewayKey } from "@gateways/encryption/encryption.gateway";
import { JwtPayload } from "@gateways/jwt/jwt.payload";
import { RefreshTokenGateway, RefreshTokenGatewayKey } from "@gateways/jwt/refresh.gateway.token";
import { TokenGateway, TokenGatewayKey } from "@gateways/jwt/token.gateway";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateTokensUseCase {
  constructor(
    @Inject(TokenGatewayKey) private readonly tokenGateway: TokenGateway,
    @Inject(RefreshTokenGatewayKey) private readonly refreshTokenGateway: RefreshTokenGateway,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
    @Inject(EncryptionGatewayKey)
    private readonly encryptionGateway: EncryptionGateway,
  ) {}

  public async create(userId: number, userCpf: string, userRole: string) {
    this.loggerLogGateway.log({
      class: CreateTokensUseCase.name,
      method: "create",
      meta: { userCpf, userId, userRole },
    });

    const [emailEncrypted, idEncrypted, roleEncrypted] = await Promise.all([
      this.encryptionGateway.encrypt(userCpf),
      this.encryptionGateway.encrypt(String(userId)),
      this.encryptionGateway.encrypt(String(userRole)),
    ]);

    const jwtPayload = JwtPayload.builder().email(emailEncrypted).id(idEncrypted).role(roleEncrypted).build();

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenGateway.createAccessToken(jwtPayload),
      this.refreshTokenGateway.createRefreshToken(jwtPayload),
    ]);

    return { accessToken, refreshToken };
  }
}
