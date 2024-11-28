import { UserRole } from "@domains/user-role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";

export class AuthenticationResponse {
  @ApiProperty()
  public readonly id?: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty({
    enum: UserRole,
  })
  public readonly role: UserRole;

  public static builder(): IBuilder<AuthenticationResponse> {
    return Builder<AuthenticationResponse>();
  }
}
