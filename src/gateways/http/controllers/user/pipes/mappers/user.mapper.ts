import { User } from "@domains/user";
import { CreateUserRequest } from "../../json/create.user.request";
import { UpdateUserRequest } from "../../json/update.user.request";

export function mapperUserFromCreateRequest(createUserRequest: CreateUserRequest): User {
  return User.builder()
    .name(createUserRequest.name)
    .email(createUserRequest.email)
    .password(createUserRequest.password)
    .build();
}

export function mapperUserFromUpdateRequest(updateUserRequest: UpdateUserRequest): User {
  return User.builder()
    .email(updateUserRequest.email)
    .id(updateUserRequest.id)
    .name(updateUserRequest.name)
    .role(updateUserRequest.role)
    .password(updateUserRequest.password)
    .build();
}
