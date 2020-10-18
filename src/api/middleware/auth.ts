import db from '../../database/db'
import * as express from 'express'
import { IUser } from '../user/user.model'

const table = () => db<IUser>('username')

export function isAuthAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session?.userId) {
    return res
      .status(403)
      .send({ message: 'Tu petición no tiene cabecera de autorización' })
  }

  //Check if it's admin
  table()
    .where({ id: req.session.userId })
    .select('isAdmin')
    .then((user: Pick<IUser, 'isAdmin'>[]) => {
      return !!user[0].isAdmin ? next() :
        res.status(403).send({ message: 'No puedes acceder a este contenido' })
    })
    .catch(() => {
      return res.status(500).json({ message: 'Server error' })
    })
}