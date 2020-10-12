import * as express from 'express'
import { RequestWithUserId, RouteCallback } from '../../@types'
import db from '../../database/db'
import { IJobPost } from './job_post.model'

const table = () => db<IJobPost>('job_post')

export class JobPostController {

  create: RouteCallback = function (req, res) {
    const jobPostTmp: IJobPost = req.body

    // Validate request
    if (!jobPostTmp.title || !jobPostTmp.tag_id || !jobPostTmp.description) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(jobPostTmp)
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
      .then((jobPost: IJobPost[]) => {
        return res.status(200).send(jobPost)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id, isDeleted: false })
      .then((jobPost: IJobPost[]) => {
        return jobPost.length > 0 ?
          res.status(200).send(jobPost) :
          res.status(404).send({ message: 'Postulación del trabajo no encontrada' })

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update(req: RequestWithUserId, res: express.Response) {
    const jobPostTmp: IJobPost = req.body

    if (jobPostTmp.isDeleted !== undefined) {
      return res.status(400).send({
        message: 'No puedes borrar explícitamente en la modificacion.'
      })
    }
    table()
      .where({ id: +req.params.id, isDeleted: false })
      .update(jobPostTmp)
      .then((jobPost: number) => {
        return jobPost > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Postulación del trabajo no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete(req: RequestWithUserId, res: express.Response) {
    table()
      .where({ id: +req.params.id })
      .update({ isDeleted: true })
      .then((jobPost: number) => {
        return jobPost > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Postulación del trabajo no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}