import express from 'express'
import { isAuth } from '../middleware/auth'
import { OrganizationController } from './organization.controller'

const router = express.Router()
const organization = new OrganizationController()

export default function organizationRoutes(app: express.Express) {
  router.post('/', organization.create)
  router.get('/', organization.findAll)
  router.get('/:id', organization.findOne)
  router.put('/', isAuth, organization.update)
  router.delete('/', isAuth, organization.delete)

  app.use('/organization', router)
}