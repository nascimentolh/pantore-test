import { Builder, type IBuilder } from "builder-pattern";
import type { UserRole } from "./user-role.enum";

export class User {
  public readonly id?: number;
  public readonly name: string;
  public readonly email: string;
  public readonly role?: UserRole;
  public readonly password?: string;

  public static builder(): IBuilder<User> {
    return Builder<User>();
  }
}
