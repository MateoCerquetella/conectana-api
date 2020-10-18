import { RouteCallback } from '../../@types'
import db from '../../database/db'
import { IUser } from '../user/user.model'
import { IOrganization } from './organization.model'

const table = () => db<IOrganization>('organization')

export class OrganizationController {

  create: RouteCallback = function (req, res) {
    const organizationTmp: IOrganization = req.body

    // Validate request
    if (!organizationTmp.company_name || !organizationTmp.what_we_do || !organizationTmp.category_id) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    table()
      .insert(organizationTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe la organización' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll: RouteCallback = function (req, res) {
    table()
      .select()
      .where({ isDeleted: false })
      .then((organization: IOrganization[]) => {
        return res.status(200).send(organization)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id, isDeleted: false })
      .then((organization: IOrganization[]) => {
        return organization.length > 0 ?
          res.status(200).send(organization) :
          res.status(404).send({ message: 'Organización no encontrada' })

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update: RouteCallback = function (req, res) {
    const organizationTmp: IOrganization = req.body

    table()
      .select()
      .whereIn('id', function () {
        this.select('id_organization')
          .from<IUser>('user')
          .where('id', req.session?.userId)
      })
      .update(organizationTmp)
      .then((organization: number) => {
        return organization > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Organización no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id })
      .update({ isDeleted: true })
      .then((organization: number) => {
        return organization > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Organización no encontrada' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}