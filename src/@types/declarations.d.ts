declare const process: {
  env: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    SALT_ROUNDS: number;
  };
} & NodeJS.Process;
