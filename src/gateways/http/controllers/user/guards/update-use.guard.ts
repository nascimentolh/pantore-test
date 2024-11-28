import { UserRole } from "@domains/user-role.enum";
import { DecryptionGateway, DecryptionGatewayKey } from "@gateways/encryption/decryption.gateway";
import { JwtPayload } from "@gateways/jwt/jwt.payload";
import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class UpdateUserGuard implements CanActivate {
  constructor(
    @Inject(DecryptionGatewayKey)
    private readonly dencryptionGateway: DecryptionGateway,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    const body = request.body;

    const [decryptedRole, decryptedId] = await Promise.all([
      this.dencryptionGateway.decrypt(user.role),
      this.dencryptionGateway.decrypt(user.id),
    ]);

    // Caso o usuário seja admin, ele pode atualizar qualquer um
    if (decryptedRole === UserRole.ADMIN) {
      return true;
    }

    // Caso o usuário seja customer, só pode atualizar a si mesmo e não alterar `role`
    if (decryptedRole === UserRole.CUSTOMER) {
      if (Number(decryptedId) !== body.id) {
        throw new ForbiddenException("You can only update your own profile.");
      }

      if (decryptedRole !== body.role) {
        throw new ForbiddenException("You cannot change your role.");
      }
      return true;
    }

    throw new ForbiddenException("You do not have permission to perform this action.");
  }
}
