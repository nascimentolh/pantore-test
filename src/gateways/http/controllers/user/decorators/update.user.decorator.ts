import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { Put, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt.auth.guard";
import { UpdateUserGuard } from "../guards/update-use.guard";
import { UpdateUserRequest } from "../json/update.user.request";

export function UpdateUserDecorator() {
  return applyDecorators(
    Put(),
    ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
    ApiResponse({ status: 200 }),
    ApiBody({ type: UpdateUserRequest }),
    UseGuards(JwtAuthGuard, UpdateUserGuard),
  );
}
