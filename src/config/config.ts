const utils = global.utils

global.CONSTANTS = process.env.PRODUCTION ? (() => ({
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  PRODUCTION: true,
  PRODUCTION_DB: true
}))() : require('dotenv-flow').config().parsed

global.CONSTANTS.PRODUCTION = utils.parseBool(process.env.PRODUCTION)
global.CONSTANTS.PRODUCTION_DB = utils.parseBool(process.env.PRODUCTION_DB)
