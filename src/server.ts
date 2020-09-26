import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usernameRoutes from './api/username/username.routes';
import utils from './utils';

import db from './database/db'
// Declare global
declare var global: any;
global.utils = utils;

// Declare server
const app = express();

// CORS configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



db('username')
    .select('id')
    .then((user) => { // Type of users is inferred as Pick<User, "id">[]
        console.log("anda");
        console.log(user);
    });
// Routing
usernameRoutes(app);

// Set the port
app.set('port', process.env.PORT || 3000);

// Start the server
app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});
