import { BaseException } from "@configs/exceptions/base.exception";
import { DefaultException } from "@configs/exceptions/default.exception";
import { PipeException } from "@configs/exceptions/pipe.exception";
import { LoggerErrorGateway, LoggerErrorGatewayKey } from "@gateways/logger/interfaces/logger.error.gateway";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common";
import { Request, Response } from "express";
import { FilterMeta } from "./filter.meta";

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  constructor(
    @Inject(LoggerErrorGatewayKey)
    private readonly loggerErrorGateway: LoggerErrorGateway,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let responseException: HttpException = new DefaultException();

    if (exception instanceof BaseException) {
      responseException = exception;
    } else if (exception instanceof HttpException) {
      responseException = this.createPipeException(exception);
    }

    this.logError(request, responseException);

    response.status(responseException.getStatus()).json(responseException);
  }

  private createPipeException(httpException: HttpException) {
    const status = httpException.getStatus();
    const message = httpException.message;
    const errors = (httpException.getResponse() as any).message;

    return new PipeException(errors, message, status);
  }

  private logError(request: Request, httpException: HttpException) {
    const { stack } = httpException;
    const statusCode = httpException.getStatus();
    const message = httpException.message;
    const codes = (httpException as PipeException).codes || [];

    this.loggerErrorGateway.error({
      class: ExceptionHandler.name,
      meta: FilterMeta.builder()
        .path(request.path)
        .method(request.method)
        .statusCode(statusCode)
        .message(message)
        .stack(stack)
        .codes(codes)
        .build(),
      method: "logError",
    });
  }
}
