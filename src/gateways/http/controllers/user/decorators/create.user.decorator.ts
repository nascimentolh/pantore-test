import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { Post, applyDecorators } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { EmailAlreadyExistsBusinessException } from "@use-cases/exceptions/email.already.register.business.exception";
import { CreateUserRequest } from "../json/create.user.request";

export function CreateUserDecorator() {
  return applyDecorators(
    Post(),
    ApiResponse({ status: 201 }),
    ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
    ApiResponse({ status: 422, type: EmailAlreadyExistsBusinessException }),
    ApiBody({ type: CreateUserRequest }),
  );
}
