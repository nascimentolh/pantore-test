import { Injectable, PipeTransform } from "@nestjs/common";
import { RequestValidationBase } from "../../common/pipes/request.validation.base";
import { FindBySearchRequest } from "../json/find.by.search.request";

@Injectable()
export class UserSearchPipe
  extends RequestValidationBase
  implements PipeTransform<FindBySearchRequest, Promise<{ field: string; searchValue: string }>>
{
  async transform(searchUserRequest: FindBySearchRequest) {
    this.checkEmptyBody(searchUserRequest);

    await this.validateClass<FindBySearchRequest>(FindBySearchRequest, searchUserRequest);

    return {
      field: searchUserRequest.field.trim(),
      searchValue: searchUserRequest.searchValue.trim(),
    };
  }
}
