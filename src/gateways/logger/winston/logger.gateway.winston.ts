import { Inject, Injectable, type Logger } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import type { LoggerDebugGateway } from "../interfaces/logger.debug.gateway";
import type { LoggerErrorGateway } from "../interfaces/logger.error.gateway";
import type { LoggerLogGateway } from "../interfaces/logger.log.gateway";
import type { LoggerMessage } from "../interfaces/logger.message";
import type { LoggerVerboseGateway } from "../interfaces/logger.verbose.gateway";
import type { LoggerWarnGateway } from "../interfaces/logger.warn.gateway";
import { removeKeyOfObject } from "./removeKeyOfObject";

const fieldsToRemoveFromMeta = ["password"];

@Injectable()
export class LoggerGatewayWinston
  implements LoggerDebugGateway, LoggerLogGateway, LoggerVerboseGateway, LoggerWarnGateway, LoggerErrorGateway
{
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  public debug(loggerMessage: LoggerMessage) {
    if (process.env.NODE_ENV !== "production") {
      this.logger.debug({
        message: `${loggerMessage.class}:${loggerMessage.method}`,
        meta: this.removeKeysFromMeta(loggerMessage.meta),
      });
    }
  }

  public log(loggerMessage: LoggerMessage) {
    this.logger.log({
      level: "info",
      message: `${loggerMessage.class}:${loggerMessage.method}`,
      meta: this.removeKeysFromMeta(loggerMessage.meta),
    });
  }

  public error(loggerMessage: LoggerMessage) {
    this.logger.error({
      message: `${loggerMessage.class}:${loggerMessage.method}`,
      meta: this.removeKeysFromMeta(loggerMessage.meta),
    });
  }

  public warn(loggerMessage: LoggerMessage) {
    this.logger.warn({
      message: `${loggerMessage.class}:${loggerMessage.method}`,
      meta: this.removeKeysFromMeta(loggerMessage.meta),
    });
  }

  public verbose(loggerMessage: LoggerMessage) {
    if (process.env.NODE_ENV !== "production") {
      this.logger.verbose({
        message: `${loggerMessage.class}:${loggerMessage.method}`,
        meta: this.removeKeysFromMeta(loggerMessage.meta),
      });
    }
  }

  private removeKeysFromMeta(meta: unknown) {
    return typeof meta === "object" ? removeKeyOfObject(meta, fieldsToRemoveFromMeta as never) : meta;
  }
}