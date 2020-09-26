declare module NodeJS {
  interface Global {
    utils: {
      parseBool: (txt: any) => boolean;
    };
    CONSTANTS: {
      DATABASE_HOST: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      DATABASE_USER: string;
      PRODUCTION: boolean;
      PRODUCTION_DB: boolean;
    };
  }
}