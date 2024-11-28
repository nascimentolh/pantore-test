import { EnvironmentConfigService } from "@configs/environment/environment-config.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtValidatePayload } from "./jwt.validate.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly environmentConfigService: EnvironmentConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentConfigService.getJwtSecret(),
    });
  }

  async validate({ jwtPayload }: JwtValidatePayload) {
    return { id: jwtPayload.id, email: jwtPayload.email, role: jwtPayload.role };
  }
}
