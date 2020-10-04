import * as express from 'express'
import { RequestWithUserId } from '../../@types'
import db from '../../database/db'
import { IUsername } from '../username/username.model'
import { IPostComment } from './post_comment.model'

const table = () => db<IPostComment>('post_comment')

export class PostCommentController {

  create(req: express.Request, res: express.Response) {
    const postCommentTmp: IPostComment = req.body

    //Validate request
    if (!postCommentTmp.post_id || !postCommentTmp.username_id || !postCommentTmp.text) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(postCommentTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe la postulación del trabajo' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll(req: express.Request, res: express.Response) {
    table()
      .select()
      .then((postComment: IPostComment[]) => {
        return res.status(200).send(postComment)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne(req: express.Request, res: express.Response) {
    const id = req.params.id
    table()
      .where('id', id)
      .then((postComment: IPostComment[]) => {
        return postComment.length > 0 ?
          res.status(200).send(postComment) :
          res.status(404).send({ message: 'Comentario del posteo no encontrada' })

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update(req: RequestWithUserId, res: express.Response) {
    const postCommentTmp: IPostComment = req.body

    table()
      .where({ id: +req.params.id })
      .update(postCommentTmp)
      .then((postComment: number) => {
        return postComment > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Comentario del posteo no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete(req: RequestWithUserId, res: express.Response) {
    table()
      .where({ id: req.userId })
      .del()
      .then((postComment: number) => {
        return postComment > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Comentario del posteo no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}