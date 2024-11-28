import { User } from "@domains/user";

export interface UpdateUserDatabaseGateway {
  update(userToUpdate: User): Promise<void>;
}

export const UpdateUserDatabaseGatewayKey = Symbol("UpdateUserDatabaseGateway");
