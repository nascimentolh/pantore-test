import { User } from "@domains/user";

export interface FindUserByIdDatabaseGateway {
  findById(id: number): Promise<User | null>;
}

export const FindUserByIdDatabaseGatewayKey = Symbol("FindUserByIdDatabaseGateway");
