import { UserRole } from "@domains/user-role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  public readonly id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsEmail()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  @MinLength(8)
  public readonly password: string;

  @ApiProperty({ required: true, enum: UserRole })
  @IsEnum(UserRole)
  public readonly role: UserRole;

  public static builder(): IBuilder<UpdateUserRequest> {
    return Builder<UpdateUserRequest>();
  }
}
