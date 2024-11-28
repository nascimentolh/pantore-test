export type AppProperties = {
  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_SCHEMA: string;
  DATABASE_SYNCHRONIZE: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: number;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;
};
