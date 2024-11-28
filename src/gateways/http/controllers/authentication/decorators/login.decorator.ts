import { UserDatabaseGatewayException } from "@gateways/database/exceptions/user.database.gateway.exception";
import { DecryptionGatewayException } from "@gateways/encryption/exceptions/decryption.gateway.exception";
import { EncryptionGatewayException } from "@gateways/encryption/exceptions/encryption.gateway.exception";
import { JWTGatewayException } from "@gateways/jwt/exceptions/jwt.gateway.exception";
import { Post, UseInterceptors, applyDecorators } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiResponse } from "@nestjs/swagger";
import { IncorrectCredentialsBusinessException } from "@use-cases/authentication/exceptions/incorrect.credentials.business.exception";
import { ResponseAuthMapperInterceptor } from "../interceptors/response.auth.mapper.interceptor";
import { AuthenticationResponse } from "../json/authentication.response";

export function LoginDecorator() {
  return applyDecorators(
    Post("sign-in"),
    ApiResponse({
      status: 500,
      content: {
        "application/json": {
          examples: {
            UserDatabaseGatewayException: { value: new UserDatabaseGatewayException() },
            JWTGatewayException: { value: new JWTGatewayException() },
            DecryptionGatewayException: { value: new DecryptionGatewayException() },
            EncryptionGatewayException: { value: new EncryptionGatewayException() },
          },
        },
      },
    }),
    ApiResponse({ status: 422, type: IncorrectCredentialsBusinessException }),
    ApiCreatedResponse({
      type: AuthenticationResponse,
      headers: {
        ACCESS_TOKEN: { description: "Access token", schema: { type: "string" } },
        REFRESH_TOKEN: { description: "Refresh token", schema: { type: "string" } },
      },
    }),
    ApiBody({ type: AuthenticationResponse }),
    UseInterceptors(ResponseAuthMapperInterceptor),
  );
}
