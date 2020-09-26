import knex from 'knex';
import utils from './../utils';

// Declare global
declare var global: any;
global.utils = utils;


export default knex({
    client: 'pg',
    connection: {
        host: global.CONSTANTS.DATABASE_HOST,
        user: global.CONSTANTS.DATABASE_USER,
        password: global.CONSTANTS.DATABASE_PASSWORD,
        database: global.CONSTANTS.DATABASE_NAME,
        charset: 'utf8'
    },
    acquireConnectionTimeout: 10000,
    log: {
        warn(message) {
            console.log(message);
        },
        error(message) {
            console.log(message);
        },
        deprecate(message) {
            console.log(message);
        },
        debug(message) {
            console.log(message);
        },
    }
});
