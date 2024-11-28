import { LoggerLogGateway, LoggerLogGatewayKey } from "@gateways/logger/interfaces/logger.log.gateway";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(@Inject(LoggerLogGatewayKey) private readonly loggerLogGateway: LoggerLogGateway) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.loggerLogGateway.log({
      class: context.getClass().name,
      method: context.getHandler().name,
      meta: context.switchToHttp().getRequest().body,
    });

    return next.handle().pipe();
  }
}
