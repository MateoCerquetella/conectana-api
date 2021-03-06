import { RouteCallback } from '../../@types'
import db from '../../database/db'
import { ITag } from './tag.model'

const table = () => db<ITag>('tag')

export class TagController {

  create: RouteCallback = function (req, res) {
    const tagTmp: ITag = req.body

    // Validate request
    if (!tagTmp.name) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(tagTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el tag' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll: RouteCallback = function (req, res) {
    table()
      .select()
      .then((tag: ITag[]) => {
        return res.status(200).send(tag)
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findOne: RouteCallback = function (req, res) {
    const tagTmp: ITag = req.body
    tagTmp.id = +req.params.id

    table()
      .where({ id: tagTmp.id })
      .then((tag: ITag[]) => {
        return tag.length > 0 ?
          res.status(200).send(tag) :
          res.status(404).send({ message: 'Tag no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  update: RouteCallback = function (req, res) {
    const tagTmp: ITag = req.body

    // Validate request
    if (!tagTmp.name) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .where({ id: +req.params.id })
      .update({ name: tagTmp.name })
      .then((tag: number) => {
        return tag > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Tag no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id })
      .del()
      .then((tag: number) => {
        return tag > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Tag no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}