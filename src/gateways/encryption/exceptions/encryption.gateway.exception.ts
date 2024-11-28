import { BaseException } from "@configs/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const code = "pantore.api.error.encryption";
const message = "Error to encryption value.";

export class EncryptionGatewayException extends BaseException {
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
