import { User } from "@domains/user";
import { UserEntity } from "../../user.entity";

export function mapperUserFromUserEntity(userEntity: UserEntity): User {
  return User.builder()
    .id(userEntity.id)
    .email(userEntity.email)
    .name(userEntity.name)
    .role(userEntity.role)
    .password(userEntity.password)
    .build();
}
