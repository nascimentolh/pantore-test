import { EnvironmentConfigModule } from "@configs/environment/environment-config.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DecryptionGatewayKey } from "./decryption.gateway";
import { EncryptionGatewayKey } from "./encryption.gateway";
import { CryptoGateway } from "./impl/crypto.gateway.impl";

@Module({
  imports: [EnvironmentConfigModule, PassportModule],
  providers: [
    {
      provide: EncryptionGatewayKey,
      useClass: CryptoGateway,
    },
    {
      provide: DecryptionGatewayKey,
      useClass: CryptoGateway,
    },
  ],
  exports: [EncryptionGatewayKey, DecryptionGatewayKey],
})
export class EncryptionGatewayModule {}
