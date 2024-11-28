import { User } from "@domains/user";
import { UserRole } from "@domains/user-role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";
import { BaseResponseJson } from "../../common/json/base.response.json";

export class FindByIdResponse extends BaseResponseJson<User> {
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

  public mapper(user: User | User[]): BaseResponseJson<User> | BaseResponseJson<User>[] {
    if (!Array.isArray(user) && user) {
      return FindByIdResponse.builder().role(user.role).email(user.email).name(user.name).id(user.id).build();
    }
  }

  public static builder(): IBuilder<FindByIdResponse> {
    return Builder<FindByIdResponse>();
  }
}
