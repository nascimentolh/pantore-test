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

export function mapperUserEntityFromUser(user: User): UserEntity {
  return UserEntity.builder()
    .email(user.email)
    .name(user.name)
    .id(user.id)
    .role(user.role)
    .password(user.password)
    .build();
}
