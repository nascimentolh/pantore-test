import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { Get, Param, UseGuards, UseInterceptors, applyDecorators } from "@nestjs/common";
import { ApiQuery, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt.auth.guard";
import { ResponseMapperInterceptor } from "../../common/interceptors/response.mapper.interceptor";
import { FindUsersBySearchResponse } from "../json/find.users.by.search.response";

export function FindUsersBySearchDecorator() {
  return applyDecorators(
    Get("/search"),
    ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
    ApiResponse({ status: 200, type: FindUsersBySearchResponse }),
    ApiQuery({ name: "field", required: true, type: String }),
    ApiQuery({ name: "searchValue", required: true, type: String }),
    UseInterceptors(new ResponseMapperInterceptor(FindUsersBySearchResponse)),
    UseGuards(JwtAuthGuard),
  );
}
