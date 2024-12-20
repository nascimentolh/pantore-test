export interface AppConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getDatabaseSchema(): string;
  getDatabaseSync(): boolean;
  getJwtSecret(): string;
  getJwtExpirationTime(): number;
  getJwtRefreshTokenExpirationTime(): number;
  getEncryptionPassword(): string;
  getEncryptionIV(): string;
}
