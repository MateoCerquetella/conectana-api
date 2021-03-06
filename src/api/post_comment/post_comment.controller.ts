import { RouteCallback } from '../../@types'
import db from '../../database/db'
import { IPostComment } from './post_comment.model'

const table = () => db<IPostComment>('post_comment')

export class PostCommentController {

  create: RouteCallback = function (req, res) {
    const postCommentTmp: IPostComment = req.body

    // Validate request
    if (!postCommentTmp.post_id || !postCommentTmp.user_id || !postCommentTmp.text) {
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

  findAll: RouteCallback = function (req, res) {
    table()
      .select()
      .where({ isDeleted: false })
      .then((postComment: IPostComment[]) => {
        return res.status(200).send(postComment)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id, isDeleted: false })
      .then((postComment: IPostComment[]) => {
        return postComment.length > 0 ?
          res.status(200).send(postComment) :
          res.status(404).send({ message: 'Comentario del posteo no encontrada' })

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update: RouteCallback = function (req, res) {
    const postCommentTmp: IPostComment = req.body

    if (!(req.session.userId === +req.params.id || req.session.isAdmin)) {
      return res.status(403).send({ message: 'No puedes acceder a este contenido' })
    }

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

  delete: RouteCallback = function (req, res) {
    if (!(req.session.userId === +req.params.id || req.session.isAdmin)) {
      return res.status(403).send({ message: 'No puedes acceder a este contenido' })
    }

    table()
      .where({ id: +req.params.id })
      .update({ isDeleted: true })
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