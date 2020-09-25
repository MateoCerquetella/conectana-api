// import { config } from '../config/config';
import knex from 'knex';

export default knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'myapp_test'
    },
    acquireConnectionTimeout: 10000
});
