import { User } from "@domains/user";
import { UserEntity } from "../../user.entity";

export function mapperUserFromUserEntity(userEntity: UserEntity): User {
  return User.builder().id(userEntity.id).name(userEntity.name).role(userEntity.role).build();
}
