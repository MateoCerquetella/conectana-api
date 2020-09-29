import jwt from 'jsonwebtoken';
import moment from 'moment';
import db from '../../database/db'
import * as express from 'express';
import { IUsername } from '../username/username.model'

const table = () => db<IUsername>('username');

export function ensureAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    const token_secret: any = process.env.TOKEN_SECRET;
    var token: string = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, token_secret);

    if (payload === null) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    if (payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({ message: "El token ha expirado" });
    }
    console.log(req);

    console.log("req es");

    console.log(req.isAdmin);

    next();
}

// export function ensureAuthenticatedAndIsAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
//     if (!req.headers.authorization) {
//         return res
//             .status(403)
//             .send({ message: "Tu petición no tiene cabecera de autorización" });
//     }

//     const token_secret: any = process.env.TOKEN_SECRET;
//     var token: string = req.headers.authorization.split(" ")[1];
//     var payload = jwt.decode(token, token_secret);

//     if (payload === null) {
//         return res
//             .status(403)
//             .send({ message: "Tu petición no tiene cabecera de autorización" });
//     }

//     if (payload.exp <= moment().unix()) {
//         return res
//             .status(401)
//             .send({ message: "El token ha expirado" });
//     }

//     table()
//         .where('id', id)
//         .then((username: IUsername[]) => {
//             console.log(username);

//             isAdmin = true;
//         })
//         .catch((error) => {
//             console.log(error);

//             return;
//         });


//     if (!isAdmin) {
//         return res
//             .status(403)
//             .send({ message: "No puedes acceder a este contenido" });
//     }

//     next();
// }