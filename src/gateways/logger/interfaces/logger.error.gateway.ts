import { LoggerMessage } from "./logger.message";

export interface LoggerErrorGateway {
  error(loggerMessage: LoggerMessage): void;
}

export const LoggerErrorGatewayKey = Symbol("LoggerErrorGateway");
