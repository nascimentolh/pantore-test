import type { User } from "@domains/user";

export interface FindUserByEmailDatabaseGateway {
  findByEmail(email: string): Promise<User>;
}

export const FindUserByEmailDatabaseGatewayKey = Symbol("FindUserByEmailDatabaseGateway");
