import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateUserRequest {
  @ApiProperty({ required: true })
  public readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(8)
  @MaxLength(14)
  public readonly password: string;

  public static builder(): IBuilder<CreateUserRequest> {
    return Builder<CreateUserRequest>();
  }
}
