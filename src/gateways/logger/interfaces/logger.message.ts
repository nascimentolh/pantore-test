import { Builder, IBuilder } from "builder-pattern";

export class LoggerMessage {
  public readonly class: string;
  public readonly meta?: unknown | string;
  public readonly method: string;
  public readonly error?: string;

  public static builder(): IBuilder<LoggerMessage> {
    return Builder<LoggerMessage>();
  }
}
