declare module NodeJS {
  interface Global {
    utils: {
      parseBool: (txt: any) => boolean;
    };
    CONSTANTS: {
      DATABASE_URL: string;
      DATABASE_PASSWORD: string;
      DATABASE_PORT: string;
      PRODUCTION: boolean;
      PRODUCTION_DB: boolean;
    };
  }
}