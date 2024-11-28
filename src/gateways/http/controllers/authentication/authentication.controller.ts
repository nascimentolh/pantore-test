import { User } from "@domains/user";
import { Body, Controller, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthenticationFacade } from "@use-cases/facade/authentication.facade";
import { LoginDecorator } from "./decorators/login.decorator";
import { AuthenticationRequest } from "./json/authentication.request";

@Controller("auth")
@ApiTags("Authentication")
export class AuthenticationController {
  constructor(private readonly authenticationFacade: AuthenticationFacade) {}

  @LoginDecorator()
  public async login(@Body(ValidationPipe) authenticationRequest: AuthenticationRequest): Promise<User> {
    const userAuthenticated = await this.authenticationFacade.authenticate(
      authenticationRequest.password,
      authenticationRequest.email,
    );

    return userAuthenticated;
  }
}
