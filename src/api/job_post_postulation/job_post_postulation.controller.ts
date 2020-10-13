import { RouteCallback } from '../../@types'
import db from '../../database/db'
import { IJobPostPostulation } from './job_post_postulation.model'

const table = () => db<IJobPostPostulation>('job_post_postulation')

export class JobPostPostulationController {

  create: RouteCallback = function (req, res) {
    const jobPostPostulationTmp: IJobPostPostulation = req.body

    // Validate request
    if (!jobPostPostulationTmp.job_post_id || !jobPostPostulationTmp.username_id || !jobPostPostulationTmp.job_post_status_id) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(jobPostPostulationTmp)
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
      .then((jobPostPostulation: IJobPostPostulation[]) => {
        return res.status(200).send(jobPostPostulation)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id, isDeleted: false })
      .then((jobPostPostulation: IJobPostPostulation[]) => {
        return jobPostPostulation.length > 0 ?
          res.status(200).send(jobPostPostulation) :
          res.status(404).send({ message: 'Postulación del trabajo no encontrada' })

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update: RouteCallback = function (req, res) {
    const jobPostPostulationTmp: IJobPostPostulation = req.body

    table()
      .where({ id: +req.params.id, isDeleted: false })
      .update(jobPostPostulationTmp)
      .then((jobPostPostulation: number) => {
        return jobPostPostulation > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Postulación del trabajo no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id })
      .update({ isDeleted: true })
      .then((jobPostPostulation: number) => {
        return jobPostPostulation > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Postulación del trabajo no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}