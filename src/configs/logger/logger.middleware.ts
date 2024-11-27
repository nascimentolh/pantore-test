import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as requestIp from "request-ip";
import { LoggerMeta } from "./logger.meta";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(LoggerLogGatewayKey)
    private readonly loggerLogGateway: LoggerLogGateway,
  ) {}

  use(request: Request, response: Response, next: NextFunction) {
    const ip = requestIp.getClientIp(request).replace("::ffff:", "");

    request.on("close", () => {
      this.loggerLogGateway.log({
        class: LoggerMiddleware.name,
        method: "request",
        meta: LoggerMeta.builder()
          .date(new Date().toISOString())
          .ip(ip)
          .method(request.method)
          .path(request.path)
          .build(),
      });
    });

    response.on("close", () => {
      const { statusCode } = response;

      this.loggerLogGateway.log({
        class: LoggerMiddleware.name,
        method: "response",
        meta: LoggerMeta.builder()
          .date(new Date().toISOString())
          .ip(ip)
          .method(request.method)
          .path(request.path)
          .status(statusCode)
          .build(),
      });
    });

    next();
  }
}
