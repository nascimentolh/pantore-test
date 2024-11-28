import { User } from "@domains/user";

export interface FindUsersBySearchGateway {
  findUsersBySearch(field: string, searchValue: string): Promise<User[]>;
}

export const FindUsersBySearchGatewayKey = Symbol("FindUsersBySearchGateway");
