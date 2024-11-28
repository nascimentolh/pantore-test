import { User } from "@domains/user";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable, map } from "rxjs";
import { AuthenticationResponse } from "../json/authentication.response";

@Injectable()
export class ResponseAuthMapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<AuthenticationResponse>): Observable<unknown> {
    const contextResponse = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((user: User) => {
        contextResponse.setHeader("ACCESS_TOKEN", user.accessToken);
        contextResponse.setHeader("REFRESH_TOKEN", user.refreshToken);

        return AuthenticationResponse.builder().id(user.id).name(user.name).email(user.email).role(user.role).build();
      }),
    );
  }
}
