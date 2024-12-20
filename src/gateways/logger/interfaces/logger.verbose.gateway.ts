import { LoggerMessage } from "./logger.message";

export interface LoggerVerboseGateway {
  verbose(loggerMessage: LoggerMessage): void;
}

export const LoggerVerboseGatewayKey = Symbol("LoggerVerboseGateway");
