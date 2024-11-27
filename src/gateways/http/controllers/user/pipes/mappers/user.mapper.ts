import { User } from "@domains/user";
import { CreateUserRequest } from "../../json/create.user.request";

export function mapperUserFromCreateRequest(createUserRequest: CreateUserRequest): User {
  return User.builder()
    .name(createUserRequest.name)
    .email(createUserRequest.email)
    .password(createUserRequest.password)
    .build();
}
