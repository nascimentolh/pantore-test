import { User } from "@domains/user";
import { Injectable, PipeTransform } from "@nestjs/common";
import { RequestValidationBase } from "../../common/pipes/request.validation.base";
import { UpdateUserRequest } from "../json/update.user.request";
import { mapperUserFromUpdateRequest } from "./mappers/user.mapper";

@Injectable()
export class UserUpdatePipe extends RequestValidationBase implements PipeTransform<UpdateUserRequest, Promise<User>> {
  async transform(updateUserRequest: UpdateUserRequest) {
    this.checkEmptyBody(updateUserRequest);

    await this.validateClass<UpdateUserRequest>(UpdateUserRequest, updateUserRequest);

    return mapperUserFromUpdateRequest(updateUserRequest);
  }
}
