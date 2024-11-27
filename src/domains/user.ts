import { Builder, type IBuilder } from "builder-pattern";

export class User {
  public readonly id?: number;
  public readonly name: string;
  public readonly email: string;
  public readonly role?: string;
  public readonly password?: string;

  public static builder(): IBuilder<User> {
    return Builder<User>();
  }
}
