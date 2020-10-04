import * as express from 'express'
import { RequestWithUserId } from '../../@types'
import db from '../../database/db'
import { IUsername } from '../username/username.model'
import { IOrganizationEmployee } from './organization_employee.model'

const table = () => db<IOrganizationEmployee>('organization_employee')

export class OrganizationEmployeeController {

  create: RouteCallback = function (req, res) {
    const organizationEmployeeTmp: IOrganizationEmployee = req.body

    //Validate request
    if (!organizationEmployeeTmp.organization_id || !organizationEmployeeTmp.colaborator_id) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(organizationEmployeeTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe la organización empleado' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll: RouteCallback = function (req, res) {
    table()
      .select()
      .then((organizationEmployee: IOrganizationEmployee[]) => {
        return res.status(200).send(organizationEmployee)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne: RouteCallback = function (req, res) {
    const id = req.params.id
    table()
      .where('id', id)
      .then((organizationEmployee: IOrganizationEmployee[]) => {
        return organizationEmployee.length > 0 ?
          res.status(200).send(organizationEmployee) :
          res.status(404).send({ message: 'Organización empleado no encontrada' })

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update(req: RequestWithUserId, res: express.Response) {
    const organizationEmployeeTmp: IOrganizationEmployee = req.body

    table()
      .where({ id: +req.params.id })
      .update(organizationEmployeeTmp)
      .then((organizationEmployee: number) => {
        return organizationEmployee > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Organización empleado no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete(req: RequestWithUserId, res: express.Response) {
    table()
      .where({ id: req.userId })
      .del()
      .then((organizationEmployee: number) => {
        return organizationEmployee > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Organización empleado no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}