import knex from 'knex';

export default knex({
    client: 'pg',
    connection: {
        host: global.CONSTANTS.DATABASE_URL,
        user: 'postgres',
        password: global.CONSTANTS.DATABASE_PASSWORD,
        database: 'ong',
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
