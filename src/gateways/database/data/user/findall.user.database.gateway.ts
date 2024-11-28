import { User } from "@domains/user";

export interface FindAllUserDatabaseGateway {
  findAll(): Promise<User[]>;
}

export const FindAllUserDatabaseGatewayKey = Symbol("FindAllUserDatabaseGateway");
