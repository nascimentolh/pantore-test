import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { LoggerDebugGatewayKey } from "./interfaces/logger.debug.gateway";
import { LoggerErrorGatewayKey } from "./interfaces/logger.error.gateway";
import { LoggerLogGatewayKey } from "./interfaces/logger.log.gateway";
import { LoggerVerboseGatewayKey } from "./interfaces/logger.verbose.gateway";
import { LoggerWarnGatewayKey } from "./interfaces/logger.warn.gateway";
import { configuration } from "./winston/configuration.logger.winston";
import { LoggerGatewayWinston } from "./winston/logger.gateway.winston";

@Module({
  providers: [
    {
      provide: LoggerDebugGatewayKey,
      useClass: LoggerGatewayWinston,
    },
    {
      provide: LoggerLogGatewayKey,
      useClass: LoggerGatewayWinston,
    },
    {
      provide: LoggerVerboseGatewayKey,
      useClass: LoggerGatewayWinston,
    },
    {
      provide: LoggerWarnGatewayKey,
      useClass: LoggerGatewayWinston,
    },
    {
      provide: LoggerErrorGatewayKey,
      useClass: LoggerGatewayWinston,
    },
  ],
  exports: [
    LoggerDebugGatewayKey,
    LoggerWarnGatewayKey,
    LoggerVerboseGatewayKey,
    LoggerLogGatewayKey,
    LoggerErrorGatewayKey,
  ],
  imports: [WinstonModule.forRoot(configuration)],
})
export class LoggerModule {}
