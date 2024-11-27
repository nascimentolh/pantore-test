import type { User } from "@domains/user";
import { Injectable, type PipeTransform } from "@nestjs/common";
import { RequestValidationBase } from "../common/pipes/request.validation.base";
import { CreateUserRequest } from "../json/create.user.request";
import { mapperUserFromCreateRequest } from "./mappers/user.mapper";

@Injectable()
export class UserCreatePipe extends RequestValidationBase implements PipeTransform<CreateUserRequest, Promise<User>> {
  async transform(createUserRequest: CreateUserRequest) {
    this.checkEmptyBody(createUserRequest);

    await this.validateClass<CreateUserRequest>(CreateUserRequest, createUserRequest);

    return mapperUserFromCreateRequest(createUserRequest);
  }
}
