import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { Get, UseGuards, UseInterceptors, applyDecorators } from "@nestjs/common";
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import { UserNotFoundBusinessException } from "@use-cases/exceptions/user.not.found.business.exception";
import { JwtAuthGuard } from "../../common/guards/jwt.auth.guard";
import { ResponseMapperInterceptor } from "../../common/interceptors/response.mapper.interceptor";
import { FindByIdResponse } from "../json/find.by.id.response";

export function FindUserByIdDecorator() {
  return applyDecorators(
    Get(":id"),
    ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
    ApiResponse({ status: 400, type: UserNotFoundBusinessException }),
    ApiResponse({ status: 200, type: FindByIdResponse }),
    ApiParam({ name: "id", type: "number", required: true }),
    UseInterceptors(new ResponseMapperInterceptor(FindByIdResponse)),
    UseGuards(JwtAuthGuard),
  );
}
