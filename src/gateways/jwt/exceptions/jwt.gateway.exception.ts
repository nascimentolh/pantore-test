import { BaseException } from "@configs/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const code = "pantore.api.error.generate.jwt";
const message = "Error to generate token.";

export class JWTGatewayException extends BaseException {
  @ApiProperty({ default: code })
  public readonly code: string;

  @ApiProperty({ default: message })
  public readonly message: string;

  constructor(stack?: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR);
    this.stack = stack;
    this.code = code;
    this.message = message;
  }
}
