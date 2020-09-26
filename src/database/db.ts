import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

export default knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        charset: 'utf8'
    },
    acquireConnectionTimeout: 10000,
});