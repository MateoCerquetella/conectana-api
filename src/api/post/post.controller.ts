import { RouteCallback } from '../../@types'
import db from '../../database/db'
import { IPost } from './post.model'

const table = () => db<IPost>('post')

export class PostController {

  create: RouteCallback = function (req, res) {
    const postTmp: IPost = req.body

    // Validate request
    if (!postTmp.title) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(postTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el post' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll: RouteCallback = function (req, res) {
    table()
      .select()
      .then((post: IPost[]) => {
        return res.status(200).send(post)
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findOne: RouteCallback = function (req, res) {
    const postTmp: IPost = req.body
    postTmp.id = +req.params.id

    table()
      .where({ id: postTmp.id })
      .then((post: IPost[]) => {
        return post.length > 0 ?
          res.status(200).send(post) :
          res.status(404).send({ message: 'Post no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  update: RouteCallback = function (req, res) {
    const postTmp: IPost = req.body

    // Validate request
    if (!postTmp.title) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .where({ id: +req.params.id })
      .update({ title: postTmp.title })
      .then((post: number) => {
        return post > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Post no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id })
      .del()
      .then((post: number) => {
        return post > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Post no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}
