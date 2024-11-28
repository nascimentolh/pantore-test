import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthenticationRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly password: string;

  public static builder(): IBuilder<AuthenticationRequest> {
    return Builder<AuthenticationRequest>();
  }
}
