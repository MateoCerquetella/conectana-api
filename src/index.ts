'use strict'
import express from 'express';

const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// db.connect()
//     .then(obj => {
//         obj.done(); //Cargó la base de datos
//         console.log('DB initiated...');
//     })
//     .catch(error => {
//         console.log('DB Error:', error.message || error);
//     });

// usuariosRoutes(app);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});
