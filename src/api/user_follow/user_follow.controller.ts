import * as express from 'express'
import { RequestWithUserId } from '../../@types'
import db from '../../database/db'
import { IUserFollow } from './user_follow.model'

const table = () => db<IUserFollow>('user_follow')

export class UserFollowController {

  create(req: express.Request, res: express.Response) {
    const userFollowTmp: IUserFollow = req.body

    //Validate request
    if (!userFollowTmp.user_from_id || !userFollowTmp.user_to_id || !userFollowTmp.is_following) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(userFollowTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el seguimiento del usuario' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll(req: express.Request, res: express.Response) {
    table()
      .select()
      .then((userFollow: IUserFollow[]) => {
        return res.status(200).send(userFollow)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne(req: express.Request, res: express.Response) {
    const id = req.params.id
    table()
      .where('id', id)
      .then((userFollow: IUserFollow[]) => {
        return userFollow.length > 0 ?
          res.status(200).send(userFollow) :
          res.status(404).send({ message: 'Seguimiento del usuario no encontrado' })

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update(req: express.Request, res: express.Response) {
    const userFollowTmp: IUserFollow = req.body

    table()
      .where({ id: +req.params.id })
      .update(userFollowTmp)
      .then((userFollow: number) => {
        return userFollow > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Seguimiento del usuario no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete(req: RequestWithUserId, res: express.Response) {
    table()
      .where({ id: req.userId })
      .del()
      .then((userFollow: number) => {
        return userFollow > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Seguimiento del usuario no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}