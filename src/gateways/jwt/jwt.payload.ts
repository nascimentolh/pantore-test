import { UserRole } from "@domains/user-role.enum";
import { Builder, IBuilder } from "builder-pattern";

export class JwtPayload {
  public readonly id?: string;
  public readonly role: string;
  public readonly email: string;

  public static builder(): IBuilder<JwtPayload> {
    return Builder<JwtPayload>();
  }
}
