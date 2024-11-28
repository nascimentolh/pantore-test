import { User } from "@domains/user";
import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable } from "@nestjs/common";
import { AuthenticationUseCase } from "@use-cases/authentication/authentication.usecase";

@Injectable()
export class AuthenticationFacade {
  constructor(
    private readonly authenticationUseCase: AuthenticationUseCase,
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  public async authenticate(password: string, email: string): Promise<User> {
    this.loggerLogGateway.log({
      class: AuthenticationFacade.name,
      meta: email,
      method: "authenticate",
    });

    return this.authenticationUseCase.authenticate(password, email);
  }
}
