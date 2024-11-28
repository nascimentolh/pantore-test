import { Builder, IBuilder } from "builder-pattern";
import { UserRole } from "./user-role.enum";

export class User {
  public readonly id?: number;
  public readonly name: string;
  public readonly email: string;
  public readonly role?: UserRole;
  public readonly password?: string;
  public readonly accessToken?: string;
  public readonly refreshToken?: string;

  public static builder(): IBuilder<User> {
    return Builder<User>();
  }
}
