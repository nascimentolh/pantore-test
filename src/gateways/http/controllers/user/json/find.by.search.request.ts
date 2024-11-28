import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";
import { IsNotEmpty, IsString } from "class-validator";

export class FindBySearchRequest {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  field: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  searchValue: string;

  public static builder(): IBuilder<FindBySearchRequest> {
    return Builder<FindBySearchRequest>();
  }
}
