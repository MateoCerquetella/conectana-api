import jwt from 'jsonwebtoken';
import moment from 'moment';
import db from '../../database/db'
import * as express from 'express';
import { IUsername } from '../username/username.model'
import { RequestWithUserId } from '../../@types';

const table = () => db<IUsername>('username');

export function ensureAuthenticated(req: RequestWithUserId, res: express.Response, next: express.NextFunction) {
	if (!req.headers.authorization) {
		return res
			.status(403)
			.send({ message: 'Tu petición no tiene cabecera de autorización' });
	}

	const token_secret: any = process.env.TOKEN_SECRET;
	var token: string = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, token_secret);

	if (payload === null) {
		return res
			.status(403)
			.send({ message: 'Tu petición no tiene cabecera de autorización' });
	}

	if (payload.exp <= moment().unix()) {
		return res
			.status(401)
			.send({ message: 'El token ha expirado' });
	}

	req.userId = payload.id;

	next();
}

export function ensureAuthenticatedAndIsAdmin(req: RequestWithUserId, res: express.Response, next: express.NextFunction) {
	if (!req.headers.authorization) {
		return res
			.status(403)
			.send({ message: 'Tu petición no tiene cabecera de autorización' });
	}

	const token_secret: any = process.env.TOKEN_SECRET;
	var token: string = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, token_secret);

	if (payload === null) {
		return res
			.status(403)
			.send({ message: 'Tu petición no tiene cabecera de autorización' });
	}

	if (payload.exp <= moment().unix()) {
		return res
			.status(401)
			.send({ message: 'El token ha expirado' });
	}

	req.userId = payload.id;

	//Check if it's admin
	table()
		.where('id', payload.id)
		.select('isAdmin')
		.then((user: Pick<IUsername, 'isAdmin'>[]) => {
			return !!user[0].isAdmin ? next() :
				res.status(403).send({ message: 'No puedes acceder a este contenido' });
		})
		.catch(() => {
			return res.status(500).json({ message: 'Server error' });
		});
}