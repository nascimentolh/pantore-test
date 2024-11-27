import type { User } from "@domains/user";

export interface CreateUserDatabaseGateway {
  insert(user: User): Promise<void>;
}

export const CreateUserDatabaseGatewayKey = Symbol("CreateUserDatabaseGateway");
