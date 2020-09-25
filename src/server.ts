import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './database/db';
import { userRoutes } from './api/user/user.routes';
import utils from './utils';

// Declare global
declare var global: any;
global.utils = utils;

// Declare server
const app = express();

// CORS configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routing
userRoutes(app);

// Set the port
app.set('port', process.env.PORT || 3000);

// Start the server
app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});
