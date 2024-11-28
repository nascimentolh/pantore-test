import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { Get, UseGuards, UseInterceptors, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt.auth.guard";
import { ResponseMapperInterceptor } from "../../common/interceptors/response.mapper.interceptor";
import { FindAllResponseJson } from "../json/find.all.response.json";

export function FindAllUserDecorator() {
  return applyDecorators(
    Get(),
    ApiResponse({ status: 500, type: UserDatabaseGatewayException }),
    ApiResponse({ status: 200, type: FindAllResponseJson, isArray: true }),
    UseInterceptors(new ResponseMapperInterceptor(FindAllResponseJson)),
    UseGuards(JwtAuthGuard),
  );
}
