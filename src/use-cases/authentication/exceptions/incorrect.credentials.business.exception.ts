import { BaseException } from "@configs/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const code = "pantore.api.error.business.incorrect.credentials";
const message = "Incorrect Credentials.";

export class IncorrectCredentialsBusinessException extends BaseException {
  @ApiProperty({ default: code })
  public readonly code: string;

  @ApiProperty({ default: message })
  public readonly message: string;

  constructor() {
    super(HttpStatus.UNAUTHORIZED);
    this.code = code;
    this.message = message;
  }
}
